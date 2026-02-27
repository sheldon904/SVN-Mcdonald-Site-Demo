import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';

interface PointCloudFallbackProps {
  aerialImage: string;
  title: string;
  reason: 'mobile' | 'no-webgl' | 'error' | 'timeout';
}

const messages: Record<PointCloudFallbackProps['reason'], string> = {
  mobile: 'View on desktop for an interactive 3D flyover',
  'no-webgl': 'Your browser does not support WebGL2. Try Chrome or Firefox for the 3D experience.',
  error: '3D flyover is temporarily unavailable',
  timeout: '3D flyover took too long to load',
};

const PointCloudFallback = ({ aerialImage, title, reason }: PointCloudFallbackProps) => {
  return (
    <section className="relative w-full py-0">
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={aerialImage}
          alt={`Aerial view of ${title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <Monitor className="text-svn-orange mx-auto mb-4" size={40} />
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                3D LiDAR Flyover
              </h3>
              <p className="text-sm text-white/70 font-medium">
                {messages[reason]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PointCloudFallback;
