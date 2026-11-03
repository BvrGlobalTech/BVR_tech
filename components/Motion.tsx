"use client";

import { useEffect } from "react";

// [selector, classes added for the reveal animation]
const TARGETS: [string, string][] = [
  [".intro-grid > *", "reveal"],
  [".section-heading > *", "reveal"],
  [".service-card", "reveal"],
  [".process-card", "reveal"],
  [".why-visual", "reveal from-left"],
  [".why-copy", "reveal from-right"],
  [".why-points > div", "reveal"],
  [".stack-inner > *", "reveal"],
  [".tech-list span", "reveal zoom"],
  [".faq-grid > *", "reveal"],
  [".faq-item", "reveal"],
  [".founder-portrait", "reveal from-left"],
  [".founder-details", "reveal from-right"],
  [".cofounders-title", "reveal"],
  [".cofounder", "reveal zoom"],
  [".pj-reveal", "reveal"],
  [".project-card", "reveal"],
  [".projects-cta", "reveal"],
  [".contact-box", "reveal zoom"],
  [".slider", "reveal"],
  [".footer-main > *", "reveal"],
];

export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
    const timers: number[] = [];
    root.classList.add("js");

    /* ---------- Scroll reveal ---------- */
    const show = (el: HTMLElement) => {
      el.classList.add("in");
      if (el.classList.contains("reveal")) {
        // Strip reveal classes afterwards so the element's own hover styles work again
        timers.push(
          window.setTimeout(() => {
            el.classList.remove("reveal", "from-left", "from-right", "zoom");
            el.style.removeProperty("--d");
          }, 1500)
        );
      }
    };

    const watched: HTMLElement[] = [];
    TARGETS.forEach(([selector, classes]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
        // Already on screen at load: leave it alone (avoids a flash)
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
          el.classList.add("in");
          return;
        }
        el.classList.add(...classes.split(" "));
        el.style.setProperty("--d", `${Math.min(i * 90, 450)}ms`);
        watched.push(el);
      });
    });
    document.querySelectorAll<HTMLElement>(".why-panel").forEach((el) => watched.push(el));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    watched.forEach((el) => io.observe(el));

    /* ---------- Scroll progress bar + header shrink ---------- */
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    const header = document.querySelector<HTMLElement>(".site-header");

    let ticking = false;
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      header?.classList.toggle("scrolled", window.scrollY > 40);
      ticking = false;
    };
    const onScrollRaf = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    onScroll();

    /* ---------- Hero mouse parallax (desktop pointers only) ---------- */
    const hero = document.querySelector<HTMLElement>(".hero");
    const core = document.querySelector<HTMLElement>(".visual-core");
    const orbs = document.querySelectorAll<HTMLElement>(".hero .orb");
    const onMove = (e: MouseEvent) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (core) core.style.transform = `rotate(-10deg) translate(${x * 26}px, ${y * 26}px)`;
      orbs.forEach((o, i) => {
        o.style.translate = `${-x * (30 + i * 20)}px ${-y * (30 + i * 20)}px`;
      });
    };
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (hero && finePointer) hero.addEventListener("mousemove", onMove);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScrollRaf);
      hero?.removeEventListener("mousemove", onMove);
      bar.remove();
    };
  }, []);

  return null;
}