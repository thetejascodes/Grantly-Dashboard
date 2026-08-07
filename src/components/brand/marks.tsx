import { motion, useReducedMotion } from 'framer-motion';
import { SUMI_DEEP, PAPER, VERMILLION, VERMILLION_LIGHT, VERMILLION_DEEP, DISPLAY } from '@/lib/theme';

interface IconProps {
  className?: string;
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

// Monochrome "G" mark rather than Google's full-color logo — keeps the
// button consistent with the page's single-ink aesthetic instead of
// dropping a multicolor brand mark into an otherwise vermillion-on-paper UI.
export function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <circle cx={12} cy={12} r={9.5} />
      <path d="M12 12h6.2c.1.6.15 1.2.15 1.8 0 3.8-2.6 6.7-6.35 6.7A8.5 8.5 0 1 1 12 3.5c2.15 0 3.95.78 5.35 2.05l-2.2 2.1c-.8-.75-1.85-1.2-3.15-1.2-2.7 0-4.9 2.25-4.9 5.05s2.2 5.05 4.9 5.05c2.35 0 3.95-1.35 4.25-3.2H12v-2.35Z" />
    </svg>
  );
}

interface AmbientGlowProps {
  color?: string;
  size?: number;
  className?: string;
}

export function AmbientGlow({ color = VERMILLION, size = 380, className = '' }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, backgroundColor: color, opacity: 0.18 }}
    />
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

// The recurring signature mark — a hand-carved hanko seal, stamped in
// vermillion. Fixed ink palette regardless of page theme.
export function HankoStamp({ id, chars, size = 120, rotate = -6, delay = 0, ring = true }: HankoStampProps) {
  const shouldReduceMotion = useReducedMotion();
  const fontSize = chars.length > 1 ? size * 0.34 : size * 0.5;
  const lineHeight = size * 0.4;
  const startY = size / 2 - ((chars.length - 1) * lineHeight) / 2;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.7, rotate: rotate - 18 }}
      animate={{ opacity: 1, scale: 1, rotate }}
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