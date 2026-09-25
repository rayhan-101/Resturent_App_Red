import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Star,
  Flame,
  Clock,
  Check,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { FoodAddOn } from '../types';
import { CustomFoodImage } from '../components/ui/CustomFoodImage';
import { QuantitySelector } from '../components/ui/QuantitySelector';

export const FoodDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getFoodById, toggleFavorite } = useFood();
  const { addToCart } = useCart();

  const food = getFoodById(id || '');

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<FoodAddOn[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!food) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-txt-light dark:text-txt-dark mb-2">
          Dish Not Found
        </h2>
        <p className="text-sm text-txt-muted dark:text-txt-mutedDark mb-4">
          The dish you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="px-5 py-2.5 rounded-button bg-primary text-white font-bold text-xs shadow-primary-glow"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleToggleAddOn = (addOn: FoodAddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(a => a.id === addOn.id);
      if (exists) {
        return prev.filter(a => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (food.price + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    addToCart(food, quantity, selectedAddOns, specialInstructions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      navigate('/cart');
    }, 800);
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16 bg-bg-light dark:bg-bg-dark transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Back and Favorite Nav Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark text-xs font-bold hover:text-primary shadow-sm active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={() => toggleFavorite(food.id)}
            type="button"
            className="p-2.5 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-muted hover:text-semantic-error shadow-sm active:scale-95 transition-all"
          >
            <Heart
              className={`w-5 h-5 ${
                food.isFavorite ? 'fill-semantic-error text-semantic-error' : ''
              }`}
            />
          </button>
        </div>

        {/* Hero Food Image & Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Big Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-soft-light dark:shadow-soft-dark border border-neutral-100 dark:border-neutral-800 h-72 sm:h-96 w-full bg-orange-50/40 dark:bg-neutral-800">
            <CustomFoodImage
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            {/* Rating floating tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-black">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{food.rating.toFixed(1)}</span>
              <span className="text-white/70 font-normal">({food.reviews} reviews)</span>
            </div>
          </div>

          {/* Right: Info & Customization */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark">
                {food.name}
              </h1>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-txt-muted dark:text-txt-mutedDark mb-4">
              <span className="flex items-center gap-1 text-orange-500 font-bold">
                <Flame className="w-4 h-4" />
                {food.calories} kcal
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-500 font-bold">
                <Clock className="w-4 h-4" />
                {food.prepTime}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-txt-muted dark:text-txt-mutedDark leading-relaxed mb-6">
              {food.description}
            </p>

            {/* Ingredients Chips */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-txt-light dark:text-txt-dark mb-2.5">
                Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-orange-50 dark:bg-neutral-800 text-txt-light dark:text-txt-dark text-xs font-medium border border-orange-100 dark:border-neutral-700"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Add-ons list if any */}
            {food.addOns && food.addOns.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-txt-light dark:text-txt-dark">
                    Choice of Add-ons
                  </h4>
                  <span className="text-[11px] text-txt-muted dark:text-txt-mutedDark font-medium">
                    Optional
                  </span>
                </div>

                <div className="space-y-2">
                  {food.addOns.map((addOn) => {
                    const isChecked = selectedAddOns.some(a => a.id === addOn.id);
                    return (
                      <div
                        key={addOn.id}
                        onClick={() => handleToggleAddOn(addOn)}
                        className={`flex items-center justify-between p-3 rounded-card border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-orange-50/60 dark:bg-neutral-800/80 border-primary text-primary'
                            : 'bg-card-light dark:bg-card-dark border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-primary border-primary text-white'
                                : 'border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-900'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-semibold">{addOn.name}</span>
                        </div>
                        <span className="text-xs font-bold">
                          +${addOn.price.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-txt-light dark:text-txt-dark mb-2">
                Special Instructions
              </h4>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra spicy, sauce on the side, no onions..."
                className="w-full p-3 rounded-card bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 focus:border-primary text-xs text-txt-light dark:text-txt-dark placeholder:text-txt-muted outline-none transition-all resize-none shadow-sm"
              />
            </div>

            {/* Quantity and Add to Cart Row */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={() => setQuantity(q => q + 1)}
                  onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
                  size="md"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-button font-black text-sm text-white shadow-primary-glow transition-all active:scale-95 ${
                  isAdded
                    ? 'bg-semantic-success'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • ${totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
