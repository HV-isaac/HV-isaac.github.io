"use client";

import { useEffect, useRef } from "react";

/** Barra fina de progreso de lectura en el borde superior. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // `scaleX` en lugar de `width`: solo compone, no fuerza recálculo de
      // maquetación en cada fotograma del scroll.
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="no-print fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2"
      />
    </div>
  );
}
