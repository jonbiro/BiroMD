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

- Development runs without a base path.
- Production builds use `/BiroMD` as base path.
- Site helpers in `lib/site.ts` keep metadata, sitemap, robots, and image URLs consistent with that base path.

## Contact Form Behavior

The contact form is static-site friendly: submitting the form opens a pre-filled email draft to the practice inbox.

## Project Structure

- `app/` - route pages, layout, metadata routes
- `components/` - shared UI and section components
- `lib/site.ts` - site config, URL helpers, page metadata helper

