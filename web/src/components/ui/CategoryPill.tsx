import React from 'react';
import { 
  Pizza, 
  UtensilsCrossed, 
  Coffee, 
  IceCream, 
  Sandwich, 
  Drumstick 
} from 'lucide-react';
import { Category } from '../../types';

interface CategoryPillProps {
  category?: Category;
  isAll?: boolean;
  isSelected: boolean;
  onTap: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  category,
  isAll = false,
  isSelected,
  onTap,
}) => {
  const getIcon = () => {
    if (isAll) return <UtensilsCrossed className="w-4 h-4" />;
    
    switch (category?.name.toLowerCase()) {
      case 'burgers':
        return <Sandwich className="w-4 h-4" />;
      case 'pizza':
        return <Pizza className="w-4 h-4" />;
      case 'chicken':
        return <Drumstick className="w-4 h-4" />;
      case 'pasta':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'desserts':
        return <IceCream className="w-4 h-4" />;
      case 'drinks':
        return <Coffee className="w-4 h-4" />;
      default:
        return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  const label = isAll ? 'All' : category?.name || '';

  return (
    <button
      onClick={onTap}
      type="button"
      className={`group flex items-center gap-2.5 px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 shrink-0 select-none ${
        isSelected
          ? 'bg-primary text-white shadow-primary-glow scale-[1.02]'
          : 'bg-card-light dark:bg-card-dark text-txt-light dark:text-txt-dark border border-neutral-100 dark:border-neutral-800 hover:border-primary/40 shadow-sm'
      }`}
    >
      <div
        className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-white text-primary'
            : 'bg-orange-50 dark:bg-neutral-800 text-txt-muted dark:text-neutral-300 group-hover:text-primary'
        }`}
      >
        {getIcon()}
      </div>
      <span className={isSelected ? 'font-bold' : 'font-medium'}>{label}</span>
    </button>
  );
};
