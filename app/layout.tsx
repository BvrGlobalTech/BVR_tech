import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";

const SITE_URL = "https://bvrglobaltechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "BVR GLOBAL TECHNOLOGIES | Software That Moves Business Forward",
  description:
    "BVR GLOBAL TECHNOLOGIES Pvt. Ltd. builds modern websites and custom software solutions for startups and small businesses.",

  applicationName: "BVR Global Technologies",

  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    //apple: "/apple-icon.png", // remove this line if you don't have the file
  },

  openGraph: {
    siteName: "BVR Global Technologies",
    title: "BVR GLOBAL TECHNOLOGIES | Software That Moves Business Forward",
    description:
      "Modern websites and custom software solutions for startups and small businesses.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/og-image.png", // becomes https://bvrglobaltechnologies.com/og-image.png
        width: 1200,
        height: 630,
        alt: "BVR Global Technologies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BVR GLOBAL TECHNOLOGIES | Software That Moves Business Forward",
    description:
      "Modern websites and custom software solutions for startups and small businesses.",
    images: ["/og-image.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BVR Global Technologies",
    alternateName: ["BVR GLOBAL TECHNOLOGIES", "BVR Global"],
    url: `${SITE_URL}/`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BVR Global Technologies Private Limited",
    alternateName: "BVR GLOBAL TECHNOLOGIES",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon.png`,
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}