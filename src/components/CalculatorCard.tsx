import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import ShareButton from './ShareButton';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  className?: string;
  size?: 'default' | 'large';
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon: IconComponent,
  href,
  color,
  className = '',
  size = 'default'
}) => {
  const fullUrl = `${window.location.origin}${href}`;
  const isLarge = size === 'large';

  return (
    <div className={`group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 ${className}`}>
      <Link to={href} className={`block ${isLarge ? 'p-8' : 'p-6'}`}>
        <div className={`${isLarge ? 'w-16 h-16 rounded-2xl' : 'w-12 h-12 rounded-lg'} bg-gradient-to-r ${color} flex items-center justify-center mb-${isLarge ? '6' : '4'} group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
        </div>
        <h4 className={`${isLarge ? 'text-xl' : 'text-lg'} font-${isLarge ? 'bold' : 'semibold'} text-gray-900 mb-${isLarge ? '3' : '2'}`}>
          {isLarge ? title.replace(' Calculator', '') : title}
        </h4>
        <p className={`text-gray-600 text-sm mb-4`}>{description}</p>
        <div className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Calculate Now →
        </div>
      </Link>
      
      {/* Share button that appears on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ShareButton
          url={fullUrl}
          title={`${title} - CalculatorsPlus`}
          text={`Check out this ${title.toLowerCase()} on CalculatorsPlus`}
          variant="ghost"
          size="sm"
          showText={false}
          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
        />
      </div>
    </div>
  );
};

export default CalculatorCard; 