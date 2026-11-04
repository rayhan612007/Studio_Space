# Studio Space — Agent Quickstart Guide

This file compiles high-signal, repo-specific guidance for future OpenCode sessions. If a line doesn't answer "Would an agent likely miss this without help?" it's been omitted.

## 🛠️ Commands

| Action | Command |
|--------|---------|
| Start dev server | `pnpm next dev` (or `npm run dev`) |
| Build | `pnpm next build` |
| Start production | `pnpm next start` |
| Lint | `pnpm lint` |
| Type-check | `pnpm tsc` (via `tsc --noEmit` — `typescript` is a devDep) |

**Notes:**
- The repo uses `pnpm`; all scripts are in `package.json`. `npm` and `yarn` also work.
- `dev` uses Turbopack (configured in `next.config.ts`). `build` uses the standard Next.js build pipeline.
- `lint` runs ESLint with Next.js config (`eslint-config-next`). It ignores `.next/`, `out/`, `build/`, and `next-env.d.ts` by default.

## 🌐 Environment

Required environment variables (see `.env` — **do not commit** these):

- `BETTER_AUTH_URL` — base URL for Better Auth (e.g. `http://localhost:3000`)
- `BETTER_AUTH_URL_DB` — MongoDB connection string for auth persistence
- `NEXT_PUBLIC_STUDIO_API_URL` — base URL of the Studio Server API
- `user` / `pass` — Basic Auth credentials for the studio API (used by `my-listing-actions.ts` and `studio-booking-actions.ts`)
- `GOOGLE_ID` / `GOOGLE_SECRET` — Google OAuth credentials (optional, if Google social login is enabled)

**The app will throw at runtime if any of these are missing.**

## 📁 Directory Structure (key boundaries)

```
src/app/          — Next.js app router (pages, APIs, layout)
src/components/   — React UI components (shadcn/ui base, custom)
src/app/lib/      — Server-side logic: auth, API URLs, data actions
src/types/        — TypeScript interfaces (Idata.ts)
```

- **`src/app/(homepage)/`** — Home route with hero slider, features, about
- **`src/app/(auth)/`** — Auth routes (login, register)
- **`src/app/studios/`** — Public studio listing page with filtering/sorting
- **`src/app/my-listings/`** — Private: user's studio list (requires auth)
- **`src/app/my-bookings/`** — Private: user's bookings (requires auth)
- **`src/app/add-studio/`** — Private: create new studio listing
- **`src/app/api/auth/...`** — Better Auth routes (POST/GET delegated to `better-auth`)

**Agents:** The `src/app/lib/` directory is the coordination point for all server actions and API calls. Modifying auth or API behavior usually requires changes here first.

## 🔐 Authentication

- **Better Auth** is the auth provider (v1.x), configured in `src/app/lib/auth.ts`.
- Sessions are managed via `authClient.useSession()` from `better-auth/react`.
- **PrivateRoute** (`src/components/PrivateRoute.tsx`) wraps any route that requires a logged-in user. It redirects to `/login` with a `callbackURL` query param if the session is pending or missing.
- **`usePrivateSession()`** (`src/components/PrivateRoute.tsx`) extracts the session from `PrivateSessionContext` — must be used inside a `PrivateRoute`.
- Google OAuth is configured but requires `GOOGLE_ID` / `GOOGLE_SECRET` env vars.
- The auth client base URL is set via `BETTER_AUTH_URL`.

**Gotcha:** `PrivateRoute` uses a `useEffect` that redirects **immediately** if `isPending` is true or `session` exists. Ensure you don't rely between the pending state and the redirect.

## 🖼️ Image Uploads

- Studio images are uploaded via **ImageBB API**. The server (`Studio_server/index.js`) handles Multer uploads (memory storage, max 8 files, 10 MB each) and forwards them to ImageBB.
- The client (`src/app/add-studio/page.tsx`) allows 1–8 images, each ≤10 MB, must be `image/*` type.
- **Both client and server validate image count/size.** The client checks before submitting; the server double-checks on receive.
- API credentials (`IMGBB_API_KEY`) must be set in the server's `.env`. The client reads `NEXT_PUBLIC_STUDIO_API_URL` from its own `.env`.

