/**
 * Luz de fondo del encabezado. Puramente decorativo, así que no lo ve ningún
 * lector de pantalla y se queda fijo detrás del contenido.
 */
export function Aurora() {
  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="aurora left-[-10%] top-[-14%] size-[38rem] bg-accent/25 dark:bg-accent/40"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora right-[-14%] top-[6%] size-[32rem] bg-accent-2/20 dark:bg-accent-2/35"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="aurora bottom-[-16%] left-[22%] size-[34rem] bg-accent/15 dark:bg-accent-2/25"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}
