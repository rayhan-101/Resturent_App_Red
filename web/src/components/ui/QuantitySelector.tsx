import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: {
      btn: 'w-6 h-6 p-1 text-xs',
      text: 'text-xs w-6',
      icon: 'w-3 h-3',
    },
    md: {
      btn: 'w-8 h-8 p-1.5 text-sm',
      text: 'text-sm w-8',
      icon: 'w-3.5 h-3.5',
    },
    lg: {
      btn: 'w-10 h-10 p-2 text-base',
      text: 'text-base w-10 font-bold',
      icon: 'w-4 h-4',
    },
  }[size];

  return (
    <div className="flex items-center gap-1 bg-orange-50 dark:bg-neutral-800 rounded-full p-1 border border-orange-100 dark:border-neutral-700">
      <button
        onClick={onDecrement}
        type="button"
        className={`${sizeClasses.btn} flex items-center justify-center rounded-full bg-white dark:bg-card-dark text-txt-light dark:text-txt-dark shadow-sm hover:bg-orange-100 dark:hover:bg-neutral-700 active:scale-90 transition-all`}
      >
        <Minus className={sizeClasses.icon} />
      </button>

      <span
        className={`${sizeClasses.text} text-center font-bold text-txt-light dark:text-txt-dark select-none`}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrement}
        type="button"
        className={`${sizeClasses.btn} flex items-center justify-center rounded-full bg-primary text-white shadow-sm hover:bg-primary-dark active:scale-90 transition-all`}
      >
        <Plus className={sizeClasses.icon} />
      </button>
    </div>
  );
};
