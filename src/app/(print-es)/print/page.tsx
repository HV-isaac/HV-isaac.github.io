import { PrintResume } from "@/components/print/PrintResume";
import { es } from "@/content/es";
import { printMetadata } from "@/lib/metadata";

export const metadata = printMetadata(es);

export default function Page() {
  return <PrintResume data={es} />;
}
