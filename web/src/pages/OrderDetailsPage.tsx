import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChefHat,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  CreditCard,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderStatus } from '../types';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();

  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-txt-light dark:text-txt-dark mb-2">
          Order Not Found
        </h2>
        <p className="text-sm text-txt-muted dark:text-txt-mutedDark mb-4">
          Could not find details for order #{id}.
        </p>
        <button
          onClick={() => navigate('/orders')}
          className="px-5 py-2.5 rounded-button bg-primary text-white font-bold text-xs shadow-primary-glow"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const ok = cancelOrder(order.id);
      if (ok) {
        setCancelSuccessMsg('Order has been cancelled successfully.');
      }
    }
  };

  // Status Stepper Steps
  const getStepProgress = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return 2;
      case 'onTheWay':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return 0;
    }
  };

  const currentStep = getStepProgress(order.status);

  const steps = [
    { title: 'Order Placed', desc: 'Received & verified by restaurant' },
    { title: 'Preparing Food', desc: 'Chefs cooking with fresh ingredients' },
    { title: 'On the Way', desc: 'Driver en route to your location' },
    { title: 'Delivered', desc: 'Enjoy your meal!' },
  ];

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Top Nav */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/orders')}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark text-xs font-bold hover:text-primary shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orders</span>
          </button>

          <span className="text-sm font-black text-primary">
            #{order.id}
          </span>
        </div>

        {cancelSuccessMsg && (
          <div className="mb-4 p-3 rounded-card bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-semantic-error text-xs font-bold">
            {cancelSuccessMsg}
          </div>
        )}

        {/* 4-Step Order Status Stepper */}
        <div className="p-5 sm:p-6 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-black text-txt-light dark:text-txt-dark">
                Live Order Tracking
              </h2>
              <p className="text-xs text-txt-muted dark:text-txt-mutedDark">
                Estimated Delivery: <span className="font-bold text-primary">{order.estimatedDeliveryTime}</span>
              </p>
            </div>

            {order.status === 'cancelled' && (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 dark:bg-red-950/60 text-semantic-error">
                Order Cancelled
              </span>
            )}
          </div>

          {order.status !== 'cancelled' ? (
            <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-700">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = currentStep >= stepNum;
                const isCurrent = currentStep === stepNum;

                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                        isCompleted
                          ? 'bg-primary text-white shadow-primary-glow'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : stepNum}
                    </div>

                    <div className="flex-1">
                      <h4
                        className={`text-xs sm:text-sm font-extrabold ${
                          isCurrent
                            ? 'text-primary'
                            : isCompleted
                            ? 'text-txt-light dark:text-txt-dark'
                            : 'text-txt-muted dark:text-txt-mutedDark'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-input bg-red-50 dark:bg-red-950/40 text-semantic-error flex items-center gap-3">
              <XCircle className="w-6 h-6 shrink-0" />
              <p className="text-xs font-semibold">
                This order was cancelled and is no longer being prepared.
              </p>
            </div>
          )}
        </div>

        {/* Delivery & Payment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-txt-light dark:text-txt-dark">
                Delivery Location
              </span>
            </div>
            <p className="text-xs text-txt-muted dark:text-txt-mutedDark">
              {order.deliveryAddress}
            </p>
          </div>

          <div className="p-4 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-txt-light dark:text-txt-dark">
                Payment Info
              </span>
            </div>
            <p className="text-xs text-txt-muted dark:text-txt-mutedDark">
              {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-txt-light dark:text-txt-dark mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            Items in Order ({order.items.length})
          </h3>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">
                      {item.quantity}x
                    </span>
                    <span className="text-xs font-bold text-txt-light dark:text-txt-dark">
                      {item.food.name}
                    </span>
                  </div>
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark mt-0.5 pl-5">
                      + {item.selectedAddOns.map(a => a.name).join(', ')}
                    </p>
                  )}
                  {item.specialInstructions && (
                    <p className="text-[10px] text-primary italic mt-0.5 pl-5">
                      Note: {item.specialInstructions}
                    </p>
                  )}
                </div>

                <span className="text-xs font-bold text-txt-light dark:text-txt-dark">
                  ${(item.food.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-sm font-black text-txt-light dark:text-txt-dark">
            <span>Total Paid</span>
            <span className="text-primary text-base">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Cancel Action if Order is Still Preparing */}
        {order.status === 'preparing' && (
          <div className="text-center">
            <button
              onClick={handleCancelOrder}
              type="button"
              className="px-6 py-2.5 rounded-button text-xs font-bold text-semantic-error border border-semantic-error/40 hover:bg-red-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
