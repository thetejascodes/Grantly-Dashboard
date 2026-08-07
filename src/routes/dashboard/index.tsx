import { createFileRoute, Link } from '@tanstack/react-router';
import { useClients } from '../../hooks/useClients';
import { useDeleteClient } from '../../hooks/useDeleteClient';
import { ClientList } from '../../components/clients/ClientList';
import { useGrantlyTheme, DISPLAY, MONO, VERMILLION } from '@/lib/theme';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
});

function DashboardHome() {
  const { data: clients, isLoading, isError } = useClients();
  const { mutate: deleteClient } = useDeleteClient();
  const { theme } = useGrantlyTheme();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
          Your applications
        </h2>
        <Link
          to="/dashboard/new"
          className="border px-4 py-2 text-sm"
          style={{ borderColor: VERMILLION, color: VERMILLION }}
        >
          + New app
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm" style={{ color: theme.muted, fontFamily: MONO }}>
          Loading your apps…
        </p>
      )}

      {isError && (
        <p className="text-sm" style={{ color: VERMILLION, fontFamily: MONO }}>
          Something went wrong loading your apps.
        </p>
      )}

      {!isLoading && !isError && (
        <ClientList clients={clients ?? []} onDelete={(id) => deleteClient(id)} />
      )}
    </div>
  );
}