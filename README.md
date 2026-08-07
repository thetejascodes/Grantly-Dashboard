# Grantly Dashboard

Grantly Dashboard is a modern React and TypeScript admin interface for managing OAuth clients and authentication sessions. It connects to a backend API so you can sign in, view registered applications, create new clients, reveal client secrets, and remove existing clients from a clean dashboard experience.

## Highlights

- Secure sign-in flow with session-based authentication
- Dashboard for viewing and managing OAuth applications
- Create new clients with redirect URIs and secret handling
- Delete clients and refresh the list instantly
- Built with React Query for efficient caching and state updates

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- TanStack Router
- shadcn/ui
- Radix UI
- Framer Motion

## Backend repository

This frontend is designed to work with the backend service below:

- Backend repo: https://github.com/thetejascodes/Grantly

## Project structure

- src/routes/ - route definitions and page layouts
- src/components/ - reusable UI components
- src/hooks/ - custom hooks for API and auth flows
- src/lib/api.ts - API client configuration
- src/types/api.ts - shared API types

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a .env file in the project root and point it to your backend:

   ```bash
   VITE_API_URL=http://localhost:4000
   ```

   Adjust the URL to match the API server that powers authentication and OAuth client endpoints.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local Vite URL shown in the terminal.

## Available scripts

- npm run dev - start the Vite development server
- npm run build - compile TypeScript and build the production bundle
- npm run lint - run ESLint across the project
- npm run preview - preview the production build locally

## API integration

The dashboard expects a backend API accessible through VITE_API_URL with routes such as:

- GET /clients - return a list of OAuth clients
- POST /clients - create a new OAuth client
- POST /logout - log out the current user

## Notes

- The login page includes session state details for development debugging.
- Newly created clients reveal their secret on the success screen.
- Deleting a client clears the cached list and refreshes the dashboard automatically.

## Contribution

Contributions are welcome. If you add features, keep components, hooks, and route definitions consistent with the existing structure.
