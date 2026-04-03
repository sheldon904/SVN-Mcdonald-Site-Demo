import { motion } from 'framer-motion';

const WecEffectEditorial = () => {
  return (
    <section className="py-24 px-6 bg-[#F6F6F6]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column: WEC description + Data Speaks */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-1 bg-svn-orange mb-6" />
              <h2 className="text-3xl font-black text-svn-dark uppercase tracking-tighter mb-6">
                The WEC: <span className="text-svn-orange">America's Equestrian Hub</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Ocala and Marion County's equestrian charm is hard to beat! The combination of picturesque horse farms, natural resources and the warm, welcoming community makes it a special place for those who love horses and the great outdoors. At the heart of this equestrian hub is the World Equestrian Center (WEC), a state-of-the-art facility that has redefined the region since its opening in January 2021. This game changing destination continues to attract people to the area, and the WEC's effect on vacant land valuations surrounding it is significant.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-black text-svn-dark uppercase tracking-tight mb-4">
                The Data Speaks
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The 2025 WEC Effect reveals another year of changing land valuations across three distance segments for vacant, agriculturally zoned land 10 acres and larger. These segments are measured by their distance from the Grand Outdoor Arena at the WEC: 0–6 miles, 6–9 miles and 9–18 miles, respectively.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-black text-svn-dark uppercase tracking-tight mb-4">
                Prices Declined in All Three Distance Segments in 2025
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Following a market peak in 2024, all three distance segments saw a decline in their average values for 2025. The '0–6 Miles' segment led the decline with a <strong className="text-svn-dark">-32.44%</strong> year over year change from $67,384 to $45,524/acre. The '6–9 Miles' segment declined <strong className="text-svn-dark">-6.71%</strong> from $43,181 to $40,283/acre. The '9–18 Miles' segment experienced the smallest percentage decline of <strong className="text-svn-dark">-1.85%</strong> from $24,355 to $23,905/acre.
              </p>
            </motion.div>
          </div>

          {/* Right column: Our Takeaway + The Numbers */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-1 bg-svn-orange mb-6" />
              <h2 className="text-3xl font-black text-svn-dark uppercase tracking-tighter mb-6">
                Our <span className="text-svn-orange">Takeaway</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The WEC has created unprecedented demand for agriculturally zoned vacant land in both Marion and Levy Counties. After a period of rapid price appreciation, prices cooled a bit in 2025, perhaps indicating a hot market catching its breath.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                As we conversed with new property owners in the Williston area and beyond, equestrian minded land buyers considered eastern portions of Levy County close enough to access the WEC's amenities and activities they desire. We therefore extended our third distance segment to 18 miles from the Grand Outdoor Arena into portions of Levy County.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-black text-svn-dark uppercase tracking-tight mb-4">
                The Numbers
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Our analysis excludes a few sales that closed well outside typical market valuations. For example, one vacant 10-acre tract near WEC sold for $150,000 per acre in 2025, significantly higher than any comparable sale. In some cases, we removed significant outliers to ensure statistical averages accurately reflect normal market conditions in the area.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <p className="text-gray-500 text-xs leading-relaxed italic">
                The WEC Effect identifies general market direction for vacant agriculturally zoned land 10 acres and larger and its proximity to the Grand Outdoor Arena at the World Equestrian Center. Land valuations are subjective and can vary greatly based on attributes such as entitlements, uplands, wetlands, improved pasture, highway frontage, fencing, timber growth, soil content, and more.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WecEffectEditorial;
