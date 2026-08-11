import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useGrantlyTheme, rootPageStyle, DISPLAY, MONO, VERMILLION } from '@/lib/theme';
import { HankoStamp, AmbientGlow } from '@/components/brand/marks';

const API_URL = import.meta.env.VITE_API_URL;

interface ConsentSearch {
  interaction?: string;
}

export const Route = createFileRoute('/consent')({
  validateSearch: (search: Record<string, unknown>): ConsentSearch => ({
    interaction: typeof search.interaction === 'string' ? search.interaction : undefined,
  }),
  component: ConsentPage,
});

// Plain-language labels for standard OIDC scopes. Unknown scopes (e.g. a
// custom one your API adds later) fall back to showing the raw scope name,
// so nothing silently disappears from the consent screen.
const SCOPE_LABELS: Record<string, string> = {
  openid: 'Confirm your identity',
  profile: 'Your basic profile info (name, picture)',
  email: 'Your email address',
  offline_access: "Access your account when you're not using this app",
};

interface ConsentDetails {
  clientName: string;
  scopes: string[];
}

function ConsentPage() {
  const { interaction } = Route.useSearch();
  const { theme } = useGrantlyTheme();
  const [details, setDetails] = useState<ConsentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<'allow' | 'deny' | null>(null);

  useEffect(() => {
    if (!interaction) {
      setError('Missing request — this page must be reached from a sign-in redirect.');
      return;
    }

    fetch(`${API_URL}/interaction/${interaction}/details`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then((data: ConsentDetails) => setDetails(data))
      .catch(() => setError('This request could not be loaded — it may have expired.'));
  }, [interaction]);

  async function submitDecision(decision: 'allow' | 'deny') {
    if (!interaction) return;
    setSubmitting(decision);

    try {
      const res = await fetch(`${API_URL}/interaction/${interaction}/decision`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision }),
      });

      if (!res.ok) throw new Error('failed');

      // Real browser navigation on purpose, not fetch — the backend's
      // interactionFinished redirect (back to the requesting app) has to
      // happen on an actual top-level navigation, not inside a fetch
      // response, or the final redirect never reaches the browser.
      window.location.href = `${API_URL}/interaction/${interaction}`;
    } catch {
      setError('Something went wrong submitting your decision. Try again.');
      setSubmitting(null);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6" style={rootPageStyle(theme)}>
      <div className="relative w-full max-w-sm">
        <AmbientGlow size={280} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative border p-8" style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}>
          <div className="flex justify-center">
            <HankoStamp id="consent" chars={['許', '可']} size={72} rotate={-5} ring={false} />
          </div>

          {error && (
            <p className="mt-6 text-center text-sm" style={{ color: VERMILLION, fontFamily: MONO }}>
              {error}
            </p>
          )}

          {!error && !details && (
            <p className="mt-6 text-center text-sm" style={{ color: theme.muted, fontFamily: MONO }}>
              Loading request…
            </p>
          )}

          {details && (
            <>
              <h1
                className="mt-6 text-center text-xl"
                style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}
              >
                {details.clientName}
              </h1>
              <p className="mt-2 text-center text-sm" style={{ color: theme.muted }}>
                wants to access your Grantly account
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {details.scopes.map((scope) => (
                  <div
                    key={scope}
                    className="flex items-start gap-2.5 border-t pt-3"
                    style={{ borderColor: theme.hairline }}
                  >
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: VERMILLION }}
                    />
                    <span className="text-sm" style={{ color: theme.text }}>
                      {SCOPE_LABELS[scope] ?? scope}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => submitDecision('allow')}
                  disabled={submitting !== null}
                  className="border px-5 py-2.5 text-sm transition-colors disabled:opacity-50"
                  style={{ borderColor: VERMILLION, backgroundColor: VERMILLION, color: '#EDE7D9' }}
                >
                  {submitting === 'allow' ? 'Authorizing…' : 'Allow'}
                </button>
                <button
                  onClick={() => submitDecision('deny')}
                  disabled={submitting !== null}
                  className="border px-5 py-2.5 text-sm transition-colors disabled:opacity-50"
                  style={{ borderColor: theme.hairline, color: theme.muted }}
                >
                  {submitting === 'deny' ? 'Denying…' : 'Deny'}
                </button>
              </div>

              <p className="mt-6 text-center text-[10px]" style={{ color: theme.muted, fontFamily: MONO }}>
                you can revoke access anytime from your dashboard
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}