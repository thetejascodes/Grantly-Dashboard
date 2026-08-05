import { createFileRoute, Link } from '@tanstack/react-router'
import { useClients } from '../../hooks/useClients'
import { useDeleteClient } from '../../hooks/useDeleteClient'
import { ClientList } from '../../components/clients/ClientList'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  const { data: clients, isLoading, isError } = useClients()
  const { mutate: deleteClient } = useDeleteClient()

  if (isLoading) return <p>Loading your apps...</p>
  if (isError) return <p>Something went wrong loading your apps.</p>

  return (
    <div>
      <h2>Your OAuth Applications</h2>
      <Link to="/dashboard/new">+ Create new app</Link>
      <ClientList clients={clients ?? []} onDelete={(id) => deleteClient(id)} />
    </div>
  )
}