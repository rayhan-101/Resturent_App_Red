import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  ShoppingBag,
  Tag,
  Info
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { EmptyState } from '../components/ui/EmptyState';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-primary" />;
      case 'promo':
        return <Tag className="w-4 h-4 text-semantic-warning" />;
      default:
        return <Info className="w-4 h-4 text-semantic-info" />;
    }
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="p-2 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark hover:text-primary shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-txt-light dark:text-txt-dark">
              Notifications
            </h1>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              type="button"
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            icon={<Bell className="w-10 h-10" />}
            title="No Notifications"
            description="You are all caught up! You will receive notifications here about food orders and deals."
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-4 rounded-card border shadow-soft-light dark:shadow-soft-dark transition-all cursor-pointer ${
                  !item.isRead
                    ? 'bg-orange-50/40 dark:bg-neutral-800/80 border-primary/40'
                    : 'bg-card-light dark:bg-card-dark border-neutral-100 dark:border-neutral-800'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-full bg-white dark:bg-card-dark border border-neutral-200 dark:border-neutral-700 shrink-0">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-extrabold text-txt-light dark:text-txt-dark truncate">
                        {item.title}
                      </h4>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-txt-muted dark:text-txt-mutedDark mt-0.5 leading-relaxed">
                      {item.message}
                    </p>

                    <span className="text-[10px] text-neutral-400 font-medium mt-2 block">
                      {new Date(item.time).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
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
