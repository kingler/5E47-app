import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5E47 · Creator Infrastructure OS",
  description:
    "The operating system for the 5E47 creator infrastructure platform — residencies, studios, payments, access, analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg text-ink">{children}</body>
    </html>
  );
}
