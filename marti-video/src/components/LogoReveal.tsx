import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { GOLD, TEXT } from '../tokens';
import { BrandIcon } from './BrandIcon';

const { fontFamily: playfair } = loadPlayfair('normal', { weights: ['700', '400'] });

const WORDMARK = 'Proyecto Martí';
const SUBTITLE = 'BIENES RAÍCES';

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const iconY = spring({ frame, fps, from: -120, to: 0, config: { damping: 10, stiffness: 100, mass: 0.8 } });
  const iconOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  const letters = WORDMARK.split('');

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleSpacing = interpolate(frame, [30, 60], [0, 0.25], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  const lineWidth = interpolate(frame, [50, 80], [0, 100], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const sceneBg = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  const wordmarkSize = isPortrait ? 64 : 72;
  const iconSize = isPortrait ? 110 : 90;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#ffffff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: sceneBg,
      padding: isPortrait ? '0 40px' : 0,
    }}>
      {/* Building icon */}
      <div style={{ transform: `translateY(${iconY}px)`, opacity: iconOpacity, marginBottom: isPortrait ? 36 : 24 }}>
        <BrandIcon size={iconSize} />
      </div>

      {/* Wordmark letter by letter */}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 0, marginBottom: 8 }}>
        {letters.map((char, i) => {
          const letterOpacity = interpolate(frame, [8 + i * 1.8, 14 + i * 1.8], [0, 1], { extrapolateRight: 'clamp' });
          const letterY = interpolate(frame, [8 + i * 1.8, 14 + i * 1.8], [16, 0], {
            extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
          });
          return (
            <span key={i} style={{
              fontFamily: playfair, fontWeight: 700, fontSize: wordmarkSize,
              color: TEXT, opacity: letterOpacity,
              transform: `translateY(${letterY}px)`,
              display: 'inline-block', whiteSpace: 'pre',
            }}>{char}</span>
          );
        })}
      </div>

      {/* Gold underline */}
      <div style={{
        width: `${lineWidth}%`, height: 3, background: GOLD,
        marginBottom: 14, maxWidth: isPortrait ? 420 : 540,
        borderRadius: 2,
      }} />

      {/* Subtitle */}
      <div style={{
        fontFamily: playfair, fontWeight: 400, fontSize: isPortrait ? 18 : 20,
        color: TEXT, letterSpacing: `${subtitleSpacing}em`,
        opacity: subtitleOpacity, textTransform: 'uppercase',
      }}>
        {SUBTITLE}
      </div>
    </div>
  );
};
