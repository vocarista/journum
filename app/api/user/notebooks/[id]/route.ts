import { getServerSession } from "next-auth";
import { getConnection } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession();
        if (!session || !session.user || !session.user.email) {
            return NextResponse.error();
        }
        const notebookId = params.id;
        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM notebooks WHERE id = ?", [notebookId]);
        connection.release()
        return NextResponse.json(rows);
    } catch(error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: {id: number} }) {
    try{
        const session = await getServerSession();
        if(!session || !session.user || !session.user.email) {
            return NextResponse.error();
        }
        const body = await req.json();
        const { title, description } = body;
        const notebookId = params.id;
        const connection = await getConnection();
        const [result] = await connection.execute('UPDATE notebooks SET title = ?, description = ? WHERE id = ?', [title, description, notebookId]);
        connection.release();
        return NextResponse.json({ message: "Notebook updated successfully!" })
    } catch(error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    try{
        const session = await getServerSession();
        if(!session || !session.user || !session.user.email) {
            return NextResponse.error();
        }
        const notebookId = params.id;
        const connection = await getConnection();
        const [rows] = await connection.execute('DELETE FROM notebooks WHERE id = ?', [notebookId]);
        connection.release();
        return NextResponse.json({ message: "Notebook deleted successfully!" })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}