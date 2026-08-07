# Hosting hardening

BiroMD is currently a static GitHub Pages deployment. The application minimizes
client code and does not use analytics, authentication, or an application database,
but GitHub Pages does not provide project-level control over immutable asset caching
or all recommended response headers.

A future CDN or managed-host migration should preserve the custom domain and add:

- `Content-Security-Policy` tested against Next.js static output;
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` after confirming
  every subdomain is HTTPS-only;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` disabling unused browser capabilities;
- `X-Content-Type-Options: nosniff`;
- long-lived immutable caching for fingerprinted `/_next/static/` assets;
- shorter caching for HTML, sitemap, robots, and policy pages; and
- deployment previews plus rollback before DNS cutover.

The site metadata already sets a strict referrer policy for supporting browsers.
Do not claim the HTTP headers are active until production response headers are
verified after a hosting change.
