import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Lorens — Full-Stack Web Developer",
  description: "Interactive 3D portfolio of John Lorens, Full-Stack Web Developer and BSIT student.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
