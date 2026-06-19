import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, AbsoluteFill } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { GOLD, INK, WHITE } from '../tokens';
import { BrandIcon } from './BrandIcon';

const { fontFamily: playfair } = loadPlayfair('normal', { weights: ['700', '400'] });
const { fontFamily: inter } = loadInter('normal', { weights: ['400', '500', '600'] });

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const sceneOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Logo appears
  const logoScale = spring({ frame, fps, from: 0.6, to: 1, config: { damping: 12, stiffness: 120 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Website types in
  const totalChars = 'proyecto-marti.vercel.app'.length;
  const visibleChars = Math.floor(interpolate(frame, [20, 55], [0, totalChars], { extrapolateRight: 'clamp' }));
  const urlOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' });

  // Tagline fades in
  const tagOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [45, 65], [16, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  // Shimmer sweep left to right
  const shimmerX = interpolate(frame, [55, 85], [-120, 120], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });

  // Final fade to black
  const fadeOut = interpolate(frame, [82, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: INK, opacity: sceneOpacity, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Shimmer sweep */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(105deg, transparent 0%, ${GOLD}22 45%, ${GOLD}44 50%, ${GOLD}22 55%, transparent 100%)`,
        transform: `translateX(${shimmerX}%)`,
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{
        opacity: logoOpacity, transform: `scale(${logoScale})`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        marginBottom: isPortrait ? 56 : 40,
      }}>
        <BrandIcon size={isPortrait ? 110 : 80} />

        <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: isPortrait ? 72 : 64, color: WHITE, textAlign: 'center' }}>
          Proyecto Martí
        </div>
        <div style={{ fontFamily: inter, fontWeight: 400, fontSize: isPortrait ? 18 : 16, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Bienes Raíces
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: isPortrait ? 260 : 200, height: 2, background: GOLD, marginBottom: 36, borderRadius: 1,
        opacity: logoOpacity,
      }} />

      {/* URL types in */}
      <div style={{ opacity: urlOpacity, marginBottom: 24, textAlign: 'center' }}>
        <span style={{ fontFamily: inter, fontWeight: 600, fontSize: isPortrait ? 32 : 28, color: GOLD }}>
          {'proyecto-marti.vercel.app'.slice(0, visibleChars)}
        </span>
        {visibleChars < totalChars && (
          <span style={{ color: GOLD, opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0, fontSize: isPortrait ? 32 : 28 }}>|</span>
        )}
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: playfair, fontWeight: 400, fontStyle: 'italic',
        fontSize: isPortrait ? 26 : 22, color: 'rgba(255,255,255,0.7)',
        textAlign: 'center', padding: isPortrait ? '0 48px' : 0,
        opacity: tagOpacity, transform: `translateY(${tagY}px)`,
      }}>
        Más de 20 años de experiencia a tu servicio
      </div>

      {/* WhatsApp CTA */}
      <div style={{
        marginTop: 40,
        opacity: tagOpacity,
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#25D366', borderRadius: 999,
        padding: '14px 32px',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span style={{ fontFamily: inter, fontWeight: 600, fontSize: 18, color: 'white' }}>
          +58 424 846 2562
        </span>
      </div>

      {/* Fade to black overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#000', opacity: fadeOut,
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  );
};
