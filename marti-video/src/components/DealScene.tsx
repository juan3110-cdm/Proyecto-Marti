import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, AbsoluteFill } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { GOLD, INK, WHITE } from '../tokens';
import { BrandIcon } from './BrandIcon';

const { fontFamily: playfair } = loadPlayfair('normal', { weights: ['700', '400'] });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fontFamily: _inter } = loadInter('normal', { weights: ['400', '500', '600'] });

// Generate particles in a stable way (no random on every render)
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  angle: (i / 28) * Math.PI * 2,
  dist: 60 + (i % 5) * 28,
  size: 4 + (i % 4) * 3,
  delay: i * 1.5,
}));

export const DealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // Agents slide in from sides
  const leftAgentX = spring({ frame, fps, from: -260, to: 0, config: { damping: 14, stiffness: 100 } });
  const rightAgentX = spring({ frame, fps, from: 260, to: 0, config: { damping: 14, stiffness: 100 } });

  // Handshake happens around frame 60
  const handshakeFrame = 60;
  const handProgress = interpolate(frame, [handshakeFrame - 10, handshakeFrame + 10], [0, 1], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });

  // Building rises up after handshake
  const buildingY = spring({ frame: frame - handshakeFrame, fps, from: 80, to: 0, config: { damping: 12, stiffness: 90 } });
  const buildingOpacity = interpolate(frame, [handshakeFrame, handshakeFrame + 20], [0, 1], { extrapolateRight: 'clamp' });

  // Logo fades in
  const logoOpacity = interpolate(frame, [handshakeFrame + 20, handshakeFrame + 45], [0, 1], { extrapolateRight: 'clamp' });

  // Tagline
  const taglineOpacity = interpolate(frame, [handshakeFrame + 50, handshakeFrame + 70], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [handshakeFrame + 50, handshakeFrame + 70], [20, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  // Particles burst
  const particleProgress = interpolate(frame, [handshakeFrame, handshakeFrame + 45], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const particleOpacity = interpolate(frame, [handshakeFrame + 30, handshakeFrame + 55], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: INK, opacity: sceneOpacity, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Building rising */}
      <div style={{
        transform: `translateY(${buildingY}px)`,
        opacity: buildingOpacity,
        marginBottom: 16,
      }}>
        <BuildingIllustration />
      </div>

      {/* Logo above building */}
      <div style={{ opacity: logoOpacity, marginBottom: 60, display: 'flex', alignItems: 'center', gap: 14 }}>
        <BrandIcon size={48} />
        <span style={{ fontFamily: playfair, fontWeight: 700, fontSize: 32, color: WHITE }}>Proyecto Martí</span>
      </div>

      {/* Table scene with agents */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 0 }}>

        {/* Particles */}
        {particleProgress > 0 && (
          <div style={{
            position: 'absolute', left: '50%', top: '40%',
            transform: 'translate(-50%, -50%)',
            opacity: particleOpacity,
            pointerEvents: 'none',
          }}>
            <svg width="300" height="300" viewBox="-150 -150 300 300" style={{ overflow: 'visible' }}>
              {PARTICLES.map((p, i) => {
                const r = p.dist * particleProgress;
                const x = Math.cos(p.angle) * r;
                const y = Math.sin(p.angle) * r;
                return (
                  <circle key={i} cx={x} cy={y} r={p.size * (1 - particleProgress * 0.4)}
                    fill={GOLD} opacity={0.9 - particleProgress * 0.5} />
                );
              })}
            </svg>
          </div>
        )}

        {/* Left Agent */}
        <div style={{ transform: `translateX(${leftAgentX}px)` }}>
          <AgentFigure side="left" handProgress={handProgress} />
        </div>

        {/* Table */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Table />
        </div>

        {/* Right Agent */}
        <div style={{ transform: `translateX(${rightAgentX}px)` }}>
          <AgentFigure side="right" handProgress={handProgress} />
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: playfair, fontWeight: 400, fontSize: 28,
        color: 'rgba(255,255,255,0.9)', marginTop: 48,
        fontStyle: 'italic',
        opacity: taglineOpacity, transform: `translateY(${taglineY}px)`,
      }}>
        "Tu propiedad, nuestra misión"
      </div>
    </AbsoluteFill>
  );
};

function BuildingIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      <rect x="30" y="30" width="100" height="90" rx="3" fill="#2a2826" />
      <rect x="20" y="26" width="120" height="8" rx="2" fill="#3a3836" />
      {/* Windows grid */}
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`} x={38 + col * 22} y={44 + row * 18} width={12} height={10} rx={1} fill={col % 2 === row % 2 ? GOLD : 'rgba(255,255,255,0.15)'} opacity={0.8} />
      )))}
      {/* Door */}
      <rect x="66" y="95" width="28" height="25" rx="2" fill={GOLD} />
    </svg>
  );
}

function Table() {
  return (
    <svg width="220" height="100" viewBox="0 0 220 100" fill="none">
      {/* Table top */}
      <rect x="10" y="30" width="200" height="12" rx="4" fill="#2e2c2a" />
      {/* Legs */}
      <rect x="20" y="42" width="10" height="58" rx="2" fill="#2a2826" />
      <rect x="190" y="42" width="10" height="58" rx="2" fill="#2a2826" />
      {/* Documents on table */}
      <rect x="55" y="16" width="40" height="28" rx="2" fill="white" opacity={0.9} />
      <rect x="58" y="20" width="28" height="2" rx="1" fill="#ccc" />
      <rect x="58" y="25" width="22" height="2" rx="1" fill="#ccc" />
      <rect x="58" y="30" width="26" height="2" rx="1" fill="#ccc" />
      {/* Pen */}
      <line x1="100" y1="14" x2="130" y2="38" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      <circle cx="130" cy="38" r="3" fill={GOLD} />
      {/* Mini building model */}
      <rect x="145" y="10" width="24" height="26" rx="2" fill="#2a2826" />
      <rect x="141" y="8" width="32" height="5" rx="1" fill="#3a3836" />
      {[0,1].map(r => [0,1,2].map(c => (
        <rect key={`${r}-${c}`} x={148 + c * 7} y={14 + r * 9} width={4} height={5} rx={1} fill={GOLD} opacity={0.7} />
      )))}
    </svg>
  );
}

function AgentFigure({ side, handProgress }: { side: 'left' | 'right', handProgress: number }) {
  const flip = side === 'right' ? -1 : 1;
  const armAngle = handProgress * (side === 'left' ? 30 : -30);
  const handX = side === 'left' ? 60 * handProgress : -60 * handProgress;

  return (
    <svg width="120" height="200" viewBox="-60 -100 120 200" fill="none" style={{ transform: `scaleX(${flip})` }}>
      {/* Body */}
      <rect x="-22" y="-20" width="44" height="60" rx="8" fill="#3a3836" />
      {/* Shirt */}
      <rect x="-14" y="-18" width="28" height="45" rx="4" fill="white" opacity={0.9} />
      <rect x="-4" y="-18" width="8" height="45" fill="#f0f0f0" />
      {/* Head */}
      <circle cx="0" cy="-48" r="28" fill="#c8956c" />
      {/* Hair */}
      <ellipse cx="0" cy="-72" rx="24" ry="10" fill="#2a1a0a" />
      {/* Eyes */}
      <circle cx="-8" cy="-50" r="3.5" fill="white" />
      <circle cx="8" cy="-50" r="3.5" fill="white" />
      <circle cx="-7" cy="-50" r="2" fill="#2a1a0a" />
      <circle cx="9" cy="-50" r="2" fill="#2a1a0a" />
      {/* Smile */}
      <path d="M -8 -38 Q 0 -32 8 -38" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Extending arm */}
      <g transform={`rotate(${armAngle}, -22, 10)`}>
        <rect x="-38" y="5" width="22" height="10" rx="5" fill="#3a3836" />
        <circle cx="-38" cy="10" r="8" fill="#c8956c" transform={`translate(${-handX * 0.4}, 0)`} />
      </g>
      {/* Other arm relaxed */}
      <rect x="22" y="5" width="20" height="10" rx="5" fill="#3a3836" />
      {/* Legs */}
      <rect x="-16" y="40" width="13" height="50" rx="5" fill="#2a2826" />
      <rect x="3" y="40" width="13" height="50" rx="5" fill="#2a2826" />
      {/* Shoes */}
      <ellipse cx="-10" cy="91" rx="11" ry="6" fill="#1a1818" />
      <ellipse cx="10" cy="91" rx="11" ry="6" fill="#1a1818" />
      {/* Tie */}
      <polygon points="0,-10 -4,20 0,25 4,20" fill={GOLD} />
    </svg>
  );
}
