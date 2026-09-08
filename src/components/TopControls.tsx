import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { ResumeData } from "@/content/types";

export function TopControls({ data }: { data: ResumeData }) {
  return (
    <div className="no-print fixed right-4 top-4 z-40 flex gap-2 rounded-full border border-border bg-surface/70 p-1 backdrop-blur sm:right-6 sm:top-6">
      <LanguageSwitch data={data} />
      <ThemeToggle label={data.ui.toggleTheme} />
    </div>
  );
}
