import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useGrantlyTheme, rootPageStyle, DISPLAY, BODY, MONO, VERMILLION } from '@/lib/theme';
import type { ThemeTokens } from '@/lib/theme';

export const Route = createFileRoute('/docs')({
  component: DocsPage,
});

const navSections = [
  { id: 'who-this-is-for', label: 'Who this is for' },
  { id: 'overview', label: 'How it works' },
  { id: 'create-app', label: 'Create an application' },
  { id: 'authorize', label: 'Send users to sign in' },
  { id: 'exchange', label: 'Exchange the code' },
  { id: 'userinfo', label: 'Read the user' },
  { id: 'logout', label: 'Log out' },
  { id: 'reference', label: 'Reference' },
];

const overviewSteps = [
  { mark: '一', label: 'Create an app', detail: 'Register your application in the Grantly dashboard.' },
  { mark: '二', label: 'Send the user to Grantly', detail: 'Redirect to /auth with a PKCE code_challenge.' },
  { mark: '三', label: 'Exchange the code', detail: 'Your backend trades the code for tokens at /token.' },
  { mark: '四', label: 'Read the user', detail: 'Call /me with the access token to get their profile.' },
];

const referenceRows = [
  { method: 'GET', path: '/.well-known/openid-configuration', desc: 'Discovery document' },
  { method: 'GET', path: '/jwks', desc: 'Public signing keys' },
  { method: 'GET', path: '/auth', desc: 'Start the authorization request' },
  { method: 'POST', path: '/token', desc: 'Exchange a code (or refresh token) for tokens' },
  { method: 'GET', path: '/me', desc: 'Userinfo for the current access token' },
  { method: 'POST', path: '/revoke', desc: 'Revoke a token' },
  { method: 'GET', path: '/session/end', desc: 'RP-initiated logout' },
  { method: 'POST', path: '/clients', desc: 'Create an OAuth application (dashboard-authenticated)' },
];

function CodeBlock({ theme, caption, code }: { theme: ThemeTokens; caption: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="border" style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}>
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: `1px solid ${theme.hairline}` }}
      >
        <span className="text-xs" style={{ color: theme.muted, fontFamily: MONO }}>
          {caption}
        </span>
        <button onClick={handleCopy} className="text-xs" style={{ color: copied ? VERMILLION : theme.muted, fontFamily: MONO }}>
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed" style={{ fontFamily: MONO, color: theme.text }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DocSection({
  id,
  eyebrow,
  title,
  theme,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  theme: ThemeTokens;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t px-1 py-12" style={{ borderColor: theme.hairline }}>
      <p className="mb-2 text-[10px] tracking-[0.2em]" style={{ color: theme.brass, fontFamily: MONO }}>
        {eyebrow}
      </p>
      <h2 className="mb-5 text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: theme.muted }}>
        {children}
      </div>
    </section>
  );
}

