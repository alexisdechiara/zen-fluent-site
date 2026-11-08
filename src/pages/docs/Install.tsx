import { useSearchParams } from "react-router-dom";
import { ArrowDownload20Regular, Open16Regular } from "@fluentui/react-icons";
import { CopyField } from "../../components/CopyField";
import {
  DOCS_URL,
  ENHANCED_URL,
  INSTALLER_DOCS_URL,
  INSTALLER_URL,
  MICA_URL,
  REPO,
  SINE_URL,
  ZEN_MIN_VERSION,
  ZEN_URL,
} from "../../data/site";
import { useLang } from "../../i18n";
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

const tabs = [
  { id: "installer", label: ["Installer", "Installateur"] },
  { id: "command-line", label: ["Command line", "Ligne de commande"] },
  { id: "sine", label: ["Sine", "Sine"] },
] as const;

type Tab = (typeof tabs)[number]["id"];

const parameters: [string, string, string][] = [
  [
    "-NoGui",
    "No window: install with the parameters below.",
    "Sans fenêtre : installe avec les paramètres ci-dessous.",
  ],
  [
    "-Edition",
    "Zen Browser (default) or Zen Twilight.",
    "Zen Browser (par défaut) ou Zen Twilight.",
  ],
  [
    "-ZenDir",
    "Zen's folder (with zen.exe), instead of -Edition.",
    "Le dossier de Zen (avec zen.exe), à la place de -Edition.",
  ],
  [
    "-ProfilePath",
    "The profile folder. Default: the one the edition opens.",
    "Le dossier du profil. Par défaut : celui qu'ouvre l'édition.",
  ],
  [
    "-Enhanced",
    "Also install Zen Fluent Enhanced (needs -AllowUnsafeJs).",
    "Installe aussi Zen Fluent Enhanced (demande -AllowUnsafeJs).",
  ],
  [
    "-AllowUnsafeJs",
    "Consent to set sine.allow-unsafe-js.",
    "Accepte de régler sine.allow-unsafe-js.",
  ],
  [
    "-Ref",
    "Branch or tag of the repository to install (main).",
    "Branche ou tag du dépôt à installer (main).",
  ],
  [
    "-ReinstallSine",
    "Install Sine even when it is there.",
    "Installe Sine même s'il est déjà là.",
  ],
  [
    "-Uninstall",
    "Remove Zen Fluent (with -RemoveSettings, -RemoveSine).",
    "Retire Zen Fluent (avec -RemoveSettings, -RemoveSine).",
  ],
];

