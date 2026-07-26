# BiroMD Website

Professional website for Nicolas Biro, M.D., built with Next.js App Router and static export.

## Stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start development server
- `npm run lint` - run ESLint
- `npm run build` - production build + static export

## Static Export Notes

The project is configured with `output: 'export'` in `next.config.ts`.

- Development and production both run at the site root.
- Production is intended for the GitHub Pages custom domain `biromd.com`.
- See `docs/domain-cutover.md` for the required GitHub Pages and DNS setup.

## Contact Email Behavior

The static site does not receive form submissions. The scheduling form opens a
pre-filled email containing contact details and office preference only. It does
not solicit medical details.

## Clinical Gallery Publication

Patient cases are excluded from production unless their case IDs are explicitly
allowlisted at build time after authorization review. See
`docs/gallery-publication.md`.

## Project Structure

- `app/` - route pages, layout, metadata routes
- `components/` - shared UI and section components
- `lib/site.ts` - site config, URL helpers, page metadata helper