function DocsPage() {
  const { theme } = useGrantlyTheme();

  return (
    <div className="min-h-screen w-full" style={rootPageStyle(theme)}>
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{ backgroundColor: `${theme.bg}CC`, borderBottom: `1px solid ${theme.hairline}` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
              Grantly
            </span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: VERMILLION }} />
          </Link>
          <div className="flex items-center gap-5">
            <a
              href="https://grantly-e90w.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm sm:block"
              style={{ color: theme.muted }}
            >
              API reference
            </a>
            <Link
              to="/login"
              className="border px-4 py-1.5 text-sm"
              style={{ borderColor: VERMILLION, color: VERMILLION }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="mb-2 text-[10px] tracking-[0.2em]" style={{ color: theme.brass, fontFamily: MONO }}>
          DOCUMENTATION
        </p>
        <h1 className="max-w-xl text-4xl leading-tight" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
          Let your users sign in with Grantly.
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed" style={{ color: theme.muted, fontFamily: BODY }}>
          This is for developers building their own applications who want
          Grantly to handle login — so your users can sign in without you
          building or maintaining an auth system yourself.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* sidebar */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-3 text-sm">
              {navSections.map((s) => (
                <a key={s.id} href={`#${s.id}`} style={{ color: theme.muted }}>
                  {s.label}
                </a>
              ))}
            </div>
          </nav>

          {/* content */}
          <div className="min-w-0">
            <DocSection id="who-this-is-for" eyebrow="始" title="Who this is for" theme={theme}>
              <p>
                You're building a web app, mobile app, or API — and instead of
                writing your own signup/login screens, password resets, and
                session handling, you want to hand that off to Grantly.
              </p>
              <p>
                Your users sign in once with an account they already
                have — currently{' '}
                <strong style={{ color: theme.text }}>Google</strong> or{' '}
                <strong style={{ color: theme.text }}>GitHub</strong>, with
                more sign-in options added over time — and your app receives
                a signed token confirming who they are. You never see their
                password, and you don't run a user-credentials database.
              </p>
              <p>
                If you're looking for how to use the Grantly{' '}
                <strong style={{ color: theme.text }}>dashboard</strong>{' '}
                itself (creating and managing your applications), that's
                covered in{' '}
                <a href="#create-app" style={{ color: VERMILLION }}>
                  Create an application
                </a>{' '}
                below. Everything else on this page is code you write in{' '}
                <strong style={{ color: theme.text }}>your own app</strong>.
              </p>
            </DocSection>

            <DocSection id="overview" eyebrow="図零" title="How it works" theme={theme}>
              <p>
                Every integration is the same four steps, whether your app is
                a web server, a mobile app, or a single-page app using PKCE.
              </p>
              <div className="mt-2 grid gap-6 sm:grid-cols-2">
                {overviewSteps.map((s) => (
                  <div key={s.mark} className="flex gap-3">
                    <span
                      className="shrink-0 text-xl"
                      style={{ fontFamily: DISPLAY, fontWeight: 700, color: theme.brass }}
                    >
                      {s.mark}
                    </span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: theme.text }}>
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-sm">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="create-app" eyebrow="図一" title="Create an application" theme={theme}>
              <p>
                Sign in to the{' '}
                <Link to="/dashboard" style={{ color: VERMILLION }}>
                  dashboard
                </Link>{' '}
                and click <strong style={{ color: theme.text }}>+ New app</strong>. Give it a name and
                at least one redirect URI — the URL Grantly is allowed to send users back to after
                they sign in.
              </p>
              <p>
                You'll get a <code style={{ color: theme.text }}>client_id</code> and{' '}
                <code style={{ color: theme.text }}>client_secret</code> back — the secret is shown{' '}
                <strong style={{ color: VERMILLION }}>once</strong>. Store it in your backend's
                environment, never in frontend code.
              </p>
            </DocSection>

            <DocSection id="authorize" eyebrow="図二" title="Send users to sign in" theme={theme}>
              <p>
                Generate a PKCE pair and send the user to <code style={{ color: theme.text }}>/auth</code>.
                PKCE is required for every application — there's no opt-out.
              </p>
              <p>
                Grantly shows the user its own sign-in screen, listing
                whichever providers are currently enabled (Google, GitHub,
                and any added later) — your app doesn't need to know or care
                which one they pick.
              </p>
              <CodeBlock
                theme={theme}
                caption="build-auth-url.js"
                code={`function base64url(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
}

const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
const challengeBuf = await crypto.subtle.digest(
  'SHA-256',
  new TextEncoder().encode(verifier)
);
const challenge = base64url(challengeBuf);

// Store the verifier (e.g. sessionStorage) - you'll need it after the redirect.
sessionStorage.setItem('pkce_verifier', verifier);

const url = new URL('https://grantly-e90w.onrender.com/auth');
url.searchParams.set('client_id', CLIENT_ID);
url.searchParams.set('redirect_uri', REDIRECT_URI);
url.searchParams.set('response_type', 'code');
url.searchParams.set('scope', 'openid profile email');
url.searchParams.set('code_challenge', challenge);
url.searchParams.set('code_challenge_method', 'S256');
url.searchParams.set('state', crypto.randomUUID());

window.location.href = url.toString();`}
              />
            </DocSection>

            <DocSection id="exchange" eyebrow="図三" title="Exchange the code" theme={theme}>
              <p>
                Grantly redirects back to your <code style={{ color: theme.text }}>redirect_uri</code> with a{' '}
                <code style={{ color: theme.text }}>code</code> query param. Trade it for tokens from
                your backend — this step needs your{' '}
                <code style={{ color: theme.text }}>client_secret</code>, so it can't happen in the
                browser.
              </p>
              <CodeBlock
                theme={theme}
                caption="exchange-code.js (server-side)"
                code={`const res = await fetch('https://grantly-e90w.onrender.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code_verifier: verifier, // from sessionStorage, sent to your backend
  }),
});

const { access_token, id_token, refresh_token, expires_in } = await res.json();`}
              />
            </DocSection>

            <DocSection id="userinfo" eyebrow="図四" title="Read the user" theme={theme}>
              <p>Call the userinfo endpoint with the access token to get the signed-in user's profile.</p>
              <CodeBlock
                theme={theme}
                caption="get-user.js"
                code={`const res = await fetch('https://grantly-e90w.onrender.com/me', {
  headers: { Authorization: \`Bearer \${access_token}\` },
});

const user = await res.json();
// { sub, email, email_verified, name, picture }`}
              />
              <p>
                <code style={{ color: theme.text }}>sub</code> is the stable, unique identifier for
                this user — use it as the key in your own database, not their email (emails can
                change providers or get re-linked).
              </p>
            </DocSection>

            <DocSection id="logout" eyebrow="図五" title="Log out" theme={theme}>
              <p>
                For RP-initiated logout, send the user to{' '}
                <code style={{ color: theme.text }}>/session/end</code> with an{' '}
                <code style={{ color: theme.text }}>id_token_hint</code> and a{' '}
                <code style={{ color: theme.text }}>post_logout_redirect_uri</code> you've registered.
                Grantly ends the session and sends them back to your app.
              </p>
            </DocSection>

            <DocSection id="reference" eyebrow="図六" title="Reference" theme={theme}>
              <p>Quick lookup — see the full API reference for request/response schemas.</p>
              <div className="border" style={{ borderColor: theme.hairline }}>
                {referenceRows.map((row, i) => (
                  <div
                    key={row.path}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                    style={{
                      borderBottom: i < referenceRows.length - 1 ? `1px solid ${theme.hairline}` : 'none',
                      fontFamily: MONO,
                    }}
                  >
                    <span className="w-14 shrink-0 text-xs" style={{ color: VERMILLION }}>
                      {row.method}
                    </span>
                    <span className="w-56 shrink-0 text-xs" style={{ color: theme.text }}>
                      {row.path}
                    </span>
                    <span className="text-xs" style={{ color: theme.muted, fontFamily: BODY }}>
                      {row.desc}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="https://grantly-e90w.onrender.com/docs"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex self-start border px-4 py-2 text-sm"
                style={{ borderColor: VERMILLION, color: VERMILLION, width: 'fit-content' }}
              >
                Full API reference (Swagger)
              </a>
            </DocSection>
          </div>
        </div>
      </div>

      <footer className="mx-auto max-w-6xl px-6 py-8" style={{ borderTop: `1px solid ${theme.hairline}` }}>
        <p className="text-[11px]" style={{ color: theme.muted, fontFamily: MONO }}>
          印 GRANTLY · © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}