import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Closed Deals', href: '/closed-deals' },
    { 
      name: 'Reports',
      href: '/market-reports',
      dropdown: [
        { name: 'WEC Effect', href: '/wec-effect' },
        { name: 'Market Reports', href: '/market-reports' }
      ]
    },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Meet The Team', href: '/team' },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'Land Listings', href: '/land-properties' },
        { name: 'Commercial Listings', href: '/commercial-properties' },
        { name: 'Conservation Easement', href: '/services/conservation-easement' },
        { name: 'Distressed/REO Properties', href: '/services/distressed-reo' },
        { name: 'Land Auctions', href: '/services/land-auctions' },
        { name: 'Land Brokerage', href: '/services/land-brokerage' },
        { name: 'Strategic Marketing', href: '/services/strategic-marketing' },
        { name: 'Value Positioning', href: '/services/value-positioning' },
        { name: 'Valuation Appraisal', href: '/services/valuation-appraisal' },
        { name: 'Types of CRE', href: '/services/types-of-commercial-real-estate' }
      ]
    },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed w-full z-50">
      {/* Top Bar */}
      <div className={cn(
        "bg-[#181818] text-white py-2 px-6 transition-all duration-300 overflow-hidden",
        isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
      )}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6 mb-2 md:mb-0">
            <a href="tel:3522743800" className="flex items-center gap-2 hover:text-svn-orange transition-colors">
              <Phone size={12} className="text-svn-orange" />
              352.274.3800
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-svn-orange" />
              1825 SE 16th Ave., Ocala, FL 34471
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://svnmcdonald.com" target="_blank" rel="noopener noreferrer" className="hover:text-svn-orange transition-colors">Log In</a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={cn(
        "w-full transition-all duration-300 px-6",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      )}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://svnmcdonald.com/wp-content/uploads/2023/05/White-Orange-DBA_Logo_McDonald-Company-768x374-1.png"
                alt="SVN McDonald &amp; Company - Commercial Real Estate Brokerage"
                className={cn(
                  "h-14 md:h-20 w-auto transition-all duration-300",
                  isScrolled ? "brightness-0 h-12 md:h-16" : "brightness-100"
                )}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={768}
                height={374}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link 
                  to={item.href}
                  className={cn(
                    "text-[13px] font-extrabold uppercase tracking-widest flex items-center gap-1 py-4 transition-colors",
                    isScrolled 
                      ? "text-svn-dark hover:text-svn-orange" 
                      : "text-white hover:text-svn-orange"
                  )}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown size={14} className="opacity-50" />}
                </Link>
                
                {item.dropdown && (
                  <div className="absolute left-0 top-full w-72 bg-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4 rounded-b-md border-t-4 border-svn-orange transform translate-y-2 group-hover:translate-y-0">
                    <div className="grid grid-cols-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={typeof subItem === 'string' ? subItem : subItem.name}
                          to={typeof subItem === 'string' ? '#' : subItem.href}
                          className="block px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-svn-dark hover:bg-gray-50 hover:text-svn-orange transition-colors border-b border-gray-50 last:border-0"
                        >
                          {typeof subItem === 'string' ? subItem : subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open navigation menu"
              className={cn(
                "p-2 transition-colors",
                isScrolled ? "text-svn-dark" : "text-white"
              )}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 bg-white z-[60] transition-transform duration-500",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src="https://svnmcdonald.com/wp-content/uploads/2023/05/White-Orange-DBA_Logo_McDonald-Company-768x374-1.png"
                alt="SVN McDonald &amp; Company - Commercial Real Estate Brokerage"
                className="h-12 w-auto brightness-0"
                loading="lazy"
                decoding="async"
                width={768}
                height={374}
              />
            </Link>
            <button onClick={() => setIsOpen(false)} aria-label="Close navigation menu" className="text-svn-dark p-2">
              <X size={32} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6 overflow-y-auto pb-10">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 pb-4">
                <Link 
                  to={item.href}
                  className="text-lg font-black text-svn-dark hover:text-svn-orange uppercase tracking-widest block mb-2"
                  onClick={() => !item.dropdown && setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 mt-4 space-y-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={typeof subItem === 'string' ? subItem : subItem.name}
                        to={typeof subItem === 'string' ? '#' : subItem.href}
                        className="block text-sm font-bold text-gray-400 hover:text-svn-orange uppercase tracking-wide"
                        onClick={() => setIsOpen(false)}
                      >
                        {typeof subItem === 'string' ? subItem : subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <a href="tel:3522743800" className="flex items-center gap-3 text-svn-dark font-bold mb-4">
              <Phone size={20} className="text-svn-orange" />
              352.274.3800
            </a>
            <div className="flex items-center gap-3 text-svn-dark text-sm">
              <MapPin size={20} className="text-svn-orange" />
              1825 SE 16th Ave., Ocala, FL 34471
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