export function Install() {
  const [params, setParams] = useSearchParams();
  const { t } = useLang();
  const tab: Tab =
    tabs.find((x) => x.id === params.get("tabs"))?.id ?? "installer";

  const tocFor: Record<Tab, { id: string; label: string }[]> = {
    installer: [
      { id: "run", label: t("Run the installer", "Lancer l'installateur") },
      { id: "what-it-does", label: t("What it does", "Ce qu'il fait") },
    ],
    "command-line": [
      {
        id: "run",
        label: t("Run it without the window", "Le lancer sans fenêtre"),
      },
      { id: "parameters", label: t("Parameters", "Paramètres") },
    ],
    sine: [
      { id: "run", label: t("Install with Sine", "Installer avec Sine") },
      {
        id: "enhanced",
        label: t("Add Zen Fluent Enhanced", "Ajouter Zen Fluent Enhanced"),
      },
    ],
  };

  const toc = [
    ...tocFor[tab],
    { id: "mica", label: t("Mica on Windows 11", "Mica sous Windows 11") },
    { id: "updates", label: t("Updates", "Mises à jour") },
  ];

  const enhancedLabel = t(
    "the Zen Fluent Enhanced address",
    "l'adresse de Zen Fluent Enhanced",
  );

  return (
    <DocsPage toc={toc}>
      <Breadcrumb
        items={[
          { label: t("Docs", "Documentation"), to: "/docs" },
          { label: t("Install", "Installation") },
        ]}
      />
      <DocsHeader
        title={t("Install Zen Fluent", "Installer Zen Fluent")}
        tools={
          <a className="button" href={`${DOCS_URL}/installation.md`}>
            {t("Installation guide", "Guide d'installation")} <Open16Regular />
          </a>
        }
      />
      <p className="docs-lead">
        {t(
          `You need Zen Browser or Zen Twilight ${ZEN_MIN_VERSION} or later. On Windows, the installer does everything; on any system, Sine installs it in a minute.`,
          `Il faut Zen Browser ou Zen Twilight ${ZEN_MIN_VERSION} ou plus récent. Sous Windows, l'installateur fait tout ; sur tout système, Sine l'installe en une minute.`,
        )}
      </p>

      <div
        className="docs-tabs"
        role="tablist"
        aria-label={t("How to install", "Comment installer")}>
        {tabs.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={tab === x.id}
            aria-controls="install-panel"
            className="docs-tabs__tab"
            onClick={() => {
              const next = new URLSearchParams(params);
              next.set("tabs", x.id);
              setParams(next, { replace: true });
            }}>
            {t(x.label[0], x.label[1])}
          </button>
        ))}
      </div>

      <div
        id="install-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="docs-tabpanel">
        {tab === "installer" && (
          <>
            <h2 id="run">{t("Run the installer", "Lancer l'installateur")}</h2>
            <ol className="docs-steps">
              <li>{t("Close Zen.", "Fermez Zen.")}</li>
              <li>
                {t(
                  "Download the installer, from the latest release:",
                  "Téléchargez l'installateur, depuis la dernière version :",
                )}
                <a
                  className="button button--accent docs-steps__action"
                  href={INSTALLER_URL}>
                  <ArrowDownload20Regular />{" "}
                  {t(
                    "Download ZenFluentSetup.exe",
                    "Télécharger ZenFluentSetup.exe",
                  )}
                </a>
              </li>
              <li>
                {t(
                  "Run it and pick the Zen version (Zen Browser or Zen Twilight), then the profile. The one Zen opens by default comes first; a profile in use is refused.",
                  "Lancez-le et choisissez la version de Zen (Zen Browser ou Zen Twilight), puis le profil. Celui que Zen ouvre par défaut vient en premier ; un profil en cours d'utilisation est refusé.",
                )}
              </li>
              <li>
                {t(
                  <>
                    Next, pick <strong>Zen Fluent</strong> or{" "}
                    <strong>Zen Fluent Enhanced</strong> (recommended). Enhanced
                    asks you to allow Sine to run scripts from outside its
                    store.
                  </>,
                  <>
                    Ensuite, choisissez <strong>Zen Fluent</strong> ou{" "}
                    <strong>Zen Fluent Enhanced</strong> (recommandé). Enhanced
                    demande d'autoriser Sine à exécuter des scripts venus
                    d'ailleurs que sa boutique.
                  </>,
                )}
              </li>
              <li>
                {t(
                  "Install, then Open Zen: it starts on the chosen profile.",
                  "Installez, puis Ouvrir Zen : il démarre sur le profil choisi.",
                )}
              </li>
            </ol>
            <p className="docs-note">
              {t(
                "Windows 10 and 11. The window is in French when Windows is. Uninstall Zen Fluent… on its first page takes it out again.",
                "Windows 10 et 11. La fenêtre est en français quand Windows l'est. Désinstaller Zen Fluent…, sur sa première page, le retire.",
              )}
            </p>

            <h2 id="what-it-does">{t("What it does", "Ce qu'il fait")}</h2>
            <ul className="docs-list">
              <li>
                {t(
                  "Installs Sine if it is missing: its bootloader in Zen's folder (asking for administrator rights only when the folder is protected) and its engine in the profile.",
                  "Installe Sine s'il manque : son chargeur dans le dossier de Zen (en demandant les droits d'administrateur seulement si le dossier est protégé) et son moteur dans le profil.",
                )}
              </li>
              <li>
                {t(
                  <>
                    Installs Zen Fluent, or Zen Fluent Enhanced, the way Sine
                    does, keeping your other mods. The previous list is saved as{" "}
                    <code>mods.json.zen-fluent-setup.bak</code>.
                  </>,
                  <>
                    Installe Zen Fluent, ou Zen Fluent Enhanced, comme Sine le
                    fait, en gardant vos autres mods. L'ancienne liste est
                    enregistrée sous <code>mods.json.zen-fluent-setup.bak</code>
                    .
                  </>,
                )}
              </li>
              <li>
                {t(
                  <>
                    Sets <code>svg.context-properties.content.enabled</code> for
                    the mod's icons and, only with Enhanced,{" "}
                    <code>sine.allow-unsafe-js</code>.
                  </>,
                  <>
                    Règle <code>svg.context-properties.content.enabled</code>{" "}
                    pour les icônes du mod et, seulement avec Enhanced,{" "}
                    <code>sine.allow-unsafe-js</code>.
                  </>,
                )}
              </li>
              <li>
                {t(
                  "Clears the profile's startup cache.",
                  "Vide le cache de démarrage du profil.",
                )}
              </li>
            </ul>
            <p>
              {t(
                <>
                  <a href={INSTALLER_DOCS_URL}>The installer's README</a> has
                  every detail.
                </>,
                <>
                  <a href={INSTALLER_DOCS_URL}>Le README de l'installateur</a>{" "}
                  donne tous les détails.
                </>,
              )}
            </p>
          </>
        )}

        {tab === "command-line" && (
          <>
            <h2 id="run">
              {t("Run it without the window", "Le lancer sans fenêtre")}
            </h2>
            <p>
              {t(
                "The installer is also a PowerShell script (Windows PowerShell 5.1, in every Windows 10 and 11). From the folder where it is:",
                "L'installateur existe aussi en script PowerShell (Windows PowerShell 5.1, présent dans tout Windows 10 et 11). Depuis son dossier :",
              )}
            </p>
            <CopyField
              value=".\ZenFluentSetup.ps1 -NoGui -Enhanced -AllowUnsafeJs"
              label={t("the install command", "la commande d'installation")}
            />
            <h2 id="parameters">{t("Parameters", "Paramètres")}</h2>
            <div className="table-wrap">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th scope="col">{t("Parameter", "Paramètre")}</th>
                    <th scope="col">{t("Meaning", "Rôle")}</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map(([name, en, fr]) => (
                    <tr key={name}>
                      <td>
                        <code>{name}</code>
                      </td>
                      <td>{t(en, fr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "sine" && (
          <>
            <h2 id="run">{t("Install with Sine", "Installer avec Sine")}</h2>
            <ol className="docs-steps">
              <li>
                {t(
                  <>
                    Install <a href={ZEN_URL}>Zen Browser</a>, then{" "}
                    <a href={SINE_URL}>Sine</a> (its installer is in Sine's
                    releases) and restart Zen.
                  </>,
                  <>
                    Installez <a href={ZEN_URL}>Zen Browser</a>, puis{" "}
                    <a href={SINE_URL}>Sine</a> (son installateur est dans les
                    versions de Sine) et redémarrez Zen.
                  </>,
                )}
              </li>
              <li>
                {t(
                  <>
                    Zen settings › <strong>Sine Mods</strong> › install from
                    GitHub:
                  </>,
                  <>
                    Paramètres de Zen › <strong>Sine Mods</strong> › installer
                    depuis GitHub :
                  </>,
                )}
                <CopyField
                  value={REPO}
                  label={t("the Zen Fluent address", "l'adresse de Zen Fluent")}
                />
              </li>
              <li>
                {t(
                  <>
                    Click the gear on Zen Fluent's card and check{" "}
                    <strong>Allow the mod's icons</strong>, for the Fluent
                    icons.
                  </>,
                  <>
                    Cliquez sur l'engrenage de la carte de Zen Fluent et cochez{" "}
                    <strong>Allow the mod's icons</strong>, pour les icônes
                    Fluent.
                  </>,
                )}
              </li>
            </ol>
            <h2 id="enhanced">
              {t("Add Zen Fluent Enhanced", "Ajouter Zen Fluent Enhanced")}
            </h2>
            <p>
              {t(
                <>
                  In Sine's settings, check{" "}
                  <strong>Enable installing JS from unofficial sources</strong>,
                  then install it from GitHub. It installs Zen Fluent too if it
                  is missing.
                </>,
                <>
                  Dans les réglages de Sine, cochez{" "}
                  <strong>Enable installing JS from unofficial sources</strong>,
                  puis installez-le depuis GitHub. Il installe aussi Zen Fluent
                  s'il manque.
                </>,
              )}
            </p>
            <CopyField value={ENHANCED_URL} label={enhancedLabel} />
          </>
        )}
      </div>

      <h2 id="mica">{t("Mica on Windows 11", "Mica sous Windows 11")}</h2>
      <p>
        {t(
          <>
            The see-through Mica and Acrylic come from{" "}
            <a href={MICA_URL}>Mica For Everyone</a>, with a rule for{" "}
            <code>zen</code>; Zen Fluent tints it. On Linux and macOS, Zen
            Fluent uses your compositor's blur.
          </>,
          <>
            La transparence de Mica et d'Acrylic vient de{" "}
            <a href={MICA_URL}>Mica For Everyone</a>, avec une règle pour{" "}
            <code>zen</code> ; Zen Fluent la teinte. Sous Linux et macOS, Zen
            Fluent utilise le flou de votre compositeur.
          </>,
        )}
      </p>

      <h2 id="updates">{t("Updates", "Mises à jour")}</h2>
      <p>
        {t(
          "Once installed, Sine offers each update of Zen Fluent and Zen Fluent Enhanced on its own. Both share one version.",
          "Une fois installés, Sine propose de lui-même chaque mise à jour de Zen Fluent et de Zen Fluent Enhanced. Les deux partagent une version.",
        )}
      </p>

      <DocsPager current="/docs/install" />
    </DocsPage>
  );
}