## 🌍 API Integration

- The client calls the Studio Server at `STUDIO_API_URL` (resolved from `NEXT_PUBLIC_STUDIO_API_URL` — see `src/app/lib/api.ts`).
- All API calls from `src/app/lib/` go through `fetch()` with `cache: "no-store"`.
- Auth-requiring endpoints add an `Authorization: Basic <base64(user:pass)>` header and forward the session cookie.
- **Key actions** (all in `src/app/lib/`):
  - `getMyListings()` — fetch user's studios
  - `updateMyListing(id, input)` — PATCH a listing
  - `deleteMyListing(id)` — DELETE a listing
  - `createBooking(booking)` — create a booking
  - `cancelBooking(bookingId)` — cancel a booking
  - `getBookings()` — fetch user's bookings

## 🎨 UI Conventions

- **Tailwind CSS v3** (v4 config present but Tailwind v4 is in devDeps). Styles are in `src/app/globals.css` with Tailwind directives at the top.
- **shadcn/ui** components are used throughout (`src/components/ui/`). The `components.json` schema defines aliases:
  - `@/components` → `src/components`
  - `@/lib` → `src/lib`
  - `@/hooks` → (not explicitly mapped but conventions exist)
  - `@/ui` → `src/components/ui`
- **`cn`** utility from `class-variance-authority` is used for conditional class joining (e.g., `cn("base", variant && "variant")`).
- **Theme** toggling is handled by `next-themes` (`ThemeProvider` in `layout.tsx`, `ThemeToggle` component in `Navbar.tsx`).
- **Skeletons** are used for loading states (e.g., `spinner.tsx`, skeleton patterns in `my-listings`).
- **Toasts** via `sonner` — imported as `toast` from `src/components/ui/toast.tsx`. All CRUD actions show success/error toasts.

## 📦 Testing & Quality

- No test script is defined in `package.json` (the `test` script in `Studio_server` just echoes an error). This repo has no formal test suite.
- Lint is the main quality gate: `pnpm lint`.
- Type-check runs via `tsc --noEmit` (strict mode is on in `tsconfig.json`).
- CI / pre-commit: not configured in this repo (no `.github/workflows/`, no `taskfile`, no `package.json` scripts beyond the ones listed).

## 🚫 Common Pitfalls

| Pitfall | Fix/Workaround |
|---------|----------------|
| Missing env vars | The app throws at runtime. Check that `BETTER_AUTH_URL`, `BETTER_AUTH_URL_DB`, `NEXT_PUBLIC_STUDIO_API_URL`, `user`, and `pass` are set in a `.env` file at the repo root. |
| `PrivateRoute` redirect loop | The `useEffect` in `PrivateRoute` redirects to `/login` if `isPending || session`. If you get a redirect loop, check the login callback URL logic. |
| Image upload fails | Both client and server must have correct limits (max 8 files, 10 MB each). Server also needs `IMGBB_API_KEY`. |
| Sorting/filtering not working on studios page | The `Studios` component in `src/app/studios/page.tsx` reads `searchParams` from the URL. Ensure query params match the `categoryTerms` mapping (e.g., `?category=photo`). |
| Tailwind classes not applying | globals.css must start with `@tailwind base`, `@tailwind components`, `@tailwind utilities` — it does. If custom classes aren't working, check for typos or specificity issues. |
| Theme not persisting | `next-themes` uses a cookie + `localStorage`. The `ThemeProvider` in `layout.tsx` enables `enableSystem` and `enableColorScheme`. |

## 📚 Referenced Sources (keep these in sync)

- `package.json` — script definitions, dependency versions
- `tsconfig.json` — TypeScript config (strict, paths `@/*` → `src/*`)
- `next.config.ts` — Next.js 16 config (turbopack, compiler, experimental flags)
- `eslint.config.mjs` — ESLint config with Next.js defaults
- `components.json` — shadcn/ui schema (defines `@/...` aliases)
- `src/app/lib/auth.ts` — Better Auth initialization
- `src/app/lib/api.ts` — Studio API URL derivation
- `Studio_server/index.js` — Backend API (for env var references)
- `prd.md` — Product requirements (minimum 15 client commits, 8 server reads, README requirements)