import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  UtensilsCrossed,
  Home,
  Menu as MenuIcon,
  ShoppingBag,
  Receipt,
  User,
  Sun,
  Moon,
  Heart,
  Bell,
  Search,
  LogOut,
  Settings,
  HelpCircle,
  Info,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';
import { useFood } from '../../context/FoodContext';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItemCount } = useCart();
  const { unreadCount } = useNotifications();
  const { searchQuery, search } = useFood();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== '/menu') {
      navigate('/menu');
    }
  };

  return (
    <>
      {/* ================= DESKTOP & TABLET TOP NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <NavLink to="/home" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-primary-glow group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-primary leading-none">
                Foodie<span className="text-txt-light dark:text-txt-dark font-extrabold ml-1">Restaurant</span>
              </span>
              <span className="text-[10px] text-txt-muted dark:text-txt-mutedDark font-medium tracking-wide">
                Delicious food delivered
              </span>
            </div>
          </NavLink>

          {/* Search Bar (Hidden on small mobile, visible on sm+) */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search food, drinks..."
                value={searchQuery}
                onChange={(e) => search(e.target.value)}
                onFocus={() => {
                  if (location.pathname !== '/menu' && location.pathname !== '/home') {
                    navigate('/menu');
                  }
                }}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-card-dark text-txt-light dark:text-txt-dark placeholder:text-txt-muted dark:placeholder:text-txt-mutedDark outline-none transition-all"
              />
              <Search className="w-4 h-4 text-txt-muted dark:text-txt-mutedDark absolute left-3 top-2.5 pointer-events-none" />
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-txt-muted dark:text-txt-mutedDark hover:text-primary dark:hover:text-primary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-txt-muted dark:text-txt-mutedDark hover:text-primary dark:hover:text-primary'
                }`
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-txt-muted dark:text-txt-mutedDark hover:text-primary dark:hover:text-primary'
                }`
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-txt-muted dark:text-txt-mutedDark hover:text-primary dark:hover:text-primary'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-txt-muted dark:text-txt-mutedDark hover:text-primary dark:hover:text-primary'
                }`
              }
            >
              Help
            </NavLink>
          </nav>

          {/* Quick Actions / Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full text-txt-muted dark:text-txt-mutedDark hover:text-primary dark:hover:text-primary hover:bg-orange-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Favorites Icon */}
            <NavLink
              to="/favorites"
              title="Saved Favorites"
              className="p-2 rounded-full text-txt-muted dark:text-txt-mutedDark hover:text-semantic-error hover:bg-red-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </NavLink>

            {/* Notifications Icon with Badge */}
            <NavLink
              to="/notifications"
              title="Notifications"
              className="relative p-2 rounded-full text-txt-muted dark:text-txt-mutedDark hover:text-primary hover:bg-orange-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </NavLink>

            {/* Cart Button with Count Badge */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-3 py-2 rounded-full font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-primary-glow'
                    : 'bg-orange-50 dark:bg-neutral-800 text-primary hover:bg-primary hover:text-white'
                }`
              }
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary-dark text-white text-[10px] font-black">
                  {totalItemCount}
                </span>
              )}
            </NavLink>

            {/* Profile Dropdown / Login */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(prev => !prev)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-primary/40 transition-all"
                >
                  <img
                    src={currentUser.profileImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary/20"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-txt-muted hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div
                    onClick={() => setProfileDropdownOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                )}

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card-light dark:bg-card-dark rounded-card shadow-dropdown border border-border-light dark:border-border-dark py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-border-light dark:border-border-dark">
                      <p className="text-xs font-bold text-txt-light dark:text-txt-dark truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <NavLink
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-txt-light dark:text-txt-dark hover:bg-orange-50 dark:hover:bg-neutral-800"
                      >
                        <User className="w-4 h-4 text-primary" />
                        My Profile
                      </NavLink>
                      <NavLink
                        to="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-txt-light dark:text-txt-dark hover:bg-orange-50 dark:hover:bg-neutral-800"
                      >
                        <Receipt className="w-4 h-4 text-primary" />
                        Order History
                      </NavLink>
                      <NavLink
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-txt-light dark:text-txt-dark hover:bg-orange-50 dark:hover:bg-neutral-800"
                      >
                        <Settings className="w-4 h-4 text-primary" />
                        Settings
                      </NavLink>
                      <NavLink
                        to="/help"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-txt-light dark:text-txt-dark hover:bg-orange-50 dark:hover:bg-neutral-800"
                      >
                        <HelpCircle className="w-4 h-4 text-primary" />
                        Help & Support
                      </NavLink>
                      <NavLink
                        to="/about"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-txt-light dark:text-txt-dark hover:bg-orange-50 dark:hover:bg-neutral-800"
                      >
                        <Info className="w-4 h-4 text-primary" />
                        About Us
                      </NavLink>
                    </div>

                    <div className="pt-1 border-t border-border-light dark:border-border-dark">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-semantic-error hover:bg-red-50 dark:hover:bg-neutral-800 text-left font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-button bg-primary text-white text-xs font-bold shadow-primary-glow hover:bg-primary-dark transition-all"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAVIGATION BAR ================= */}
      {/* Faithful replica of Flutter's 5-tab bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-md border-t border-border-light dark:border-border-dark shadow-dropdown">
        <div className="flex items-center justify-around h-14 max-w-md mx-auto px-2">
          {/* 1. Home */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-txt-muted dark:text-txt-mutedDark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  Home
                </span>
              </>
            )}
          </NavLink>

          {/* 2. Menu */}
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-txt-muted dark:text-txt-mutedDark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <MenuIcon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  Menu
                </span>
              </>
            )}
          </NavLink>

          {/* 3. Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-txt-muted dark:text-txt-mutedDark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <ShoppingBag className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                  {totalItemCount > 0 && (
                    <span className="absolute -top-1 -right-2 px-1 min-w-[15px] h-[15px] rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center">
                      {totalItemCount}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  Cart
                </span>
              </>
            )}
          </NavLink>

          {/* 4. Orders */}
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-txt-muted dark:text-txt-mutedDark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Receipt className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  Orders
                </span>
              </>
            )}
          </NavLink>

          {/* 5. Account */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-txt-muted dark:text-txt-mutedDark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <User className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  Account
                </span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  );
};
