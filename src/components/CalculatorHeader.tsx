import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, LucideIcon } from 'lucide-react';
import ShareButton from './ShareButton';

interface CalculatorHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradientFrom?: string;
  gradientTo?: string;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({
  title,
  description,
  icon: IconComponent,
  gradientFrom = 'orange-400',
  gradientTo = 'pink-400'
}) => {
  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-xl flex items-center justify-center shrink-0`}>
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-${gradientFrom.replace('400', '600')} to-${gradientTo.replace('400', '600')} bg-clip-text text-transparent truncate`}>
                  {title}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">{description}</p>
              </div>
            </div>
            <div className="shrink-0 ml-4 hidden sm:block">
              <ShareButton
                url={window.location.href}
                title={`${title} - CalculatorsPlus`}
                text={`Check out this free ${title.toLowerCase()} for accurate calculations!`}
                variant="outline"
                size="sm"
                showText={false}
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Share Button - Below Header */}
      <div className="sm:hidden bg-white border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
          <ShareButton
            url={window.location.href}
            title={`${title} - CalculatorsPlus`}
            text={`Check out this free ${title.toLowerCase()} for accurate calculations!`}
            variant="outline"
            size="sm"
            showText={true}
            className="text-xs"
          />
        </div>
      </div>
    </>
  );
};

export default CalculatorHeader; 