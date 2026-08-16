import { createFileRoute, Link } from '@tanstack/react-router';
import { useClients } from '../../hooks/useClients';
import { useDeleteClient } from '../../hooks/useDeleteClient';
import { ClientList } from '../../components/clients/ClientList';
import { useGrantlyTheme, DISPLAY, VERMILLION } from '@/lib/theme';
import { Spinner } from '@/components/brand/Spinner';

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
        <div className="flex justify-center py-14">
          <Spinner label="Loading your apps…" />
        </div>
      )}

      {isError && (
        <p className="text-sm" style={{ color: VERMILLION }}>
          Something went wrong loading your apps.
        </p>
      )}

      {!isLoading && !isError && (
        <ClientList clients={clients ?? []} onDelete={(id) => deleteClient(id)} />
      )}
    </div>
  );
}