import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { CreateClientForm } from '../../components/clients/CreateClientForm';
import { ClientSecretReveal } from '../../components/clients/ClientSecretReveal';
import type { CreatedClientResponse } from '../../types/api';
import { useGrantlyTheme, DISPLAY, VERMILLION } from '@/lib/theme';

export const Route = createFileRoute('/dashboard/new')({
  component: NewClientPage,
});

function NewClientPage() {
  const { theme } = useGrantlyTheme();
  const [created, setCreated] = useState<CreatedClientResponse | null>(null);

  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h2 className="mb-8 text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
        {created ? 'Application created' : 'New application'}
      </h2>

      {!created && <CreateClientForm onCreated={setCreated} />}

      {created && (
        <div className="flex flex-col gap-6">
          <ClientSecretReveal client={created} />
          <Link
            to="/dashboard"
            className="self-start border px-5 py-2 text-sm"
            style={{ borderColor: VERMILLION, color: VERMILLION }}
          >
            Back to dashboard
          </Link>
        </div>
      )}
    </div>
  );
}