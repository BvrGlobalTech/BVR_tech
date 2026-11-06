import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Motion from "@/components/Motion";
import ProjectCard from "@/components/ProjectCard";
import { SubFooter, SubHeader } from "@/components/SubChrome";
import { projects } from "./data";
import "./projects.css";

export const metadata: Metadata = {
  title: "Projects | BVR GLOBAL TECHNOLOGIES",
  description:
    "A selection of projects built by BVR GLOBAL TECHNOLOGIES for startups and small businesses.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="pj-page">
      <Motion />
      <SubHeader />

      <section className="pj-hero">
        <span className="pj-grid" />
        <span className="orb orb-one" />
        <div className="container">
          <div className="section-kicker">OUR WORK</div>
          <h1>Projects that turn <span>ideas into reality.</span></h1>
          <p>
            Explore our work, where technology meets creativity to build meaningful digital experiences.
          </p>
        </div>
      </section>

      <section className="pj-section">
        <div className="container">
          <div className="pj-list">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="pj-section pj-last">
        <div className="container">
          <div className="pj-cta pj-reveal">
            <div className="section-kicker">HAVE A PROJECT IN MIND?</div>
            <h2>Let&apos;s build something <span>that moves you forward.</span></h2>
            <Link className="button button-light" href="/#contact">
              Let's Connect <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <SubFooter />
    </main>
  );
}