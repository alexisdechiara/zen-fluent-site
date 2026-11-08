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
import { Breadcrumb, DocsHeader, DocsPage, DocsPager } from "./parts";

const tabs = [
  { id: "installer", label: "Installer" },
  { id: "command-line", label: "Command line" },
  { id: "sine", label: "Sine" },
] as const;

type Tab = (typeof tabs)[number]["id"];

const parameters: [string, string][] = [
  ["-NoGui", "No window: install with the parameters below."],
  ["-Edition", "Zen Browser (default) or Zen Twilight."],
  ["-ZenDir", "Zen's folder (with zen.exe), instead of -Edition."],
  ["-ProfilePath", "The profile folder. Default: the one the edition opens."],
  ["-Enhanced", "Also install Zen Fluent Enhanced (needs -AllowUnsafeJs)."],
  ["-AllowUnsafeJs", "Consent to set sine.allow-unsafe-js."],
  ["-Ref", "Branch or tag of the repository to install (main)."],
  ["-ReinstallSine", "Install Sine even when it is there."],
];

const tocFor: Record<Tab, { id: string; label: string }[]> = {
  installer: [
    { id: "run", label: "Run the installer" },
    { id: "what-it-does", label: "What it does" },
  ],
  "command-line": [
    { id: "run", label: "Run it without the window" },
    { id: "parameters", label: "Parameters" },
  ],
  sine: [
    { id: "run", label: "Install with Sine" },
    { id: "enhanced", label: "Add Zen Fluent Enhanced" },
  ],
};

export function Install() {
  const [params, setParams] = useSearchParams();
  const tab: Tab =
    tabs.find((t) => t.id === params.get("tabs"))?.id ?? "installer";

  const toc = [
    ...tocFor[tab],
    { id: "mica", label: "Mica on Windows 11" },
    { id: "updates", label: "Updates" },
  ];

  return (
    <DocsPage toc={toc}>
      <Breadcrumb
        items={[{ label: "Docs", to: "/docs" }, { label: "Install" }]}
      />
      <DocsHeader
        title="Install Zen Fluent"
        tools={
          <a className="button" href={`${DOCS_URL}/installation.md`}>
            Installation guide <Open16Regular />
          </a>
        }
      />
      <p className="docs-lead">
        You need Zen Browser or Zen Twilight {ZEN_MIN_VERSION} or later. On
        Windows, the installer does everything; on any system, Sine installs it
        in a minute.
      </p>

      <div className="docs-tabs" role="tablist" aria-label="How to install">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="install-panel"
            className="docs-tabs__tab"
            onClick={() => {
              const next = new URLSearchParams(params);
              next.set("tabs", t.id);
              setParams(next, { replace: true });
            }}>
            {t.label}
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
            <h2 id="run">Run the installer</h2>
            <ol className="docs-steps">
              <li>Close Zen.</li>
              <li>
                Download the installer, from the latest release:
                <a
                  className="button button--accent docs-steps__action"
                  href={INSTALLER_URL}>
                  <ArrowDownload20Regular /> Download ZenFluentSetup.exe
                </a>
              </li>
              <li>
                Run it and pick the edition of Zen (Zen Browser or Zen
                Twilight), then the profile. The one Zen opens by default comes
                first; a profile in use is refused.
              </li>
              <li>
                Keep <strong>Zen Fluent Enhanced</strong> checked, or leave it
                out. Installing it asks you to allow Sine to run scripts from
                outside its store.
              </li>
              <li>Install, then start Zen.</li>
            </ol>
            <p className="docs-note">
              Windows 10 and 11. The window is in French when Windows is.
            </p>

            <h2 id="what-it-does">What it does</h2>
            <ul className="docs-list">
              <li>
                Installs Sine if it is missing: its bootloader in Zen's folder
                (asking for administrator rights only when the folder is
                protected) and its engine in the profile.
              </li>
              <li>
                Installs Zen Fluent, and Zen Fluent Enhanced if checked, the way
                Sine does, keeping your other mods. The previous list is saved
                as <code>mods.json.zen-fluent-setup.bak</code>.
              </li>
              <li>
                Sets <code>svg.context-properties.content.enabled</code> for the
                mod's icons and, only with Enhanced,{" "}
                <code>sine.allow-unsafe-js</code>.
              </li>
              <li>Clears the profile's startup cache.</li>
            </ul>
            <p>
              <a href={INSTALLER_DOCS_URL}>The installer's README</a> has every
              detail.
            </p>
          </>
        )}

        {tab === "command-line" && (
          <>
            <h2 id="run">Run it without the window</h2>
            <p>
              The installer is a PowerShell script (Windows PowerShell 5.1, in
              every Windows 10 and 11). From the folder where it is:
            </p>
            <CopyField
              value=".\ZenFluentSetup.ps1 -NoGui -Enhanced -AllowUnsafeJs"
              label="the install command"
            />
            <h2 id="parameters">Parameters</h2>
            <div className="table-wrap">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map(([name, meaning]) => (
                    <tr key={name}>
                      <td>
                        <code>{name}</code>
                      </td>
                      <td>{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "sine" && (
          <>
            <h2 id="run">Install with Sine</h2>
            <ol className="docs-steps">
              <li>
                Install <a href={ZEN_URL}>Zen Browser</a>, then{" "}
                <a href={SINE_URL}>Sine</a> (its installer is in Sine's
                releases) and restart Zen.
              </li>
              <li>
                Zen settings › <strong>Sine Mods</strong> › install from GitHub:
                <CopyField value={REPO} label="the Zen Fluent address" />
              </li>
              <li>
                Click the gear on Zen Fluent's card and check{" "}
                <strong>Allow the mod's icons</strong>, for the Fluent icons.
              </li>
            </ol>
            <h2 id="enhanced">Add Zen Fluent Enhanced</h2>
            <p>
              In Sine's settings, check{" "}
              <strong>Enable installing JS from unofficial sources</strong>,
              then install it from GitHub. It installs Zen Fluent too if it is
              missing.
            </p>
            <CopyField
              value={ENHANCED_URL}
              label="the Zen Fluent Enhanced address"
            />
          </>
        )}
      </div>

      <h2 id="mica">Mica on Windows 11</h2>
      <p>
        The see-through Mica and Acrylic come from{" "}
        <a href={MICA_URL}>Mica For Everyone</a>, with a rule for{" "}
        <code>zen</code>; Zen Fluent tints it. On Linux and macOS, Zen Fluent
        uses your compositor's blur.
      </p>

      <h2 id="updates">Updates</h2>
      <p>
        Once installed, Sine offers each update of Zen Fluent and Zen Fluent
        Enhanced on its own. Both share one version.
      </p>

      <DocsPager current="/docs/install" />
    </DocsPage>
  );
}
