import { Link } from 'react-router-dom';
import BuildoutListing from './BuildoutListing';

const Listings = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-svn-dark uppercase tracking-tight mb-4">
              Featured <span className="text-svn-orange">Listings</span>
            </h2>
            <p className="text-svn-grey/60 font-medium">
              Explore our premier land and commercial opportunities in Central Florida, powered by Buildout.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/land-properties" className="px-6 py-3 border-2 border-svn-orange text-svn-orange font-bold uppercase tracking-widest text-xs rounded-md hover:bg-svn-orange hover:text-white transition-all">
              Land
            </Link>
            <Link to="/commercial-properties" className="px-6 py-3 bg-gray-100 text-svn-dark font-bold uppercase tracking-widest text-xs rounded-md hover:bg-svn-orange hover:text-white transition-all">
              Commercial
            </Link>
          </div>
        </div>

        <div className="w-full">
          <BuildoutListing pluginType="featured" containerId="featured-buildout-container" />
        </div>
      </div>
    </section>
  );
};

export default Listings;
