import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamBanner = () => {
  return (
    <section className="py-24 px-6 bg-[#181818]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Team Photo */}
          <div className="relative rounded-2xl overflow-hidden h-[400px]">
            <img
              src="/images/hero/hwy-484-ocala-1920.jpg"
              alt="SVN McDonald & Company team"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1073}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* CTA Content */}
          <div>
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6 leading-tight">
              Work With Our <span className="text-svn-orange">Experts</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-6">
              SVN McDonald & Company brings decades of commercial real estate experience
              to every transaction. Our advisors combine deep local market knowledge with
              the power of the SVN national platform to deliver exceptional results.
            </p>
            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
              Whether you are buying, selling, or leasing, our team is ready to help you
              navigate the Central Florida market with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/contact"
                className="bg-svn-orange text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center gap-3"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
              <a
                href="tel:3522743800"
                className="flex items-center gap-3 text-white font-bold text-lg hover:text-svn-orange transition-colors"
              >
                <Phone size={20} className="text-svn-orange" />
                352.274.3800
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamBanner;
