import { Link } from "react-router-dom";
import { Logo } from "./Icons";
import {
  DOCS_URL,
  INSTALLER_DOCS_URL,
  REPO_URL,
  SINE_URL,
  VERSION,
  ZEN_URL,
} from "../data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo size={22} />
          <p>
            Zen Fluent {VERSION} · MIT license.
            <br />
            Not affiliated with Microsoft or Zen Browser.
          </p>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <div>
            <h2>Site</h2>
            <Link to="/">Overview</Link>
            <Link to="/mods">Features & mods</Link>
            <Link to="/docs">Documentation</Link>
            <Link to="/changelog">Changelog</Link>
          </div>
          <div>
            <h2>Project</h2>
            <a href={REPO_URL}>GitHub</a>
            <a href={`${DOCS_URL}/installation.md`}>Installation guide</a>
            <a href={INSTALLER_DOCS_URL}>Windows installer</a>
            <a href={`${REPO_URL}/issues`}>Report an issue</a>
          </div>
          <div>
            <h2>Built on</h2>
            <a href={ZEN_URL}>Zen Browser</a>
            <a href={SINE_URL}>Sine</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
