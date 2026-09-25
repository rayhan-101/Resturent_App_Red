import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  Banknote,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Loader2,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { usePayment } from '../context/PaymentContext';
import { useOrders } from '../context/OrderContext';
import { useNotifications } from '../context/NotificationContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, discountAmount, total, clearCart } = useCart();
  const { addresses, activeAddress, setDefaultAddress } = useAddress();
  const { cards, activeCard, setDefaultCard } = usePayment();
  const { placeOrder } = useOrders();
  const { addNotification } = useNotifications();

  const [paymentType, setPaymentType] = useState<'card' | 'cod'>('card');
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // If user arrives with an empty cart, redirect to cart
  if (items.length === 0) {
    navigate('/cart', { replace: true });
    return null;
  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    const deliveryAddressStr = activeAddress
      ? `${activeAddress.fullAddress}, ${activeAddress.city}`
      : '123 Main Street, Dhaka';

    const paymentMethodStr =
      paymentType === 'card' && activeCard
        ? `${activeCard.cardType.toUpperCase()} •••• ${activeCard.cardNumber.slice(-4)}`
        : 'Cash on Delivery';

    setTimeout(() => {
      const newOrder = placeOrder(
        items,
        total,
        deliveryAddressStr,
        paymentMethodStr
      );

      // Trigger order notification
      addNotification(
        'Order Placed!',
        `Your order #${newOrder.id} is confirmed and sent to kitchen.`,
        'order'
      );

      clearCart();
      setIsPlacingOrder(false);
      navigate(`/order-confirmation/${newOrder.id}`, { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark mb-6">
          Checkout <span className="text-primary">Order</span>
        </h1>

        <div className="space-y-5">
          {/* 1. Delivery Address Card */}
          <div className="p-4 sm:p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-txt-light dark:text-txt-dark uppercase tracking-wider">
                  Delivery Address
                </h3>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                type="button"
                className="text-xs font-bold text-primary hover:underline"
              >
                Change
              </button>
            </div>

            {activeAddress ? (
              <div className="p-3 rounded-input bg-orange-50/50 dark:bg-neutral-800/60 border border-orange-100 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-txt-light dark:text-txt-dark">
                    {activeAddress.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    Default
                  </span>
                </div>
                <p className="text-xs text-txt-muted dark:text-txt-mutedDark mt-1">
                  {activeAddress.fullAddress}, {activeAddress.city}
                </p>
                <p className="text-xs text-txt-muted dark:text-txt-mutedDark font-medium mt-0.5">
                  Phone: {activeAddress.phone}
                </p>
              </div>
            ) : (
              <p className="text-xs text-txt-muted">No address selected.</p>
            )}
          </div>

          {/* 2. Payment Method Card */}
          <div className="p-4 sm:p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-txt-light dark:text-txt-dark uppercase tracking-wider">
                  Payment Method
                </h3>
              </div>
              {paymentType === 'card' && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  type="button"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Change Card
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* Credit Card Option */}
              <div
                onClick={() => setPaymentType('card')}
                className={`p-3 rounded-input border transition-all cursor-pointer flex items-center justify-between ${
                  paymentType === 'card'
                    ? 'border-primary bg-orange-50/50 dark:bg-neutral-800 text-primary'
                    : 'border-neutral-200 dark:border-neutral-700 bg-card-light dark:bg-card-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-txt-light dark:text-txt-dark">
                      Credit / Debit Card
                    </p>
                    {activeCard && (
                      <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark">
                        •••• {activeCard.cardNumber.slice(-4)}
                      </p>
                    )}
                  </div>
                </div>
                {paymentType === 'card' && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>

              {/* Cash On Delivery Option */}
              <div
                onClick={() => setPaymentType('cod')}
                className={`p-3 rounded-input border transition-all cursor-pointer flex items-center justify-between ${
                  paymentType === 'cod'
                    ? 'border-primary bg-orange-50/50 dark:bg-neutral-800 text-primary'
                    : 'border-neutral-200 dark:border-neutral-700 bg-card-light dark:bg-card-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-semantic-success" />
                  <div>
                    <p className="text-xs font-bold text-txt-light dark:text-txt-dark">
                      Cash on Delivery
                    </p>
                    <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark">
                      Pay at your doorstep
                    </p>
                  </div>
                </div>
                {paymentType === 'cod' && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>
            </div>
          </div>

          {/* 3. Order Items Summary Card */}
          <div className="p-4 sm:p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
            <h3 className="text-sm font-bold text-txt-light dark:text-txt-dark uppercase tracking-wider mb-3">
              Items Ordered ({items.length})
            </h3>
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {items.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-primary">{item.quantity}x</span>
                    <span className="font-medium text-txt-light dark:text-txt-dark truncate">
                      {item.food.name}
                    </span>
                  </div>
                  <span className="font-bold text-txt-light dark:text-txt-dark shrink-0 ml-2">
                    ${(item.food.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Payment Bill Breakdown */}
          <div className="p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
            <div className="space-y-2 text-xs text-txt-muted dark:text-txt-mutedDark">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-txt-light dark:text-txt-dark">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-txt-light dark:text-txt-dark">
                  ${deliveryFee.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-semantic-success font-bold">
                  <span>Discount Applied</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-base font-black text-txt-light dark:text-txt-dark">
                <span>Total to Pay</span>
                <span className="text-primary text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              type="button"
              className="w-full mt-6 py-4 px-6 rounded-button bg-primary hover:bg-primary-dark text-white font-black text-sm sm:text-base shadow-primary-glow flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Place Order • ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Switch Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card-light dark:bg-card-dark rounded-card p-5 border border-border-light dark:border-border-dark shadow-dropdown animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-txt-light dark:text-txt-dark mb-4">
              Select Delivery Address
            </h3>
            <div className="space-y-2.5 max-h-60 overflow-y-auto mb-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setDefaultAddress(addr.id);
                    setShowAddressModal(false);
                  }}
                  className={`p-3 rounded-input border transition-all cursor-pointer ${
                    activeAddress?.id === addr.id
                      ? 'border-primary bg-orange-50/50 dark:bg-neutral-800'
                      : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-txt-light dark:text-txt-dark">
                      {addr.title}
                    </span>
                    {activeAddress?.id === addr.id && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark mt-0.5">
                    {addr.fullAddress}, {addr.city}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowAddressModal(false);
                navigate('/profile/addresses');
              }}
              type="button"
              className="w-full py-2.5 rounded-button border border-dashed border-primary text-primary font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-50 dark:hover:bg-neutral-800 transition-colors mb-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
            <button
              onClick={() => setShowAddressModal(false)}
              className="w-full py-2 text-xs font-bold text-txt-muted hover:text-txt-light"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Switch Payment Card Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card-light dark:bg-card-dark rounded-card p-5 border border-border-light dark:border-border-dark shadow-dropdown animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-txt-light dark:text-txt-dark mb-4">
              Select Payment Card
            </h3>
            <div className="space-y-2.5 max-h-60 overflow-y-auto mb-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setDefaultCard(card.id);
                    setShowPaymentModal(false);
                  }}
                  className={`p-3 rounded-input border transition-all cursor-pointer ${
                    activeCard?.id === card.id
                      ? 'border-primary bg-orange-50/50 dark:bg-neutral-800'
                      : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-txt-light dark:text-txt-dark uppercase">
                      {card.cardType} •••• {card.cardNumber.slice(-4)}
                    </span>
                    {activeCard?.id === card.id && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark mt-0.5">
                    Exp: {card.expiryDate} • {card.cardHolder}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                navigate('/profile/payment-methods');
              }}
              type="button"
              className="w-full py-2.5 rounded-button border border-dashed border-primary text-primary font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-50 dark:hover:bg-neutral-800 transition-colors mb-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Card</span>
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
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
