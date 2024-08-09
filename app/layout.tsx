import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "Chat With PDF",
  description:
    "This is app that you can upload a pdf file and then you can chat with it about it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={'min-h-screen h-screen overflow-hidden flex flex-col'}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
