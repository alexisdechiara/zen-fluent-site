import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AccessibilityCheckmark24Regular,
  ArrowDownload20Regular,
  ArrowRight16Regular,
  ArrowRight20Regular,
  Code24Regular,
  DesignIdeas24Regular,
  Options24Regular,
  PaintBrush24Regular,
} from "@fluentui/react-icons";
import { BrowserHotspots } from "../components/BrowserHotspots";
import { CompareSlider } from "../components/CompareSlider";
import { CopyField } from "../components/CopyField";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { compare } from "../data/compare";
import { compatibleMods } from "../data/mods";
import {
  ENHANCED_URL,
  MICA_URL,
  REPO,
  SINE_URL,
  VERSION,
  ZEN_URL,
  ZEN_VERSION,
} from "../data/site";
import { useTheme } from "../theme";

const reasons = [
  {
    icon: PaintBrush24Regular,
    title: "Mica, Mica Alt, Acrylic",
    text: "The real Windows 11 materials (through Mica For Everyone), tinted like WinUI apps, with your space's colors on top.",
  },
  {
    icon: DesignIdeas24Regular,
    title: "WinUI 3 or Microsoft Edge",
    text: "Two complete looks: WinUI controls, corners and accent lines, or Edge's pill address bar and framed page.",
  },
  {
    icon: Options24Regular,
    title: "More than 200 settings",
    text: "Every part has its options, from Essentials to the URL bar, with an expert mode for your own gaps and sizes.",
  },
  {
    icon: AccessibilityCheckmark24Regular,
    title: "Accessible",
    text: "Windows contrast themes, reduced motion and keyboard focus are handled in every part of the browser.",
  },
  {
    icon: Code24Regular,
    title: "Plain CSS at its core",
    text: "No JavaScript: install it with Sine and it applies at once, live as you change a setting.",
  },
];

export function Home() {
  const { theme } = useTheme();
  const pair = compare[theme] ?? compare.light;
  const [compareMissing, setCompareMissing] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 className="rise">
              <span className="hero__line">The Windows&nbsp;11 look</span>{" "}
              <span className="hero__line">for Zen Browser</span>
            </h1>
            <p className="hero__lead rise" style={{ animationDelay: "80ms" }}>
              Zen Fluent is a free theme that redraws every part of Zen with
              Windows' own design: Mica and Acrylic backgrounds, WinUI controls,
              Fluent icons. Prefer Microsoft Edge? It has that look too.
            </p>
            <div
              className="hero__actions rise"
              style={{ animationDelay: "160ms" }}>
              <a
                className="button button--accent button--large"
                href="#install">
                <ArrowDownload20Regular /> Install
              </a>
              <Link className="button button--large" to="/mods">
                See the features <ArrowRight20Regular />
              </Link>
            </div>
            <p className="hero__note rise" style={{ animationDelay: "240ms" }}>
              Free and open source · v{VERSION} beta, for Zen {ZEN_VERSION} ·
              Works with {compatibleMods.length} popular mods
            </p>
          </div>
          <div
            className="hero__visual rise"
            style={{ animationDelay: "120ms" }}>
            <BrowserHotspots />
          </div>
        </div>
      </section>

      {!compareMissing && (
        <section
          className="section section--compare"
          aria-labelledby="compare-title">
          <div className="container">
            <SectionHead
              title="Same Zen, drawn by Windows"
              id="compare-title"
              align="center">
              Drag the handle to compare Zen's default look with Zen Fluent:
              same window, same tabs, same page.
            </SectionHead>
            <Reveal className="compare-wrap">
              <CompareSlider
                key={theme}
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

      <section className="section" aria-labelledby="why-title">
        <div className="container features">
          <div className="features__intro">
            <h2 id="why-title">Native, down to the details</h2>
            <p>
              Not a new color scheme: Zen Fluent follows WinUI's own rules for
              materials, controls and corners, in every part of the browser.
            </p>
            <Link className="link-arrow" to="/mods">
              Every feature <ArrowRight16Regular />
            </Link>
          </div>
          <Reveal as="ul" className="settings-list">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="settings-row">
                <Icon className="settings-row__icon" aria-hidden />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" id="install" aria-labelledby="install-title">
        <div className="container">
          <SectionHead title="Three steps, two minutes" id="install-title" />
          <ol className="steps">
            <Reveal as="li" className="card step">
              <span className="step__num">1</span>
              <h3>Get Zen and Sine</h3>
              <p>
                Install <a href={ZEN_URL}>Zen Browser</a> {ZEN_VERSION}, then{" "}
                <a href={SINE_URL}>Sine</a>, the mod manager.
              </p>
            </Reveal>
            <Reveal as="li" className="card step" delay={80}>
              <span className="step__num">2</span>
              <h3>Add Zen Fluent</h3>
              <p>Zen settings › Sine Mods › install from GitHub:</p>
              <CopyField value={REPO} label="the Zen Fluent address" />
            </Reveal>
            <Reveal as="li" className="card step" delay={160}>
              <span className="step__num">3</span>
              <h3>Make it yours</h3>
              <p>
                Open the mod's settings (the gear on its card) and allow its
                icons. On Windows 11, add{" "}
                <a href={MICA_URL}>Mica For Everyone</a> for the backdrop.
              </p>
            </Reveal>
          </ol>

          <div className="addons">
            <Reveal className="card addon addon--enhanced">
              <h3>Want more? Add Zen Fluent Enhanced</h3>
              <p>
                Optional scripts on top of the look: a command palette, widgets,
                focus sessions, a settings page. One switch per feature. Needs
                Sine's "JS from unofficial sources".
              </p>
              <CopyField
                value={ENHANCED_URL}
                label="the Zen Fluent Enhanced address"
              />
              <Link className="link-arrow" to="/mods#enhanced">
                What Enhanced adds <ArrowRight16Regular />
              </Link>
            </Reveal>
            <Reveal className="card addon" delay={80}>
              <h3>Works with your other mods</h3>
              <p>
                {compatibleMods.length} popular Sine mods checked, with rules
                for the ones that need them.
              </p>
              <Link className="link-arrow" to="/mods#compatible">
                See the compatible mods <ArrowRight16Regular />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
