import {
  ArchiveArrowBack24Regular,
  Apps24Regular,
  CheckmarkCircle16Filled,
  ColorBackground24Regular,
  DocumentText16Regular,
  Open16Regular,
  Search24Regular,
  Settings24Regular,
  SlideLayout24Regular,
  Sparkle24Regular,
  Timer24Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { GitHubIcon } from "../components/Icons";
import { compatibleMods, docsAnchor } from "../data/mods";
import { DOCS_URL, ENHANCED_URL } from "../data/site";
import { CopyField } from "../components/CopyField";

const showcase = [
  {
    title: "The Microsoft Edge look",
    text: "A second complete style, from Edge and Fluent 2: a pill address bar, light cards for Essentials and the selected tab, and the page in its frame. Enhanced's Quick Settings switch between Windows 11 and Edge in one click.",
    image: "edge",
    alt: "Zen Browser in Zen Fluent's Microsoft Edge style",
    doc: "settings/appearance.md",
  },
  {
    title: "A URL bar that feels like Windows",
    text: "A WinUI text box with its accent line, or Edge's pill. Floating, it can be white or black, the window's material, your space's color or see-through glass, and the page behind it dims.",
    image: "urlbar",
    alt: "The floating URL bar over a dimmed page",
    doc: "settings/url-bar.md",
  },
  {
    title: "Compact mode, done right",
    text: "The sidebar slides in on hover with an Acrylic background, a hint shows where it hides, and the page can fill the whole window.",
    image: "compact",
    alt: "Compact mode with the sidebar shown on hover",
    doc: "settings/sidebar.md",
  },
  {
    title: "Split view and Glance",
    text: "Panes with WinUI corners and an accent outline on the active one; Glance opens over a dimmed page with round Acrylic buttons.",
    image: "split",
    alt: "Split view with two pages side by side",
    doc: "settings/window-and-menus.md",
  },
  {
    title: "Zen's Library in Fluent",
    text: "Downloads, history, spaces and media as WinUI lists, with Enhanced's Widgets, Focus and Quick settings as extra tabs.",
    image: "library",
    alt: "Zen's Library drawn as WinUI lists",
    doc: "settings/sidebar.md",
  },
  {
    title: "Settings for every part",
    text: "More than 200 settings in collapsible groups, in Sine's dialog or in Enhanced's own settings page: fills and shapes per component, Essentials, extensions row, animations, and an expert mode.",
    image: "sine",
    alt: "Zen Fluent's settings in Sine",
    doc: "settings/essentials.md",
  },
];

const enhanced = [
  {
    icon: Search24Regular,
    title: "Command Palette actions",
    text: "With the Zen Command Palette mod, every Zen Fluent setting, preset and panel from one search box.",
  },
  {
    icon: Apps24Regular,
    title: "Widgets and shelf",
    text: "The time, what plays, your downloads and a shelf for links, in the Library.",
  },
  {
    icon: Timer24Regular,
    title: "Focus sessions",
    text: "A timer that hides the sidebar, mutes tabs and blocks distracting sites.",
  },
  {
    icon: ColorBackground24Regular,
    title: "Site color",
    text: "The window takes a tint of the site you read, over your space's theme.",
  },
  {
    icon: SlideLayout24Regular,
    title: "Tab switcher and snap layouts",
    text: "Alt+Tab-like previews, and Windows' layouts for split view.",
  },
  {
    icon: ArchiveArrowBack24Regular,
    title: "Tab archive",
    text: "Tabs left alone are archived, ready to come back.",
  },
  {
    icon: Settings24Regular,
    title: "A real settings page",
    text: "Zen Fluent's settings drawn like Windows' Settings app, with themes and Sine's marketplace.",
  },
  {
    icon: Sparkle24Regular,
    title: "And more",
    text: "Hover cards, tab notes, a start page, a quick window, PDF and AI tools.",
  },
];

export function Mods() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="rise">Every part of Zen, redrawn</h1>
          <p
            className="page-hero__lead rise"
            style={{ animationDelay: "120ms" }}>
            Zen Fluent styles the whole browser: sidebar, tabs, Essentials, URL
            bar, menus, dialogs, settings and Zen's own tools.
          </p>
          <nav
            className="page-hero__jump rise"
            style={{ animationDelay: "180ms" }}
            aria-label="On this page">
            <a href="#look">The look</a>
            <a href="#enhanced">Enhanced</a>
            <a href="#compatible">Compatible mods</a>
          </nav>
        </div>
      </section>

      <section
        className="section section--tight"
        id="look"
        aria-label="The look">
        <div className="container showcase">
          {showcase.map((item, i) => (
            <Reveal
              key={item.title}
              className={`showcase__row${i % 2 ? " is-flipped" : ""}`}>
              <div className="showcase__text">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <a
                  className="link-arrow"
                  href={`${DOCS_URL}/${item.doc}`}
                  target="_blank"
                  rel="noreferrer">
                  Settings on GitHub <Open16Regular />
                </a>
              </div>
              <figure className="showcase__media">
                <img
                  src={`/shots/${item.image}.webp`}
                  alt={item.alt}
                  width={1280}
                  height={800}
                  loading="lazy"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="section section--band"
        id="enhanced"
        aria-labelledby="enhanced-title">
        <div className="container">
          <SectionHead title="Zen Fluent Enhanced" id="enhanced-title">
            Optional features on top of the look, in JavaScript. Each one has
            its own switch and leaves nothing behind when turned off.
          </SectionHead>
          <div className="enhanced-grid">
            {enhanced.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                className="card enhanced-card"
                delay={(i % 4) * 50}>
                <Icon className="enhanced-card__icon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <p className="section-cta">
            <Link className="button" to="/docs/features?mod=enhanced">
              Everything Enhanced adds, with its defaults
            </Link>
          </p>
          <Reveal className="enhanced-install">
            <p>
              Install it from Sine with this address, then turn on{" "}
              <strong>JS from unofficial sources</strong>:
            </p>
            <CopyField
              value={ENHANCED_URL}
              label="the Zen Fluent Enhanced address"
            />
          </Reveal>
        </div>
      </section>

      <section
        className="section"
        id="compatible"
        aria-labelledby="compatible-title">
        <div className="container">
          <SectionHead
            title={
              <>
                Works with{" "}
                <span className="count-pill">{compatibleMods.length}</span> mods
                you already use
              </>
            }
            id="compatible-title">
            Zen Fluent carries rules for these mods so they blend in. Install
            any of them from Sine's marketplace.
          </SectionHead>

          <ul className="mods-grid">
            {compatibleMods.map((mod, i) => (
              <Reveal
                as="li"
                key={mod.id}
                className="card compat-card"
                delay={(i % 3) * 50}>
                <div className="compat-card__head">
                  <span className="compat-card__avatar" aria-hidden>
                    {mod.name.replace(/^Zen\s*/i, "").charAt(0)}
                  </span>
                  <div>
                    <h3>{mod.name}</h3>
                    <a
                      className="compat-card__repo"
                      href={`https://github.com/${mod.repo}`}
                      target="_blank"
                      rel="noreferrer">
                      {mod.repo}
                    </a>
                  </div>
                  <span className="status">
                    <CheckmarkCircle16Filled />{" "}
                    {mod.status === "partial" ? "Works, with a limit" : "Works"}
                  </span>
                </div>
                <p className="compat-card__summary">{mod.summary}</p>
                <p className="compat-card__tested">
                  Checked with Zen Fluent {mod.tested.zenFluent} and {mod.name}{" "}
                  {mod.tested.version}
                </p>
                <div className="compat-card__links">
                  <a
                    href={`https://github.com/${mod.repo}`}
                    target="_blank"
                    rel="noreferrer">
                    <GitHubIcon size={14} /> The mod
                  </a>
                  <a
                    href={`${DOCS_URL}/compatibility.md#${docsAnchor(mod.name)}`}
                    target="_blank"
                    rel="noreferrer">
                    <DocumentText16Regular /> What Zen Fluent does
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="fine-print">
            A mod not listed has not been checked yet: it may work fine. Zen
            Fluent Enhanced's settings page shows the whole marketplace with
            each mod's status.
          </p>
        </div>
      </section>
    </>
  );
}
