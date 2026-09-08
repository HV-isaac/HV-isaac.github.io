import { Resume } from "@/components/Resume";
import { es } from "@/content/es";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(es);

export default function Page() {
  return <Resume data={es} />;
}
