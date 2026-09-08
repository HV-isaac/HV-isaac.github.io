"use client";

import { useReveal } from "@/hooks/useReveal";

type Tag = "div" | "li" | "article" | "section" | "p";

/**
 * Envuelve un bloque para que entre al hacer scroll.
 *
 * `as` existe porque el envoltorio tiene que ser el propio elemento de la lista
 * o de la rejilla: un `<div>` extra rompería la relación `<ul>`/`<li>` y
 * `display: contents` no serviría, porque la opacidad no se aplica a un elemento
 * sin caja.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Element = "div",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useReveal<HTMLElement>();

  return (
    <Element
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Element>
  );
}
