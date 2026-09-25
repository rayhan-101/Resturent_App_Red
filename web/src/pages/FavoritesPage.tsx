import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFood } from '../context/FoodContext';
import { FoodCard } from '../components/ui/FoodCard';
import { EmptyState } from '../components/ui/EmptyState';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteFoods } = useFood();

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark">
              Your <span className="text-primary">Favorites</span>
            </h1>
            <p className="text-xs sm:text-sm text-txt-muted dark:text-txt-mutedDark mt-1">
              Dishes you loved and saved for quick ordering.
            </p>
          </div>
          <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark">
            {favoriteFoods.length} {favoriteFoods.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {favoriteFoods.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-10 h-10 text-semantic-error" />}
            title="No Favorites Yet"
            description="You haven't saved any favorite dishes yet. Tap the heart icon on any dish to save it here!"
            buttonText="Explore Menu"
            onButtonPressed={() => navigate('/menu')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favoriteFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
