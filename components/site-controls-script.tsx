const controlsScript = String.raw`
(() => {
  const root = document.documentElement;
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const getStoredTheme = () => {
    try {
      const value = localStorage.getItem("biromd-theme");
      return value === "dark" || value === "light" ? value : null;
    } catch {
      return null;
    }
  };
  const syncThemeControls = () => {
    const dark = root.classList.contains("dark");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const label = dark ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", dark ? "#030711" : "#ffffff");
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

  colorSchemeQuery.addEventListener?.("change", (event) => {
    if (getStoredTheme() !== null) return;
    root.classList.toggle("dark", event.matches);
    syncThemeControls();
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== "biromd-theme") return;
    const storedTheme = getStoredTheme();
    root.classList.toggle(
      "dark",
      storedTheme === "dark" || (storedTheme === null && colorSchemeQuery.matches)
    );
    syncThemeControls();
  });

  document.querySelectorAll("[data-print-page]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav-item]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const active = currentPath === href || (href !== "/" && currentPath.startsWith(href + "/"));
    if (active) link.setAttribute("aria-current", "page");
  });

  const hydrateClinicalImages = (root) => {
    root?.querySelectorAll("[data-clinical-srcset]").forEach((source) => {
      const srcset = source.getAttribute("data-clinical-srcset");
      if (srcset) source.setAttribute("srcset", srcset);
      source.removeAttribute("data-clinical-srcset");
    });
    root?.querySelectorAll("[data-clinical-src]").forEach((image) => {
      const src = image.getAttribute("data-clinical-src");
      if (src) image.setAttribute("src", src);
      image.removeAttribute("data-clinical-src");
    });
  };

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

  document.querySelectorAll("[data-care-pathways]").forEach((section) => {
    const rail = section.querySelector("[data-care-pathway-rail]");
    const cards = [...section.querySelectorAll("[data-care-pathway]")];
    const previous = section.querySelector("[data-care-pathway-previous]");
    const next = section.querySelector("[data-care-pathway-next]");
    const status = section.querySelector("[data-care-pathway-status]");
    if (!rail || cards.length === 0 || !previous || !next || !status) return;

    let currentIndex = 0;
    let updateFrame = 0;
    const updateControls = () => {
      const railCenter = rail.scrollLeft + rail.clientWidth / 2;
      currentIndex = cards.reduce((closest, card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const closestCard = cards[closest];
        const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
        return Math.abs(cardCenter - railCenter) < Math.abs(closestCenter - railCenter)
          ? index
          : closest;
      }, 0);
      status.textContent = String(currentIndex + 1) + " of " + String(cards.length);
      previous.disabled = currentIndex === 0;
      next.disabled = currentIndex === cards.length - 1;
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(updateFrame);
      updateFrame = requestAnimationFrame(updateControls);
    };
    const showCard = (index) => {
      const card = cards[Math.max(0, Math.min(cards.length - 1, index))];
      const left = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
      rail.scrollTo({
        left,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };

    previous.addEventListener("click", () => showCard(currentIndex - 1));
    next.addEventListener("click", () => showCard(currentIndex + 1));
    rail.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    updateControls();
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
      hydrateClinicalImages(media);
      cover.hidden = true;
      if (toolbar) toolbar.hidden = false;
      container.setAttribute("data-sensitive-revealed", "true");
      media?.removeAttribute("aria-hidden");
      if (opener) {
        opener.disabled = false;
        opener.focus();
      } else if (hide) {
        hide.focus();
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
      hydrateClinicalImages(dialog);
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
