import type { ClientRecord } from '../../types/api';
import { ClientCard } from './ClientCard';
import { useGrantlyTheme, DISPLAY, MONO } from '@/lib/theme';

interface ClientListProps {
  clients: ClientRecord[];
  onDelete: (id: string) => void;
}

export function ClientList({ clients, onDelete }: ClientListProps) {
  const { theme } = useGrantlyTheme();

  if (clients.length === 0) {
    return (
      <div className="border px-6 py-14 text-center" style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}>
        <p className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 700, color: theme.text }}>
          Nothing sealed yet
        </p>
        <p className="mt-2 text-sm" style={{ color: theme.muted, fontFamily: MONO }}>
          create an application to get a client_id and secret
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} onDelete={onDelete} />
      ))}
    </div>
  );
}