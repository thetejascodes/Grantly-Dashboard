import { createFileRoute, Link } from '@tanstack/react-router';
import { LoginButtons } from '../components/auth/LoginButtons';
import { useSession } from '../hooks/useSession';
import { useGrantlyTheme, rootPageStyle, DISPLAY, MONO, VERMILLION } from '@/lib/theme';
import { HankoStamp, AmbientGlow } from '@/components/brand/marks';

interface LoginSearch {
  interaction?: string;
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    interaction: typeof search.interaction === 'string' ? search.interaction : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { data: user, isLoading, isError } = useSession();
  const { theme } = useGrantlyTheme();
  const { interaction } = Route.useSearch();

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6" style={rootPageStyle(theme)}>
      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <AmbientGlow size={300} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative">
          <HankoStamp id="login" chars={['許', '可']} size={110} rotate={-6} />
        </div>

        <h1 className="mt-6 text-3xl" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
          Grantly
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>
          Sign in to manage your OAuth applications
        </p>

        <div className="mt-8 w-full">
          {isLoading && (
            <p className="text-sm" style={{ color: theme.muted, fontFamily: MONO }}>
              Checking session…
            </p>
          )}

          {!isLoading && !isError && user && (
            <div
              className="border px-5 py-6 text-center"
              style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}
            >
              <p className="text-sm" style={{ color: theme.text }}>
                Already signed in.
              </p>
              <Link
                to="/dashboard"
                className="mt-4 inline-flex border px-5 py-2 text-sm"
                style={{ borderColor: VERMILLION, color: VERMILLION }}
              >
                Go to dashboard
              </Link>
            </div>
          )}

          {!isLoading && (isError || !user) && (
            <LoginButtons theme={theme} interactionUid={interaction} />
          )}
        </div>
      </div>
    </div>
  );
}