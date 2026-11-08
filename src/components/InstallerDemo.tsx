import { useEffect, useRef, useState } from "react";
import { Checkmark16Regular } from "@fluentui/react-icons";
import { useLang } from "../i18n";
import { reducedMotion } from "../motion";

/** The installer's four steps, as its window shows them (English, French). */
const steps = [
  ["Where should Zen Fluent go?", "Où installer Zen Fluent ?"],
  ["What do you want to install?", "Que voulez-vous installer ?"],
  ["Installing Zen Fluent", "Installation de Zen Fluent"],
  ["Zen Fluent is installed", "Zen Fluent est installé"],
] as const;

const STEP_MS = 2200;

/**
 * A small, looping picture of ZenFluentSetup.exe: a Zen version is picked,
 * then Enhanced, the bar fills, the check appears. It plays while on
 * screen; with reduced motion it stays on the first step.
 */
export function InstallerDemo() {
  const [step, setStep] = useState(0);
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(
          () => setStep((s) => (s + 1) % steps.length),
          STEP_MS,
        );
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="setup-demo"
      ref={ref}
      data-step={step}
      role="img"
      aria-label={t(
        "The installer: pick Zen, pick Zen Fluent Enhanced, install, done",
        "L'installateur : choisir Zen, choisir Zen Fluent Enhanced, installer, terminé",
      )}>
      <div className="setup-demo__bar" aria-hidden>
        <span className="setup-demo__app">
          {t("Zen Fluent setup", "Installation de Zen Fluent")}
        </span>
        <span className="setup-demo__caption">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="setup-demo__body" aria-hidden>
        {step < 2 && (
          <span className="setup-demo__step">
            {t(`Step ${step + 1} of 2`, `Étape ${step + 1} sur 2`)}
          </span>
        )}
        <p key={step} className="setup-demo__title">
          {t(steps[step][0], steps[step][1])}
        </p>

        {step === 0 && (
          <div className="setup-demo__tiles" key="zen">
            <span className="setup-demo__tile">
              <b>Zen Browser</b>
              <small>1.24b</small>
            </span>
            <span className="setup-demo__tile is-picked">
              <b>Zen Twilight</b>
              <small>1.25t</small>
            </span>
          </div>
        )}
        {step === 1 && (
          <div className="setup-demo__tiles" key="what">
            <span className="setup-demo__tile">
              <b>Zen Fluent</b>
              <small>{t("The look", "Le style")}</small>
            </span>
            <span className="setup-demo__tile is-picked">
              <b>Enhanced</b>
              <small>{t("Recommended", "Recommandé")}</small>
            </span>
          </div>
        )}
        {step === 2 && (
          <div className="setup-demo__progress" key="work">
            <span />
          </div>
        )}
        {step === 3 && (
          <span className="setup-demo__done" key="done">
            <Checkmark16Regular />
          </span>
        )}
      </div>
      <div className="setup-demo__foot" aria-hidden>
        <span className="setup-demo__button">{t("Back", "Précédent")}</span>
        <span className="setup-demo__button setup-demo__button--accent">
          {step === 1
            ? t("Install", "Installer")
            : step === 3
              ? t("Open Zen", "Ouvrir Zen")
              : t("Next", "Suivant")}
        </span>
      </div>
    </div>
  );
}
