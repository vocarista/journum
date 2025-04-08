// Route to upload a profile image for a user on GCS

import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/utils/db";
import { getServerSession } from "next-auth";
import { Storage } from '@google-cloud/storage';
const { v4: uuidv4 } = require('uuid');
import { fileTypeFromBuffer } from "file-type";

const storage = new Storage({
    projectId: process.env.GCS_project_id,
    credentials: {
        client_email: process.env.GCS_client_email,
        private_key: process.env.GCS_private_key?.replace(/\\n/g, '\n'),
    }
})

const bucket = storage.bucket("user_image_bucket_1");

export async function PATCH(req: NextRequest) {
    const session = await getServerSession();
    const connection = await getConnection();
    if(!session || !session.user) {
        throw new Error("Invalid Session.")
    }
    try {
        const data = await req.formData();
        const file: File | null = data.get("file") as File;
        const name: string | null = data.get("name") as string;
        let publicUrl: string | null = null;
        if(file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const type = await fileTypeFromBuffer(buffer);
            if(!type) {
                return NextResponse.json({success: false});
            }
            const filename = `${uuidv4()}.${type.ext}`
            const fileUpload = bucket.file(filename);

            await fileUpload.save(buffer, {
                contentType: type.mime
            });

            publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
            const [rows]: any[] = await connection.execute('SELECT image_url FROM users WHERE email = ?', [session.user.email]);
            if(rows[0].image_url) {
                const existingFile = bucket.file(rows[0].image_url.split('/').pop());
                const exists = await existingFile.exists();
                if(exists[0]) {
                    await existingFile.delete();
                }
            }
            await connection.execute('UPDATE users SET image_url = ? WHERE email = ?', [publicUrl, session.user.email]);
            session.user.image = publicUrl;
        }

        if(name) {
            await connection.execute('UPDATE users SET name = ? WHERE email = ?', [name, session.user.email]);
        }
        return NextResponse.json({success: true});
    } catch(e) {
        console.error(e);
        return NextResponse.json({success: false});
    } finally {
        connection.release();
    }

}