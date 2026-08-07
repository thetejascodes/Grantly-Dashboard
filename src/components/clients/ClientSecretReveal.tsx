import { useState } from 'react';
import type { CreatedClientResponse } from '../../types/api';
import { useGrantlyTheme, DISPLAY, MONO, VERMILLION } from '@/lib/theme';
import { HankoStamp } from '@/components/brand/marks';

interface ClientSecretRevealProps {
  client: CreatedClientResponse;
}

function CopyField({
  label,
  value,
  copied,
  onCopy,
  borderColor,
  labelColor,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  borderColor: string;
  labelColor: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs" style={{ color: labelColor, fontFamily: MONO }}>
        {label}
      </p>
      <div className="flex gap-2">
        <code
          className="flex-1 overflow-x-auto border px-3 py-2.5 text-xs"
          style={{ borderColor, fontFamily: MONO, wordBreak: 'break-all' }}
        >
          {value}
        </code>
        <button
          onClick={onCopy}
          className="shrink-0 border px-3 text-xs"
          style={{ borderColor, fontFamily: MONO }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export function ClientSecretReveal({ client }: ClientSecretRevealProps) {
  const { theme } = useGrantlyTheme();
  const [copied, setCopied] = useState<'id' | 'secret' | null>(null);

  function copy(text: string, which: 'id' | 'secret') {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="border p-6" style={{ borderColor: VERMILLION, backgroundColor: theme.panel }}>
      <div className="mb-5 flex items-center gap-4">
        <HankoStamp id="secret-reveal" chars={['許', '可']} size={56} rotate={-5} ring={false} />
        <div>
          <p className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 700, color: theme.text }}>
            {client.name} — sealed
          </p>
          <p className="mt-1 text-xs" style={{ color: VERMILLION, fontFamily: MONO }}>
            shown once · cannot be retrieved again
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <CopyField
          label="client_id"
          value={client.clientId}
          copied={copied === 'id'}
          onCopy={() => copy(client.clientId, 'id')}
          borderColor={theme.hairline}
          labelColor={theme.muted}
        />
        <CopyField
          label="client_secret"
          value={client.clientSecret}
          copied={copied === 'secret'}
          onCopy={() => copy(client.clientSecret, 'secret')}
          borderColor={VERMILLION}
          labelColor={VERMILLION}
        />
      </div>
    </div>
  );
}