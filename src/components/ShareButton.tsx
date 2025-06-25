import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showText?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = 'Check out this calculator',
  text = 'CalculatorsPlus - Free Online Calculators',
  className = '',
  variant = 'outline',
  size = 'default',
  showText = true
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
        toast({
          title: 'Shared successfully!',
          description: 'The link has been shared.',
        });
      } catch (error) {
        // If user cancels sharing, fall back to copy
        if (error instanceof Error && error.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      // Fallback to copying URL to clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: 'Link copied!',
        description: 'The URL has been copied to your clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please try copying the URL manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      size={size}
      className={`flex items-center ${showText ? 'space-x-2' : ''} ${className}`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {showText && (
        <span className="text-sm font-medium hidden sm:inline">
          {copied ? 'Copied!' : 'Share'}
        </span>
      )}
    </Button>
  );
};

export default ShareButton; 