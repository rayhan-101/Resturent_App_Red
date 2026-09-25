import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  Wifi,
  ShieldCheck
} from 'lucide-react';
import { usePayment } from '../context/PaymentContext';
import { PaymentCard } from '../types';

export const PaymentMethodsPage: React.FC = () => {
  const navigate = useNavigate();
  const { cards, activeCard, addCard, deleteCard, setDefaultCard } = usePayment();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex'>('visa');
  const [isDefault, setIsDefault] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim()) return;

    addCard(cardHolder, cardNumber, expiryDate, cardType, isDefault);
    setShowAddModal(false);
    setCardHolder('');
    setCardNumber('');
    setExpiryDate('');
  };

  const getCardBg = (type: string) => {
    switch (type) {
      case 'mastercard':
        return 'from-stone-900 to-neutral-800 text-white';
      case 'amex':
        return 'from-blue-900 to-indigo-950 text-white';
      default:
        return 'from-orange-600 via-amber-600 to-orange-500 text-white';
    }
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              type="button"
              className="p-2 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark hover:text-primary shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-txt-light dark:text-txt-dark">
              Payment Methods
            </h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-button bg-primary text-white text-xs font-bold shadow-primary-glow hover:bg-primary-dark transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
          </button>
        </div>

        {/* Live Card Preview Widget (Flutter feature faithful replica) */}
        {activeCard && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-3">
              Active Card Preview
            </h3>
            <div
              className={`w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr ${getCardBg(
                activeCard.cardType
              )} p-5 flex flex-col justify-between shadow-dropdown relative overflow-hidden select-none`}
            >
              {/* Subtle background circle overlays */}
              <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 blur-xl" />

              <div className="flex items-center justify-between relative z-10">
                {/* EMV Gold Chip & Contactless */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-7 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 shadow-inner border border-amber-200" />
                  <Wifi className="w-5 h-5 opacity-70 rotate-90" />
                </div>
                <span className="text-sm font-black tracking-widest uppercase">
                  {activeCard.cardType}
                </span>
              </div>

              {/* Card Number */}
              <div className="relative z-10">
                <p className="font-mono text-lg sm:text-xl tracking-[0.2em] font-bold">
                  {activeCard.cardNumber}
                </p>
              </div>

              {/* Card Holder & Expiry */}
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <span className="text-[9px] uppercase tracking-wider opacity-70 block">
                    Card Holder
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {activeCard.cardHolder}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider opacity-70 block text-right">
                    Expires
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider">
                    {activeCard.expiryDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Cards List */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-3">
          Saved Cards ({cards.length})
        </h3>
        <div className="space-y-3.5">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-4 bg-card-light dark:bg-card-dark rounded-card border shadow-soft-light dark:shadow-soft-dark transition-all ${
                card.isDefault
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-neutral-100 dark:border-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-txt-light dark:text-txt-dark uppercase">
                        {card.cardType} •••• {card.cardNumber.slice(-4)}
                      </span>
                      {card.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark mt-0.5">
                      Expires: {card.expiryDate} • {card.cardHolder}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {!card.isDefault && (
                    <button
                      onClick={() => setDefaultCard(card.id)}
                      type="button"
                      className="px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-orange-50 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    >
                      Set Default
                    </button>
                  )}
                  {cards.length > 1 && (
                    <button
                      onClick={() => deleteCard(card.id)}
                      type="button"
                      className="p-1.5 text-neutral-400 hover:text-semantic-error rounded-md transition-colors"
                      title="Delete Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card-light dark:bg-card-dark rounded-card p-6 border border-border-light dark:border-border-dark shadow-dropdown animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-txt-light dark:text-txt-dark mb-4">
              Add New Card
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="4532 8921 7845 4582"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY (e.g. 09/28)"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                    Card Type
                  </label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">Amex</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="setDefCard"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
                />
                <label htmlFor="setDefCard" className="text-xs font-semibold text-txt-light dark:text-txt-dark cursor-pointer">
                  Set as default payment method
                </label>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  type="button"
                  className="flex-1 py-2.5 rounded-button bg-neutral-100 dark:bg-neutral-800 text-txt-light dark:text-txt-dark font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-button bg-primary text-white font-bold text-xs shadow-primary-glow hover:bg-primary-dark"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
