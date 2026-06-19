import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, AbsoluteFill, Img, staticFile } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { GOLD, INK, WHITE, TEXT } from '../tokens';

const { fontFamily: playfair } = loadPlayfair('normal', { weights: ['700', '400'] });
const { fontFamily: inter } = loadInter('normal', { weights: ['400', '500', '600'] });

// Pin positions as % of map image (1536×1024)
// Identified from the uploaded Mapa VZLA.png
const PINS = [
  { id: 'caracas',   label: 'Caracas',          count: '68 propiedades', x: 37, y: 30, delay: 20 },
  { id: 'margarita', label: 'Isla de Margarita', count: '14 propiedades', x: 78, y: 14, delay: 48 },
];

interface PinProps {
  pin: typeof PINS[0];
  frame: number;
  fps: number;
  mapW: number;
  mapH: number;
}

function AnimatedPin({ pin, frame, fps, mapW, mapH }: PinProps) {
  const f = frame - pin.delay;

  const pinDrop = spring({ frame: f, fps, from: -50, to: 0, config: { damping: 10, stiffness: 130, mass: 0.7 } });
  const pinOpacity = interpolate(frame, [pin.delay, pin.delay + 10], [0, 1], { extrapolateRight: 'clamp' });

  const cardScale = spring({ frame: f - 10, fps, from: 0, to: 1, config: { damping: 12, stiffness: 150 } });
  const cardOpacity = interpolate(frame, [pin.delay + 10, pin.delay + 24], [0, 1], { extrapolateRight: 'clamp' });

  const pulseScale = interpolate(f, [10, 55], [1, 2.8], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const pulseOpacity = interpolate(f, [10, 55], [0.5, 0], { extrapolateRight: 'clamp' });

  const px = (pin.x / 100) * mapW;
  const py = (pin.y / 100) * mapH;

  // Card pops up and to the right (flip left if too close to right edge)
  const cardLeft = pin.x > 65 ? -180 : 22;

  return (
    <div style={{
      position: 'absolute',
      left: px,
      top: py,
      transform: `translateY(${pinDrop}px)`,
      opacity: pinOpacity,
    }}>
      {/* Pulse ring */}
      <div style={{
        position: 'absolute',
        left: -14 * pulseScale, top: -14 * pulseScale,
        width: 28 * pulseScale, height: 28 * pulseScale,
        borderRadius: '50%',
        background: GOLD,
        opacity: pulseOpacity,
        pointerEvents: 'none',
      }} />

      {/* Pin dot */}
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: GOLD,
        border: '3px solid white',
        boxShadow: '0 3px 12px rgba(0,0,0,0.35)',
        position: 'relative', zIndex: 2,
      }} />

      {/* Popup card */}
      <div style={{
        position: 'absolute',
        top: -48,
        left: cardLeft,
        background: INK,
        borderRadius: 12,
        padding: '10px 16px',
        minWidth: 190,
        boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
        transformOrigin: pin.x > 65 ? 'bottom right' : 'bottom left',
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        whiteSpace: 'nowrap',
        zIndex: 10,
      }}>
        <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 14, color: WHITE, marginBottom: 6 }}>
          {pin.label}
        </div>
        <div style={{
          background: GOLD, borderRadius: 999,
          padding: '3px 12px', display: 'inline-block',
          fontFamily: inter, fontWeight: 600, fontSize: 12, color: INK,
        }}>
          {pin.count}
        </div>
      </div>
    </div>
  );
}

export const LocationMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const sceneOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const mapScale = spring({ frame, fps, from: 0.88, to: 1, config: { damping: 16, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [5, 22], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [5, 22], [20, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const statsOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: 'clamp' });

  // Map container dimensions — maintain 3:2 aspect ratio of the PNG (1536×1024)
  const mapW = isPortrait ? width - 80 : Math.min(width - 160, 900);
  const mapH = mapW * (1024 / 1536);

  return (
    <AbsoluteFill style={{
      background: WHITE, opacity: sceneOpacity,
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: isPortrait ? '40px 40px' : '0 80px',
    }}>
      {/* Title */}
      <div style={{
        fontFamily: playfair, fontWeight: 700,
        fontSize: isPortrait ? 46 : 52, color: TEXT,
        marginBottom: 8, textAlign: 'center',
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        Dos destinos, una misión
      </div>
      <div style={{
        fontFamily: inter, fontSize: 15, color: GOLD,
        marginBottom: isPortrait ? 32 : 36,
        letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        Caracas · Isla de Margarita
      </div>

      {/* Map with pins */}
      <div style={{
        position: 'relative',
        width: mapW, height: mapH,
        transform: `scale(${mapScale})`,
        transformOrigin: 'center center',
        borderRadius: 16,
        overflow: 'visible',
        boxShadow: '0 16px 60px rgba(0,0,0,0.12)',
      }}>
        <Img
          src={staticFile('mapa-vzla.png')}
          style={{ width: mapW, height: mapH, borderRadius: 16, display: 'block' }}
        />

        {/* Animated pins */}
        {PINS.map(pin => (
          <AnimatedPin key={pin.id} pin={pin} frame={frame} fps={fps} mapW={mapW} mapH={mapH} />
        ))}
      </div>

      {/* Stats row */}
      {!isPortrait && (
        <div style={{
          display: 'flex', gap: 80, marginTop: 40,
          opacity: statsOpacity,
        }}>
          {[
            { city: 'Caracas', count: 68, desc: 'propiedades en la capital' },
            { city: 'Isla de Margarita', count: 14, desc: 'propiedades en el Caribe' },
          ].map(({ city, count, desc }) => (
            <div key={city} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 48, color: GOLD }}>{count}</div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 16, color: TEXT }}>{city}</div>
              <div style={{ fontFamily: inter, fontSize: 13, color: '#888' }}>{desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Portrait: stats below map */}
      {isPortrait && (
        <div style={{
          display: 'flex', gap: 48, marginTop: 36,
          opacity: statsOpacity,
        }}>
          {[
            { city: 'Caracas', count: 68, desc: 'en la capital' },
            { city: 'Margarita', count: 14, desc: 'en el Caribe' },
          ].map(({ city, count, desc }) => (
            <div key={city} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 52, color: GOLD }}>{count}</div>
              <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 17, color: TEXT }}>{city}</div>
              <div style={{ fontFamily: inter, fontSize: 14, color: '#888' }}>{desc}</div>
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
