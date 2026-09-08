import { RootHtml } from "@/components/RootHtml";

export default function PrintEnLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml lang="en" theme={false}>
      {children}
    </RootHtml>
  );
}
