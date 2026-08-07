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

  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav-item]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const active = currentPath === href || (href !== "/" && currentPath.startsWith(href + "/"));
    if (active) link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll("[data-contact-email-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const firstName = String(data.get("firstName") || "").trim();
      const lastName = String(data.get("lastName") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const office = String(data.get("office") || "No preference");
      const recipient = form.getAttribute("data-contact-email-address") || "";
      const subject = "Scheduling request: " + firstName + " " + lastName;
      const body = [
        "Name: " + firstName + " " + lastName,
        "Email: " + email,
        "Phone: " + (phone || "Not provided"),
        "Preferred office: " + office,
        "",
        "Please contact me to discuss consultation scheduling."
      ].join("\n");
      window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
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
