import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";

export const metadata: Metadata = {
  title: "BVR GLOBAL TECHNOLOGIES | Software That Moves Business Forward",
  description:
    "BVR GLOBAL TECHNOLOGIES Pvt. Ltd. builds modern websites and custom software solutions for startups and small businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}