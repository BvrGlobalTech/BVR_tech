"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SlideArt, { type ArtKind } from "./SlideArt";

type Slide = {
  tag: string;
  title: string;
  text: string;
  points: string[];
  bg: string;
  art: ArtKind;
  /* Optional: put a real photo in /public (e.g. "/work/site.jpg") and set it here.
     When set, it replaces the illustration for that slide. */
  image?: string;
  imageAlt?: string;
};

// Real capabilities from your services. No invented clients or numbers.
const slides: Slide[] = [
  {
    tag: "BUSINESS WEBSITES",
    title: "Websites that make your offer clear",
    text: "Fast, responsive sites that explain what you do and make it easy for customers to get in touch.",
    points: ["Responsive design", "Clear structure", "Enquiry flow"],
    bg: "linear-gradient(135deg,#4f63ee,#a58bff)",
    art: "website",
  },
  {
    tag: "WEB APPLICATIONS",
    title: "Web apps your customers can use",
    text: "Interactive products with accounts, dashboards and the features your users actually need.",
    points: ["Dashboards", "User accounts", "Database-backed"],
    bg: "linear-gradient(135deg,#6335ba,#6c83ff)",
    art: "webapp",
  },
  {
    tag: "BUSINESS TOOLS",
    title: "Internal tools that save time",
    text: "Replace spreadsheets and manual steps with software built around the way your team works.",
    points: ["Admin panels", "Reports", "Role-based access"],
    bg: "linear-gradient(135deg,#1fa38f,#4f63ee)",
    art: "tools",
  },
  {
    tag: "WORKFLOW & API",
    title: "Systems that connect your work",
    text: "Workflow platforms and API integrations that keep your tools and data working together.",
    points: ["Workflow systems", "API integration", "Management platforms"],
    bg: "linear-gradient(135deg,#e07a5f,#f2cc8f)",
    art: "workflow",
  },
];

const GAP = 22;
const stepOf = (t: HTMLDivElement) => {
  const first = t.firstElementChild as HTMLElement | null;
  return first ? first.getBoundingClientRect().width + GAP : 1;
};

export default function WorkSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollTo({ left: Math.min(i * stepOf(t), t.scrollWidth - t.clientWidth), behavior: "smooth" });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const t = trackRef.current;
      if (!t) return;
      const atEnd = t.scrollLeft >= t.scrollWidth - t.clientWidth - 4;
      const atStart = t.scrollLeft <= 4;
      if (dir > 0 && atEnd) return goTo(0);
      if (dir < 0 && atStart) return goTo(slides.length - 1);
      goTo(Math.round(t.scrollLeft / stepOf(t)) + dir);
    },
    [goTo]
  );

  // The glow in each slide's artwork follows the cursor
  const spot = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (t) setActive(Math.min(Math.round(t.scrollLeft / stepOf(t)), slides.length - 1));
  };

  // Autoplay: pauses on hover/focus/touch, skipped for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) go(1);
    }, 5000);
    return () => clearInterval(id);
  }, [go]);

  // Mouse drag (touch uses native swipe)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const t = trackRef.current!;
    drag.current = { down: true, startX: e.clientX, startLeft: t.scrollLeft };
    t.style.scrollSnapType = "none";
    t.style.scrollBehavior = "auto";
    t.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    trackRef.current!.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    const t = trackRef.current!;
    t.style.scrollSnapType = "";
    t.style.scrollBehavior = "";
    goTo(Math.round(t.scrollLeft / stepOf(t)));
  };

  return (
    <section className="work section-pad" id="work">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">WHAT WE BUILD</div>
            <h2>
              Built around <span>your business.</span>
            </h2>
          </div>
          <p>The kinds of solutions we create. Swipe, drag or use the arrows.</p>
        </div>

        <div
          className="slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="What we build"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocus={() => (paused.current = true)}
          onBlur={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
          onTouchEnd={() => (paused.current = false)}
        >
          <div
            className="slides-track"
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {slides.map((s) => (
              <article className="slide" key={s.tag}>
                <div className="slide-visual" onMouseMove={spot}>
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.imageAlt ?? s.title}
                      fill
                      sizes="(max-width: 850px) 90vw, 560px"
                    />
                  ) : (
                    <SlideArt kind={s.art} />
                  )}
                </div>
                <div className="slide-body">
                  <span className="slide-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <div className="slide-points">
                    {s.points.map((p) => <span key={p}>{p}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="slider-controls">
            <div className="slider-dots">
              {slides.map((s, i) => (
                <button
                  key={s.tag}
                  type="button"
                  className={i === active ? "slider-dot active" : "slider-dot"}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="slider-arrows">
              <button type="button" className="slider-arrow" aria-label="Previous slide" onClick={() => go(-1)}>
                <ArrowLeft size={18} />
              </button>
              <button type="button" className="slider-arrow" aria-label="Next slide" onClick={() => go(1)}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}