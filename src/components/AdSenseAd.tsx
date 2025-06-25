import React, { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  width?: number;
  height?: number;
  responsive?: boolean;
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  width = 300,
  height = 250,
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      // Check if adsbygoogle is available
      if (typeof (window as any).adsbygoogle !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense not loaded yet');
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: responsive ? '100%' : `${width}px`,
          height: responsive ? 'auto' : `${height}px`
        }}
        data-ad-client="ca-pub-4661718123089348"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

// Fallback placeholder for when ads aren't loaded or available
export const AdPlaceholder: React.FC<{ width?: string; height?: string; label?: string }> = ({
  width = '100%',
  height = '250px',
  label = 'Advertisement'
}) => (
  <div 
    className="bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
    style={{ width, height }}
  >
    <div className="text-center text-gray-400">
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-xs">{width} x {height}</div>
    </div>
  </div>
);

export default AdSenseAd; 