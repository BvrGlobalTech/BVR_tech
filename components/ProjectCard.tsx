import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectArt from "./ProjectArt";
import type { Project } from "@/app/projects/data";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="pj-card pj-reveal">
      <div className="pj-card-visual">
        <ProjectArt kind={project.art} />
      </div>
      <div className="pj-card-body">
        <div className="pj-card-top">
          <span className="pj-tag">{project.category}</span>
          <span className="pj-card-num">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="pj-card-tags">
          {project.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
        <span className="pj-card-go">View project <ArrowUpRight size={16} /></span>
      </div>
    </Link>
  );
}