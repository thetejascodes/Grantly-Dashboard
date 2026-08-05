import { useState } from 'react';
import { useCreateClient } from '../../hooks/useCreateClient';
import type { CreatedClientResponse } from '../../types/api';

interface CreateClientFormProps {
  onCreated: (client: CreatedClientResponse) => void;
}

export function CreateClientForm({ onCreated }: CreateClientFormProps) {
  const [name, setName] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const { mutate, isPending, error } = useCreateClient();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      { name, redirectUris: [redirectUri] },
      { onSuccess: (data) => onCreated(data) }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          App name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Redirect URI
          <input
            value={redirectUri}
            onChange={(e) => setRedirectUri(e.target.value)}
            placeholder="https://your-app.com/callback"
            required
          />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create App'}
      </button>
    </form>
  );
}