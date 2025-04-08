import { getConnection } from "@/utils/db";
import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth";
export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const connection = await getConnection();
        const id = params.id;
        const session = await getServerSession();
        if(!session || !session.user || !session.user.email) {
            NextResponse.json({"error": "Unauthorized Access", status: 401});
        }

        if(!id) {
            NextResponse.json({error: "Page id required", status: 400})
        }

        await connection.execute('DELETE FROM pages WHERE id = ?', [id]);
        connection.release();
        return NextResponse.json({message: "success", status: 204});
    } catch(error) {
        console.error(error)
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const connection = await getConnection();
        const id = params.id;
        const session = await getServerSession();
        if(!session || !session.user || !session.user.email) {
            NextResponse.json({"error": "Unauthorized Access", status: 401});
        }

        if(!id) {
            NextResponse.json({error: "Page id required", status: 400})
        }

        const [rows]: any = await connection.execute('SELECT * FROM pages WHERE id = ?', [id]);
        connection.release();
        return NextResponse.json(rows[0]);
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error", status: 500});
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const connection = await getConnection();
        const id = params.id;
        const session = await getServerSession();
        if(!session || !session.user || !session.user.email) {
            NextResponse.json({"error": "Unauthorized Access", status: 401});
        }

        if(!id) {
            NextResponse.json({error: "Page id required", status: 400})
        }

        const { title, content } = await req.json();
        console.log(title, content);
        await connection.execute('UPDATE pages SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        connection.release();
        return NextResponse.json({message: "success", status: 204});
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error", status: 500});
    }
}
