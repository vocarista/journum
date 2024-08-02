import type { Metadata } from "next";
import SessionProvider from "../components/SessionProvider"
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { Session } from "next-auth";
import Navigation from "@/components/navbar/Navigation";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Journum",
  description: "Full Stack AI Journaling App, currently in development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>, session: Session) {
  return (
    <html lang="en">
      <body><SessionProvider session = {session}>
      <Theme accentColor="bronze" grayColor="sand" radius="small" panelBackground="translucent" appearance="dark">
        <Navigation />
        {children}
        <Toaster />
        </Theme>
        </SessionProvider></body>
    </html>
  );
}
