import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

// ---------------------------------------------------------------------------
// Shared "hanko" theme — pulled out of LandingPage.tsx so login/dashboard
// pages can use the same tokens and stay in sync via localStorage.
// ---------------------------------------------------------------------------

export type CSSVars = CSSProperties & Record<`--${string}`, string>;

export const SUMI = '#1B1A17';
export const SUMI_DEEP = '#0F0E0C';
export const PAPER = '#EDE7D9';
export const VERMILLION = '#B3272C';
export const VERMILLION_LIGHT = '#E0554B';
export const VERMILLION_DEEP = '#7A1B1E';
export const MUTED_INK = '#9C9282';

export const DISPLAY = "'Shippori Mincho', serif";
export const BODY = "'Zen Kaku Gothic New', sans-serif";
export const MONO = "'JetBrains Mono', monospace";

export interface ThemeTokens {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  hairline: string;
  brass: string;
}

export const darkTheme: ThemeTokens = {
  bg: '#1B1A17',
  panel: '#242019',
  text: '#EDE7D9',
  muted: '#9C9282',
  hairline: '#3A362C',
  brass: '#B8935B',
};

export const lightTheme: ThemeTokens = {
  bg: '#F5F1E6',
  panel: '#EAE2CD',
  text: '#211C16',
  muted: '#6B6255',
  hairline: '#D9CFB4',
  brass: '#8C6A3D',
};

export const THEME_STORAGE_KEY = 'grantly-theme';

export function inkButtonStyle(): CSSProperties {
  return {
    background: `linear-gradient(155deg, ${VERMILLION_LIGHT}, ${VERMILLION} 55%, ${VERMILLION_DEEP})`,
    color: PAPER,
    fontWeight: 600,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
  };
}

function readInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light') return false;
  if (stored === 'dark') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Shared dark/light theme hook. Each page that calls this reads the same
 * localStorage key, so a toggle on one page is picked up by the next page
 * the user navigates to (full sync would need a Context provider at the
 * router root — this is the lighter-weight version that's enough for a
 * multi-page app where each route mounts fresh).
 */
export function useGrantlyTheme() {
  const [isDark, setIsDark] = useState<boolean>(readInitialTheme);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  return { theme, isDark, toggleTheme: () => setIsDark((v) => !v) };
}

export function rootPageStyle(theme: ThemeTokens): CSSVars {
  return {
    backgroundColor: theme.bg,
    backgroundImage: `radial-gradient(ellipse 1200px 700px at 70% -10%, ${theme.panel} 0%, ${theme.bg} 55%)`,
    color: theme.text,
    fontFamily: BODY,
    '--vermillion': VERMILLION,
  };
}