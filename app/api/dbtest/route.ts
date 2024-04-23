import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/utils/db';


export async function GET(req: NextRequest) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM users');
        connection.release();
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}