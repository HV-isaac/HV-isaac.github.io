import { RootHtml } from "@/components/RootHtml";

// Sin script de tema: el PDF se genera siempre en claro.
export default function PrintEsLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml lang="es" theme={false}>
      {children}
    </RootHtml>
  );
}
