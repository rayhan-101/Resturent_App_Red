import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Plus, Check, Flame, Clock } from 'lucide-react';
import { Food } from '../../types';
import { useFood } from '../../context/FoodContext';
import { useCart } from '../../context/CartContext';
import { CustomFoodImage } from './CustomFoodImage';

interface FoodCardProps {
  food: Food;
  isHorizontal?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, isHorizontal = false }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useFood();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/food/${food.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(food.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(food, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  if (isHorizontal) {
    return (
      <div
        onClick={handleCardClick}
        className="group relative flex items-center gap-3.5 p-3 mb-3 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark hover:border-primary/40 transition-all duration-200 cursor-pointer overflow-hidden"
      >
        {/* Food Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-input overflow-hidden shrink-0">
          <CustomFoodImage
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            type="button"
            className="absolute top-1.5 left-1.5 p-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-neutral-400 hover:text-semantic-error transition-colors"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                food.isFavorite ? 'fill-semantic-error text-semantic-error' : ''
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center justify-between gap-1">
              <h4 className="font-bold text-sm sm:text-base text-txt-light dark:text-txt-dark truncate">
                {food.name}
              </h4>
            </div>

            <p className="text-xs text-txt-muted dark:text-txt-mutedDark line-clamp-2 mt-0.5 leading-relaxed">
              {food.description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2 text-[11px] text-txt-muted dark:text-txt-mutedDark font-medium">
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              {food.rating.toFixed(1)}
              <span className="text-[10px] text-neutral-400 font-normal">({food.reviews})</span>
            </span>
            <span className="flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              {food.calories} kcal
            </span>
            <span className="hidden sm:flex items-center gap-0.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {food.prepTime}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-base sm:text-lg font-extrabold text-primary">
              ${food.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              type="button"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-button text-xs font-bold transition-all duration-200 ${
                justAdded
                  ? 'bg-semantic-success text-white'
                  : 'bg-primary text-white hover:bg-primary-dark shadow-sm active:scale-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Card (Default for Grid / Horizontal Carousel)
  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between w-48 sm:w-56 shrink-0 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden select-none"
    >
      {/* Food Image */}
      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-orange-50/50 dark:bg-neutral-800">
        <CustomFoodImage
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          type="button"
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm text-neutral-400 hover:text-semantic-error shadow-sm transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              food.isFavorite ? 'fill-semantic-error text-semantic-error' : ''
            }`}
          />
        </button>

        {/* Rating Tag */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{food.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1">
        <div>
          <h4 className="font-bold text-sm sm:text-base text-txt-light dark:text-txt-dark truncate group-hover:text-primary transition-colors">
            {food.name}
          </h4>
          <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark line-clamp-1 mt-0.5">
            {food.description}
          </p>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-400">
            <span className="flex items-center gap-0.5">
              <Flame className="w-3 h-3 text-orange-500" />
              {food.calories} kcal
            </span>
            <span>•</span>
            <span>{food.prepTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-base sm:text-lg font-extrabold text-primary">
            ${food.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            type="button"
            className={`p-2 rounded-button text-white transition-all duration-200 ${
              justAdded
                ? 'bg-semantic-success scale-105'
                : 'bg-primary hover:bg-primary-dark shadow-primary-glow active:scale-95'
            }`}
          >
            {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
