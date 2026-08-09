const controlsScript = String.raw`
(() => {
  const root = document.documentElement;
  const syncThemeControls = () => {
    const dark = root.classList.contains("dark");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const label = dark ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  };

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const dark = root.classList.toggle("dark");
      try { localStorage.setItem("biromd-theme", dark ? "dark" : "light"); } catch {}
      syncThemeControls();
    });
  });
  syncThemeControls();

  document.querySelectorAll("[data-print-page]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav-item]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const active = currentPath === href || (href !== "/" && currentPath.startsWith(href + "/"));
    if (active) link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const filters = [...gallery.querySelectorAll("[data-gallery-filter]")];
    const cases = [...gallery.querySelectorAll("[data-gallery-case]")];
    const empty = gallery.querySelector("[data-gallery-empty]");
    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-gallery-filter");
        filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        let visible = 0;
        cases.forEach((item) => {
          const show = filter === "all" || item.getAttribute("data-gallery-category") === filter;
          item.hidden = !show;
          if (show) visible += 1;
        });
        if (empty) empty.hidden = visible !== 0;
      });
    });
  });

  document.querySelectorAll("[data-sensitive-image]").forEach((container) => {
    const cover = container.querySelector("[data-sensitive-cover]");
    const media = container.querySelector("[data-sensitive-media]");
    const opener = container.querySelector("[data-gallery-open]");
    const toolbar = container.querySelector("[data-sensitive-toolbar]");
    const reveal = cover?.querySelector("[data-sensitive-reveal]");
    const hide = toolbar?.querySelector("[data-sensitive-hide]");
    cover?.querySelector("[data-sensitive-reveal]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      cover.hidden = true;
      if (toolbar) toolbar.hidden = false;
      container.setAttribute("data-sensitive-revealed", "true");
      media?.removeAttribute("aria-hidden");
      if (opener) {
        opener.disabled = false;
        opener.focus();
      } else {
        container.focus();
      }
    });
    hide?.addEventListener("click", (event) => {
      event.stopPropagation();
      cover.hidden = false;
      if (toolbar) toolbar.hidden = true;
      container.removeAttribute("data-sensitive-revealed");
      media?.setAttribute("aria-hidden", "true");
      if (opener) opener.disabled = true;
      reveal?.focus();
    });
  });

  const galleryOpeners = new WeakMap();
  document.querySelectorAll("[data-gallery-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.getAttribute("data-gallery-open") || "");
      if (!dialog?.showModal) return;
      galleryOpeners.set(dialog, button);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    });
  });
  document.querySelectorAll("[data-gallery-dialog]").forEach((dialog) => {
    dialog.querySelectorAll("[data-gallery-close]").forEach((button) => {
      button.addEventListener("click", () => dialog.close());
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.style.overflow = "";
      galleryOpeners.get(dialog)?.focus();
    });
  });
})();
`

export function SiteControlsScript() {
  return <script id="site-controls" dangerouslySetInnerHTML={{ __html: controlsScript }} />
}
