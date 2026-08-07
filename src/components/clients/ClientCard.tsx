import { useEffect, useRef, useState } from 'react';
import type { ClientRecord } from '../../types/api';
import { useGrantlyTheme, DISPLAY, MONO, VERMILLION } from '@/lib/theme';

interface ClientCardProps {
  client: ClientRecord;
  onDelete: (id: string) => void;
}

// Delete is irreversible, so this arms on first click and only fires on a
// second click within a short window — no dialog dependency, but the user
// still gets a real "are you sure" moment instead of an instant delete.
const CONFIRM_WINDOW_MS = 4000;

export function ClientCard({ client, onDelete }: ClientCardProps) {
  const { theme } = useGrantlyTheme();
  const [armed, setArmed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (!armed) {
      setArmed(true);
      timeoutRef.current = setTimeout(() => setArmed(false), CONFIRM_WINDOW_MS);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onDelete(client.clientId);
  }

  return (
    <div
      className="flex flex-col gap-3 border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}
    >
      <div className="min-w-0">
        <p className="text-base" style={{ fontFamily: DISPLAY, fontWeight: 700, color: theme.text }}>
          {client.name}
        </p>
        <p className="mt-1.5 truncate text-xs" style={{ color: theme.muted, fontFamily: MONO }}>
          {client.clientId}
        </p>
        <p className="mt-0.5 text-[10px]" style={{ color: theme.muted, fontFamily: MONO }}>
          created {new Date(client.createdAt).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="shrink-0 border px-3 py-1.5 text-xs transition-colors"
        style={
          armed
            ? { borderColor: VERMILLION, color: VERMILLION, fontFamily: MONO }
            : { borderColor: theme.hairline, color: theme.muted, fontFamily: MONO }
        }
      >
        {armed ? 'Confirm delete?' : 'Delete'}
      </button>
    </div>
  );
}