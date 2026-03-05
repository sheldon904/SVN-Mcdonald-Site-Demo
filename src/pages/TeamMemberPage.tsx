import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AgentStructuredData from '../components/AgentStructuredData';
import { teamMembers } from '../data/teamMembers';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';

const heroImages: Record<string, { src: string; position?: string }> = {
  'bartow-mcdonald': { src: '/team/bart-and-wife.webp' },
  'matthew-garff': { src: '/team/matthew_0001_A83B8096_Original.webp', position: 'top' },
  'stiles-mcdonald': { src: '/team/stiles_0002_IMG_7996.jpg', position: 'top' },
};

const TeamMemberPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <SEOHead
          title="Team Member Not Found"
          description="The team member you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-extrabold text-svn-dark mb-4">Team Member Not Found</h1>
          <p className="text-gray-500 text-lg mb-8">
            Sorry, the team member you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 bg-svn-orange text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Team
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherMembers = teamMembers.filter((m) => m.slug !== slug);
  const bioParagraphs = member.bio.split('\n\n');

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={`${member.name} - ${member.role}`}
        description={`${member.name} is ${member.role} at SVN McDonald & Company. ${bioParagraphs[0].slice(0, 140)}...`}
        ogImage={member.image}
        canonical={`https://svnmcdonald.com/team/${member.slug}`}
      />
      <AgentStructuredData member={member} />
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-svn-dark pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {slug && heroImages[slug] && (
          <div className="absolute inset-0 z-0">
            <img
              src={heroImages[slug].src}
              alt=""
              className="w-full h-full object-cover opacity-20"
              style={heroImages[slug].position ? { objectPosition: heroImages[slug].position } : undefined}
              loading="eager"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-svn-dark via-svn-dark/60 to-svn-dark/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-8"
            >
              <ArrowLeft size={14} />
              Back to Team
            </Link>
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
              {member.name}
            </h1>
            <p className="text-svn-orange text-lg md:text-xl font-bold uppercase tracking-widest">
              {member.role}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column - Photo & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-[380px] flex-shrink-0"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  width="380"
                  height="507"
                />
              </div>

              {/* Contact Card */}
              <div className="bg-svn-dark rounded-2xl p-8 text-white">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-svn-orange mb-6">
                  Contact Info
                </h3>
                <div className="space-y-5">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-4 text-white hover:text-svn-orange transition-colors font-bold text-sm"
                    >
                      <div className="bg-svn-orange p-2.5 rounded-full">
                        <Phone size={16} />
                      </div>
                      {member.phone}
                    </a>
                  )}
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-4 text-white hover:text-svn-orange transition-colors font-bold text-sm"
                  >
                    <div className="bg-svn-orange p-2.5 rounded-full">
                      <Mail size={16} />
                    </div>
                    {member.email}
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="mt-8 block w-full bg-svn-orange text-white text-center px-6 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors"
                >
                  Contact {member.firstName}
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Bio & Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 min-w-0"
            >
              {/* Bio */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-6">
                  About {member.firstName}
                </h2>
                <div className="space-y-4">
                  {bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-600 leading-relaxed text-base md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-6">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-3">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-block border-2 border-svn-orange text-svn-orange px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              {member.education && (
                <div>
                  <h2 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-6">
                    Education
                  </h2>
                  <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm">
                    <div className="bg-svn-orange/10 p-3 rounded-full">
                      <GraduationCap size={24} className="text-svn-orange" />
                    </div>
                    <p className="text-gray-700 font-semibold text-lg">
                      {member.education}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Rest of the Team */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-1.5 bg-svn-orange mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
              Meet the Rest of the{' '}
              <span className="text-svn-orange">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherMembers.map((otherMember, index) => (
              <motion.div
                key={otherMember.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/team/${otherMember.slug}`}
                  className="group flex items-center gap-6 bg-[#F6F6F6] rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={otherMember.image}
                      alt={otherMember.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      width="96"
                      height="96"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight group-hover:text-svn-orange transition-colors">
                      {otherMember.name}
                    </h3>
                    <p className="text-svn-orange font-bold text-sm uppercase tracking-widest">
                      {otherMember.role}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-300 group-hover:text-svn-orange transition-colors flex-shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamMemberPage;
