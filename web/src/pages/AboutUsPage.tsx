import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  UtensilsCrossed,
  Award,
  Users,
  ChefHat,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/profile')}
            type="button"
            className="p-2 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark hover:text-primary shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-txt-light dark:text-txt-dark">
            About Foodie Restaurant
          </h1>
        </div>

        {/* Hero Brand Card */}
        <div className="p-6 sm:p-8 rounded-card bg-gradient-to-tr from-primary to-secondary text-white text-center shadow-primary-glow mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Foodie Restaurant</h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-sm mx-auto">
            Delicious food crafted with passion and delivered fresh to your door.
          </p>
        </div>

        {/* Story Section */}
        <div className="p-5 sm:p-6 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark mb-6 leading-relaxed">
          <h3 className="text-sm font-black uppercase tracking-wider text-primary mb-2">
            Our Culinary Story
          </h3>
          <p className="text-xs sm:text-sm text-txt-muted dark:text-txt-mutedDark mb-3">
            Founded with a passion for bringing artisanal food lovers together, Foodie Restaurant combines age-old secret recipes with modern culinary innovation.
          </p>
          <p className="text-xs sm:text-sm text-txt-muted dark:text-txt-mutedDark">
            Every burger patty is flame-grilled to perfection, every pizza crust is naturally fermented sourdough, and our handcrafted pastas bring the warmth of authentic Italian cooking right to your home.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <h4 className="text-base sm:text-lg font-black text-txt-light dark:text-txt-dark">15K+</h4>
            <span className="text-[10px] text-txt-muted dark:text-txt-mutedDark font-medium">Happy Foodies</span>
          </div>

          <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark text-center">
            <Award className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <h4 className="text-base sm:text-lg font-black text-txt-light dark:text-txt-dark">50+</h4>
            <span className="text-[10px] text-txt-muted dark:text-txt-mutedDark font-medium">Gourmet Dishes</span>
          </div>

          <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark text-center">
            <ChefHat className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <h4 className="text-base sm:text-lg font-black text-txt-light dark:text-txt-dark">15+</h4>
            <span className="text-[10px] text-txt-muted dark:text-txt-mutedDark font-medium">Master Chefs</span>
          </div>
        </div>

        {/* Operating Details */}
        <div className="p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark space-y-3.5 text-xs text-txt-muted dark:text-txt-mutedDark">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>452 Gourmet Way, Food District, NY 10012</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>Monday - Sunday: 10:00 AM - 11:00 PM</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span>+1 (800) 555-FOOD</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>support@foodierestaurant.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
