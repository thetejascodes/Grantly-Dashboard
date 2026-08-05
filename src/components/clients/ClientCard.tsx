import type { ClientRecord } from '../../types/api';

interface ClientCardProps {
  client: ClientRecord;
  onDelete: (id: string) => void;
}

export function ClientCard({ client, onDelete }: ClientCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '0.5rem' }}>
      <h3>{client.name}</h3>
      <p>
        <strong>Client ID:</strong> <code>{client.clientId}</code>
      </p>
      <p>
        <strong>Created:</strong> {new Date(client.createdAt).toLocaleDateString()}
      </p>
     <button onClick={() => onDelete(client.clientId)}>Delete</button>    
     </div>
  );
}