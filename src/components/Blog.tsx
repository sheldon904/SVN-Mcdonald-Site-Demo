import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const latestPosts = blogPosts.slice(0, 3);

const Blog = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-svn-grey uppercase tracking-tight mb-2">
              Latest News Feeds
            </h2>
            <div className="w-20 h-1 bg-svn-orange" />
          </div>
          <Link to="/blog" className="hidden md:block text-sm font-bold text-svn-grey hover:text-svn-orange uppercase tracking-widest transition-colors">
            View All Posts
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <article key={index} className="group cursor-pointer">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                  />
                </div>
                <h3 className="text-xl font-bold text-svn-grey mb-4 group-hover:text-svn-orange transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.slug}`} className="text-xs font-bold uppercase tracking-widest text-svn-orange border-b-2 border-svn-orange pb-1">
                Read More
              </Link>
            </article>
          ))}
        </div>

        <Link to="/blog" className="block w-full md:hidden mt-12 bg-svn-grey text-white py-4 font-bold uppercase tracking-widest text-center">
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default Blog;
