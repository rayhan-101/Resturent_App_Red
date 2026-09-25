import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, ArrowRight, Home } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();

  const order = getOrderById(id || '');

  return (
    <div className="min-h-screen pb-20 md:pb-12 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card-light dark:bg-card-dark rounded-card p-6 sm:p-8 border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark text-center animate-in zoom-in-95 duration-300">
        {/* Success Circle */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-semantic-success flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-md -z-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark mb-2">
          Order Placed <span className="text-semantic-success">Successfully!</span>
        </h1>

        <p className="text-xs sm:text-sm text-txt-muted dark:text-txt-mutedDark max-w-sm mx-auto mb-6">
          Your order has been received and our kitchen chefs are already preparing your food fresh and hot.
        </p>

        {/* Order Details Card */}
        <div className="p-4 rounded-card bg-orange-50/50 dark:bg-neutral-800/60 border border-orange-100 dark:border-neutral-700 text-left mb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-orange-100 dark:border-neutral-700">
            <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark">
              Order ID
            </span>
            <span className="text-xs font-black text-primary">
              #{id || 'ORD-NEW'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-orange-100 dark:border-neutral-700">
            <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Estimated Delivery
            </span>
            <span className="text-xs font-extrabold text-txt-light dark:text-txt-dark">
              {order?.estimatedDeliveryTime || '25 - 35 mins'}
            </span>
          </div>

          {order && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-txt-muted dark:text-txt-mutedDark flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Delivering To
              </span>
              <span className="text-xs font-medium text-txt-light dark:text-txt-dark truncate max-w-[180px]">
                {order.deliveryAddress}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/orders/${id}`)}
            type="button"
            className="flex-1 py-3 px-5 rounded-button bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm shadow-primary-glow flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>Track Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/home')}
            type="button"
            className="py-3 px-5 rounded-button bg-neutral-100 dark:bg-neutral-800 text-txt-light dark:text-txt-dark font-bold text-xs sm:text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
