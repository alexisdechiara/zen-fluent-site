import type { Theme } from "../theme";

export interface ComparePair {
  before: string;
  after: string;
  width: number;
  height: number;
}

/**
 * Screenshots for the before / after slider (public/compare/). Both images
 * of a pair must show the same window at the same size. Taken on Zen 1.24b
 * (Linux, no Mica): only the mod's CSS differs between the two.
 */
export const compare: Partial<Record<Theme, ComparePair>> & {
  light: ComparePair;
} = {
  light: {
    before: "/compare/zen-default-light.webp",
    after: "/compare/zen-fluent-light.webp",
    width: 1280,
    height: 800,
  },
  dark: {
    before: "/compare/zen-default-dark.webp",
    after: "/compare/zen-fluent-dark.webp",
    width: 1280,
    height: 800,
  },
};
