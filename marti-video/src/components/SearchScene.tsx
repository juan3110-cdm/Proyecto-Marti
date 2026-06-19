import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, AbsoluteFill } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { GOLD, INK, WHITE } from '../tokens';

const { fontFamily: playfair } = loadPlayfair('normal', { weights: ['700', '400'] });
const { fontFamily: inter } = loadInter('normal', { weights: ['400', '500', '600'] });

const CARDS = [
  { badge: 'APARTAMENTO', op: 'VENTA',    title: 'Las Mercedes', beds: 3, baths: 2, sqm: 142 },
  { badge: 'CASA',        op: 'ALQUILER', title: 'La Lagunita',  beds: 4, baths: 3, sqm: 280 },
  { badge: 'APARTAMENTO', op: 'VENTA',    title: 'Pampatar',     beds: 2, baths: 2, sqm: 98  },
];

function PropertyCard({ card, delay, frame, fps, compact = false }: {
  card: typeof CARDS[0], delay: number, frame: number, fps: number, compact?: boolean
}) {
  const cardY = spring({ frame: frame - delay, fps, from: 80, to: 0, config: { damping: 14, stiffness: 120 } });
  const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      background: INK, borderRadius: 18, padding: compact ? '16px 18px' : '20px 22px',
      width: compact ? 200 : 240,
      transform: `translateY(${cardY}px)`, opacity: cardOpacity,
      boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <span style={{ background: GOLD, color: INK, borderRadius: 999, padding: '4px 10px', fontSize: compact ? 10 : 11, fontFamily: inter, fontWeight: 600 }}>{card.badge}</span>
        <span style={{ background: 'rgba(255,255,255,0.12)', color: WHITE, borderRadius: 999, padding: '4px 10px', fontSize: compact ? 10 : 11, fontFamily: inter, fontWeight: 500 }}>{card.op}</span>
      </div>
      <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: compact ? 16 : 20, color: WHITE, marginBottom: 10 }}>{card.title}</div>
      <div style={{ display: 'flex', gap: 10 }}>
        {[`${card.beds} hab`, `${card.baths} baños`, `${card.sqm} m²`].map((spec, i) => (
          <span key={i} style={{ fontFamily: inter, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{spec}</span>
        ))}
      </div>
    </div>
  );
}

