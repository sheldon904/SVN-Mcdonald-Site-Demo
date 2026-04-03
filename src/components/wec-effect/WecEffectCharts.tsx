import { motion } from 'framer-motion';
import { YEARLY_DATA, YOY_DATA, MAX_PRICE, DISTANCE_BANDS } from '../../data/wecEffectData';

function formatPrice(value: number): string {
  return '$' + value.toLocaleString();
}

const BAR_COLORS: Record<string, string> = {
  inner: 'bg-svn-orange',
  middle: 'bg-svn-orange/60',
  outer: 'bg-svn-orange/30',
};


const WecEffectCharts = () => {
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
              {['$70K', '$45K', '$25K', '$0'].map(label => (
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
                              className={`w-6 md:w-10 rounded-t ${BAR_COLORS[band]} relative`}
                            >
                              {/* Value tooltip on hover */}
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
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

        {/* Section 2: Avg Price/Acre Table */}
        <div className="mb-24">
          <div className="w-12 h-1 bg-svn-orange mb-6" />
          <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-12">
            Avg Price/Acre <span className="text-svn-orange">by Year & Distance</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-svn-dark">
                  <th className="py-4 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Year</th>
                  {DISTANCE_BANDS.map(band => (
                    <th key={band.id} className="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                      {band.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {YEARLY_DATA.map((row, i) => (
                  <motion.tr
                    key={row.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 pr-8 text-sm font-black text-svn-dark">{row.year}</td>
                    <td className="py-4 px-4 text-sm font-bold text-svn-dark text-right">{formatPrice(row.inner)}</td>
                    <td className="py-4 px-4 text-sm font-bold text-svn-dark text-right">{formatPrice(row.middle)}</td>
                    <td className="py-4 px-4 text-sm font-bold text-svn-dark text-right">{formatPrice(row.outer)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Source: SVN McDonald & Company · WEC Effect Broker Opinion of Value · 2025
          </p>
        </div>

        {/* Section 3: YoY % Change Table */}
        <div>
          <div className="w-12 h-1 bg-svn-orange mb-6" />
          <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-12">
            Year-over-Year <span className="text-svn-orange">% Change</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-svn-dark">
                  <th className="py-4 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Year</th>
                  {DISTANCE_BANDS.map(band => (
                    <th key={band.id} className="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">
                      {band.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {YOY_DATA.map((row, i) => (
                  <motion.tr
                    key={row.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 pr-8 text-sm font-black text-svn-dark">{row.year}</td>
                    {(['inner', 'middle', 'outer'] as const).map(band => {
                      const val = row[band];
                      const isNeg = val < 0;
                      return (
                        <td key={band} className={`py-4 px-4 text-sm font-bold text-right ${isNeg ? 'text-red-600' : 'text-green-600'}`}>
                          {isNeg ? '' : '+'}{val.toFixed(2)}%
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            *Average price per acre based on SVN McDonald transaction analysis
          </p>
        </div>
      </div>
    </section>
  );
};

export default WecEffectCharts;
