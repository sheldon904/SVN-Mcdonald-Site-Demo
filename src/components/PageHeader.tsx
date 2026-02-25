import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  highlightedText?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  highlightedText,
  backgroundImage 
}) => {
  return (
    <div className="relative bg-svn-dark pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-svn-dark to-transparent" />
        </div>
      )}
      
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <div className="w-20 h-1.5 bg-svn-orange mb-8" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-8 leading-tight">
            {title} {highlightedText && <span className="text-svn-orange">{highlightedText}</span>}
          </h1>
          {subtitle && (
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
