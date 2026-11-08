import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Mods } from "./pages/Mods";
import { Changelog } from "./pages/Changelog";
import { DocsLayout } from "./pages/docs/DocsLayout";
import { Overview } from "./pages/docs/Overview";
import { Install } from "./pages/docs/Install";
import { AllFeatures } from "./pages/docs/AllFeatures";
import { FeatureGroup } from "./pages/docs/FeatureGroup";
import { featureGroups } from "./data/features";
import { NotFound } from "./pages/NotFound";

const titles: Record<string, string> = {
  "/": "Zen Fluent: Mica, Acrylic and WinUI 3 for Zen Browser",
  "/mods": "Features & compatible mods · Zen Fluent",
  "/docs": "Documentation · Zen Fluent",
  "/docs/install": "Install · Zen Fluent docs",
  "/docs/features": "All features · Zen Fluent docs",
  "/changelog": "Changelog · Zen Fluent",
};

function titleFor(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (titles[path]) return titles[path];
  const group = featureGroups.find((g) => path === `/docs/features/${g.id}`);
  return group
    ? `${group.title} · Zen Fluent docs`
    : "Page not found · Zen Fluent";
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = titleFor(pathname);
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Links like /mods#compatible or /#install, from another page.
    const target = document.getElementById(hash.slice(1));
    if (target)
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="backdrop" aria-hidden />
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mods" element={<Mods />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Overview />} />
            <Route path="install" element={<Install />} />
            <Route path="features" element={<AllFeatures />} />
            <Route path="features/:group" element={<FeatureGroup />} />
          </Route>
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
