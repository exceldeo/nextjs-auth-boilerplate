# Next.js Authentication Boilerplate (TypeScript)

An opinionated Next.js 15 (App Router) starter with TypeScript, Redux Toolkit, React Query, and basic authentication flow (mock API routes). Includes middleware-based auth redirects via cookie, example forms with Formik + Yup, and strongly-typed hooks/store.

## Features

- Next.js 15 (App Router) + React 19
- TypeScript end-to-end
- State management: Redux Toolkit (react-redux)
- Data fetching + caching: TanStack Query (React Query)
- Form handling + validation: Formik + Yup
- Auth demo (JWT-like): mock API routes under `src/app/api/*`
- Middleware-based redirects using `authToken` cookie
- Aliased imports via `@/*`

## Tech Stack

- next: 15.x, react: 19.x, react-dom: 19.x
- @reduxjs/toolkit, react-redux
- @tanstack/react-query
- formik, yup
- Typescript 5, ESLint 9, Tailwind CSS 4 (optional styles)

## Project Structure

```
src/
	app/
		api/                 # Mock API routes (public/protected + auth endpoints)
		layout.tsx           # Root layout, wraps providers
		page.tsx             # Home page (demo)
  providers/           # App-level providers (Redux, React Query)
  lib/                 # Server-side helpers (auth.ts, api.ts, validation.js)
  store/               # Redux store, slice, typed hooks
  hooks/               # Reusable React hooks
  components/auth/     # Auth-related UI (Login/Register/ProtectedRoute)
	styles/
	utils/                 # Generic utilities (e.g., formatMoney.ts)
	types/                 # Global/shared TypeScript types (recommended)
middleware.ts            # Auth-aware redirects based on cookie
```

## Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=dev-secret
```

Notes:

- `NEXT_PUBLIC_API_URL` is used by the client-side API helper.
- `JWT_SECRET` is used by mock API routes to sign/verify tokens.

## Getting Started

Install dependencies and run the dev server (Windows cmd / PowerShell):

```
npm install
npm run dev
```

or with Yarn:

```
yarn
yarn dev
```

Open http://localhost:3000 to see the demo.

## Authentication Flow

This boilerplate ships with demo endpoints and UI:

- UI: `src/app/components/auth/LoginForm.js`, `RegisterForm.js`
- Redux slice: `src/app/store/authSlice.ts`
- API routes:
  - `GET /api/public` – returns public data
  - `GET /api/protected` – requires a valid `Authorization: Bearer <token>` header
  - `POST /api/auth/login` – returns `{ success, token, user }` for demo credentials
  - `POST /api/auth/register` – returns `{ success, token, user }`
  - `POST /api/auth/logout` – returns success

Demo credentials:

```
email: user@example.com
password: password
```

### Middleware behavior

`middleware.ts` checks a cookie named `authToken`:

- Redirects authenticated users away from `/login` and `/register` to `/`
- Requires auth for routes like `/protected` or `/dashboard`; if missing cookie, redirects to `/` with a `from` param
- Skips static assets and `/api/*`

Important: middleware cannot access `localStorage`. For auth enforcement via middleware, set a cookie during login and clear it on logout. You can extend your login/logout handlers to set/remove `authToken` alongside localStorage.

## Typed Store and Hooks

- Store: `src/store/store.ts` (exports `RootState`, `AppDispatch`)
- Typed hooks: `src/store/hooks.ts` (`useAppDispatch`, `useAppSelector`)
- Auth slice: `src/store/authSlice.ts` with typed thunks and state

## Utilities and Types

- `src/utils/*`: general utilities (e.g., `formatMoney.ts`)
- `src/types/*`: recommended place for shared types (e.g., `auth.ts`, `api.ts`)

## Scripts

```
npm run dev     # Start dev server (Next.js)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Common Tasks

- Protect a page/route: move it under `/protected` and ensure cookie flow is set up
- Fetch protected data: use `useProtectedData` hook (React Query)
- Access auth state/actions: use `useAuth` hook (Redux Toolkit thunks)

## Notes & Next Steps

- Components in `src/components/auth` are still JavaScript for simplicity. Consider converting them to `.tsx` for full type safety.
- `src/lib/validation.js` can remain JS, or be migrated to TypeScript (`validation.ts`) with `yup.InferType`.
- If you add a dedicated login page (`/login`), update `middleware.ts` redirect targets accordingly.

---

Happy building! If you run into issues, check TS errors in your editor or run `npm run lint` for quick feedback.
