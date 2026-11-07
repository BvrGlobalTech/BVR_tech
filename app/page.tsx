
import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BVR GLOBAL TECHNOLOGIES",
  alternateName: ["BVR GLOBAL", "BVR"],
  url: "https://bvrglobaltechnologies.com/",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Home />
    </>
  );
}
