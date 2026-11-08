import { latest } from "./changelog";

export const REPO = "alexisdechiara/zen-fluent";
export const REPO_URL = `https://github.com/${REPO}`;
export const ENHANCED_URL = `${REPO_URL}/tree/main/enhanced`;
export const DOCS_URL = `${REPO_URL}/blob/main/docs`;
export const SINE_URL = "https://github.com/CosmoCreeper/Sine";
export const ZEN_URL = "https://zen-browser.app";
export const MICA_URL = "https://github.com/MicaForEveryone/MicaForEveryone";

/** The Windows installer, attached to each release (`vX.Y.Z` tag). */
export const INSTALLER_URL = `${REPO_URL}/releases/latest/download/ZenFluentSetup.exe`;
export const INSTALLER_DOCS_URL = `${REPO_URL}/blob/main/installer/README.md`;

export const VERSION = latest?.version ?? "0.4.3";
export const ZEN_VERSION = "1.24";
/** The oldest Zen the mod and the installer accept. */
export const ZEN_MIN_VERSION = "1.23";
