/**
 * Encabezado y contenedor comunes de cada sección.
 *
 * El título se repite en una barra pegajosa translúcida solo en móvil: en
 * escritorio esa función ya la cumple el índice lateral.
 *
 * La animación de entrada no se aplica aquí sino elemento a elemento dentro de
 * cada sección: un bloque entero apareciendo de golpe se siente tosco, y
 * escalonarlo guía la lectura.
 */
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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 py-14 first:pt-0">
      <div className="sticky top-0 z-20 -mx-6 mb-8 bg-bg/80 px-6 py-4 backdrop-blur lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <h2
          id={`${id}-title`}
          className="font-mono text-xs uppercase tracking-[0.22em] text-muted"
        >
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

/** Etiqueta de tecnología. */
export function Tag({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  const styles =
    tone === "accent"
      ? "border-accent/30 bg-accent-soft text-accent"
      : "border-border text-muted";

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[12.5px] leading-none ${styles}`}>
      {children}
    </span>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
      {items.map((item) => (
        <li key={item} className="relative pl-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.62em] size-1.5 rounded-full bg-gradient-to-br from-accent to-accent-2"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
