import { useState } from 'react';
import type { CreatedClientResponse } from '../../types/api';

interface ClientSecretRevealProps {
  client: CreatedClientResponse;
}

export function ClientSecretReveal({ client }: ClientSecretRevealProps) {
  const [copied, setCopied] = useState<'id' | 'secret' | null>(null);

  function copy(text: string, which: 'id' | 'secret') {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div style={{ border: '2px solid #d97706', padding: '1rem', background: '#fffbeb' }}>
      <h3>App created: {client.name}</h3>
      <p style={{ color: '#b45309', fontWeight: 'bold' }}>
        ⚠️ This secret is shown only once. Copy it now — it cannot be retrieved again.
      </p>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Client ID</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <code style={{ flex: 1, wordBreak: 'break-all' }}>{client.clientId}</code>
          <button onClick={() => copy(client.clientId, 'id')}>
            {copied === 'id' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div>
        <label>Client Secret</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <code style={{ flex: 1, wordBreak: 'break-all' }}>{client.clientSecret}</code>
          <button onClick={() => copy(client.clientSecret, 'secret')}>
            {copied === 'secret' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}