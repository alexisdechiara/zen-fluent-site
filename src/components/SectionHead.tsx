import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  children,
  align = "start",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "start" | "center";
  id?: string;
}) {
  return (
    <Reveal className={`section-head section-head--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-head__lead">{children}</p>}
    </Reveal>
  );
}
