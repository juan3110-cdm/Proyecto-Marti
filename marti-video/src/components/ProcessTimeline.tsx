import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, AbsoluteFill } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { GOLD, INK, TEXT, WHITE } from '../tokens';

const { fontFamily: playfair } = loadPlayfair('normal', { weights: ['700', '400'] });
const { fontFamily: inter } = loadInter('normal', { weights: ['400', '500', '600'] });

const STEPS = [
  { emoji: '🔍', title: 'Explora propiedades', desc: 'Navega 82+ listados en Caracas & Margarita' },
  { emoji: '📞', title: 'Contacta un asesor', desc: 'WhatsApp o formulario, respuesta en 24h' },
  { emoji: '📋', title: 'Revisión & negociación', desc: 'Tu asesor revisa docs y negocia términos' },
  { emoji: '🔑', title: 'Firma y llaves', desc: 'Contrato firmado, llaves en mano' },
];

export const ProcessTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const sceneOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const lineProgress = interpolate(frame, [20, 140], [0, 100], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });

  if (isPortrait) {
    return (
      <AbsoluteFill style={{
        background: WHITE, opacity: sceneOpacity,
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '60px 48px',
      }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: inter, fontWeight: 600, fontSize: 14,
          color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: 10, opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>— El Proceso</div>

        {/* Title */}
        <div style={{
          fontFamily: playfair, fontWeight: 700, fontSize: 44, color: TEXT,
          marginBottom: 48, textAlign: 'center', lineHeight: 1.15,
          opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>Así trabajamos para ti</div>

        {/* Vertical timeline */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', left: 43, top: 44,
            width: 3, height: `calc(${lineProgress}% * 3)`,
            background: GOLD, borderRadius: 2,
            boxShadow: `0 0 12px ${GOLD}88`,
            maxHeight: 'calc(100% - 44px)',
          }} />
          <div style={{
            position: 'absolute', left: 43, top: 44,
            width: 3, bottom: 44,
            background: 'rgba(0,0,0,0.08)', borderRadius: 2,
          }} />

          {/* Steps vertical */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {STEPS.map((step, i) => {
              const delay = 20 + i * 32;
              const cardY = spring({ frame: frame - delay, fps, from: 30, to: 0, config: { damping: 13, stiffness: 130 } });
              const cardOpacity = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateRight: 'clamp' });
              const glowOpacity = interpolate(frame, [delay + 6, delay + 30], [0.8, 0], { extrapolateRight: 'clamp' });

              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  opacity: cardOpacity, transform: `translateY(${cardY}px)`,
                }}>
                  {/* Circle */}
                  <div style={{
                    width: 88, height: 88, borderRadius: '50%', flexShrink: 0,
                    background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32, position: 'relative', zIndex: 2,
                    boxShadow: `0 0 ${28 * glowOpacity}px ${GOLD}`,
                  }}>
                    {step.emoji}
                    <div style={{
                      position: 'absolute', top: -4, right: -4,
                      width: 26, height: 26, borderRadius: '50%',
                      background: INK, color: WHITE,
                      fontFamily: inter, fontWeight: 700, fontSize: 13,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{i + 1}</div>
                  </div>

                  {/* Card */}
                  <div style={{
                    background: INK, borderRadius: 16, padding: '18px 20px',
                    flex: 1, boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
                  }}>
                    <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 18, color: WHITE, marginBottom: 6 }}>
                      {step.title}
                    </div>
                    <div style={{ fontFamily: inter, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // LANDSCAPE layout
  return (
    <AbsoluteFill style={{
      background: WHITE, opacity: sceneOpacity,
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '0 80px',
    }}>
      <div style={{
        fontFamily: inter, fontWeight: 600, fontSize: 13,
        color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase',
        marginBottom: 12, opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>— El Proceso</div>

      <div style={{
        fontFamily: playfair, fontWeight: 700, fontSize: 52, color: TEXT,
        marginBottom: 64, textAlign: 'center',
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>Así trabajamos para ti</div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 1100 }}>
        {/* Track */}
        <div style={{
          position: 'absolute', top: 44, left: '6%', right: '6%', height: 3,
          background: 'rgba(0,0,0,0.08)', borderRadius: 2,
        }} />
        {/* Fill */}
        <div style={{
          position: 'absolute', top: 44, left: '6%', height: 3,
          width: `${lineProgress * 0.88}%`,
          background: GOLD, borderRadius: 2,
          boxShadow: `0 0 12px ${GOLD}88`,
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {STEPS.map((step, i) => {
            const delay = 20 + i * 32;
            const cardY = spring({ frame: frame - delay, fps, from: 50, to: 0, config: { damping: 13, stiffness: 130 } });
            const cardOpacity = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateRight: 'clamp' });
            const glowOpacity = interpolate(frame, [delay + 6, delay + 30], [0.8, 0], { extrapolateRight: 'clamp' });

            return (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: '23%', opacity: cardOpacity, transform: `translateY(${cardY}px)`,
              }}>
                <div style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 34, marginBottom: 28, position: 'relative',
                  boxShadow: `0 0 ${32 * glowOpacity}px ${GOLD}`, zIndex: 2,
                }}>
                  {step.emoji}
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    width: 26, height: 26, borderRadius: '50%',
                    background: INK, color: WHITE,
                    fontFamily: inter, fontWeight: 700, fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{i + 1}</div>
                </div>
                <div style={{
                  background: INK, borderRadius: 16, padding: '20px 18px',
                  textAlign: 'center', width: '100%',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
                }}>
                  <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 18, color: WHITE, marginBottom: 8 }}>
                    {step.title}
                  </div>
                  <div style={{ fontFamily: inter, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
