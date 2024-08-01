import { getServerSession } from "next-auth";
import { getConnection } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession();
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({"error": "Unauthorized Access!"})
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