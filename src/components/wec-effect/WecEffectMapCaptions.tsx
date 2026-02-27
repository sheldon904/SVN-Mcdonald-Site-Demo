import { SCROLL_CAPTIONS } from '../../data/wecEffectData';

interface WecEffectMapCaptionsProps {
  progress: number;
}

const WecEffectMapCaptions = ({ progress }: WecEffectMapCaptionsProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-end justify-start p-8 md:p-16">
      {SCROLL_CAPTIONS.map((caption, index) => {
        const isVisible = progress >= caption.startProgress && progress <= caption.endProgress;
        const center = (caption.startProgress + caption.endProgress) / 2;
        const halfRange = (caption.endProgress - caption.startProgress) / 2;
        const dist = Math.abs(progress - center);
        const opacity = isVisible ? Math.max(0, 1 - (dist / halfRange) * 0.5) : 0;

        return (
          <div
            key={index}
            className="absolute bottom-16 left-8 md:left-16 max-w-md transition-opacity duration-300"
            style={{
              opacity,
              transform: `translateY(${isVisible ? 0 : 20}px)`,
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-6 py-4 border border-white/10">
              <p className="text-white text-sm md:text-base font-bold leading-relaxed">
                {caption.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WecEffectMapCaptions;
