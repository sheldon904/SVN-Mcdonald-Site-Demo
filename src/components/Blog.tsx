
const posts = [
  {
    title: 'SVN McDonald Brokers Crucial 49.35 acre I-75 Deal for $5.7 million',
    excerpt: 'Orlando real estate broker, investor and developer Daryl Carter has purchased 49.35 acres...',
    image: 'https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg',
    href: '#'
  },
  {
    title: '7 Steps Developers Need to Follow Concerning the Florida Gopher Tortoise',
    excerpt: 'What shares the traits of being slow-moving, often unpredictable, and occasionally unwilling...',
    image: 'https://svnmcdonald.com/wp-content/uploads/2024/08/DALL·E-2024-08-19-14.51.08-A-cartoon-style-illustration-of-a-Florida-gopher-tortoise-blocking-a-construction-site.-The-tortoise-is-in-the-foreground-near-its-burrow-with-a-dete.webp',
    href: '#'
  },
  {
    title: 'Critical Updates You Need to Know on I-75 Traffic and Construction in Florida',
    excerpt: 'Major Florida cities such as Miami, Orlando, Tampa, and Jacksonville are infamous for...',
    image: 'https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg',
    href: '#'
  }
];

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
          <button className="hidden md:block text-sm font-bold text-svn-grey hover:text-svn-orange uppercase tracking-widest transition-colors">
            View All Posts
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-svn-grey mb-4 group-hover:text-svn-orange transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <a href={post.href} className="text-xs font-bold uppercase tracking-widest text-svn-orange border-b-2 border-svn-orange pb-1">
                Read More
              </a>
            </article>
          ))}
        </div>
        
        <button className="w-full md:hidden mt-12 bg-svn-grey text-white py-4 font-bold uppercase tracking-widest">
          View All Posts
        </button>
      </div>
    </section>
  );
};

export default Blog;
