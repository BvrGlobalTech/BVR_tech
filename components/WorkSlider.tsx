"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
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
    tag: "WEBSITE DEVELOPMENT",
    title: "Websites that make your offer clear",
    text: "Fast, responsive websites that communicate what you do and make it simple for customers to get in touch.",
    points: ["Responsive design", "Search optimization", "High performance"],
    bg: "linear-gradient(135deg,#4f63ee,#a58bff)",
    art: "website",
  },
  {
    tag: "MOBILE APPLICATIONS",
    title: "Mobile apps for iOS and Android",
    text: "Reliable, user-focused apps that deliver a consistent experience across devices.",
    points: ["Cross-platform", "Personalization", "Secure data"],
    bg: "linear-gradient(135deg,#6335ba,#6c83ff)",
    art: "webapp", // swap to "mobile" if you add one to SlideArt
  },
  {
    tag: "CUSTOM SOFTWARE",
    title: "Software tailored to your business",
    text: "Solutions aligned with your processes, helping you improve efficiency and scale with confidence.",
    points: ["Process automation", "API integration", "Scalable systems"],
    bg: "linear-gradient(135deg,#1fa38f,#4f63ee)",
    art: "workflow",
  },
  {
    tag: "AI INTEGRATIONS",
    title: "AI that fits into your product",
    text: "We add practical AI features to your website, app or internal software, so your team saves time and your customers get answers faster.",
    points: ["Chat assistants", "Workflow automation", "Smart search and insights"],
    bg: "linear-gradient(135deg,#c4488f,#6c83ff)",
    art: "workflow", // reuses the workflow artwork; see note about adding an "ai" kind to SlideArt
  },
];

const GAP = 22;
const AUTOPLAY_DELAY = 9000; // first slide stays put long enough to make the first impression
const AUTOPLAY_EVERY = 5000;

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

  // Autoplay: waits before the first move, pauses on hover/focus/touch, skipped for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: number | undefined;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        if (!paused.current && !document.hidden) go(1);
      }, AUTOPLAY_EVERY);
    }, AUTOPLAY_DELAY);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
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
                    {s.points.map((p) => (
                      <span key={p}>
                        <Check size={20} strokeWidth={2.8} />
                        {p}
                      </span>
                    ))}
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