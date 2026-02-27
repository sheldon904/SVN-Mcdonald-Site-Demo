const ShowcaseLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-svn-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-svn-orange/30 border-t-svn-orange rounded-full animate-spin mx-auto mb-6" />
        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
          Loading showcase
        </p>
      </div>
    </div>
  );
};

export default ShowcaseLoadingSkeleton;
