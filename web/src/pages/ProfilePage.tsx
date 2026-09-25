import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  CreditCard,
  Receipt,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const menuItems = [
    {
      label: 'Edit Profile',
      icon: <Edit3 className="w-4 h-4 text-primary" />,
      path: '/profile/edit',
    },
    {
      label: 'Saved Addresses',
      icon: <MapPin className="w-4 h-4 text-primary" />,
      path: '/profile/addresses',
    },
    {
      label: 'Payment Methods',
      icon: <CreditCard className="w-4 h-4 text-primary" />,
      path: '/profile/payment-methods',
    },
    {
      label: 'Order History',
      icon: <Receipt className="w-4 h-4 text-primary" />,
      path: '/orders',
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4 text-primary" />,
      path: '/settings',
    },
    {
      label: 'Help & Support',
      icon: <HelpCircle className="w-4 h-4 text-primary" />,
      path: '/help',
    },
    {
      label: 'About Restaurant',
      icon: <Info className="w-4 h-4 text-primary" />,
      path: '/about',
    },
  ];

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark mb-6">
          My <span className="text-primary">Account</span>
        </h1>

        {/* User Card */}
        <div className="p-5 sm:p-6 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark flex items-center gap-4 mb-6">
          <img
            src={
              currentUser?.profileImageUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
            }
            alt="Profile Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-primary/40 shadow-sm shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-txt-light dark:text-txt-dark truncate">
              {currentUser?.name || 'Foodie Guest'}
            </h2>
            <p className="text-xs text-txt-muted dark:text-txt-mutedDark truncate mt-0.5">
              {currentUser?.email || 'guest@foodie.com'}
            </p>
            <p className="text-xs text-txt-muted dark:text-txt-mutedDark font-medium mt-0.5">
              {currentUser?.phone || '+880 1712 345678'}
            </p>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800 mb-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex items-center justify-between p-4 hover:bg-orange-50/50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-full bg-orange-50 dark:bg-neutral-800">
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm font-bold text-txt-light dark:text-txt-dark">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          ))}
        </div>

        {/* Logout Button */}
        {isAuthenticated ? (
          <button
            onClick={() => setShowLogoutModal(true)}
            type="button"
            className="w-full py-3.5 rounded-button border border-semantic-error/40 text-semantic-error font-black text-xs sm:text-sm hover:bg-red-50 dark:hover:bg-neutral-800/60 flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            type="button"
            className="w-full py-3.5 rounded-button bg-primary text-white font-black text-xs sm:text-sm shadow-primary-glow flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Sign In to Your Account</span>
          </button>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-card-light dark:bg-card-dark rounded-card p-6 border border-border-light dark:border-border-dark shadow-dropdown text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-semantic-error flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6" />
            </div>

            <h3 className="text-base font-black text-txt-light dark:text-txt-dark mb-1">
              Sign Out
            </h3>
            <p className="text-xs text-txt-muted dark:text-txt-mutedDark mb-6">
              Are you sure you want to sign out from Foodie Restaurant?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                type="button"
                className="flex-1 py-2.5 rounded-button bg-neutral-100 dark:bg-neutral-800 text-txt-light dark:text-txt-dark font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                type="button"
                className="flex-1 py-2.5 rounded-button bg-semantic-error text-white font-bold text-xs shadow-sm hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
