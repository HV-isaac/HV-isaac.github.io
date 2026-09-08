import { PrintResume } from "@/components/PrintResume";
import { en } from "@/content/en";
import { printMetadata } from "@/lib/metadata";

export const metadata = printMetadata(en);

export default function Page() {
  return <PrintResume data={en} />;
}
