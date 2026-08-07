import { useState } from 'react';
import { useCreateClient } from '../../hooks/useCreateClient';
import type { CreatedClientResponse } from '../../types/api';
import { useGrantlyTheme, MONO, VERMILLION } from '@/lib/theme';

interface CreateClientFormProps {
  onCreated: (client: CreatedClientResponse) => void;
}

export function CreateClientForm({ onCreated }: CreateClientFormProps) {
  const { theme } = useGrantlyTheme();
  const [name, setName] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const { mutate, isPending, error } = useCreateClient();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ name, redirectUris: [redirectUri] }, { onSuccess: (data) => onCreated(data) });
  }

  const inputStyle = {
    borderColor: theme.hairline,
    backgroundColor: 'transparent',
    color: theme.text,
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="mb-1.5 block text-xs" style={{ color: theme.muted, fontFamily: MONO }}>
          App name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2.5 text-sm outline-none"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs" style={{ color: theme.muted, fontFamily: MONO }}>
          Redirect URI
        </label>
        <input
          value={redirectUri}
          onChange={(e) => setRedirectUri(e.target.value)}
          placeholder="https://your-app.com/callback"
          required
          className="w-full border px-3 py-2.5 text-sm outline-none"
          style={{ ...inputStyle, fontFamily: MONO }}
        />
      </div>

      {error && (
        <p className="text-xs" style={{ color: VERMILLION, fontFamily: MONO }}>
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="border px-5 py-2.5 text-sm transition-colors disabled:opacity-50"
        style={{ borderColor: VERMILLION, color: VERMILLION }}
      >
        {isPending ? 'Creating…' : 'Create App'}
      </button>
    </form>
  );
}