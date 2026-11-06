"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShotsScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Show each arrow only when there is more to scroll in that direction
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    // images load after mount and change the scroll width, so watch sizes too
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="pj-shots-wrap">
      <div className="pj-shots" ref={ref}>
        {children}
      </div>
      <button
        type="button"
        className={`pj-shots-btn pj-shots-prev${canPrev ? " is-on" : ""}`}
        onClick={() => scroll(-1)}
        aria-label="Previous screenshot"
        tabIndex={canPrev ? 0 : -1}
      >
        <ChevronLeft size={26} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        className={`pj-shots-btn pj-shots-next${canNext ? " is-on" : ""}`}
        onClick={() => scroll(1)}
        aria-label="Next screenshot"
        tabIndex={canNext ? 0 : -1}
      >
        <ChevronRight size={26} strokeWidth={2.2} />
      </button>
    </div>
  );
}