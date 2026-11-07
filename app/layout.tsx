import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bvrglobaltechnologies.com"),

  title: "BVR GLOBAL TECHNOLOGIES | Software That Moves Business Forward",

  description:
    "BVR GLOBAL TECHNOLOGIES Pvt. Ltd. builds modern websites and custom software solutions for startups and small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BVR GLOBAL TECHNOLOGIES PRIVATE LIMITED",
      "alternateName": "BVR GLOBAL TECHNOLOGIES",
      "url": "https://bvrglobaltechnologies.com/",
      "logo": "https://bvrglobaltechnologies.com/icon.png"
    })
  }}
/>
        {children}</body>
    </html>
  );
}