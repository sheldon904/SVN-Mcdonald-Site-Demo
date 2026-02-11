import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Value of Sales & Lease Transactions', value: '$21.1B' },
  { label: 'Offices Worldwide', value: '200+' },
  { label: 'SF in Properties Managed', value: '57M+' },
  { label: 'Advisors and Staff', value: '2000+' },
  { label: 'Countries & Expanding', value: '8+' },
  { label: 'Core Services & Specialty Practice Areas', value: '7' },
];

const Stats = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-svn-dark uppercase tracking-tight mb-8 leading-tight">
              The SVN <br />
              <span className="text-svn-orange">Advantage</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm">
              Our local expertise and massive network of national buyers and brokers enables us to get your property in front of millions of buyers.
            </p>
          </div>
          
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="text-4xl md:text-5xl font-black text-svn-orange mb-3 transition-transform group-hover:scale-110 origin-left duration-300">
                    {stat.value}
                  </div>
                  <div className="h-[2px] w-10 bg-gray-100 mb-4 group-hover:w-full transition-all duration-500 group-hover:bg-svn-orange" />
                  <p className="text-[10px] md:text-xs font-black text-svn-dark uppercase tracking-[0.2em] leading-tight opacity-70">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
