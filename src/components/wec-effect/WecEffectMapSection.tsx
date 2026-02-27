import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Scale, Landmark } from 'lucide-react';
import WecEffectMapViewer from './WecEffectMapViewer';
import { isMobileDevice, supportsWebGL2 } from '../showcase/webglSupport';
import { FINDINGS } from '../../data/wecEffectData';

const ICON_MAP = { TrendingUp, MapPin, Scale, Landmark } as const;

const FindingsPanel = ({ className = '' }: { className?: string }) => (
  <div className={className}>
    <div className="mb-8">
      <div className="w-12 h-1 bg-svn-orange mb-4" />
      <h2 className="text-3xl lg:text-4xl font-black text-svn-dark uppercase tracking-tighter">
        Key <span className="text-svn-orange">Findings</span>
      </h2>
    </div>

    <div className="flex flex-col gap-4">
      {FINDINGS.map((finding, index) => {
        const Icon = ICON_MAP[finding.icon];
        return (
          <motion.div
            key={finding.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-0.5">
                <Icon className="text-svn-orange" size={24} />
              </div>
              <div>
                <h3 className="text-sm lg:text-base font-black text-svn-dark uppercase tracking-tight mb-1">
                  {finding.title}
                </h3>
                <p className="text-gray-500 text-[11px] lg:text-xs leading-relaxed font-medium">
                  {finding.desc}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const WecEffectMapSection = () => {
  const [viewerStatus, setViewerStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const isMobile = useMemo(() => isMobileDevice(), []);
  const hasWebGL = useMemo(() => supportsWebGL2(), []);
  const canRenderMap = !isMobile && hasWebGL;

  const handleStatusChange = useCallback((status: 'loading' | 'loaded' | 'error') => {
    setViewerStatus(prev => {
      if (prev === 'loaded' && status === 'error') return prev;
      return status;
    });
  }, []);

  // Mobile: just show findings, no map, no fallback message
  if (!canRenderMap) {
    return (
      <section className="py-16 px-6 bg-[#F6F6F6]">
        <div className="max-w-[1280px] mx-auto">
          <FindingsPanel />
        </div>
      </section>
    );
  }

  // Desktop: 2/3 auto-play map + 1/3 findings
  return (
    <section className="relative h-screen min-h-[700px] max-h-[900px]">
      <div className="grid grid-cols-3 h-full">
        {/* Map — 2/3 */}
        <div className="col-span-2 relative bg-svn-dark overflow-hidden">
          {viewerStatus === 'loading' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-svn-dark">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-svn-orange/30 border-t-svn-orange rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                  Loading satellite flyover
                </p>
              </div>
            </div>
          )}

          {viewerStatus === 'error' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-svn-dark">
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                Satellite flyover unavailable
              </p>
            </div>
          ) : (
            <WecEffectMapViewer
              autoPlay
              onStatusChange={handleStatusChange}
            />
          )}
        </div>

        {/* Findings — 1/3 */}
        <div className="col-span-1 bg-[#F6F6F6] overflow-y-auto">
          <FindingsPanel className="p-6 lg:p-8 xl:p-10" />
        </div>
      </div>
    </section>
  );
};

export default WecEffectMapSection;
