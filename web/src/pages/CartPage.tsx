import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomFoodImage } from '../components/ui/CustomFoodImage';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { EmptyState } from '../components/ui/EmptyState';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    appliedPromo,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    if (result.success) {
      setPromoMessage({ type: 'success', text: result.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: result.message });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pb-20 md:pb-12 pt-6">
        <div className="max-w-2xl mx-auto px-4">
          <EmptyState
            icon={<ShoppingBag className="w-10 h-10" />}
            title="Your Cart is Empty"
            description="Looks like you haven't added anything to your cart yet. Discover our chef's gourmet specials now!"
            buttonText="Explore Menu"
            onButtonPressed={() => navigate('/menu')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark mb-6">
          Your <span className="text-primary">Cart</span> ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {items.map((item) => {
              const addOnsPrice = (item.selectedAddOns || []).reduce((s, a) => s + a.price, 0);
              const itemTotal = (item.food.price + addOnsPrice) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3.5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-input overflow-hidden shrink-0 bg-orange-50/50">
                    <CustomFoodImage
                      src={item.food.imageUrl}
                      alt={item.food.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-txt-light dark:text-txt-dark truncate">
                        {item.food.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                        className="text-neutral-400 hover:text-semantic-error p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Selected Add-ons */}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark truncate mt-0.5">
                        Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}
                      </p>
                    )}

                    {/* Special instruction */}
                    {item.specialInstructions && (
                      <p className="text-[10px] text-primary italic truncate mt-0.5">
                        "{item.specialInstructions}"
                      </p>
                    )}

                    {/* Price and Quantity Selector Row */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                      <span className="font-extrabold text-sm sm:text-base text-primary">
                        ${itemTotal.toFixed(2)}
                      </span>

                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Promo Code & Price Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Promo Code Input Card */}
            <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-txt-light dark:text-txt-dark">
                <Tag className="w-4 h-4 text-primary" />
                <span>Have a Promo Code?</span>
              </div>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-input bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-semantic-success text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{appliedPromo} (20% OFF) Applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    type="button"
                    className="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. WELCOME20)"
                    className="flex-1 px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-txt-light dark:text-txt-dark uppercase placeholder:normal-case outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-button bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-dark transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoMessage && (
                <div
                  className={`mt-2 flex items-center gap-1.5 text-[11px] font-semibold ${
                    promoMessage.type === 'success' ? 'text-semantic-success' : 'text-semantic-error'
                  }`}
                >
                  {promoMessage.type === 'success' ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{promoMessage.text}</span>
                </div>
              )}
            </div>

            {/* Bill Breakdown Summary Card */}
            <div className="p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
              <h3 className="text-sm font-black text-txt-light dark:text-txt-dark uppercase tracking-wider mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-txt-muted dark:text-txt-mutedDark">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-txt-light dark:text-txt-dark">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-txt-light dark:text-txt-dark">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-semantic-success font-semibold">
                    <span>Discount ({discountPercentage}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-base font-extrabold text-txt-light dark:text-txt-dark">
                  <span>Total Amount</span>
                  <span className="text-primary text-lg font-black">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => navigate('/checkout')}
                type="button"
                className="w-full mt-5 flex items-center justify-center gap-2 py-3.5 px-6 rounded-button bg-primary hover:bg-primary-dark text-white font-black text-sm shadow-primary-glow active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
