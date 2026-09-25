import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/home' : '/login', { replace: true });
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  const handleEnterNow = () => {
    navigate(isAuthenticated ? '/home' : '/login', { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#FFF9F5] to-orange-50/60 dark:from-[#141416] dark:to-[#1a1412] text-txt-light dark:text-txt-dark selection:bg-primary selection:text-white overflow-hidden">
      {/* Top spacing */}
      <div />

      {/* Main Animated Brand Center */}
      <div className="flex flex-col items-center text-center max-w-sm animate-in fade-in zoom-in-95 duration-700">
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-primary-glow animate-pulse">
            <UtensilsCrossed className="w-12 h-12 sm:w-14 sm:h-14" />
          </div>
          {/* Subtle glow circle behind logo */}
          <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl -z-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-primary">
          Foodie<span className="text-txt-light dark:text-txt-dark font-extrabold ml-1">Restaurant</span>
        </h1>

        <p className="mt-2 text-sm sm:text-base text-txt-muted dark:text-txt-mutedDark font-medium">
          Delicious food delivered with love.
        </p>

        {/* Loading Spinner */}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>

      {/* Skip Button for Web */}
      <button
        onClick={handleEnterNow}
        type="button"
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-txt-muted dark:text-txt-mutedDark hover:text-primary hover:bg-orange-100/50 dark:hover:bg-neutral-800 transition-all active:scale-95"
      >
        <span>Enter App</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
