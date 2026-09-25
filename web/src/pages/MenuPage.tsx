import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { CategoryPill } from '../components/ui/CategoryPill';
import { FoodCard } from '../components/ui/FoodCard';
import { EmptyState } from '../components/ui/EmptyState';

export const MenuPage: React.FC = () => {
  const {
    foods,
    categories,
    selectedCategoryId,
    selectCategory,
    searchQuery,
    search,
    clearSearch,
    sortBy,
    setSortBy,
  } = useFood();

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark">
              Explore Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-xs sm:text-sm text-txt-muted dark:text-txt-mutedDark mt-1">
              Hand-crafted gourmet dishes made with the freshest premium ingredients.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold py-2 px-3 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark focus:border-primary outline-none shadow-sm cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5 max-w-xl">
          <input
            type="text"
            placeholder="Search our delicious menu..."
            value={searchQuery}
            onChange={(e) => search(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 focus:border-primary text-sm font-medium text-txt-light dark:text-txt-dark placeholder:text-txt-muted dark:placeholder:text-txt-mutedDark shadow-soft-light dark:shadow-soft-dark outline-none transition-all"
          />
          <Search className="w-5 h-5 text-txt-muted dark:text-txt-mutedDark absolute left-4 top-3 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              type="button"
              className="absolute right-3.5 top-3 p-1 rounded-full text-txt-muted hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 pt-1 mb-6">
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

        {/* Menu Items Count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark uppercase tracking-wider">
            Showing {foods.length} {foods.length === 1 ? 'Dish' : 'Dishes'}
          </span>
        </div>

        {/* Foods Grid */}
        {foods.length === 0 ? (
          <EmptyState
            title="No Dishes Found"
            description="Try changing your search terms or selecting a different category."
            buttonText="Reset Filters"
            onButtonPressed={() => {
              clearSearch();
              selectCategory('');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
