# Grantly Dashboard
The frontend for [Grantly](https://github.com/thetejascodes/Grantly) — a self-hosted OpenID Connect provider. This is where a signed-in user manages their own OAuth applications (create a client, get a `client_id`/`client_secret` once, delete when done), and where end users of *other* apps built on Grantly see a real Allow/Deny consent screen when authorizing.

**Live:** [grantly-dashboard-seven.vercel.app](https://grantly-dashboard-seven.vercel.app)
**Backend:** [grantly-e90w.onrender.com](https://grantly-e90w.onrender.com)

## What's here

- **Landing page** — explains what Grantly is, with a real annotated diagram of the actual authorization-code + PKCE flow
- **Login** — Google / GitHub sign-in for dashboard users
- **Dashboard** — list, create, and delete OAuth applications; one-time client secret reveal
- **Consent screen** (`/consent`) — the screen an end user of a *third-party* app sees when that app requests access via Grantly ("YourApp wants to access your Grantly account"), with Allow/Deny
- **Docs** (`/docs`) — integration guide for developers building apps that use Grantly as their identity provider, with real PKCE/token-exchange code samples
- **Dark/light theme**, persisted across visits, consistent across every page

## Tech stack

- React 19 + TypeScript
- Vite
- TanStack Router (file-based routing) + TanStack Query
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- Framer Motion

## Project structure

```
src/
├── routes/              # file-based routes: index, login, consent, docs, dashboard/*
├── components/
│   ├── auth/             # LoginButtons, LogoutButton
│   ├── clients/           # ClientList, ClientCard, CreateClientForm, ClientSecretReveal
│   ├── brand/              # shared marks: HankoStamp, GithubIcon, GoogleIcon, AmbientGlow
│   └── ui/                 # shadcn-generated primitives
├── hooks/                # useSession, useClients, useCreateClient, useDeleteClient, useLogout
├── lib/
│   ├── api.ts              # fetch wrapper — credentials included, 401 redirect handling
│   └── theme.ts             # shared dark/light theme tokens + useGrantlyTheme hook
└── types/api.ts          # shared API response types
```

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```bash
   VITE_API_URL=https://grantly-e90w.onrender.com
   VITE_BACKEND_URL=https://grantly-e90w.onrender.com
   ```
   Both point at the real backend for local development — see [Deployment](#deployment) below for why there are two, and why they differ in production.

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the local Vite URL shown in the terminal.

## Environment variables

| Variable | Local dev | Production (Vercel) | Used for |
|---|---|---|---|
| `VITE_API_URL` | `https://grantly-e90w.onrender.com` | `/api` | `fetch()`-based calls (`/session/me`, `/clients`, `/logout`, consent details/decision) |
| `VITE_BACKEND_URL` | `https://grantly-e90w.onrender.com` | `https://grantly-e90w.onrender.com` | Real browser navigations (OAuth login links, the final consent redirect) — always the actual backend, never proxied |

**Why two different values in production:** the browser and the backend live on different domains once deployed (`grantly-dashboard-seven.vercel.app` vs. `grantly-e90w.onrender.com`). Modern browsers increasingly block third-party cookies on cross-origin `fetch()` calls — Safari and Firefox by default, Chrome moving that direction. `vercel.json` proxies `/api/*` through the frontend's own origin so those calls are same-origin from the browser's perspective, and the OAuth callback itself is registered to land on that same proxied path so the session cookie ends up scoped to the frontend's own domain. Real page navigations (clicking a login link, the final consent redirect) aren't subject to this restriction, so those always go straight to the real backend — routing them through the proxy as well can break relative redirects the backend issues mid-flow.

## Deployment

Deployed on **Vercel**. `vercel.json` does two things:
- Proxies `/api/*` to the real backend (`grantly-e90w.onrender.com`), for the cookie reasons above
- Falls back to `index.html` for every other path, so client-side routes like `/dashboard` or `/consent` render correctly on a hard refresh instead of Vercel's own 404

Deploying a fork requires updating, on the **backend** side: `FRONTEND_URL`, `GOOGLE_REDIRECT_URI`, `GITHUB_REDIRECT_URI` (pointed at your new frontend's `/api/auth/external/<provider>/callback`), plus registering that callback URL in your Google Cloud Console and GitHub OAuth App settings.

## Available scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) and build the production bundle
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally

## Notes

- Client secrets are shown exactly once, on creation — there's no way to retrieve one again afterward, by design (matches the backend's own guarantee)
- Deleting a client requires a second confirming click within a few seconds — no accidental deletes
- Session expiring mid-use (a `401` on any authenticated request other than the initial session check) redirects to `/login` automatically rather than showing a raw error