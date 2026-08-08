import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun, Moon } from 'lucide-react';


const GITHUB_REPO_URL = 'https://github.com/thetejascodes/Grantly';

interface GithubIconProps {
  className?: string;
}

function GithubIcon({ className }: GithubIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

type CSSVars = CSSProperties & Record<`--${string}`, string>;

function getFadeUp(reduceMotion: boolean): Variants {
  return {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };
}

const SUMI = '#1B1A17';
const SUMI_DEEP = '#0F0E0C';
const PAPER = '#EDE7D9';
const VERMILLION = '#B3272C';
const VERMILLION_LIGHT = '#E0554B';
const VERMILLION_DEEP = '#7A1B1E';
const MUTED_INK = '#9C9282';

const DISPLAY = "'Shippori Mincho', serif";
const BODY = "'Zen Kaku Gothic New', sans-serif";
const MONO = "'JetBrains Mono', monospace";

interface ThemeTokens {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  hairline: string;
  brass: string;
}

const darkTheme: ThemeTokens = {
  bg: '#1B1A17',
  panel: '#242019',
  text: '#EDE7D9',
  muted: '#9C9282',
  hairline: '#3A362C',
  brass: '#B8935B',
};
const lightTheme: ThemeTokens = {
  bg: '#F5F1E6',
  panel: '#EAE2CD',
  text: '#211C16',
  muted: '#6B6255',
  hairline: '#D9CFB4',
  brass: '#8C6A3D',
};

const THEME_STORAGE_KEY = 'grantly-theme';

function inkButtonStyle(): CSSProperties {
  return {
    background: `linear-gradient(155deg, ${VERMILLION_LIGHT}, ${VERMILLION} 55%, ${VERMILLION_DEEP})`,
    color: PAPER,
    fontWeight: 600,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
  };
}

const specRows = [
  { label: 'PKCE', value: 'Enforced on every client, no exceptions' },
  { label: 'Refresh rotation', value: 'Reused token rejected — invalid_grant' },
  { label: 'Secrets at rest', value: 'AES-256-GCM, never stored plaintext' },
  { label: 'Social login', value: 'Google + GitHub, linked by verified email' },
  { label: 'Client API', value: '/clients — ownership-scoped, no /reg needed' },
  { label: 'Test coverage', value: '13/13 suites passing' },
];

const flowSteps = [
  { mark: '一', label: 'Request', detail: 'Your app sends the user to Grantly with a code_challenge' },
  { mark: '二', label: 'Verify', detail: 'Grantly hands off to Google or GitHub to confirm identity' },
  { mark: '三', label: 'Callback', detail: 'The provider returns control to Grantly with proof of identity' },
  { mark: '四', label: 'Seal', detail: 'Grantly stamps and issues the code, then the tokens' },
];

const stats = [
  { value: '<10ms', label: 'Token issuance, end to end', highlight: true },
  { value: '0', label: 'Secrets ever stored in plaintext' },
  { value: '99.9%', label: 'Uptime target' },
  { value: '13/13', label: 'Test suites passing' },
];

const problems = [
  {
    title: 'Rebuilt from scratch, every time',
    body: 'OAuth and OIDC look simple until you implement PKCE, refresh rotation, and token revocation correctly. Most homegrown versions ship subtly wrong.',
  },
  {
    title: "Locked into someone else's roadmap",
    body: "Hosted identity platforms hold your users' logins hostage to their pricing, their outages, and their decisions about what your flow is allowed to look like.",
  },
  {
    title: 'Compliance in name only',
    body: 'Plenty of providers claim to follow the spec. Few would pass a real audit against RFC 6749, RFC 7636, and RFC 7591.',
  },
];

const navLinks = [
  { href: '#why', label: 'Why' },
  { href: '#flow', label: 'Flow' },
  { href: '#spec', label: 'Spec' },
];

function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.05]"
      style={{ mixBlendMode: 'overlay' }}
      aria-hidden="true"
    >
      <filter id="paperGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={4} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paperGrain)" />
    </svg>
  );
}

interface AmbientGlowProps {
  color?: string;
  size?: number;
  className?: string;
}

