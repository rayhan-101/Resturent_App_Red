import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface CustomFoodImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CustomFoodImage: React.FC<CustomFoodImageProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div className={`flex items-center justify-center bg-orange-50 dark:bg-card-dark text-primary ${className}`}>
        <Utensils className="w-8 h-8 opacity-60" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
