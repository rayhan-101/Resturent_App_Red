import React, { createContext, useContext, useState, useMemo } from 'react';
import { Food, Category } from '../types';
import { FOODS, CATEGORIES } from '../data/mockData';

type SortOption = 'popular' | 'rating' | 'priceLowHigh' | 'priceHighLow';

interface FoodContextType {
  foods: Food[];
  categories: Category[];
  selectedCategoryId: string;
  searchQuery: string;
  sortBy: SortOption;
  popularFoods: Food[];
  recommendedFoods: Food[];
  favoriteFoods: Food[];
  selectCategory: (categoryId: string) => void;
  search: (query: string) => void;
  clearSearch: () => void;
  setSortBy: (sort: SortOption) => void;
  toggleFavorite: (foodId: string) => void;
  getFoodById: (id: string) => Food | undefined;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>(() => {
    const saved = localStorage.getItem('foodie_foods');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return FOODS;
      }
    }
    return FOODS;
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const toggleFavorite = (foodId: string) => {
    setFoods(prev => {
      const updated = prev.map(f => {
        if (f.id === foodId) {
          return { ...f, isFavorite: !f.isFavorite };
        }
        return f;
      });
      localStorage.setItem('foodie_foods', JSON.stringify(updated));
      return updated;
    });
  };

  const selectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getFoodById = (id: string) => {
    return foods.find(f => f.id === id);
  };

  // Filtered & sorted foods
  const filteredFoods = useMemo(() => {
    let result = [...foods];

    if (selectedCategoryId) {
      result = result.filter(f => f.categoryId === selectedCategoryId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        f =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceLowHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [foods, selectedCategoryId, searchQuery, sortBy]);

  const popularFoods = useMemo(() => {
    return foods.filter(f => f.rating >= 4.7).slice(0, 6);
  }, [foods]);

  const recommendedFoods = useMemo(() => {
    return foods.filter(f => ['f1', 'f3', 'f6', 'f7', 'f9', 'f14'].includes(f.id));
  }, [foods]);

  const favoriteFoods = useMemo(() => {
    return foods.filter(f => f.isFavorite);
  }, [foods]);

  return (
    <FoodContext.Provider
      value={{
        foods: filteredFoods,
        categories: CATEGORIES,
        selectedCategoryId,
        searchQuery,
        sortBy,
        popularFoods,
        recommendedFoods,
        favoriteFoods,
        selectCategory,
        search,
        clearSearch,
        setSortBy,
        toggleFavorite,
        getFoodById,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
