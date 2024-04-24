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
        console.log(body);
        const { title, content, notebookId } = body

        if (!title || !notebookId) {
            throw new Error('Missing required fields: title or notebook_id');
        }

        const [rows]: any = await connection.execute(
            "INSERT INTO pages (user_email, title, content, notebook_id) VALUES (?, ?, ?, ?)",
            [session?.user?.email, title, content, notebookId]
        );

        connection.release();
        return NextResponse.json({ success: true, id: rows.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const connection = await getConnection();
        const session = await getServerSession();

        if (!session || !session.user || !session.user.email) {
            throw new Error('Unauthorized access');
        }

        const body = await req.json();
        const { title, content, pageId } = body;

        if (!pageId) {
            throw new Error('Missing required fields: id');
        }

        const sanitizedContent = sanitizeHtml(content, {
            allowedTags: ['p', 'br', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'],
            allowedAttributes: {
                'a': ['href', 'name', 'target'],
                'img': ['src', 'alt'],
            },
        });

        const [result]: any = await connection.execute('UPDATE pages SET title = ?, content = ? WHERE id = ?', [title, sanitizedContent, pageId]);
        connection.release();
        return NextResponse.json({ success: true });
    } catch(error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}