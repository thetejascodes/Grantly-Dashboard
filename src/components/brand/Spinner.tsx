import { useGrantlyTheme, VERMILLION } from '@/lib/theme';

interface SpinnerProps {
  size?: number;
  label?: string;
}

/**
 * A small themed loading indicator — a spinning ring in the vermillion
 * accent, with an optional label. Used anywhere a fetch is in flight,
 * replacing plain "Loading…" text.
 */
export function Spinner({ size = 20, label }: SpinnerProps) {
  const { theme } = useGrantlyTheme();

  return (
    <div className="flex items-center gap-2.5">
      <span
        role="status"
        aria-label={label ?? 'Loading'}
        className="inline-block animate-spin rounded-full border-2"
        style={{
          width: size,
          height: size,
          borderColor: theme.hairline,
          borderTopColor: VERMILLION,
        }}
      />
      {label && (
        <span className="text-sm" style={{ color: theme.muted }}>
          {label}
        </span>
      )}
    </div>
  );
}