import { createFileRoute } from '@tanstack/react-router'
import { useClients } from '../../hooks/useClients'
import { ClientList } from '../../components/clients/ClientList'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  const { data: clients, isLoading, isError } = useClients()

  if (isLoading) return <p>Loading your apps...</p>
  if (isError) return <p>Something went wrong loading your apps.</p>

  return (
    <div>
      <h2>Your OAuth Applications</h2>
      <ClientList clients={clients ?? []} onDelete={(id) => console.log('delete', id)} />
    </div>
  )
}