import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Mail,
  Globe,
  Info,
  ChevronRight,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [language, setLanguage] = useState('English (US)');
  const [showLangModal, setShowLangModal] = useState(false);

  const languages = ['English (US)', 'Bengali (বাংলা)', 'Spanish (Español)', 'French (Français)'];

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
            Settings
          </h1>
        </div>

        {/* Preferences Section */}
        <div className="bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800 mb-6">
          {/* Dark Mode Switch */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-txt-light dark:text-txt-dark">
                  Dark Mode
                </h4>
                <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark">
                  {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isDarkMode ? 'bg-primary' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Push Notifications Switch */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-txt-light dark:text-txt-dark">
                  Push Notifications
                </h4>
                <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark">
                  Get real-time updates about kitchen orders & delivery
                </p>
              </div>
            </div>

            <button
              onClick={() => setPushNotifs(prev => !prev)}
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                pushNotifs ? 'bg-primary' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  pushNotifs ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Email Notifications Switch */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-txt-light dark:text-txt-dark">
                  Email Offers & Receipts
                </h4>
                <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark">
                  Receive receipts and promotional coupons in your inbox
                </p>
              </div>
            </div>

            <button
              onClick={() => setEmailNotifs(prev => !prev)}
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                emailNotifs ? 'bg-primary' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  emailNotifs ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Language Selector */}
          <div
            onClick={() => setShowLangModal(true)}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50/40 dark:hover:bg-neutral-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-txt-light dark:text-txt-dark">
                  App Language
                </h4>
                <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark">
                  {language}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* About App Info */}
        <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark flex items-center justify-between text-xs text-txt-muted dark:text-txt-mutedDark">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="font-bold">Foodie Restaurant Web App</span>
          </div>
          <span>v1.0.0 (Web)</span>
        </div>
      </div>

      {/* Language Selector Modal */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-card-light dark:bg-card-dark rounded-card p-5 border border-border-light dark:border-border-dark shadow-dropdown animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-txt-light dark:text-txt-dark mb-4">
              Select Language
            </h3>
            <div className="space-y-2 mb-4">
              {languages.map((lang) => (
                <div
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLangModal(false);
                  }}
                  className={`p-3 rounded-input border transition-all cursor-pointer flex items-center justify-between ${
                    language === lang
                      ? 'border-primary bg-orange-50/50 dark:bg-neutral-800 text-primary font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-txt-light dark:text-txt-dark'
                  }`}
                >
                  <span className="text-xs">{lang}</span>
                  {language === lang && <Check className="w-4 h-4 text-primary" />}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowLangModal(false)}
              className="w-full py-2 text-xs font-bold text-txt-muted hover:text-txt-light"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
