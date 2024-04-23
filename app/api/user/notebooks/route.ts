import { getConnection } from "@/utils/db";
import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
    try {
        const connection = await getConnection();
        const session = await getServerSession();
        const [rows] = await connection.execute("SELECT * FROM notebooks WHERE user_email = ?", [session?.user?.email]);
        connection.release();
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
      const connection = await getConnection();
      const session = await getServerSession();
  
      if (!session || !session.user || !session.user.email) {
        // Handle unauthorized access (e.g., return 401 response)
        throw new Error('Unauthorized access');
      }
  
      const body = await req.json();
      const { title, description } = body
      console.log(req);
  
      // Validate title and description (optional, based on your requirements)
      if (!title || !description) {
        throw new Error('Missing required fields: title or description');
      }
  
      // Retrieve user ID using prepared statement for security
      const [result]: any = await connection.execute(
        "SELECT id FROM users WHERE email = ?",
        [session?.user?.email]
      );
  
      if (!result.length) {
        // Handle non-existent user (e.g., return 404 response)
        throw new Error('User not found');
      }
  
      const userId = result[0].id;
  
      // Insert notebook data using prepared statement for security
      const [rows]: any = await connection.execute(
        "INSERT INTO notebooks (user_id, user_email, title, description) VALUES (?, ?, ?, ?)",
        [userId, session?.user?.email, title, description]
      );
  
      connection.release();
      return NextResponse.json({ success: true, id: rows.id }); // Include inserted ID
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


  export async function DELETE(req: NextRequest) {
    try {
        const connection = await getConnection();
        const session = await getServerSession();
        if (!session || !session.user || !session.user.email) {
            throw new Error('Unauthorized access');
        }
        const body = await req.json();
        const { id } = body;
        console.log(body)
        const [rows] = await connection.execute("DELETE FROM notebooks WHERE id = ?", [id]);
        connection.release();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }