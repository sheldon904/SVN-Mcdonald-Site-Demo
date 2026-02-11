import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';

const TeamPage = () => {
  const team = [
    {
      name: "Bartow McDonald IV",
      role: "Managing Director",
      image: "https://svnmcdonald.com/wp-content/uploads/2018/11/Bartow-McDonald-Headshot-WEB.jpg",
      phone: "352.484.8090",
      email: "bartow.mcdonald@svn.com"
    },
    {
      name: "Example Agent",
      role: "Senior Advisor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phone: "352.555.0123",
      email: "agent@svn.com"
    },
    {
      name: "Jane Smith",
      role: "Associate Advisor",
      image: "https://images.unsplash.com/photo-1573496359-1361d10af256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phone: "352.555.0124",
      email: "jane.smith@svn.com"
    },
    // Add more team members as needed
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-svn-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-4 text-white">
                        <a href={`tel:${member.phone}`} className="p-2 bg-svn-orange rounded-full hover:bg-white hover:text-svn-orange transition-colors">
                          <Phone size={18} />
                        </a>
                        <a href={`mailto:${member.email}`} className="p-2 bg-svn-orange rounded-full hover:bg-white hover:text-svn-orange transition-colors">
                          <Mail size={18} />
                        </a>
                        <a href="#" className="p-2 bg-svn-orange rounded-full hover:bg-white hover:text-svn-orange transition-colors">
                          <Linkedin size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-1">{member.name}</h3>
                  <p className="text-svn-orange font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                  
                  <div className="space-y-2 border-t border-gray-100 pt-4">
                    <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-gray-500 hover:text-svn-orange transition-colors text-sm font-medium">
                      <Phone size={14} />
                      {member.phone}
                    </a>
                    <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-gray-500 hover:text-svn-orange transition-colors text-sm font-medium">
                      <Mail size={14} />
                      {member.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
