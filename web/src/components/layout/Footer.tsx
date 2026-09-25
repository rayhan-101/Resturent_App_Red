import React from 'react';
import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark mt-16 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-primary-glow">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-primary">
                Foodie<span className="text-txt-light dark:text-txt-dark font-extrabold ml-1">Restaurant</span>
              </span>
            </div>
            <p className="text-xs text-txt-muted dark:text-txt-mutedDark leading-relaxed">
              Delicious food crafted with love by world-class chefs, delivered hot and fresh straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-txt-light dark:text-txt-dark mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-txt-muted dark:text-txt-mutedDark font-medium">
              <li>
                <NavLink to="/home" className="hover:text-primary transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/menu" className="hover:text-primary transition-colors">
                  Full Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className="hover:text-primary transition-colors">
                  Track Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className="hover:text-primary transition-colors">
                  Favorite Dishes
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-txt-light dark:text-txt-dark mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-txt-muted dark:text-txt-mutedDark font-medium">
              <li>
                <NavLink to="/help" className="hover:text-primary transition-colors">
                  Help & FAQs
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-primary transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="hover:text-primary transition-colors">
                  App Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile/addresses" className="hover:text-primary transition-colors">
                  Delivery Addresses
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-txt-light dark:text-txt-dark mb-3">
              Contact & Hours
            </h4>
            <ul className="space-y-2.5 text-xs text-txt-muted dark:text-txt-mutedDark">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>452 Gourmet Way, Food District, NY 10012</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (800) 555-FOOD</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@foodierestaurant.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Mon - Sun: 10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted dark:text-txt-mutedDark">
          <p>© {new Date().getFullYear()} Foodie Restaurant Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Cooked with ❤️ for Food Lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
