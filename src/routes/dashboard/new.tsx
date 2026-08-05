import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CreateClientForm } from '../../components/clients/CreateClientForm'
import { ClientSecretReveal } from '../../components/clients/ClientSecretReveal'
import type { CreatedClientResponse } from '../../types/api'

export const Route = createFileRoute('/dashboard/new')({
  component: NewClientPage,
})

function NewClientPage() {
  const [created, setCreated] = useState<CreatedClientResponse | null>(null)

  if (created) {
    return (
      <div>
        <ClientSecretReveal client={created} />
        <p>
          <Link to="/dashboard">← Back to your apps</Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Create a new OAuth application</h2>
      <CreateClientForm onCreated={setCreated} />
      <p>
        <Link to="/dashboard">Cancel</Link>
      </p>
    </div>
  )
}