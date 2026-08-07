import { useLogout } from '../../hooks/useLogout';
import type { ThemeTokens } from '@/lib/theme';
import { darkTheme, MONO } from '@/lib/theme';

interface LogoutButtonProps {
  theme?: ThemeTokens;
}

export function LogoutButton({ theme = darkTheme }: LogoutButtonProps) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className="border px-3 py-1.5 text-xs transition-colors disabled:opacity-50"
      style={{ borderColor: theme.hairline, color: theme.text, fontFamily: MONO }}
    >
      {isPending ? 'Signing out…' : 'Sign out'}
    </button>
  );
}