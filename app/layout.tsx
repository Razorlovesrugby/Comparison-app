import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "The Cultural Rosetta Stone",
  description: "Translate any news event into a culturally-specific analogy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full`}>
      <body className="bg-zinc-950 text-white min-h-screen font-[var(--font-plus-jakarta-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
