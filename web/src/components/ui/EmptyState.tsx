import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onButtonPressed?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonText,
  onButtonPressed,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 my-6 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/40 text-primary flex items-center justify-center mb-4 shadow-sm">
        {icon || <PackageOpen className="w-8 h-8" />}
      </div>

      <h3 className="text-lg font-bold text-txt-light dark:text-txt-dark mb-1">
        {title}
      </h3>

      <p className="text-sm text-txt-muted dark:text-txt-mutedDark mb-6 max-w-xs leading-relaxed">
        {description}
      </p>

      {buttonText && onButtonPressed && (
        <button
          onClick={onButtonPressed}
          type="button"
          className="px-6 py-2.5 rounded-button bg-primary text-white font-bold text-sm shadow-primary-glow hover:bg-primary-dark active:scale-95 transition-all"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
