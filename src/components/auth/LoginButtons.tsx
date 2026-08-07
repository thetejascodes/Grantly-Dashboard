import type { ThemeTokens } from '@/lib/theme';
import { MONO } from '@/lib/theme';
import { GoogleIcon, GithubIcon } from '@/components/brand/marks';

const API_URL = import.meta.env.VITE_API_URL;

interface LoginButtonsProps {
  theme: ThemeTokens;
}

export function LoginButtons({ theme }: LoginButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <a
        href={`${API_URL}/auth/external/google`}
        className="flex items-center justify-center gap-2.5 border px-5 py-3 text-sm transition-colors"
        style={{ borderColor: theme.hairline, color: theme.text }}
      >
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </a>
      <a
        href={`${API_URL}/auth/external/github`}
        className="flex items-center justify-center gap-2.5 border px-5 py-3 text-sm transition-colors"
        style={{ borderColor: theme.hairline, color: theme.text }}
      >
        <GithubIcon className="h-4 w-4" />
        Continue with GitHub
      </a>
      <p className="mt-1 text-[10px]" style={{ color: theme.muted, fontFamily: MONO }}>
        session cookie · httpOnly · sameSite=lax
      </p>
    </div>
  );
}