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
