// import { getConnection } from '@/utils/db'
// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth';

// export async function UPDATE(req: NextRequest) {
//     try {
//         const connection = await getConnection();
//         const { email, name } = req.body;
//         const session = await getServerSession();
//         const [rows] = await connection.execute('UPDATE users SET name = ?, email = ? WHERE email = ?', [body?.name, body?.email, session?.user?.email]);
//     }
// }