import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Receipt,
  Clock,
  ChevronRight,
  Truck,
  CheckCircle2,
  XCircle,
  ChefHat
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderStatus } from '../types';
import { EmptyState } from '../components/ui/EmptyState';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeOrders, pastOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-orange-100 dark:bg-orange-950/60 text-primary border border-orange-200 dark:border-orange-800">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Preparing</span>
          </span>
        );
      case 'onTheWay':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 dark:bg-blue-950/60 text-semantic-info border border-blue-200 dark:border-blue-800">
            <Truck className="w-3.5 h-3.5" />
            <span>On the Way</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-semantic-success border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-red-100 dark:bg-red-950/60 text-semantic-error border border-red-200 dark:border-red-800">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <h1 className="text-2xl sm:text-3xl font-black text-txt-light dark:text-txt-dark mb-4">
          Your <span className="text-primary">Orders</span>
        </h1>

        {/* Tab Toggle */}
        <div className="flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 max-w-xs mb-6">
          <button
            onClick={() => setActiveTab('active')}
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              activeTab === 'active'
                ? 'bg-primary text-white shadow-sm'
                : 'text-txt-muted dark:text-txt-mutedDark hover:text-txt-light'
            }`}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              activeTab === 'past'
                ? 'bg-primary text-white shadow-sm'
                : 'text-txt-muted dark:text-txt-mutedDark hover:text-txt-light'
            }`}
          >
            Past ({pastOrders.length})
          </button>
        </div>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <EmptyState
            icon={<Receipt className="w-10 h-10" />}
            title={activeTab === 'active' ? 'No Active Orders' : 'No Past Orders'}
            description={
              activeTab === 'active'
                ? 'You do not have any active meals currently being prepared or on the way.'
                : 'You have not completed any orders yet.'
            }
            buttonText="Explore Menu"
            onButtonPressed={() => navigate('/menu')}
          />
        ) : (
          <div className="space-y-4">
            {displayedOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="group p-4 sm:p-5 bg-card-light dark:bg-card-dark rounded-card border border-neutral-100 dark:border-neutral-800 shadow-soft-light dark:shadow-soft-dark hover:border-primary/40 transition-all cursor-pointer"
              >
                {/* Header row: Order ID, Date, Status */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-sm font-black text-txt-light dark:text-txt-dark group-hover:text-primary transition-colors">
                      #{order.id}
                    </h3>
                    <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(order.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Items summary */}
                <div className="py-3">
                  <p className="text-xs font-medium text-txt-light dark:text-txt-dark line-clamp-2">
                    {order.items
                      .map((item) => `${item.quantity}x ${item.food.name}`)
                      .join(', ')}
                  </p>
                  <p className="text-[11px] text-txt-muted dark:text-txt-mutedDark mt-1">
                    Delivered to: {order.deliveryAddress}
                  </p>
                </div>

                {/* Footer row: Total and View Details */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-txt-muted dark:text-txt-mutedDark font-medium block">
                      Total Amount
                    </span>
                    <span className="text-base font-extrabold text-primary">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
