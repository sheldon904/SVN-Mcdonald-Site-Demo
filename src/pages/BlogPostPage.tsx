import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ArticleStructuredData from '../components/ArticleStructuredData';
import { blogPosts } from '../data/blogPosts';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <SEOHead
          title="Post Not Found"
          description="The blog post you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-extrabold text-svn-dark mb-4">Post Not Found</h1>
          <p className="text-gray-500 text-lg mb-8">
            Sorry, the blog post you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-svn-orange text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n');

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`https://svnmcdonald.com/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
      />
      <ArticleStructuredData post={post} />
      <Navbar />

      {/* Hero Image */}
      <div className="relative w-full h-[340px] md:h-[440px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-[900px] mx-auto">
          <span className="inline-block bg-svn-orange text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[800px] mx-auto px-6 py-12 md:py-16">
        <div className="flex items-center gap-6 text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-svn-orange" />
            {post.date}
          </div>
          <div className="flex items-center gap-2">
            <User size={14} className="text-svn-orange" />
            {post.author}
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-svn-dark hover:text-svn-orange transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
