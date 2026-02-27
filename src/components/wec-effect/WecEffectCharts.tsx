import { motion } from 'framer-motion';
import { YEARLY_DATA, MAX_PRICE, DISTANCE_BANDS } from '../../data/wecEffectData';

function formatPrice(value: number): string {
  return '$' + value.toLocaleString();
}

const BAR_COLORS: Record<string, string> = {
  inner: 'bg-svn-orange',
  middle: 'bg-svn-orange/60',
  outer: 'bg-svn-orange/30',
};

// Opacity values for the horse silhouette per band
const HORSE_OPACITIES: Record<string, number> = {
  inner: 1,
  middle: 0.6,
  outer: 0.3,
};

/**
 * Front-half horse silhouette facing upward (rearing pose).
 * Sits at the top of each bar and "races" up with the animation.
 */
const HorseSilhouette = ({ opacity }: { opacity: number }) => (
  <svg
    viewBox="0 0 40 56"
    fill="currentColor"
    className="w-5 md:w-8 text-svn-orange"
    style={{ opacity }}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rearing horse front-half: head, neck, chest, front legs */}
    <path d="
      M 22 0
      C 24 0, 27 1, 28 3
      C 29 5, 29 7, 28 9
      L 27 10
      C 28 10, 30 11, 30 13
      C 30 14, 29 15, 28 15
      L 26 14

      C 26 16, 27 18, 27 21
      C 27 24, 25 27, 24 30
      C 23 33, 23 36, 24 40
      L 26 48
      C 26.5 50, 26 51, 25 51.5
      C 24 52, 23 51, 22.5 49.5
      L 20 42

      C 19 44, 18 47, 18.5 50
      C 18.7 51, 18 52, 17 52
      C 16 52, 15.5 51, 15.5 49.5
      L 16 42

      C 15 38, 14 34, 14 30
      C 14 26, 15 22, 16 19
      C 17 16, 18 14, 18 12
      C 18 10, 17 8, 17 6
      C 17 4, 18 2, 20 1
      C 21 0.5, 21.5 0, 22 0
      Z
    " />
    {/* Ear */}
    <path d="M 23 0 C 22 -2, 20 -1, 21 1 Z" />
    {/* Eye */}
    <circle cx="24" cy="7" r="1" fill="white" style={{ opacity: 0.8 }} />
  </svg>
);

const WecEffectCharts = () => {
  const peak2024 = YEARLY_DATA.find(d => d.year === 2024)!;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section 1: Grouped vertical bar chart */}
        <div className="mb-24">
          <div className="w-12 h-1 bg-svn-orange mb-6" />
          <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-12">
            Price Per Acre <span className="text-svn-orange">by Year & Distance</span>
          </h2>

          {/* Chart container */}
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-right pr-2">
              {['$60K', '$40K', '$20K', '$0'].map(label => (
                <span key={label} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {label}
                </span>
              ))}
            </div>

            {/* Chart area */}
            <div className="ml-14">
              {/* Grid lines + bars */}
              <div className="relative h-[300px] md:h-[400px] border-b border-gray-200">
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: `${(i / 3) * 100}%` }}
                  />
                ))}

                {/* Bar groups */}
                <div className="absolute inset-0 flex items-end justify-around px-4">
                  {YEARLY_DATA.map((yearData, yi) => (
                    <div key={yearData.year} className="flex items-end gap-1 md:gap-2 h-full">
                      {(['inner', 'middle', 'outer'] as const).map((band, bi) => {
                        const value = yearData[band];
                        const heightPx = Math.round((value / MAX_PRICE) * 100);
                        return (
                          <div key={band} className="relative group h-full flex items-end">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${heightPx}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: yi * 0.15 + bi * 0.05 }}
                              className={`w-6 md:w-10 rounded-t ${BAR_COLORS[band]} relative overflow-visible`}
                            >
                              {/* Horse silhouette riding the top of the bar */}
                              <div className="absolute -top-10 md:-top-14 left-1/2 -translate-x-1/2">
                                <HorseSilhouette opacity={HORSE_OPACITIES[band]} />
                              </div>

                              {/* Value tooltip on hover */}
                              <div className="absolute -top-[4.5rem] md:-top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                <span className="text-[9px] md:text-[10px] font-black text-svn-dark bg-white px-1.5 py-0.5 rounded shadow-sm">
                                  {formatPrice(value)}
                                </span>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Year labels */}
              <div className="flex justify-around pt-3">
                {YEARLY_DATA.map(d => (
                  <span key={d.year} className="text-xs font-black text-svn-dark uppercase tracking-wider">
                    {d.year}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-8 ml-14">
            {DISTANCE_BANDS.map(band => (
              <div key={band.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${BAR_COLORS[band.id]}`} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {band.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 2024 Horizontal comparison */}
        <div>
          <div className="w-12 h-1 bg-svn-orange mb-6" />
          <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-12">
            2024 Peak Year <span className="text-svn-orange">— Price by Distance</span>
          </h2>

          <div className="space-y-8">
            {DISTANCE_BANDS.map((band, i) => {
              const value = peak2024[band.id as keyof typeof peak2024] as number;
              const widthPct = (value / MAX_PRICE) * 100;
              return (
                <div key={band.id}>
                  <div className="flex justify-between text-sm font-bold uppercase tracking-widest mb-3">
                    <span className="text-gray-400">{band.label}</span>
                    <span className="text-svn-dark font-black">{formatPrice(value)}/ac</span>
                  </div>
                  <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${widthPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full rounded-full ${BAR_COLORS[band.id]}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            *Average price per acre based on SVN McDonald transaction analysis
          </p>
        </div>
      </div>
    </section>
  );
};

export default WecEffectCharts;
