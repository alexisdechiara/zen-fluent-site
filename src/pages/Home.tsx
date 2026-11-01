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
  Sparkle24Regular,
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
    icon: Sparkle24Regular,
    title: "Enhanced, if you want it",
    text: "An optional JavaScript layer: a command palette, widgets, focus sessions, a settings page. One switch per feature.",
  },
  {
    icon: AccessibilityCheckmark24Regular,
    title: "Accessible",
    text: "Windows contrast themes, reduced motion and keyboard focus are handled in every part of the browser.",
  },
  {
    icon: Code24Regular,
    title: "Plain CSS at its core",
    text: "Zen Fluent itself has no JavaScript: install it with Sine and it applies at once, live as you change a setting.",
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
            <div className="hero__badges rise">
              <span className="badge badge--beta">
                <span className="badge__dot" aria-hidden />
                Beta
              </span>
              <span className="badge badge--soft">
                v{VERSION} · Zen {ZEN_VERSION}
              </span>
            </div>
            <h1 className="rise" style={{ animationDelay: "60ms" }}>
              Your Zen, <span className="gradient-text">in Fluent</span>
            </h1>
            <p className="hero__lead rise" style={{ animationDelay: "120ms" }}>
              Mica, Mica Alt, Acrylic and WinUI 3 controls for Zen Browser, or
              the Microsoft Edge look. Every part of the browser, redrawn by
              Windows' own design rules.
            </p>
            <div
              className="hero__actions rise"
              style={{ animationDelay: "180ms" }}>
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
              Free and open source · CSS only · Works with{" "}
              {compatibleMods.length} popular mods
            </p>
          </div>
          <div
            className="hero__visual rise"
            style={{ animationDelay: "160ms" }}>
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
              eyebrow="Before / after"
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
        <div className="container">
          <SectionHead
            eyebrow="Why Zen Fluent"
            title="Native, down to the details"
            id="why-title"
          />
          <div className="feature-grid">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} className="card feature-card" delay={i * 50}>
                <span className="feature-card__icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mods-title">
        <div className="container">
          <SectionHead
            eyebrow="Two mods"
            title="Start with the look, add the extras"
            id="mods-title">
            Both come from the same repository and share one version.
          </SectionHead>
          <div className="two-mods">
            <Reveal className="card mod-card">
              <span className="tag tag--accent">CSS only</span>
              <h3>Zen Fluent</h3>
              <p>
                The whole look and its settings. No script: it works with Sine's
                defaults.
              </p>
              <CopyField value={REPO} label="the Zen Fluent address" />
            </Reveal>
            <Reveal className="card mod-card mod-card--enhanced" delay={80}>
              <span className="tag">Optional scripts</span>
              <h3>Zen Fluent Enhanced</h3>
              <p>
                Features on top of the look, each with its own switch. Needs
                Sine's "JS from unofficial sources".
              </p>
              <CopyField
                value={ENHANCED_URL}
                label="the Zen Fluent Enhanced address"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="install" aria-labelledby="install-title">
        <div className="container">
          <SectionHead
            eyebrow="Install"
            title="Three steps, two minutes"
            id="install-title"
          />
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

          <Reveal className="cta-banner">
            <div>
              <h3>Works with your other mods</h3>
              <p>
                {compatibleMods.length} popular Sine mods checked, with rules
                for the ones that need them.
              </p>
            </div>
            <Link className="button button--accent" to="/mods#compatible">
              Compatible mods <ArrowRight16Regular />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
