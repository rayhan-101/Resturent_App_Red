import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  FastForward,
  PartyPopper,
  Flame,
  ChefHat,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { CategoryPill } from '../components/ui/CategoryPill';
import { FoodCard } from '../components/ui/FoodCard';
import { EmptyState } from '../components/ui/EmptyState';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    foods,
    categories,
    selectedCategoryId,
    selectCategory,
    searchQuery,
    search,
    clearSearch,
    popularFoods,
    recommendedFoods,
  } = useFood();

  const { applyPromoCode } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleClaimPromo = () => {
    applyPromoCode('WELCOME20');
    setToastMessage('Promo code WELCOME20 applied! 20% discount on cart.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-card bg-semantic-success text-white shadow-dropdown animate-in slide-in-from-top duration-300">
          <PartyPopper className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Mobile Header Greeting */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={
                currentUser?.profileImageUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
              }
              alt="Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-primary/30"
            />
            <div>
              <p className="text-xs text-txt-muted dark:text-txt-mutedDark font-medium">
                {getGreeting()} 👋
              </p>
              <h2 className="text-base font-extrabold text-txt-light dark:text-txt-dark leading-tight">
                {currentUser?.name || 'Foodie Guest'}
              </h2>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5 max-w-2xl">
          <input
            type="text"
            placeholder="Search for delicious food, pizza, burgers..."
            value={searchQuery}
            onChange={(e) => search(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 focus:border-primary text-sm font-medium text-txt-light dark:text-txt-dark placeholder:text-txt-muted dark:placeholder:text-txt-mutedDark shadow-soft-light dark:shadow-soft-dark outline-none transition-all"
          />
          <Search className="w-5 h-5 text-txt-muted dark:text-txt-mutedDark absolute left-4 top-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              type="button"
              className="absolute right-3.5 top-3.5 p-1 rounded-full text-txt-muted hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Promotional Banner */}
        <div className="relative overflow-hidden rounded-card bg-gradient-to-r from-primary to-secondary p-5 sm:p-7 text-white shadow-primary-glow mb-8 transition-transform hover:scale-[1.005]">
          {/* Subtle Decorative Elements */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute right-8 bottom-3 hidden sm:flex items-center justify-center w-28 h-28 rounded-full bg-white/15 backdrop-blur-sm pointer-events-none">
            <span className="text-5xl">🍔</span>
          </div>

          <div className="max-w-md relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/20 backdrop-blur-sm text-[11px] font-black tracking-wider uppercase mb-2.5">
              <span>Promo Code: WELCOME20</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              Get 20% OFF
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 mb-4 font-medium">
              Enjoy 20% discount on your entire order today!
            </p>

            <button
              onClick={handleClaimPromo}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-white text-primary font-black text-xs sm:text-sm shadow-md hover:bg-orange-50 active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Claim 20% OFF</span>
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-extrabold text-txt-light dark:text-txt-dark">
              Categories
            </h3>
            <button
              onClick={() => navigate('/menu')}
              type="button"
              className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal scrollable category pill bar */}
          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1"
          >
            <CategoryPill
              isAll
              isSelected={selectedCategoryId === ''}
              onTap={() => selectCategory('')}
            />
            {categories.map((cat) => (
              <CategoryPill
                key={cat.id}
                category={cat}
                isSelected={selectedCategoryId === cat.id}
                onTap={() => selectCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Food Section */}
        {/* Case 1: Actively searching */}
        {searchQuery.trim().length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-extrabold text-txt-light dark:text-txt-dark">
                Search Results ({foods.length})
              </h3>
              <button
                onClick={clearSearch}
                type="button"
                className="text-xs font-bold text-primary hover:underline"
              >
                Clear Search
              </button>
            </div>

            {foods.length === 0 ? (
              <EmptyState
                title="No Dishes Found"
                description={`We couldn't find anything matching "${searchQuery}".`}
                buttonText="Clear Search"
                onButtonPressed={clearSearch}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {foods.map((food) => (
                  <FoodCard key={food.id} food={food} isHorizontal />
                ))}
              </div>
            )}
          </div>
        ) : selectedCategoryId !== '' ? (
          /* Case 2: Specific category filtered */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-extrabold text-txt-light dark:text-txt-dark">
                {categories.find((c) => c.id === selectedCategoryId)?.name || 'Category'} ({foods.length})
              </h3>
              <button
                onClick={() => selectCategory('')}
                type="button"
                className="text-xs font-bold text-primary hover:underline"
              >
                Show All
              </button>
            </div>

            {foods.length === 0 ? (
              <EmptyState
                title="No Dishes in this Category"
                description="There are currently no items available in this category."
                buttonText="Show All Dishes"
                onButtonPressed={() => selectCategory('')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {foods.map((food) => (
                  <FoodCard key={food.id} food={food} isHorizontal />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Case 3: Default Home (All selected) -> Popular Carousel + Chef Recommended */
          <div className="space-y-8">
            {/* Popular Dishes */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="text-base sm:text-lg font-extrabold text-txt-light dark:text-txt-dark">
                    Popular Dishes
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/menu')}
                  type="button"
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  <span>See All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Horizontal Scroll on Mobile / Flexible Grid on Tablet & Desktop */}
              <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:overflow-visible">
                {popularFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </div>

            {/* Chef Recommended */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-extrabold text-txt-light dark:text-txt-dark">
                    Chef Recommended
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/menu')}
                  type="button"
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  <span>See All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {recommendedFoods.map((food) => (
                  <FoodCard key={food.id} food={food} isHorizontal />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
