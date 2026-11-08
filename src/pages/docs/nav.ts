import {
  Accessibility20Regular,
  Apps20Regular,
  ArrowDownload20Regular,
  Color20Regular,
  Globe20Regular,
  Home20Regular,
  Link20Regular,
  PaintBrush20Regular,
  PanelLeft20Regular,
  Rocket20Regular,
  Settings20Regular,
  Window20Regular,
  type FluentIcon,
} from "@fluentui/react-icons";
import { featureGroups } from "../../data/features";

export const groupIcons: Record<string, FluentIcon> = {
  look: PaintBrush20Regular,
  colors: Color20Regular,
  sidebar: PanelLeft20Regular,
  urlbar: Link20Regular,
  window: Window20Regular,
  productivity: Rocket20Regular,
  settings: Settings20Regular,
  web: Globe20Regular,
  a11y: Accessibility20Regular,
};

export interface DocPage {
  to: string;
  title: string;
  fr: { title: string };
  icon: FluentIcon;
  /** The file to edit for this page, in the site's repository. */
  source: string;
}

/** Every page of the docs, in reading order (the pager follows it). */
export const docPages: DocPage[] = [
  {
    to: "/docs",
    title: "Overview",
    fr: { title: "Présentation" },
    icon: Home20Regular,
    source: "src/pages/docs/Overview.tsx",
  },
  {
    to: "/docs/install",
    title: "Install",
    fr: { title: "Installation" },
    icon: ArrowDownload20Regular,
    source: "src/pages/docs/Install.tsx",
  },
  {
    to: "/docs/features",
    title: "All features",
    fr: { title: "Toutes les fonctions" },
    icon: Apps20Regular,
    source: "src/data/features.ts",
  },
  ...featureGroups.map((group) => ({
    to: `/docs/features/${group.id}`,
    title: group.title,
    fr: { title: group.fr.title },
    icon: groupIcons[group.id],
    source: "src/data/features.ts",
  })),
];

export const SITE_REPO_URL =
  "https://github.com/alexisdechiara/zen-fluent-site";
