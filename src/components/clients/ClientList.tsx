import type { ClientRecord } from '../../types/api';
import { ClientCard } from './ClientCard';

interface ClientListProps {
  clients: ClientRecord[];
  onDelete: (id: string) => void;
}

export function ClientList({ clients, onDelete }: ClientListProps) {
  if (clients.length === 0) {
    return <p>No apps yet — create one to get started.</p>;
  }

  return (
    <div>
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} onDelete={onDelete} />
      ))}
    </div>
  );
}