import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="Blog & Market Insights"
        description="Read the latest commercial real estate news, market updates, and insights from SVN McDonald & Company in Central Florida."
        canonical="https://svnmcdonald.com/blog"
      />
      <StructuredData breadcrumbs={[
        { name: 'Home', url: 'https://svnmcdonald.com' },
        { name: 'Blog', url: 'https://svnmcdonald.com/blog' },
      ]} />
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
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <Link to={`/blog/${post.slug}`} className="block">
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
                </Link>

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

                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-svn-dark mb-4 group-hover:text-svn-orange transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="pt-6 border-t border-gray-100 mt-auto">
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-svn-dark group-hover:text-svn-orange transition-colors">
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
              Showing all {blogPosts.length} posts
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
