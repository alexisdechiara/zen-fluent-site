import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Checkmark16Regular,
  ChevronLeft16Regular,
  ChevronRight12Regular,
  ChevronRight16Regular,
  Edit16Regular,
  Link16Regular,
} from "@fluentui/react-icons";
import { VERSION } from "../../data/site";
import { docPages, SITE_REPO_URL } from "./nav";

export function Breadcrumb({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="breadcrumb__item">
          {i > 0 && <ChevronRight12Regular aria-hidden />}
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Copies the page's address (with its anchor), as WinUI Gallery's link key. */
export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="button docs-tool"
      aria-label={copied ? "Link copied" : "Copy a link to this page"}
      title={copied ? "Copied" : "Copy link"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard refused: the address bar still has it */
        }
      }}>
      {copied ? <Checkmark16Regular /> : <Link16Regular />}
    </button>
  );
}

export function DocsHeader({
  title,
  icon,
  tools,
}: {
  title: string;
  icon?: ReactNode;
  tools?: ReactNode;
}) {
  return (
    <header className="docs-header">
      {icon && (
        <span className="docs-header__icon" aria-hidden>
          {icon}
        </span>
      )}
      <h1>{title}</h1>
      <div className="docs-header__tools">
        {tools}
        <CopyLinkButton />
      </div>
    </header>
  );
}

/** "On this page", with the section being read highlighted. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const ids = items.map((i) => i.id).join(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    ids.split(" ").forEach((id) => {
      const el = id && document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  if (items.length === 0) return <div className="toc" />;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">On this page</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : ""}
              aria-current={active === item.id ? "location" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Edit link, version, and the previous and next pages. */
export function DocsPager({ current }: { current: string }) {
  const index = docPages.findIndex((p) => p.to === current);
  const page = docPages[index];
  const prev = docPages[index - 1];
  const next = docPages[index + 1];
  return (
    <footer className="docs-footer">
      <div className="docs-footer__meta">
        {page && (
          <a href={`${SITE_REPO_URL}/blob/main/${page.source}`}>
            <Edit16Regular aria-hidden /> Edit this page on GitHub
          </a>
        )}
        <span>Zen Fluent {VERSION}</span>
      </div>
      <nav className="pager" aria-label="Pages">
        {prev ? (
          <Link className="pager__link" to={prev.to}>
            <small>
              <ChevronLeft16Regular aria-hidden /> Previous
            </small>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="pager__link pager__link--next" to={next.to}>
            <small>
              Next <ChevronRight16Regular aria-hidden />
            </small>
            {next.title}
          </Link>
        )}
      </nav>
    </footer>
  );
}

/** One docs page: the article, then "On this page" on wide screens. */
export function DocsPage({
  toc,
  children,
}: {
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="docs-page">
      <article className="docs-article">{children}</article>
      <Toc items={toc} />
    </div>
  );
}
