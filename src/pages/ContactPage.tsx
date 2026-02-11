import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Spacer for fixed navbar */}
      <div className="h-20 bg-svn-dark" />

      {/* Hero Section */}
      <div className="relative bg-svn-dark py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
        </div>
        
        <div className="max-w-[1280px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
              Contact <span className="text-svn-orange">Us</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium max-w-2xl leading-relaxed">
              Whether you're looking to buy, sell, or lease, our team of experts is ready to help you achieve your real estate goals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="text-svn-orange" size={24} />
              </div>
              <h3 className="text-lg font-bold text-svn-dark uppercase tracking-wider mb-2">Phone</h3>
              <p className="text-gray-500 mb-4">Monday - Friday from 8am to 5pm.</p>
              <a href="tel:3524848090" className="text-xl font-bold text-svn-dark hover:text-svn-orange transition-colors">
                352.484.8090
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6">
                <Mail className="text-svn-orange" size={24} />
              </div>
              <h3 className="text-lg font-bold text-svn-dark uppercase tracking-wider mb-2">Email</h3>
              <p className="text-gray-500 mb-4">Our team is here to help.</p>
              <a href="mailto:info@svnmcdonald.com" className="text-xl font-bold text-svn-dark hover:text-svn-orange transition-colors">
                info@svnmcdonald.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="text-svn-orange" size={24} />
              </div>
              <h3 className="text-lg font-bold text-svn-dark uppercase tracking-wider mb-2">Office</h3>
              <p className="text-gray-500 mb-4">Come say hello at our office headquarters.</p>
              <p className="text-lg font-bold text-svn-dark">
                1825 SE 16th Ave.<br />Ocala, FL 34471
              </p>
            </div>

             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="text-svn-orange" size={24} />
              </div>
              <h3 className="text-lg font-bold text-svn-dark uppercase tracking-wider mb-2">Hours</h3>
              <p className="text-gray-500 mb-4">We are open during the following hours:</p>
              <p className="text-lg font-bold text-svn-dark">
                Mon-Fri: 9am - 5pm<br />Sat-Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reuse ContactForm but maybe we want to customize it? 
          For now, let's just use it as the main inquiry form section.
      */}
      <ContactForm />

      <div className="h-[400px] w-full bg-gray-200 grayscale">
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.858872990664!2d-82.11584892434563!3d29.18659427537336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7d2d3a6c0c2ab%3A0x6b0a6e8b4b4b4b4b!2s1825%20SE%2016th%20Ave%2C%20Ocala%2C%20FL%2034471!5e0!3m2!1sen!2sus!4v1707590000000!5m2!1sen!2sus" 
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
         />
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
