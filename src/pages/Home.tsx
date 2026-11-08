import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownload20Regular,
  ArrowRight16Regular,
  Checkmark16Regular,
  ChevronRight16Regular,
  Code20Regular,
} from "@fluentui/react-icons";
import { BrowserHotspots } from "../components/BrowserHotspots";
import { CompareSlider } from "../components/CompareSlider";
import { CopyField } from "../components/CopyField";
import { ModBadge } from "../components/ModBadge";
import { Reveal } from "../components/Reveal";
import { formatDate, releases } from "../data/changelog";
import { compare } from "../data/compare";
import { countOf, totalWithEnhanced, type Mod } from "../data/features";
import { compatibleMods } from "../data/mods";
import {
  ENHANCED_URL,
  INSTALLER_DOCS_URL,
  INSTALLER_URL,
  MICA_URL,
  REPO,
  SINE_URL,
  VERSION,
  ZEN_MIN_VERSION,
  ZEN_URL,
} from "../data/site";
import { useTheme } from "../theme";

/** Changelog counts always read in this order. */
const kindOrder = [
  "Added",
  "Changed",
  "Fixed",
  "Removed",
  "Deprecated",
  "Security",
];

/** A heading in two parts: the claim, then what follows it on its own line. */
function SplitHeading({ lead, rest }: { lead: string; rest: string }) {
  return (
    <>
      {lead} <span className="heading-rest">{rest}</span>
    </>
  );
}

const highlights: {
  title: string;
  text: string;
  image: string;
  /** The part of the screenshot the card zooms on. */
  focus: string;
  zoom: number;
  alt: string;
  mod: Mod;
  group: string;
}[] = [
  {
    title: "Mica, Mica Alt or Acrylic",
    text: "The Windows 11 material behind the whole window, tinted with your space's color.",
    image: "dark-mica-alt",
    focus: "0% 0%",
    zoom: 3.4,
    alt: "Zen Fluent with the Mica Alt material in dark mode",
    mod: "core",
    group: "look",
  },
  {
    title: "Or the Microsoft Edge look",
    text: "A second complete style: Edge's pill address bar, raised tabs and framed page.",
    image: "edge",
    focus: "0% 0%",
    zoom: 3.4,
    alt: "Zen Fluent's Microsoft Edge style",
    mod: "core",
    group: "look",
  },
  {
    title: "A URL bar like Windows'",
    text: "A WinUI text box or a pill; floating, it takes the material, your space's color or glass.",
    image: "urlbar",
    focus: "72% 11%",
    zoom: 1.85,
    alt: "The floating URL bar over a dimmed page",
    mod: "core",
    group: "urlbar",
  },
  {
    title: "Compact mode, done right",
    text: "The sidebar slides in over Acrylic and the page fills the whole window.",
    image: "compact",
    focus: "0% 0%",
    zoom: 2.9,
    alt: "Compact mode with the sidebar shown on hover",
    mod: "core",
    group: "sidebar",
  },
  {
    title: "A settings page like Windows Settings",
    text: "Every setting in Zen's settings, with themes, a drawing of the window and Sine's mods.",
    image: "settings-page",
    focus: "83% 17%",
    zoom: 1.43,
    alt: "Zen Fluent Enhanced's settings page",
    mod: "enhanced",
    group: "settings",
  },
  {
    title: "Quick Settings and presets",
    text: "Windows 11, Edge, Taskbar, Arc or Compact in one click, from Zen's Library.",
    image: "quick-settings",
    focus: "0% 0%",
    zoom: 2.6,
    alt: "Quick Settings in Zen's Library",
    mod: "enhanced",
    group: "settings",
  },
];

const mods: {
  mod: Mod;
  lead: string;
  rest: string;
  text: string;
  points: string[];
  link: string;
  linkLabel: string;
  image: string;
  alt: string;
}[] = [
  {
    mod: "core",
    lead: "Zen Fluent.",
    rest: "The whole look, in CSS.",
    text: "It applies as soon as Sine installs it, on Windows, Linux and macOS, and every part of it has its settings.",
    points: [
      "Mica, Mica Alt and Acrylic",
      "WinUI 3 or Microsoft Edge style",
      "Your accent, corners and density",
      "More than a hundred settings",
      "Each area can keep Zen's look",
      "Contrast themes, reduced motion",
    ],
    link: "/docs/features?mod=core",
    linkLabel: `All ${countOf("core")} Zen Fluent features`,
    image: "zen-corners-violet",
    alt: "Zen Fluent with Zen's corners and a violet accent",
  },
  {
    mod: "enhanced",
    lead: "Zen Fluent Enhanced.",
    rest: `All of the above, and ${countOf("enhanced")} extras.`,
    text: "Optional, for what CSS cannot do. It installs Zen Fluent with it, and each extra has its own switch.",
    points: [
      "A settings page, Quick Settings",
      "Site color, adaptive accent",
      "Hover cards, Ctrl+Tab as Alt+Tab",
      "Tab archiving, sleeping tabs",
      "Snap layouts, focus sessions",
      "Widgets, a start page",
    ],
    link: "/docs/features",
    linkLabel: `All ${totalWithEnhanced} Enhanced features`,
    image: "settings-page",
    alt: "Zen Fluent Enhanced's settings page in Zen's settings",
  },
];

