import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Motion from "@/components/Motion";
import ProjectArt, { AlgoArt } from "@/components/ProjectArt";
import ProjectCard from "@/components/ProjectCard";
import { SubFooter, SubHeader } from "@/components/SubChrome";
import { projects } from "../data";
import "../projects.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} | BVR Global Technologies`, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const others = projects.filter((p) => p.slug !== slug);

  return (
    <main className="pj-page">
      <Motion />
      <SubHeader href="/projects" label="All projects" />

      <section className="pj-section pj-first">
        <div className="container">
          <article className="pj-showcase pj-reveal">
            <div className="pj-showcase-body">
              <div className="pj-meta">
                <span className="pj-tag">{`PROJECT ${String(index + 1).padStart(2, "0")}`}</span>
                <span className="pj-type">{project.category}</span>
              </div>
              <h1 className="pj-title">{project.title}</h1>
              <p className="pj-lead">{project.description}</p>
              {project.roles && (
                <div className="pj-roles">
                  {project.roles.map((r) => <span key={r}><i />{r}</span>)}
                </div>
              )}

                  {project.links && (project.links.live || project.links.github || project.links.apk) && (
                <div className="pj-links">
                  {project.links.live && (
                    <a
                      className="button button-primary"
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      className="button"
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View code <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.links.apk && (
                    <a className="button button-primary" href={project.links.apk} download>
                      Download APK <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="pj-visual"><ProjectArt kind={project.art} /></div>
          </article>
        </div>
      </section>

      <section className="pj-section pj-overview">
        <div className="container pj-overview-grid">
          <div className="pj-reveal">
            <div className="section-kicker">PROJECT OVERVIEW</div>
            <h2 className="pj-h2">What it&apos;s <span>about.</span></h2>
          </div>
          <div className="pj-reveal">
            {project.overview.map((para) => <p key={para}>{para}</p>)}
          </div>
        </div>
      </section>

      {project.features.length > 0 && (
        <section className="pj-section">
          <div className="container">
            <div className="pj-reveal">
              <div className="section-kicker">KEY FEATURES</div>
              <h2 className="pj-h2">What it <span>does.</span></h2>
            </div>
            <div className="pj-features">
              {project.features.map(({ icon: Icon, title, text }) => (
                <div className="pj-feature pj-reveal" key={title}>
                  <span className="pj-icon"><Icon size={22} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.approaches && project.approaches.length > 0 && (
        <section className="pj-section">
          <div className="container">
            <div className="pj-reveal">
              <div className="section-kicker">SMART SCHEDULING</div>
              <h2 className="pj-h2">Three approaches, <span>one timetable.</span></h2>
            </div>
            <div className="pj-algos">
              {project.approaches.map((a) => (
                <div className="pj-algo pj-reveal" key={a.title}>
                  <div className="pj-algo-art"><AlgoArt kind={a.kind} /></div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="pj-section">
          <div className="container">
            <div className="pj-reveal">
              <div className="section-kicker">SCREENSHOTS</div>
              <h2 className="pj-h2">See it <span>in action.</span></h2>
            </div>
            <div className="pj-shots">
              {project.screenshots.map((s) => (
                <figure className="pj-shot pj-reveal" key={s.alt}>
                  <Image src={s.src} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 560px" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pj-section">
        <div className="container">
          <div className="pj-reveal">
            <div className="section-kicker">TECHNOLOGY STACK</div>
            <h2 className="pj-h2">Built <span>with.</span></h2>
          </div>
          <div className="pj-stack">
            {project.stack.map((g) => (
              <div className="pj-stack-group pj-reveal" key={g.label}>
                <b>{g.label}</b>
                <div>{g.items.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="pj-section">
          <div className="container">
            <div className="pj-reveal">
              <div className="section-kicker">MORE WORK</div>
              <h2 className="pj-h2">Other <span>projects.</span></h2>
            </div>
            <div className="pj-list pj-more">
              {others.map((p) => (
                <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pj-section pj-last">
        <div className="container">
          <div className="pj-cta pj-reveal">
            <div className="section-kicker">HAVE A PROJECT IN MIND?</div>
            <h2>Let&apos;s build something <span>that moves you forward.</span></h2>
            <Link className="button button-light" href="/#contact">
              Start a conversation <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <SubFooter />
    </main>
  );
}