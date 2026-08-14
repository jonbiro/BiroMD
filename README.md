# BiroMD Website

Public website for Nicolas Biro, M.D., built with the Next.js App Router and a
static export.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS v4
- Playwright browser checks
- Sharp image generation

## Local development

```bash
npm install
GALLERY_AUTHORIZED_CASE_IDS=lower-blepharoplasty npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With no gallery allowlist,
no clinical cases or clinical image derivatives are exposed locally.

## Validation

```bash
GALLERY_AUTHORIZED_CASE_IDS=upper-lower-blepharoplasty,upper-blepharoplasty,lower-blepharoplasty,periocular-lesion-removal,eyelid-trauma,scalp-reconstruction,eyebrow-reconstruction npm run build
GALLERY_AUTHORIZED_CASE_IDS=upper-lower-blepharoplasty,upper-blepharoplasty,lower-blepharoplasty,periocular-lesion-removal,eyelid-trauma,scalp-reconstruction,eyebrow-reconstruction npm run verify:export
npm run test:e2e
npm run validate:gallery
npm run lint
npm audit
```

The export verifier checks required routes, sitemap entries, internal links,
responsive image budgets, social-card dimensions, and the clinical asset allowlist.
`validate:gallery` derives the complete authorized case list from the manifest and
runs the build, export verifier, and all gallery browser checks. Playwright checks
every public route, mobile overflow/navigation, light and dark
consultation-button contrast, office scheduling links, breadcrumbs, and gallery behavior.

## Static export

The project uses `output: "export"` in `next.config.ts` and deploys to GitHub
Pages at `biromd.com`. See `docs/domain-cutover.md` and
`docs/hosting-hardening.md` for hosting details and limitations.

## Scheduling and privacy

Office appointment buttons open each office's official request page. The optional
email link opens the visitor's email app and does not submit data through this website.
Medical privacy documents are linked by office from
`/notice-of-privacy-practices`.

## Clinical gallery

Clinical sources live outside `public/`. A build generates metadata-free public
derivatives only for case IDs explicitly authorized through
`GALLERY_AUTHORIZED_CASE_IDS`, then verifies and prunes the export. See
`docs/gallery-publication.md` for the required authorization review and the
public-repository limitation.

## Project structure

- `app/` - routes, layout, and metadata
- `components/` - shared UI and page sections
- `lib/` - site, procedure, service, and gallery data
- `clinical-assets/` - controlled gallery source directory; never copied wholesale
- `scripts/` - image generation and export verification
- `tests/` - browser regression checks
