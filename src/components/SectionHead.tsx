import type { ReactNode } from "react";

export function SectionHead({
  title,
  children,
  align = "start",
  id,
}: {
  title: ReactNode;
  children?: ReactNode;
  align?: "start" | "center";
  id?: string;
}) {
  return (
    <div className={`section-head section-head--${align}`}>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-head__lead">{children}</p>}
    </div>
  );
}
