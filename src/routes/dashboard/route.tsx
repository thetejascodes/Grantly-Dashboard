import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useSession } from '../../hooks/useSession'
import { LogoutButton } from '../../components/auth/LogoutButton'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { data: user, isLoading } = useSession()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    window.location.href = '/login'
    return null
  }

  return (
    <div>
      <header>
        <h1>Grantly Dashboard</h1>
        <p>
          Logged in as {user.email} <LogoutButton />
        </p>
      </header>
      <Outlet />
    </div>
  )
}