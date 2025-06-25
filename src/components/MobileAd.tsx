import React from 'react';
import AdSenseAd from './AdSenseAd';

interface MobileAdProps {
  adSlot?: string;
  className?: string;
}

const MobileAd: React.FC<MobileAdProps> = ({
  adSlot = "3456789012",
  className = ""
}) => {
  return (
    <div className={`lg:hidden ${className}`}>
      <AdSenseAd
        adSlot={adSlot}
        width={320}
        height={100}
        responsive={true}
        adFormat="horizontal"
        className="w-full"
      />
    </div>
  );
};

export default MobileAd; 