export const SearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const sceneOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const leftX = interpolate(frame, [0, 20], [-100, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const rightX = interpolate(frame, [0, 20], [100, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const chipsOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });
  const chipsX = interpolate(frame, [20, 35], [-30, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const count = Math.floor(interpolate(frame, [40, 110], [0, 82], { extrapolateRight: 'clamp' }));
  const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
  const searchOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' });

  if (isPortrait) {
    // PORTRAIT: single clean dark background — skyline as decorative top band,
    // all content below it, fully readable, no overlaps
    const contentY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    const contentOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

    return (
      <AbsoluteFill style={{ opacity: sceneOpacity, background: INK, flexDirection: 'column' }}>

        {/* Top decorative skyline band — fixed height, no overflow into content */}
        <div style={{ height: 360, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          <CaracasSkyline />
          {/* Fade-to-dark gradient at bottom so it blends cleanly */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
            background: `linear-gradient(to bottom, transparent, ${INK})`,
          }} />
        </div>

        {/* All content below — clean, no overlap */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          padding: '0 40px 60px',
          opacity: contentOpacity, transform: `translateY(${contentY}px)`,
        }}>

          {/* Eyebrow label */}
          <div style={{
            fontFamily: inter, fontWeight: 600, fontSize: 13, color: GOLD,
            letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14,
          }}>
            Caracas · Isla de Margarita
          </div>

          {/* Headline */}
          <div style={{
            fontFamily: playfair, fontWeight: 700, fontSize: 44, color: WHITE,
            textAlign: 'center', lineHeight: 1.15, marginBottom: 36,
          }}>
            82 propiedades esperan por ti
          </div>

          {/* Filter chips */}
          <div style={{
            display: 'flex', gap: 14, marginBottom: 28,
            opacity: chipsOpacity, transform: `translateX(${chipsX}px)`,
          }}>
            {['Todas', 'Venta', 'Alquiler'].map((chip, i) => (
              <div key={chip} style={{
                background: i === 0 ? GOLD : 'rgba(255,255,255,0.1)',
                color: i === 0 ? INK : WHITE,
                borderRadius: 999, padding: '12px 26px',
                fontFamily: inter, fontWeight: 600, fontSize: 16,
                border: i === 0 ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
              }}>{chip}</div>
            ))}
          </div>

          {/* Search bar */}
          <div style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: 16,
            padding: '18px 24px', border: '1.5px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%',
            opacity: searchOpacity, marginBottom: 32,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke={GOLD} strokeWidth="2" />
              <line x1="14" y1="14" x2="18" y2="18" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: inter, fontSize: 16, color: 'rgba(255,255,255,0.45)', flex: 1 }}>
              Altamira, Pampatar…
            </span>
            <span style={{ opacity: cursorOpacity, color: GOLD, fontSize: 20, fontWeight: 700 }}>|</span>
          </div>

          {/* Property cards — horizontal row, full width */}
          <div style={{ display: 'flex', gap: 16, width: '100%', marginBottom: 28 }}>
            {CARDS.slice(0, 2).map((card, i) => {
              const cardY2 = spring({ frame: frame - (30 + i * 14), fps, from: 50, to: 0, config: { damping: 14, stiffness: 120 } });
              const cardOp = interpolate(frame, [30 + i * 14, 44 + i * 14], [0, 1], { extrapolateRight: 'clamp' });
              return (
                <div key={i} style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.07)', borderRadius: 18,
                  padding: '20px 18px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transform: `translateY(${cardY2}px)`, opacity: cardOp,
                }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span style={{ background: GOLD, color: INK, borderRadius: 999, padding: '4px 10px', fontSize: 11, fontFamily: inter, fontWeight: 700 }}>{card.badge}</span>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: WHITE, borderRadius: 999, padding: '4px 10px', fontSize: 11, fontFamily: inter }}>{card.op}</span>
                  </div>
                  <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 19, color: WHITE, marginBottom: 10 }}>{card.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[`${card.beds} hab`, `${card.baths} baños`, `${card.sqm} m²`].map((spec, j) => (
                      <span key={j} style={{ fontFamily: inter, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{spec}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Counter pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: GOLD, borderRadius: 999, padding: '14px 32px',
            opacity: counterOpacity,
          }}>
            <span style={{ fontFamily: inter, fontWeight: 700, fontSize: 24, color: INK }}>{count}</span>
            <span style={{ fontFamily: inter, fontWeight: 600, fontSize: 16, color: INK }}>propiedades disponibles</span>
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // LANDSCAPE layout (original)
  return (
    <AbsoluteFill style={{ opacity: sceneOpacity, flexDirection: 'column', background: '#f8f7f4' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        <div style={{ flex: 1, overflow: 'hidden', transform: `translateX(${leftX}px)` }}>
          <CaracasSkyline />
        </div>
        <div style={{
          width: 80, zIndex: 2, flexShrink: 0,
          background: 'linear-gradient(to right, rgba(26,26,26,0.55) 0%, transparent 50%, rgba(10,42,58,0.55) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ flex: 1, overflow: 'hidden', transform: `translateX(${rightX}px)` }}>
          <MargaritaSkyline />
        </div>
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 60,
      }}>
        <div style={{
          display: 'flex', gap: 12, marginBottom: 24,
          opacity: chipsOpacity, transform: `translateX(${chipsX}px)`,
        }}>
          {['Todas', 'Venta', 'Alquiler'].map((chip, i) => (
            <div key={chip} style={{
              background: i === 0 ? INK : 'rgba(255,255,255,0.9)',
              color: i === 0 ? GOLD : INK,
              borderRadius: 999, padding: '10px 26px',
              fontFamily: inter, fontWeight: 600, fontSize: 16,
              border: i === 0 ? `2px solid ${INK}` : `2px solid rgba(0,0,0,0.15)`,
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            }}>{chip}</div>
          ))}
        </div>

        <div style={{
          background: 'white', borderRadius: 14, padding: '16px 24px',
          display: 'flex', alignItems: 'center', gap: 12,
          width: 560, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          opacity: searchOpacity, marginBottom: 28,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke={GOLD} strokeWidth="2" />
            <line x1="14" y1="14" x2="18" y2="18" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: inter, fontSize: 15, color: '#999' }}>Altamira, La Lagunita, Pampatar…</span>
          <span style={{ opacity: cursorOpacity, color: GOLD, fontSize: 18, fontWeight: 700 }}>|</span>
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          {CARDS.map((card, i) => (
            <PropertyCard key={i} card={card} delay={30 + i * 14} frame={frame} fps={fps} />
          ))}
        </div>

        <div style={{
          fontFamily: inter, fontWeight: 600, fontSize: 18, color: WHITE,
          background: 'rgba(0,0,0,0.55)', borderRadius: 8, padding: '8px 20px',
          opacity: counterOpacity,
        }}>
          <span style={{ color: GOLD, fontWeight: 700, fontSize: 22 }}>{count}</span>
          {' '}propiedades disponibles
        </div>
      </div>
    </AbsoluteFill>
  );
};

function CaracasSkyline() {
  return (
    <div style={{ width: '100%', height: '100%', background: INK, display: 'flex', alignItems: 'flex-end' }}>
      <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMax meet">
        <rect x="20" y="160" width="40" height="240" fill="#2a2826" />
        <rect x="30" y="120" width="20" height="280" fill="#2a2826" />
        <rect x="70" y="200" width="55" height="200" fill="#222" />
        <rect x="80" y="170" width="35" height="230" fill="#282624" />
        <rect x="135" y="140" width="30" height="260" fill="#2a2826" />
        <rect x="140" y="100" width="20" height="300" fill="#333" />
        <rect x="175" y="180" width="50" height="220" fill="#222" />
        <rect x="235" y="150" width="40" height="250" fill="#2a2826" />
        <rect x="285" y="130" width="60" height="270" fill="#2e2c2a" />
        <rect x="300" y="90" width="30" height="310" fill="#333" />
        <rect x="355" y="160" width="45" height="240" fill="#222" />
        <rect x="410" y="200" width="35" height="200" fill="#2a2826" />
        <rect x="450" y="140" width="50" height="260" fill="#2e2c2a" />
        {[40, 80, 145, 180, 240, 295, 360, 415, 460].map((x, i) => (
          <rect key={i} x={x + 5} y={120 + i * 10} width={6} height={6} fill={GOLD} opacity={0.7} />
        ))}
        <text x="250" y="60" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="system-ui" fontSize="18" letterSpacing="4">CARACAS</text>
      </svg>
    </div>
  );
}

function MargaritaSkyline() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a2a3a', display: 'flex', alignItems: 'flex-end' }}>
      <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMax meet">
        <ellipse cx="150" cy="340" rx="200" ry="80" fill="#0d3348" />
        <ellipse cx="380" cy="360" rx="160" ry="60" fill="#0f3c54" />
        <rect x="50" y="240" width="60" height="100" rx="4" fill="#0f3c54" />
        <rect x="120" y="270" width="40" height="70" rx="3" fill="#0d3348" />
        <rect x="200" y="220" width="80" height="120" rx="4" fill="#0f3c54" />
        <rect x="300" y="250" width="55" height="90" rx="3" fill="#0d3348" />
        <rect x="380" y="230" width="70" height="110" rx="4" fill="#0f3c54" />
        <line x1="170" y1="340" x2="170" y2="280" stroke="#1a5a3a" strokeWidth="4" />
        <ellipse cx="170" cy="275" rx="18" ry="12" fill="#1a6a40" />
        <line x1="350" y1="350" x2="350" y2="290" stroke="#1a5a3a" strokeWidth="4" />
        <ellipse cx="350" cy="285" rx="16" ry="11" fill="#1a6a40" />
        <rect x="0" y="350" width="500" height="50" fill="#0a4a6e" opacity="0.6" />
        {[60, 130, 220, 320, 430].map((x, i) => (
          <circle key={i} cx={x} cy={360 + i * 3} r={2} fill={GOLD} opacity={0.5} />
        ))}
        <text x="250" y="60" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="system-ui" fontSize="18" letterSpacing="4">ISLA DE MARGARITA</text>
      </svg>
    </div>
  );
}