function AmbientGlow({ color = VERMILLION, size = 380, className = '' }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, backgroundColor: color, opacity: 0.18 }}
    />
  );
}

interface WatermarkKanjiProps {
  char: string;
  color?: string;
  className?: string;
}

function WatermarkKanji({ char, color = PAPER, className = '' }: WatermarkKanjiProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none leading-none ${className}`}
      style={{ fontFamily: DISPLAY, fontWeight: 800, color, opacity: 0.05, fontSize: 'clamp(14rem, 32vw, 26rem)' }}
    >
      {char}
    </span>
  );
}

function FullBleedWave() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: SUMI_DEEP, height: 'clamp(360px, 48vw, 560px)' }}
    >
      <svg
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SUMI_DEEP} />
            <stop offset="55%" stopColor="#1E140F" />
            <stop offset="100%" stopColor="#2E1712" />
          </linearGradient>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={VERMILLION_LIGHT} />
            <stop offset="60%" stopColor={VERMILLION} />
            <stop offset="100%" stopColor={VERMILLION_DEEP} />
          </radialGradient>
          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={VERMILLION} stopOpacity={0.35} />
            <stop offset="100%" stopColor={VERMILLION} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A2A22" />
            <stop offset="100%" stopColor="#241813" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#171008" />
            <stop offset="100%" stopColor={SUMI_DEEP} />
          </linearGradient>
          <linearGradient id="waterFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={VERMILLION} stopOpacity={0.12} />
            <stop offset="100%" stopColor={SUMI_DEEP} stopOpacity={0} />
          </linearGradient>
          <filter id="painterly">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves={2} seed={12} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={14} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="grain2">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={6} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        <rect width="1200" height="560" fill="url(#sky)" />

        <circle cx={840} cy={175} r={230} fill="url(#sunHalo)" />
        <circle cx={840} cy={175} r={98} fill="url(#sunCore)" filter="url(#painterly)" />

        <path
          d="M0,300 C90,270 160,320 260,290 C380,255 440,310 560,285 C680,258 740,300 860,278 C960,258 1040,290 1200,265 L1200,560 L0,560 Z"
          fill="url(#ridgeFar)"
          opacity={0.75}
          filter="url(#painterly)"
        />

        <path
          d="M0,360 C110,330 190,380 320,350 C440,322 520,370 640,345 C760,318 830,360 960,338 C1050,322 1120,345 1200,330 L1200,560 L0,560 Z"
          fill={SUMI}
          opacity={0.92}
          filter="url(#painterly)"
        />

        <path
          d="M0,420 C130,392 230,438 380,410 C500,388 580,425 720,402 C840,382 920,415 1060,398 C1110,392 1160,396 1200,392 L1200,560 L0,560 Z"
          fill="url(#ridgeNear)"
        />

        <rect x={0} y={392} width={1200} height={168} fill="url(#waterFade)" />
        <g stroke={PAPER} strokeOpacity={0.18} strokeWidth={1.5} filter="url(#painterly)">
          <line x1={120} y1={440} x2={260} y2={440} />
          <line x1={520} y1={465} x2={700} y2={465} />
          <line x1={760} y1={440} x2={900} y2={440} />
          <line x1={220} y1={495} x2={400} y2={495} />
          <line x1={880} y1={500} x2={1040} y2={500} />
        </g>

        <path d="M300,150 q14,-16 28,0 q14,-16 28,0" fill="none" stroke={PAPER} strokeOpacity={0.5} strokeWidth={2} />
        <path d="M360,190 q10,-12 20,0 q10,-12 20,0" fill="none" stroke={PAPER} strokeOpacity={0.4} strokeWidth={2} />

        <rect width={1200} height={560} filter="url(#grain2)" opacity={0.05} style={{ mixBlendMode: 'overlay' }} />
      </svg>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: `linear-gradient(to top, ${SUMI_DEEP}, transparent)` }}
      />

      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
        <p className="text-lg tracking-wide sm:text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 700, color: PAPER }}>
          印 <span className="mx-1" style={{ color: MUTED_INK }}>—</span> The Mark
        </p>
      </div>
    </div>
  );
}

interface HankoStampProps {
  id: string;
  chars: string[];
  size?: number;
  rotate?: number;
  delay?: number;
  ring?: boolean;
}

function HankoStamp({ id, chars, size = 120, rotate = -6, delay = 0, ring = true }: HankoStampProps) {
  const shouldReduceMotion = useReducedMotion();
  const fontSize = chars.length > 1 ? size * 0.34 : size * 0.5;
  const lineHeight = size * 0.4;
  const startY = size / 2 - ((chars.length - 1) * lineHeight) / 2;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.7, rotate: rotate - 18 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay, type: 'spring', stiffness: 210, damping: 16 }
      }
      style={{ width: size, height: size }}
      className="relative"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label="Grantly hanko seal"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`inkFill-${id}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={VERMILLION_LIGHT} />
            <stop offset="55%" stopColor={VERMILLION} />
            <stop offset="100%" stopColor={VERMILLION_DEEP} />
          </radialGradient>
          <filter id={`ink-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={7} result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={size * 0.045}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feDropShadow dx={0} dy={size * 0.025} stdDeviation={size * 0.03} floodColor={SUMI_DEEP} floodOpacity={0.55} />
          </filter>
        </defs>
        <g filter={`url(#ink-${id})`}>
          <rect x={size * 0.04} y={size * 0.04} width={size * 0.92} height={size * 0.92} fill={`url(#inkFill-${id})`} />
          <rect
            x={size * 0.13}
            y={size * 0.13}
            width={size * 0.74}
            height={size * 0.74}
            fill="none"
            stroke={PAPER}
            strokeOpacity={0.85}
            strokeWidth={ring ? size * 0.016 : 0}
          />
        </g>
        {chars.map((c, i) => (
          <text
            key={c + i}
            x={size / 2}
            y={startY + i * lineHeight + fontSize * 0.35}
            textAnchor="middle"
            fill={PAPER}
            fontFamily={DISPLAY}
            fontWeight={700}
            fontSize={fontSize}
          >
            {c}
          </text>
        ))}
      </svg>
    </motion.div>
  );
}

interface FlowSchematicProps {
  theme: ThemeTokens;
}

function FlowSchematic({ theme }: FlowSchematicProps) {
  const boxes = [
    { x: 10, label: 'YOUR APP' },
    { x: 212, label: 'GRANTLY' },
    { x: 414, label: 'GOOGLE / GITHUB' },
  ];
  return (
    <svg viewBox="0 0 560 300" className="w-full" role="img" aria-label="Authorization flow diagram">
      <defs>
        <marker id="arrowPaper" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={theme.text} />
        </marker>
        <marker id="arrowVermillion" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={VERMILLION} />
        </marker>
      </defs>

      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={36} width={136} height={54} fill="none" stroke={theme.text} strokeWidth={1.25} />
          <text x={b.x + 68} y={68} textAnchor="middle" fill={theme.text} fontSize={11} fontFamily={MONO} letterSpacing="0.5">
            {b.label}
          </text>
        </g>
      ))}

      <line x1={146} y1={56} x2={210} y2={56} stroke={theme.text} strokeWidth={1.25} markerEnd="url(#arrowPaper)" />
      <line x1={350} y1={56} x2={412} y2={56} stroke={theme.text} strokeWidth={1.25} markerEnd="url(#arrowPaper)" />
      <line x1={412} y1={78} x2={350} y2={78} stroke={theme.text} strokeWidth={1.25} markerEnd="url(#arrowPaper)" />
      <path
        d="M 280 92 C 280 180, 82 180, 82 94"
        fill="none"
        stroke={VERMILLION}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        markerEnd="url(#arrowVermillion)"
      />

      {[
        { x: 178, y: 44, mark: '一' },
        { x: 381, y: 44, mark: '二' },
        { x: 381, y: 90, mark: '三' },
        { x: 178, y: 196, mark: '四' },
      ].map((s) => (
        <g key={s.mark}>
          <circle cx={s.x} cy={s.y} r={9} fill={theme.panel} stroke={s.mark === '四' ? VERMILLION : theme.hairline} strokeWidth={1} />
          <text
            x={s.x}
            y={s.y + 4}
            textAnchor="middle"
            fill={s.mark === '四' ? VERMILLION : theme.muted}
            fontSize={10}
            fontFamily={DISPLAY}
            fontWeight={700}
          >
            {s.mark}
          </text>
        </g>
      ))}

      <text x={280} y={230} textAnchor="middle" fill={theme.muted} fontSize={9.5} fontFamily={MONO}>
        code_challenge · S256
      </text>
      <text x={280} y={250} textAnchor="middle" fill={VERMILLION} fontSize={9.5} fontFamily={MONO}>
        access_token · RS256 · exp 15m
      </text>
      <text x={482} y={22} textAnchor="middle" fill={theme.muted} fontSize={9.5} fontFamily={MONO}>
        linked by verified email
      </text>
    </svg>
  );
}

function readInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light') return false;
  if (stored === 'dark') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function LandingPage() {
  const [isDark, setIsDark] = useState<boolean>(readInitialTheme);
  const shouldReduceMotion = useReducedMotion();
  const fade = getFadeUp(!!shouldReduceMotion);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = shouldReduceMotion ? 'auto' : 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [shouldReduceMotion]);

  const rootStyle: CSSVars = {
    backgroundColor: theme.bg,
    backgroundImage: `radial-gradient(ellipse 1200px 700px at 70% -10%, ${theme.panel} 0%, ${theme.bg} 55%)`,
    color: theme.text,
    fontFamily: BODY,
    '--vermillion': VERMILLION,
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden transition-colors duration-300" style={rootStyle}>
      <GrainOverlay />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-4 top-1/2 hidden -translate-y-1/2 text-[11px] tracking-[0.4em] lg:block"
        style={{ writingMode: 'vertical-rl', color: theme.brass, fontFamily: MONO, opacity: 0.45 }}
      >
        認可 · 整合性 · 信頼
      </div>

      {/* ---------------- Nav ---------------- */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md transition-colors duration-300"
        style={{ backgroundColor: `${theme.bg}CC`, borderBottom: `1px solid ${theme.hairline}` }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-tight" style={{ fontFamily: DISPLAY, fontWeight: 800 }}>
              Grantly
            </span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: VERMILLION }} />
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm" style={{ color: theme.muted }}>
                {l.label}
              </a>
            ))}
            <Link to="/docs" className="text-sm" style={{ color: theme.muted }}>
              Docs
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 border px-3 py-1.5 text-sm sm:flex"
              style={{ borderColor: theme.hairline, color: theme.text }}
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <button
              type="button"
              onClick={() => setIsDark((v) => !v)}
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
            <Button
              className="rounded-none px-4 transition-shadow duration-300 hover:shadow-[0_0_28px_-6px_var(--vermillion)]"
              style={inkButtonStyle()}
              onClick={() => (window.location.href = '/login')}
            >
              Sign in
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <WatermarkKanji char="許" color={theme.text} className="-left-10 -top-20 hidden lg:block" />
          <div className="relative grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="lg:pl-2">
              <div className="mb-5 flex items-start gap-3">
                <span
                  className="hidden pt-0.5 text-[10px] leading-none tracking-[0.3em] sm:block"
                  style={{ writingMode: 'vertical-rl', color: theme.muted, fontFamily: MONO }}
                >
                  認可発行
                </span>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={fade}
                  custom={0}
                  className="inline-flex items-center gap-2 border px-3 py-1 text-xs"
                  style={{ borderColor: theme.hairline, color: theme.muted }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: VERMILLION }} />
                  <span style={{ fontFamily: MONO }}>LIVE · grantly-e90w.onrender.com</span>
                </motion.div>
              </div>

              <motion.h1
                initial="hidden"
                animate="show"
                variants={fade}
                custom={1}
                className="text-[2.6rem] leading-[1.1] sm:text-6xl"
                style={{ fontFamily: DISPLAY, fontWeight: 800 }}
              >
                Identity,
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(100deg, ${VERMILLION_LIGHT}, ${VERMILLION} 60%, ${VERMILLION_DEEP})`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  sealed and signed.
                </span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fade}
                custom={2}
                className="mt-5 max-w-md text-base leading-relaxed"
                style={{ color: theme.muted }}
              >
                Grantly is an OpenID Connect provider you host yourself — the
                authorization code flow, PKCE, refresh rotation, social login,
                all built to the RFCs, not around them.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fade}
                custom={3}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Button
                  className="rounded-none px-6 transition-shadow duration-300 hover:shadow-[0_0_28px_-6px_var(--vermillion)]"
                  style={inkButtonStyle()}
                  onClick={() => (window.location.href = '/login')}
                >
                  Get started <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Link
                  to="/docs"
                  className="inline-flex items-center border px-6 py-2 text-sm"
                  style={{ borderColor: theme.hairline, color: theme.text }}
                >
                  Read the docs
                </Link>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border px-6 py-2 text-sm"
                  style={{ borderColor: theme.hairline, color: theme.text }}
                >
                  <GithubIcon className="h-4 w-4" />
                  View on GitHub
                </a>
              </motion.div>

              <motion.div initial="hidden" animate="show" variants={fade} custom={4} className="mt-7 flex flex-wrap gap-2">
                {['RFC 6749', 'RFC 7636 · PKCE', 'RFC 7591'].map((spec) => (
                  <span
                    key={spec}
                    className="border px-2 py-1 text-[10px]"
                    style={{ borderColor: theme.hairline, color: theme.muted, fontFamily: MONO }}
                  >
                    {spec}
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="relative flex flex-col items-center lg:items-end lg:pr-4">
              <AmbientGlow size={320} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-8" />
              <div
                className="absolute -top-6 right-6 hidden text-[10px] tracking-[0.2em] sm:block"
                style={{ color: theme.brass, fontFamily: MONO }}
              >
                許可 — KYOKA
              </div>
              <HankoStamp id="hero" chars={['許', '可']} size={200} rotate={-7} delay={0.3} />
              <div
                className="relative mt-5 flex w-[200px] items-center justify-between border-t pt-2 text-[10px] tracking-[0.15em]"
                style={{ borderColor: theme.hairline, color: theme.muted, fontFamily: MONO }}
              >
                <span>01</span>
                <span>GRANTLY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Why Grantly ---------------- */}
        <section id="why" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16" style={{ borderTop: `1px solid ${theme.hairline}` }}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            className="mb-6 text-[10px] tracking-[0.2em]"
            style={{ color: theme.brass, fontFamily: MONO }}
          >
            図零 — WHY GRANTLY
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            custom={1}
            className="max-w-xl text-2xl sm:text-4xl"
            style={{ fontFamily: DISPLAY, fontWeight: 800 }}
          >
            Login shouldn't be your product.
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            custom={2}
            className="mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: theme.muted }}
          >
            Every app needs identity. Almost none of them should spend months
            building it — and none of them should have to hand their users
            over to someone else's black box either.
          </motion.p>

          <div className="mt-12 grid gap-px sm:grid-cols-3" style={{ backgroundColor: theme.hairline }}>
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={fade}
                custom={i}
                className="flex flex-col gap-2 px-6 py-8"
                style={{ backgroundColor: theme.bg }}
              >
                <p className="text-sm font-medium" style={{ color: theme.text }}>
                  {p.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            custom={3}
            className="mt-10 max-w-lg text-base leading-relaxed"
            style={{ color: theme.text, fontFamily: DISPLAY }}
          >
            Grantly exists to close that gap — a provider you host yourself,
            built to the letter of the RFCs, with nothing borrowed and nothing
            hidden.
          </motion.p>
        </section>

        {/* ---------------- Flow ---------------- */}
        <section id="flow" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 lg:pl-16" style={{ borderTop: `1px solid ${theme.hairline}` }}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            className="mb-8 text-[10px] tracking-[0.2em]"
            style={{ color: theme.brass, fontFamily: MONO }}
          >
            図一 — AUTHORIZATION FLOW
          </motion.p>

          <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={fade}
              className="border p-6"
              style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}
            >
              <FlowSchematic theme={theme} />
            </motion.div>

            <div className="flex flex-col gap-6 lg:pt-2">
              {flowSteps.map((s, i) => (
                <motion.div
                  key={s.mark}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fade}
                  custom={i}
                  className="flex gap-4"
                >
                  <span
                    className="shrink-0 text-2xl"
                    style={{ fontFamily: DISPLAY, fontWeight: 700, color: i === 3 ? VERMILLION : theme.brass }}
                  >
                    {s.mark}
                  </span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.text }}>
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed" style={{ color: theme.muted }}>
                      {s.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Spec sheet ---------------- */}
        <section id="spec" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16" style={{ borderTop: `1px solid ${theme.hairline}` }}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            className="mb-8 text-[10px] tracking-[0.2em]"
            style={{ color: theme.brass, fontFamily: MONO }}
          >
            図二 — SPECIFICATION
          </motion.p>
          <div style={{ border: `1px solid ${theme.hairline}` }}>
            {specRows.map((row, i) => (
              <motion.div
                key={row.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={fade}
                custom={i}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
                style={{ borderBottom: i < specRows.length - 1 ? `1px solid ${theme.hairline}` : 'none' }}
              >
                <div className="flex w-full shrink-0 items-center gap-2.5 sm:w-56" style={{ fontFamily: MONO }}>
                  <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: VERMILLION }} />
                  <span className="text-sm">{row.label}</span>
                </div>
                <span className="text-sm" style={{ color: theme.muted }}>
                  {row.value}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- Numbers ---------------- */}
        <section className="mx-auto max-w-6xl px-6 py-16" style={{ borderTop: `1px solid ${theme.hairline}` }}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            className="mb-8 text-[10px] tracking-[0.2em]"
            style={{ color: theme.brass, fontFamily: MONO }}
          >
            図三 — NUMBERS
          </motion.p>
          <div className="grid gap-px sm:grid-cols-4" style={{ backgroundColor: theme.hairline }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={fade}
                custom={i}
                className="flex flex-col justify-center gap-1.5 px-6 py-10"
                style={{
                  background: s.highlight
                    ? `linear-gradient(160deg, ${VERMILLION_LIGHT}, ${VERMILLION} 60%, ${VERMILLION_DEEP})`
                    : theme.bg,
                }}
              >
                <span
                  className="text-4xl sm:text-5xl"
                  style={{ fontFamily: DISPLAY, fontWeight: 800, color: s.highlight ? PAPER : theme.text }}
                >
                  {s.value}
                </span>
                <span className="text-sm" style={{ color: s.highlight ? `${PAPER}CC` : theme.muted }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <FullBleedWave />

        {/* ---------------- CTA / seal of approval ---------------- */}
        <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20">
          <div
            className="relative grid items-center gap-12 border px-8 py-16 sm:px-14 lg:grid-cols-[0.8fr_1.2fr]"
            style={{ borderColor: theme.hairline, backgroundColor: theme.panel }}
          >
            <div className="relative flex justify-center lg:justify-start">
              <AmbientGlow size={260} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative flex flex-col items-center gap-3">
                <HankoStamp id="cta" chars={['許', '可']} size={150} rotate={-9} />
                <span className="text-[10px] tracking-[0.25em]" style={{ color: theme.brass, fontFamily: MONO }}>
                  KYOKA — GRANTED
                </span>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl" style={{ fontFamily: DISPLAY, fontWeight: 800 }}>
                Stop building login screens.
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm sm:mx-0" style={{ color: theme.muted }}>
                Point your app at Grantly. It handles identity from here.
              </p>
              <Button
                className="mt-8 rounded-none px-7 transition-shadow duration-300 hover:shadow-[0_0_28px_-6px_var(--vermillion)]"
                style={inkButtonStyle()}
                onClick={() => (window.location.href = '/login')}
              >
                Get started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="mx-auto max-w-6xl px-6 py-8" style={{ borderTop: `1px solid ${theme.hairline}` }}>
        <div
          className="flex flex-col items-center justify-between gap-3 text-[11px] sm:flex-row"
          style={{ color: theme.muted, fontFamily: MONO }}
        >
          <span>印 GRANTLY · AUTHORIZATION SERVICE · © {new Date().getFullYear()}</span>
          <div className="flex gap-5">
            <a href="/login">Sign in</a>
            <Link to="/docs">Docs</Link>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}