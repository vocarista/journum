import type { Metadata } from "next";
import SessionProvider from "../components/SessionProvider"
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { getServerSession, Session } from "next-auth";
import Navigation from "@/components/navbar/Navigation";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Journum",
  description: "Full Stack AI Journaling App, currently in development",
};

async function getSession() {
  const session = await getServerSession();
}

getSession();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>, session: Session) {
  return (
    <html lang="en">
      <body><SessionProvider session = {session}>
      <Theme accentColor="gold" grayColor="sand" radius="small" panelBackground="translucent" appearance="dark">
        
        <Navigation />
        {children}
        <Toaster />
        {/* <ThemePanel /> */}
        </Theme>
        </SessionProvider></body>
    </html>
  );
}
