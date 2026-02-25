import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: 'SVN McDonald Brokers Crucial 49.35 acre I-75 Deal for $5.7 million',
      excerpt: 'Orlando real estate broker, investor and developer Daryl Carter has purchased 49.35 acres...',
      date: 'Oct 24, 2024',
      author: 'SVN McDonald',
      category: 'Transactions',
      image: 'https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg',
    },
    {
      id: 2,
      title: '7 Steps Developers Need to Follow Concerning the Florida Gopher Tortoise',
      excerpt: 'What shares the traits of being slow-moving, often unpredictable, and occasionally unwilling...',
      date: 'Aug 19, 2024',
      author: 'SVN McDonald',
      category: 'Development',
      image: 'https://svnmcdonald.com/wp-content/uploads/2024/08/DALL·E-2024-08-19-14.51.08-A-cartoon-style-illustration-of-a-Florida-gopher-tortoise-blocking-a-construction-site.-The-tortoise-is-in-the-foreground-near-its-burrow-with-a-dete.webp',
    },
    {
      id: 3,
      title: 'Critical Updates You Need to Know on I-75 Traffic and Construction in Florida',
      excerpt: 'Major Florida cities such as Miami, Orlando, Tampa, and Jacksonville are infamous for...',
      date: 'Jun 15, 2024',
      author: 'SVN McDonald',
      category: 'Market Update',
      image: 'https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg',
    },
    {
      id: 4,
      title: 'Central Florida Commercial Real Estate Market Report Q1 2024',
      excerpt: 'An in-depth analysis of the trends shaping the commercial real estate landscape in Ocala and surrounding areas.',
      date: 'Apr 02, 2024',
      author: 'SVN McDonald',
      category: 'Market Report',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80',
    },
    {
      id: 5,
      title: 'Understanding Conservation Easements in Florida',
      excerpt: "How landowners can benefit from conservation easements while preserving Florida's natural beauty.",
      date: 'Mar 10, 2024',
      author: 'SVN McDonald',
      category: 'Land',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2664&q=80',
    },
    {
      id: 6,
      title: 'The Rise of Industrial Real Estate in Marion County',
      excerpt: 'Why Marion County is becoming a hotspot for industrial development and logistics hubs.',
      date: 'Feb 28, 2024',
      author: 'SVN McDonald',
      category: 'Industrial',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2370&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="Blog & Market Insights"
        description="Read the latest commercial real estate news, market updates, and insights from SVN McDonald & Company in Central Florida."
        canonical="https://svnmcdonald.com/blog"
      />
      <Navbar />
      
      <PageHeader 
        title="Latest" 
        highlightedText="News" 
        subtitle="Insights, market updates, and company news from the SVN McDonald team."
        backgroundImage="https://images.unsplash.com/photo-1504384308090-c54be3852f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="500"
                  />
                  <div className="absolute top-4 left-4 bg-svn-orange text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-svn-orange" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} className="text-svn-orange" />
                      {post.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-svn-dark mb-4 group-hover:text-svn-orange transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-6 border-t border-gray-100 mt-auto">
                    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-svn-dark group-hover:text-svn-orange transition-colors">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-svn-orange text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 font-bold hover:bg-gray-100 transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 font-bold hover:bg-gray-100 transition-colors">3</button>
              <span className="text-gray-400 font-bold">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 font-bold hover:bg-gray-100 transition-colors"><ArrowRight size={16}/></button>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
