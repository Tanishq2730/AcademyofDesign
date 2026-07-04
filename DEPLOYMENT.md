# Deployment Guide

This project is now split into two independently deployable parts:

| Part | Folder | Output | Where to host |
|------|--------|--------|---------------|
| **Frontend** (Next.js) | project root | static `out/` | any static host (Hostinger, cPanel, Netlify, S3, GitHub Pages) |
| **Backend** (Express API) | `server/` | Node process | any Node host (Railway, Render, Fly.io, VPS) |

The frontend talks to the backend over HTTP using a JWT bearer token stored in
the browser's `localStorage`.

---

## 1. Backend (`server/`)

```bash
cd server
npm install
cp .env.example .env      # then fill in the values
npm start                 # http://localhost:4000
```

`.env` values:
- `MONGODB_URI` – MongoDB connection string. **Leave blank to run in Mock Mode**
  (in-memory, demo account `demo@nuvosid.design` / `password123`).
- `JWT_SECRET` – long random string used to sign tokens.
- `CLIENT_URL` – your frontend origin(s) for CORS, e.g. `https://yoursite.com`
  (comma-separate multiple).
- `PORT` – defaults to `4000`.

Deploy this folder to any Node host and note its public URL
(e.g. `https://api.yoursite.com`).

## 2. Frontend (static export)

Set the API URL **before building** (it is inlined at build time):

```bash
# from the project root
echo "NEXT_PUBLIC_API_URL=https://api.yoursite.com" > .env.local
npm run build            # generates the out/ folder
```

Upload the contents of **`out/`** to your static host's web root.

For local development:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev              # http://localhost:3000  (talks to local backend)
```

---

## Notes
- `out/` is only produced because `next.config.mjs` sets `output: 'export'`.
- Dynamic routes (`/courses/[slug]`, `/courses/[slug]/demo`, `/workshops/[slug]`)
  are pre-rendered for every id in `src/data/*.json` via `generateStaticParams`.
  Add a new course/workshop id there and it gets its own static page on rebuild.
- Route protection for `/dashboard` moved from middleware to a client-side guard
  (the static build has no server to run middleware).
