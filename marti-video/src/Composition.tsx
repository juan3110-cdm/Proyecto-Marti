import { AbsoluteFill, Sequence } from 'remotion';
import { LogoReveal } from './components/LogoReveal';
import { SearchScene } from './components/SearchScene';
import { ProcessTimeline } from './components/ProcessTimeline';
import { DealScene } from './components/DealScene';
import { LocationMap } from './components/LocationMap';
import { OutroSlide } from './components/OutroSlide';

// Scene timing (frames at 30fps) — total 900 frames = 30s
const LOGO_START    = 0;
const SEARCH_START  = 85;
const PROCESS_START = 235;
const DEAL_START    = 410;
const MAP_START     = 655;
const OUTRO_START   = 805;

export const MartiComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#ffffff' }}>
      <Sequence from={LOGO_START} durationInFrames={100}>
        <AbsoluteFill><LogoReveal /></AbsoluteFill>
      </Sequence>

      <Sequence from={SEARCH_START} durationInFrames={165}>
        <AbsoluteFill><SearchScene /></AbsoluteFill>
      </Sequence>

      <Sequence from={PROCESS_START} durationInFrames={190}>
        <AbsoluteFill><ProcessTimeline /></AbsoluteFill>
      </Sequence>

      <Sequence from={DEAL_START} durationInFrames={260}>
        <AbsoluteFill><DealScene /></AbsoluteFill>
      </Sequence>

      <Sequence from={MAP_START} durationInFrames={165}>
        <AbsoluteFill><LocationMap /></AbsoluteFill>
      </Sequence>

      <Sequence from={OUTRO_START} durationInFrames={95}>
        <AbsoluteFill><OutroSlide /></AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
