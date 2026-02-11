import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Listings from '../components/Listings'
import Testimonials from '../components/Testimonials'
import Partners from '../components/Partners'
import Blog from '../components/Blog'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Listings />
        {/* WEC Effect CTA Section */}
        <section className="py-20 bg-svn-dark overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1534438097545-a2c22c57f01b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80" 
              alt="WEC Effect" 
              className="w-full h-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-svn-dark via-svn-dark/60 to-transparent" />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <div className="w-20 h-1.5 bg-svn-orange mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6 leading-tight">
                The <span className="text-svn-orange">WEC Effect</span> <br />
                Market Report
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
                Discover how the World Equestrian Center has transformed Ocala's real estate landscape and driven land values to unprecedented heights.
              </p>
              <Link to="/wec-effect" className="inline-flex items-center gap-4 bg-svn-orange text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-orange transition-all duration-300 shadow-xl">
                Read the Report <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
        <Services />
        <Stats />
        <Testimonials />
        <ContactForm />
        <Partners />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage;
