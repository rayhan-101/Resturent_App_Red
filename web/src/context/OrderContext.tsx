import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Order, CartItem, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

interface OrderContextType {
  orders: Order[];
  activeOrders: Order[];
  pastOrders: Order[];
  placeOrder: (
    items: CartItem[],
    total: number,
    deliveryAddress: string,
    paymentMethod: string
  ) => Order;
  cancelOrder: (orderId: string) => boolean;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('foodie_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('foodie_orders', JSON.stringify(orders));
  }, [orders]);

  const activeOrders = useMemo(() => {
    return orders.filter(o => o.status === 'preparing' || o.status === 'onTheWay');
  }, [orders]);

  const pastOrders = useMemo(() => {
    return orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');
  }, [orders]);

  const placeOrder = (
    items: CartItem[],
    total: number,
    deliveryAddress: string,
    paymentMethod: string
  ): Order => {
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const newOrder: Order = {
      id: `ORD-${randomHex}`,
      date: new Date().toISOString(),
      items: [...items],
      total: Number(total.toFixed(2)),
      status: 'preparing',
      deliveryAddress,
      paymentMethod,
      estimatedDeliveryTime: '25 - 35 mins',
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (orderId: string): boolean => {
    let success = false;
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId && o.status === 'preparing') {
          success = true;
          return { ...o, status: 'cancelled' as OrderStatus, estimatedDeliveryTime: 'Cancelled' };
        }
        return o;
      })
    );
    return success;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrders,
        pastOrders,
        placeOrder,
        cancelOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
