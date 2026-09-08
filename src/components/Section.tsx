export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8 print:pt-5">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted print:mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Etiqueta de tecnología. Se usa en experiencia, proyectos y habilidades. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border px-2 py-0.5 text-[13px] text-muted print:border-neutral-300">
      {children}
    </span>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-muted print:mt-1 print:space-y-1">
      {items.map((item) => (
        <li key={item} className="relative pl-4">
          <span aria-hidden="true" className="absolute left-0 top-[0.6em] size-1 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}
