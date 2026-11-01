import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Mods } from "./pages/Mods";
import { Changelog } from "./pages/Changelog";
import { NotFound } from "./pages/NotFound";

const titles: Record<string, string> = {
  "/": "Zen Fluent: Mica, Acrylic and WinUI 3 for Zen Browser",
  "/mods": "Features & compatible mods · Zen Fluent",
  "/changelog": "Changelog · Zen Fluent",
};

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = titles[pathname] ?? "Page not found · Zen Fluent";
    if (!hash) window.scrollTo({ top: 0 });
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
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