export function Home() {
  const { theme } = useTheme();
  const pair = compare[theme] ?? compare.light;
  const [compareMissing, setCompareMissing] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="container hero__split">
          <h1 className="rise">
            The Windows&nbsp;11 look{" "}
            <span className="heading-rest">for Zen Browser</span>
          </h1>
          <div className="hero__aside rise" style={{ animationDelay: "80ms" }}>
            <p className="hero__lead">
              Zen Fluent redraws every part of Zen with Windows' own design:
              Mica and Acrylic backgrounds, WinUI controls, Fluent icons. Or the
              Microsoft Edge look.
            </p>
            <div className="hero__actions">
              <a
                className="button button--accent button--large"
                href={INSTALLER_URL}>
                <ArrowDownload20Regular /> Download for Windows
              </a>
              <a className="button button--large" href="#install">
                Other ways to install
              </a>
            </div>
            <p className="hero__note">
              Installs Zen Fluent and Enhanced · v{VERSION} · Free and open
              source
            </p>
          </div>
        </div>
        <div className="hero__window rise" style={{ animationDelay: "160ms" }}>
          <div className="aurora" aria-hidden />
          <div className="container hero__window-inner">
            <BrowserHotspots />
          </div>
        </div>
      </section>

      <section className="section section--statement" aria-label="In short">
        <div className="container">
          <Reveal as="p" className="statement">
            Not a new color scheme. Zen Fluent follows{" "}
            <mark className="chip chip--accent">WinUI's own rules</mark> for
            materials, controls, corners and motion in{" "}
            <mark className="chip">every part of the browser</mark> from the
            sidebar and tabs to menus, dialogs and Zen's own pages.
          </Reveal>
        </div>
      </section>

      {!compareMissing && (
        <section className="section" aria-labelledby="compare-title">
          <div className="container">
            <div className="section-head section-head--center">
              <h2 id="compare-title">
                <SplitHeading lead="Same Zen." rest="Drawn by Windows." />
              </h2>
              <p className="section-head__lead">
                Drag the handle to compare Zen's default look with Zen Fluent:
                same window, same tabs, same page.
              </p>
            </div>
            <Reveal className="compare-wrap">
              <CompareSlider
                key={theme}
                start={12}
                width={pair.width}
                height={pair.height}
                before={{
                  src: pair.before,
                  label: "Zen",
                  alt: "Zen Browser with its default look",
                }}
                after={{
                  src: pair.after,
                  label: "Zen + Zen Fluent",
                  alt: "The same window with Zen Fluent",
                }}
                onMissing={() => setCompareMissing(true)}
              />
              <ul className="compare-notes">
                <li>WinUI text box URL bar</li>
                <li>Accent pill on the selected tab</li>
                <li>Fluent icons</li>
                <li>WinUI cards for Essentials</li>
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="features-title">
              <SplitHeading
                lead="Every part of Zen, redrawn."
                rest="Down to the details."
              />
            </h2>
            <Link className="button" to="/docs/features">
              All {totalWithEnhanced} features <ArrowRight16Regular />
            </Link>
          </div>
          <ul className="highlights">
            {highlights.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                className="highlight"
                delay={(i % 3) * 60}>
                <Link
                  className="highlight__frame"
                  to={`/docs/features/${item.group}`}
                  aria-label={`${item.title}: learn more`}>
                  <span
                    className="highlight__shot"
                    style={
                      {
                        "--focus": item.focus,
                        "--zoom": item.zoom,
                      } as React.CSSProperties
                    }>
                    <img
                      src={`/shots/${item.image}.webp`}
                      alt={item.alt}
                      width={1280}
                      height={800}
                      loading="lazy"
                    />
                  </span>
                </Link>
                <div className="highlight__text">
                  <h3>
                    {item.title} <ModBadge mod={item.mod} />
                  </h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="The two mods">
        <div className="container feature-rows">
          {mods.map((item, i) => (
            <Reveal
              key={item.mod}
              className={`feature-row-split${i % 2 ? " is-flipped" : ""}`}>
              <div className="feature-row-split__text">
                <ModBadge mod={item.mod} />
                <h2>
                  <SplitHeading lead={item.lead} rest={item.rest} />
                </h2>
                <p>{item.text}</p>
                <ul className="capabilities">
                  {item.points.map((point) => (
                    <li key={point}>
                      <Checkmark16Regular aria-hidden /> {point}
                    </li>
                  ))}
                </ul>
                <Link className="link-arrow" to={item.link}>
                  {item.linkLabel} <ChevronRight16Regular />
                </Link>
              </div>
              <figure className="product-crop">
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

      <section className="section" id="install" aria-labelledby="install-title">
        <div className="container">
          <Reveal className="install-panel">
            <div className="install-panel__cell install-panel__intro">
              <h2 id="install-title">
                <SplitHeading
                  lead="Install in two minutes."
                  rest="On Windows, Linux and macOS."
                />
              </h2>
              <ul className="install-panel__facts">
                <li>
                  <strong>Zen {ZEN_MIN_VERSION} or later</strong>
                  Zen Browser or Zen Twilight.
                </li>
                <li>
                  <strong>Mica on Windows 11</strong>
                  Comes from <a href={MICA_URL}>Mica For Everyone</a>, with a
                  rule for Zen.
                </li>
                <li>
                  <strong>Blur on Linux and macOS</strong>
                  From your compositor.
                </li>
                <li>
                  <strong>Your other mods</strong>
                  <Link to="/mods#compatible">
                    {compatibleMods.length} popular mods checked
                  </Link>
                  .
                </li>
              </ul>
            </div>

            <div className="install-panel__cell">
              <span className="icon-tile" aria-hidden>
                <ArrowDownload20Regular />
              </span>
              <h3>The installer</h3>
              <p className="install-panel__kind">Recommended on Windows</p>
              <ol className="install__steps">
                <li>Close Zen and run ZenFluentSetup.exe.</li>
                <li>Pick Zen Browser or Zen Twilight, then a profile.</li>
                <li>Keep Zen Fluent Enhanced checked, or uncheck it.</li>
              </ol>
              <a className="button button--accent" href={INSTALLER_URL}>
                <ArrowDownload20Regular /> Download ZenFluentSetup.exe
              </a>
              <p className="install__note">
                Windows 10 and 11. It installs Sine too.{" "}
                <a href={INSTALLER_DOCS_URL}>What it does</a>
              </p>
            </div>

            <div className="install-panel__cell">
              <span className="icon-tile" aria-hidden>
                <Code20Regular />
              </span>
              <h3>By hand, with Sine</h3>
              <p className="install-panel__kind">Any system</p>
              <ol className="install__steps">
                <li>
                  Install <a href={ZEN_URL}>Zen Browser</a>, then{" "}
                  <a href={SINE_URL}>Sine</a>.
                </li>
                <li>
                  Zen settings › Sine Mods › install from GitHub:
                  <CopyField value={REPO} label="the Zen Fluent address" />
                </li>
                <li>
                  Gear on Zen Fluent's card ›{" "}
                  <strong>Allow the mod's icons</strong>.
                </li>
              </ol>
              <details className="install__more">
                <summary>Add Zen Fluent Enhanced</summary>
                <p>
                  Check <strong>JS from unofficial sources</strong> in Sine's
                  settings, then install:
                </p>
                <CopyField
                  value={ENHANCED_URL}
                  label="the Zen Fluent Enhanced address"
                />
              </details>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="latest-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="latest-title">
              <SplitHeading
                lead="The latest."
                rest="One version for both mods."
              />
            </h2>
            <Link className="button" to="/changelog">
              Changelog <ArrowRight16Regular />
            </Link>
          </div>
          <ul className="releases-row">
            {releases.slice(0, 3).map((release) => (
              <li key={release.version}>
                <Link
                  className="release-note"
                  to={{ pathname: "/changelog", hash: `#v${release.version}` }}>
                  <time dateTime={release.date}>
                    {formatDate(release.date)}
                  </time>
                  <h3>Version {release.version}</h3>
                  <p>
                    {[...release.sections]
                      .sort(
                        (a, b) =>
                          kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind),
                      )
                      .map((s) => `${s.count} ${s.kind.toLowerCase()}`)
                      .join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="aurora aurora--closing" aria-hidden />
        <div className="container closing__inner">
          <h2 id="closing-title">
            <SplitHeading lead="The Windows 11 look" rest="for Zen Browser" />
          </h2>
          <div className="hero__actions">
            <a
              className="button button--accent button--large"
              href={INSTALLER_URL}>
              <ArrowDownload20Regular /> Download for Windows
            </a>
            <Link className="button button--large" to="/docs">
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
