import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import "./animations.css";
const GA_ID = "G-DJCTKW4ZJ7";

const SITE_URL = "https://bvrglobaltechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "BVR GLOBAL TECHNOLOGIES | Software That Moves Business Forward",
  description:
    "BVR GLOBAL TECHNOLOGIES Pvt. Ltd. builds modern websites and custom software solutions for startups and small businesses.",

  applicationName: "BVR Global Technologies",

 icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
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
        url: "/og-image.jpg", // becomes https://bvrglobaltechnologies.com/og-image.png
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
    images: ["/og-image.jpg"],
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
       <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}