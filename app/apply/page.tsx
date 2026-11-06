import type { Metadata } from "next";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply | BVR GLOBAL TECHNOLOGIES",
  description:
    "Explore opportunities at BVR GLOBAL TECHNOLOGIES. Share your skills and apply to work with our team.",
  alternates: {
    canonical: "/apply",
  },
};

export default function ApplyPage() {
  return <ApplyForm />;
}