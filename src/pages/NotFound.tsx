import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="page-hero page-hero--center">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page is not here</h1>
        <p className="page-hero__lead">
          The link may be old, or the page moved.
        </p>
        <Link className="button button--accent" to="/">
          Back to the overview
        </Link>
      </div>
    </section>
  );
}
