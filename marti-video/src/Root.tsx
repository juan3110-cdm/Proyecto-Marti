import "./index.css";
import { Composition } from "remotion";
import { MartiComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 — Primary (YouTube, LinkedIn, etc.) */}
      <Composition
        id="MartiVideo-16x9"
        component={MartiComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* 9:16 — Instagram Reels / TikTok */}
      <Composition
        id="MartiVideo-9x16"
        component={MartiComposition}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
