import { Facebook, Youtube, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const propertyTypeLinks: Record<string, string> = {
  'Acreage Properties': '/properties/acreage',
  'Commercial Properties': '/properties/commercial',
  'Equestrian Properties': '/properties/equestrian',
  'Farm and Nursery Properties': '/properties/farm-nursery',
  'Hunting and Recreation Properties': '/properties/hunting-recreation',
  'Industrial Properties': '/properties/industrial',
  'Multi-Family Properties': '/properties/multi-family',
  'Office Properties': '/properties/office',
  'Ranch Properties': '/properties/ranch',
  'Retail Properties': '/properties/retail',
  'Residential Development Properties': '/properties/residential-development',
  'Self Storage Properties': '/properties/self-storage',
  'Timber Properties': '/properties/timber',
  'Triple Net NNN Properties': '/properties/triple-net-nnn',
  'Warehouse Properties': '/properties/warehouse',
};

const propertyTypes = Object.keys(propertyTypeLinks);

const Footer = () => {
  return (
    <footer className="bg-svn-dark pt-24 pb-12 text-white px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <img
              src="https://svnmcdonald.com/wp-content/uploads/2023/05/White-Orange-DBA_Logo_McDonald-Company-768x374-1.png"
              alt="SVN McDonald &amp; Company - Commercial Real Estate Brokerage"
              className="h-20 w-auto mb-10"
              loading="lazy"
              decoding="async"
              width={768}
              height={374}
            />
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm mb-10">
              SVN McDonald & Company is Central Florida's premier commercial and land real estate brokerage. Our collaborative approach and national reach ensure maximum value for our clients.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/svnmcdonald" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-svn-orange transition-all duration-300 rounded-full flex items-center justify-center"><Facebook size={20} /></a>
              <a href="https://youtube.com/@bartowmcdonald1803/featured" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-svn-orange transition-all duration-300 rounded-full flex items-center justify-center"><Youtube size={20} /></a>

              <a href="https://linkedin.com/company/svn-mcdonald-company/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-svn-orange transition-all duration-300 rounded-full flex items-center justify-center"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/svnmcdonald/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-svn-orange transition-all duration-300 rounded-full flex items-center justify-center"><Instagram size={20} /></a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-svn-orange">Browse Specialty</h4>
            <div className="grid grid-cols-1 gap-4">
              {propertyTypes.slice(0, 8).map((type) => (
                <Link key={type} to={propertyTypeLinks[type]} className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
                  {type}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-svn-orange">Contact Details</h4>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-svn-orange" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">Direct Line</p>
                  <p className="text-xl font-bold">352.274.3800</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-svn-orange" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">Email Address</p>
                  <p className="text-xl font-bold">info@svnmcdonald.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-svn-orange" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">Headquarters</p>
                  <p className="text-xl font-bold leading-tight">1825 SE 16th Ave.<br />Ocala, FL 34471</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest text-center md:text-left leading-loose">
            All SVN® Offices Independently Owned and Operated | © 2026 SVN McDonald & Company
          </p>
          <div className="flex gap-8">
            <Link to="/team" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Meet The Team</Link>
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Contact</Link>
            <Link to="/privacy-policy" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/land-properties" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">MLS Listings</Link>
            <Link to="/terms-of-use" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/accessibility-statement" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
