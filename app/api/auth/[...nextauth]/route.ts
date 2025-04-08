import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getConnection } from "@/utils/db";


export const authOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const response = await fetch("/api/auth/email/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                });

                if (response.ok) {
                    return await response.json();
                } else {
                    return null;
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
        
    ],
    callbacks: {
        async signIn({user}: any) {
            const connection = await getConnection();
            const [rows]: any = await connection.execute("SELECT * FROM users WHERE email = ?", [user.email]);
            if (rows.length === 0) {
                await connection.execute("INSERT INTO users (email, name, image_url) VALUES (?, ?, ?)", [user.email, user.name, user.image]);
            } else {
                const [savedUser]: any = await connection.execute('SELECT image_url from users WHERE email = ?', [user.email]);
                if(savedUser[0].image_url !== null) {
                    user.image = savedUser[0].image_url;
                }
            }
            connection.release();
            return user;
        }
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };