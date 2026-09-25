import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  Phone,
  Mail,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I track my active order?',
      a: 'Once you place an order, you will see it in the Orders section. Tap on any order to view the real-time 4-step progress tracker (Placed -> Preparing -> On the Way -> Delivered).',
    },
    {
      q: 'What is the average food preparation and delivery time?',
      a: 'Our chefs prepare meals fresh to order within 15–20 minutes. Delivery generally takes 10–20 minutes depending on your distance from our gourmet kitchen.',
    },
    {
      q: 'Can I cancel an order after placing it?',
      a: 'Yes, as long as the order is still in the "Preparing" phase, you can cancel it directly from the Order Details page.',
    },
    {
      q: 'How do I apply the WELCOME20 promo code?',
      a: 'On the Cart screen or via the 20% OFF Home banner, tap "Claim 20% OFF" or enter "WELCOME20" in the promo code input to instantly deduct 20% off your entire meal subtotal.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Visa, Mastercard, American Express, and Cash on Delivery (COD). You can save multiple cards under Payment Methods for 1-tap checkout.',
    },
  ];

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
            Help & Support
          </h1>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href="tel:+18005553663"
            className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark flex items-center gap-3.5 hover:border-primary/40 transition-colors"
          >
            <div className="p-3 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark block">
                Call Helpline
              </span>
              <span className="text-xs sm:text-sm font-black text-txt-light dark:text-txt-dark">
                +1 (800) 555-FOOD
              </span>
            </div>
          </a>

          <a
            href="mailto:support@foodierestaurant.com"
            className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark flex items-center gap-3.5 hover:border-primary/40 transition-colors"
          >
            <div className="p-3 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark block">
                Email Support
              </span>
              <span className="text-xs sm:text-sm font-black text-txt-light dark:text-txt-dark truncate">
                support@foodierestaurant.com
              </span>
            </div>
          </a>
        </div>

        {/* FAQ Accordion Section */}
        <h2 className="text-base sm:text-lg font-black text-txt-light dark:text-txt-dark mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  type="button"
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold text-txt-light dark:text-txt-dark select-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-txt-muted dark:text-txt-mutedDark leading-relaxed border-t border-neutral-100 dark:border-neutral-800 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
