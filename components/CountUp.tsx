"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;      // e.g. "10+", "02+", "15"
  duration?: number;  // ms
};

export default function CountUp({ value, duration = 1800 }: Props) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const digits = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(digits);

  const ref = useRef<HTMLSpanElement>(null);
  // Start at the final value so server HTML and first client render always match
  const [count, setCount] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !digits) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;

    // Reset to 0 only after hydration, then animate when visible
    setCount(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [digits, target, duration]);

  if (!match) return <>{value}</>;

  return (
    <span ref={ref} className="count-up">
      {prefix}
      {String(count).padStart(digits.length, "0")}
      {suffix}
    </span>
  );
}