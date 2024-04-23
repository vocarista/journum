import { getConnection } from "@/utils/db";
import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth";
import sanitizeHtml from 'sanitize-html';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const notebookId = url.searchParams.get("notebookId");
        const session = await getServerSession();
        if (!session || !session.user || !session.user.email) {
            throw new Error('Unauthorized access');
        }

        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM pages WHERE notebook_id = ?", [notebookId]);
        connection.release();
        return NextResponse.json(rows);
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const connection = await getConnection();
        const session = await getServerSession();

        if (!session || !session.user || !session.user.email) {
            throw new Error('Unauthorized access');
        }

        const body = await req.json();
        const { title, content, notebook_id } = body

        if (!title || !content || !notebook_id) {
            throw new Error('Missing required fields: title, content or notebook_id');
        }

        const sanitizedContent = sanitizeHtml(content, {
            allowedTags: ['p', 'br', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'],
            allowedAttributes: {
                'a': ['href', 'name', 'target'],
                'img': ['src', 'alt'],
            },
        });

        const [result]: any = await connection.execute(
            "SELECT id FROM users WHERE email = ?",
            [session?.user?.email]
        );

        if (!result.length) {
            throw new Error('User not found');
        }

        const userId = result[0].id;

        const [rows]: any = await connection.execute(
            "INSERT INTO pages (user_id, user_email, title, content, notebook_id) VALUES (?, ?, ?, ?, ?)",
            [userId, session?.user?.email, title, sanitizedContent, notebook_id]
        );

        connection.release();
        return NextResponse.json({ success: true, id: rows.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}