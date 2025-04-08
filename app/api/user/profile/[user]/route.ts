import { getConnection } from "@/utils/db";
import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { params }: { params: { user: string } }) {
    try {
        const session = await getServerSession();
        const paramEmail = params.user;
        if (!session || session?.user?.email !== paramEmail) {
            throw new Error("Unauthorized access.");
        }

        const connection = await getConnection();
        const [result]: any[] = await connection.execute('SELECT id, email, name, image_url FROM users where email = ?', [paramEmail]);
        if(result.length === 0) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        console.log(result);
        connection.release();
        return NextResponse.json(result[0]);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}