import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { teamMembers } from '../data/teamMembers';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamPage = () => {
  const advantages = [
    { label: "Total Value of Sales & Lease Transactions", value: "$21.1B" },
    { label: "Core Services & Specialty Practice Areas", value: "7" },
    { label: "Offices Worldwide", value: "200+" },
    { label: "SF in Properties Managed", value: "57M+" },
    { label: "Countries & Expanding", value: "8+" },
    { label: "Advisors and Staff", value: "2000+" }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="Meet Our Team"
        description="Meet the SVN McDonald & Company team. Experienced commercial real estate advisors serving Ocala, Marion County, and Central Florida."
        canonical="https://svnmcdonald.com/team"
      />
      <Navbar />

      {/* Custom Team Header with personal photos */}
      <div className="relative bg-svn-dark pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Three-panel photo collage background — single image on mobile */}
        <div className="absolute inset-0 z-0">
          {/* Mobile: show single centered image */}
          <div className="md:hidden absolute inset-0">
            <img
              src="/team/stiles_0002_IMG_7996.jpg"
              alt=""
              className="w-full h-full object-cover opacity-20"
              loading="eager"
              aria-hidden="true"
            />
          </div>
          {/* Desktop: 3-panel collage */}
          <div className="hidden md:flex absolute inset-0">
            <div className="flex-1 relative overflow-hidden">
              <img
                src="/team/bart-and-wife.webp"
                alt=""
                className="w-full h-full object-cover opacity-25"
                loading="eager"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img
                src="/team/matthew_0001_A83B8096_Original.webp"
                alt=""
                className="w-full h-full object-cover opacity-25"
                loading="eager"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img
                src="/team/stiles_0002_IMG_7996.jpg"
                alt=""
                className="w-full h-full object-cover opacity-25"
                loading="eager"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-svn-dark via-svn-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-8 leading-tight">
              Meet The <span className="text-svn-orange">Team</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              Our team of commercial real estate experts is dedicated to delivering the highest level of service and results for our clients.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 gap-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-12 items-start"
              >
                <div className="w-full md:w-1/3">
                  <Link to={`/team/${member.slug}`} className="block">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl group">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="533"
                      />
                    </div>
                  </Link>
                  <div className="mt-8 space-y-4">
                    {member.phone && (
                      <a href={`tel:${member.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-4 text-svn-dark hover:text-svn-orange transition-colors font-bold uppercase tracking-widest text-sm">
                        <div className="bg-svn-orange p-2 rounded-full text-white"><Phone size={16} /></div>
                        {member.phone}
                      </a>
                    )}
                    <a href={`mailto:${member.email}`} className="flex items-center gap-4 text-svn-dark hover:text-svn-orange transition-colors font-bold uppercase tracking-widest text-sm">
                      <div className="bg-svn-orange p-2 rounded-full text-white"><Mail size={16} /></div>
                      {member.email}
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <Link to={`/team/${member.slug}`} className="group">
                    <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-2 group-hover:text-svn-orange transition-colors">{member.name}</h2>
                  </Link>
                  <p className="text-svn-orange font-bold text-lg uppercase tracking-widest mb-8">{member.role}</p>
                  <div className="prose prose-lg max-w-none text-gray-500 leading-relaxed mb-8">
                    {member.bio.split('\n\n')[0]}
                  </div>
                  <Link
                    to={`/team/${member.slug}`}
                    className="inline-flex items-center gap-2 bg-svn-orange text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors"
                  >
                    View Profile
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SVN Advantage */}
      <section className="py-24 bg-svn-dark text-white px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">The SVN <span className="text-svn-orange">Advantage</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 font-medium">
            Our local expertise and massive network of national buyers and brokers enables us to get your property in front of millions of buyers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {advantages.map((adv, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl font-black text-svn-orange mb-2">{adv.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">
                  {adv.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Valuation CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto bg-svn-orange rounded-3xl p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              What's My Commercial Property Worth?
            </h2>
            <p className="text-lg font-medium text-white/90 leading-relaxed mb-0">
              Get an expert valuation and market analysis from our team today. We provide the data you need to make informed decisions.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <a href="tel:3522884491" className="bg-white text-svn-orange px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-svn-dark hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
              <Phone size={20} />
              352.288.4491
            </a>
            <Link to="/contact" className="bg-svn-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl text-center">
              Send us a message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
