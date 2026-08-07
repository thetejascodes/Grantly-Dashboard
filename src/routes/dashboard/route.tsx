import { createFileRoute, Outlet, Navigate } from '@tanstack/react-router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useSession } from '../../hooks/useSession';
import { LogoutButton } from '../../components/auth/LogoutButton';
import { useGrantlyTheme, rootPageStyle, DISPLAY, MONO, VERMILLION } from '@/lib/theme';

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { data: user, isLoading, isError } = useSession();
  const { theme, isDark, toggleTheme } = useGrantlyTheme();
  const shouldReduceMotion = useReducedMotion();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={rootPageStyle(theme)}>
        <p style={{ color: theme.muted, fontFamily: MONO }}>Checking session…</p>
      </div>
    );
  }

  // Same guard shape as login.tsx — no session, no dashboard.
  // Replace this with your actual beforeLoad guard if it differs.
  if (isError || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen w-full" style={rootPageStyle(theme)}>
      <header
        className="sticky top-0 z-40 backdrop-blur-md transition-colors duration-300"
        style={{ backgroundColor: `${theme.bg}CC`, borderBottom: `1px solid ${theme.hairline}` }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 800, color: theme.text }}>
              Grantly
            </span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: VERMILLION }} />
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs sm:block" style={{ color: theme.muted, fontFamily: MONO }}>
              {user.email ?? 'signed in'}
            </span>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-8 w-8 items-center justify-center overflow-hidden border transition-colors"
              style={{ borderColor: theme.hairline, color: theme.text }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={shouldReduceMotion ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                  className="flex"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <LogoutButton theme={theme} />
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}