import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, message, subject } = formData;
    const subjectLine = subject
      ? `Website Inquiry from ${firstName} ${lastName} - ${subject}`
      : `Website Inquiry from ${firstName} ${lastName}`;
    const body = `${message}%0A%0AFrom: ${firstName} ${lastName}%0AEmail: ${email}%0APhone: ${phone}`;
    window.location.href = `mailto:info@svnmcdonald.com?subject=${encodeURIComponent(subjectLine)}&body=${body}`;
  };

  return (
    <section className="py-24 bg-[#181818] text-white px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-tight">
              Ready to <br />
              <span className="text-svn-orange">Collaborate?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Experience the SVN difference. Our advisors are ready to help you navigate the complexities of Central Florida real estate.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-svn-orange transition-colors duration-300">
                  <Phone className="text-svn-orange group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Call Us</p>
                  <p className="text-xl font-bold">352.484.8090</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-svn-orange transition-colors duration-300">
                  <Mail className="text-svn-orange group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Email Us</p>
                  <p className="text-xl font-bold">info@svnmcdonald.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-svn-orange transition-colors duration-300">
                  <MapPin className="text-svn-orange group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Visit Us</p>
                  <p className="text-xl font-bold">1825 SE 16th Ave., Ocala</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 rounded-[20px] backdrop-blur-sm border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-3">First Name</label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#222] border-0 rounded-[10px] px-6 py-4 text-white focus:ring-2 focus:ring-svn-orange transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-3">Last Name</label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#222] border-0 rounded-[10px] px-6 py-4 text-white focus:ring-2 focus:ring-svn-orange transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-3">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#222] border-0 rounded-[10px] px-6 py-4 text-white focus:ring-2 focus:ring-svn-orange transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-3">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#222] border-0 rounded-[10px] px-6 py-4 text-white focus:ring-2 focus:ring-svn-orange transition-all"
                  placeholder="(352) 555-0123"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-3">Property Interest</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#222] border-0 rounded-[10px] px-6 py-4 text-white focus:ring-2 focus:ring-svn-orange transition-all"
                >
                  <option value="">Select a topic...</option>
                  <option value="Land Brokerage">Land Brokerage</option>
                  <option value="Commercial Properties">Commercial Properties</option>
                  <option value="Conservation Easement">Conservation Easement</option>
                  <option value="Land Auctions">Land Auctions</option>
                  <option value="Valuation & Appraisal">Valuation & Appraisal</option>
                  <option value="Strategic Marketing">Strategic Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-3">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#222] border-0 rounded-[10px] px-6 py-4 text-white focus:ring-2 focus:ring-svn-orange transition-all resize-none"
                  placeholder="Tell us about your property or investment needs..."
                />
              </div>

              <button type="submit" className="w-full bg-svn-orange hover:bg-white hover:text-svn-orange text-white py-5 rounded-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3">
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
