import { Resume } from "@/components/Resume";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(en);

export default function Page() {
  return <Resume data={en} />;
}
