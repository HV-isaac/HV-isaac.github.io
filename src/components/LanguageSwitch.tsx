import Link from "next/link";
import { localePath, otherLocale } from "@/lib/site";
import type { ResumeData } from "@/content/types";

/** Enlace puro entre las dos versiones estáticas: sin estado ni JavaScript. */
export function LanguageSwitch({ data }: { data: ResumeData }) {
  const target = otherLocale(data.locale);

  return (
    <Link
      href={localePath[target]}
      hrefLang={target}
      aria-label={data.ui.switchLanguage}
      title={data.ui.switchLanguage}
      className="grid h-9 min-w-9 place-items-center rounded-full border border-border px-3 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {data.ui.switchLanguageShort}
    </Link>
  );
}
