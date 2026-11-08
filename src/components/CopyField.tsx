import { useState } from "react";
import { Checkmark16Regular, Copy16Regular } from "@fluentui/react-icons";
import { useLang } from "../i18n";

export function CopyField({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLang();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard refused: the text stays selectable */
    }
  };
  return (
    <div className="copy-field">
      <code title={value}>{value}</code>
      <button
        type="button"
        className={`icon-button icon-button--small${copied ? " is-done" : ""}`}
        onClick={copy}
        aria-label={
          copied
            ? t("Copied", "Copié")
            : t(`Copy ${label ?? value}`, `Copier ${label ?? value}`)
        }
        title={copied ? t("Copied", "Copié") : t("Copy", "Copier")}>
        {copied ? <Checkmark16Regular /> : <Copy16Regular />}
      </button>
      <span className="visually-hidden" aria-live="polite">
        {copied
          ? t("Copied to the clipboard", "Copié dans le presse-papiers")
          : ""}
      </span>
    </div>
  );
}
