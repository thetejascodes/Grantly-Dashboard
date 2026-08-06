# Grantly Dashboard

Grantly Dashboard is a React-based admin interface for managing OAuth applications. It provides a simple flow to sign in, view registered apps, create new OAuth clients, and delete existing clients.

## Features

- Login screen with OAuth session support
- Dashboard showing registered OAuth applications
- Create new OAuth applications with a redirect URI
- Delete OAuth applications from the dashboard
- Uses React Query for data fetching and cache management
- Built with Vite, React, TypeScript, and Tailwind CSS

## Tech stack

- React 19
- TypeScript
- Vite
- @tanstack/react-query
- @tanstack/react-router
- Tailwind CSS
- lucide-react
- framer-motion
- radix-ui
- shadcn

## Project structure

- `src/routes/` - route definitions and page layouts
- `src/components/` - reusable UI components
- `src/hooks/` - custom hooks for API access and auth flows
- `src/lib/api.ts` - API client configuration
- `src/types/api.ts` - shared API types

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file at the project root with your backend URL:

   ```bash
   VITE_API_URL=http://localhost:4000
   ```

   Adjust the URL to match the API server that provides authentication and OAuth client endpoints.

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open the local Vite URL shown in the terminal.

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - compile TypeScript and build the production bundle
- `npm run lint` - run ESLint across the project
- `npm run preview` - locally preview the production build

## API integration

The dashboard expects a backend API accessible through `VITE_API_URL` with at least these routes:

- `GET /clients` - return a list of OAuth clients
- `POST /clients` - create a new OAuth client
- `POST /logout` - log the current user out

## Notes

- The login page currently includes temporary debug output for session state.
- After creating a client, the secret is revealed on the creation success page.
- Client deletion clears the cached list and refreshes the dashboard automatically.

## Contribution

Contributions are welcome. If you add new features, keep components, hooks, and route definitions consistent with the existing structure.
