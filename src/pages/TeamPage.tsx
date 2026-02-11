import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamPage = () => {
  const team = [
    {
      name: "Bartow McDonald IV",
      role: "Managing Director",
      image: "https://svnmcdonald.com/wp-content/uploads/2018/11/Bartow-McDonald-Headshot-WEB.jpg",
      phone: "352.484.8090",
      email: "bartow.mcdonald@svn.com",
      bio: "Bartow McDonald IV serves as managing director for SVN | McDonald & Company in Ocala, FL, where he enjoys working on commercial real estate deals throughout Florida. Prior to joining SVN, McDonald served as the vice president of acquisitions and development for Cope Properties, Inc. in Ocala, Florida where he was responsible for the acquisition, entitlement, and marketing of portfolio and client properties. Previously, McDonald served as the founder and chief executive officer of two start-up companies; Bluewire, a service based electrical solutions company and StoreParts, an e-commerce company that supplied supply chain management technology to the supermarket and food retail industries. Before starting two companies, McDonald spent six years working for a fast-growing international manufacturing firm, where he gained in-depth industrial experience through his leadership positions in manufacturing operations, distribution, logistics and marketing. He has served on the board of directors for RMI (Reciprocal Ministries International), the Ocala Chamber of Commerce, the Central Florida Commercial Association of Realtors, and as chairman of the regional advisory board for RBC Bank. In addition, he has participated as a conference speaker for the Florida Venture Capital Forum, the Food Marketing Institute and has been quoted in the Wall Street Journal, Forbes and the New York Times. McDonald earned his MBA and Bachelor of Science from the University of Florida. Sight fishing and bow hunting are two things that will get him up before sunrise."
    },
    {
      name: "Matthew Garff",
      role: "Associate Advisor",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/09/image6-1.png",
      phone: "352.274.3800",
      email: "matthew.garff@svn.com",
      bio: "Matthew Garff is an Associate Advisor at SVN | McDonald & Company in Ocala, FL. Growing up in Tampa, Florida, Matthew is from a heritage of farming and ranching, going back five generations. Today, he enjoys helping advise clients in the ever-changing commercial real estate market of North Central Florida. Matthew holds a Bachelor of Science in Economics from Brigham Young University. In his free time, he enjoys being on the water, especially on one of the many crystal clean springs that make central Florida such a great place to live and work."
    },
    {
      name: "Stiles McDonald",
      role: "5th Generation Floridian",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/09/stiles_0002_IMG_7996-1.png",
      phone: "352.274.3800",
      email: "stiles.mcdonald@svn.com",
      bio: "Stiles McDonald is a 5th generation Floridian born into a family of avid outdoorsmen. This resulted in instilling him with a love of land and all things real estate, which has led to him working with SVN. He is passionate about bringing value to clients, and enjoys the process from start to finish."
    },
  ];

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
      <Navbar />
      
      <PageHeader 
        title="Meet The" 
        highlightedText="Team" 
        subtitle="Our team of commercial real estate experts is dedicated to delivering the highest level of service and results for our clients."
        backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 gap-20">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-12 items-start"
              >
                <div className="w-full md:w-1/3">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-8 space-y-4">
                    <a href={`tel:${member.phone}`} className="flex items-center gap-4 text-svn-dark hover:text-svn-orange transition-colors font-bold uppercase tracking-widest text-sm">
                      <div className="bg-svn-orange p-2 rounded-full text-white"><Phone size={16} /></div>
                      {member.phone}
                    </a>
                    <a href={`mailto:${member.email}`} className="flex items-center gap-4 text-svn-dark hover:text-svn-orange transition-colors font-bold uppercase tracking-widest text-sm">
                      <div className="bg-svn-orange p-2 rounded-full text-white"><Mail size={16} /></div>
                      {member.email}
                    </a>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-2">{member.name}</h2>
                  <p className="text-svn-orange font-bold text-lg uppercase tracking-widest mb-8">{member.role}</p>
                  <div className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
                    {member.bio}
                  </div>
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
            <a href="tel:3522743800" className="bg-white text-svn-orange px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-svn-dark hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
              <Phone size={20} />
              (352) 274-3800
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
