import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Later phases will check real session state here.
    // For now, just redirect to /login as the default entry point.
    throw redirect({ to: '/login' })
  },
})