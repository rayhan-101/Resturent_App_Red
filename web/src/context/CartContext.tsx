import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Food, FoodAddOn } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (food: Food, quantity?: number, selectedAddOns?: FoodAddOn[], specialInstructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  appliedPromo: string;
  discountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('foodie_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [appliedPromo, setAppliedPromo] = useState<string>(() => {
    return localStorage.getItem('foodie_promo') || '';
  });

  const [discountPercentage, setDiscountPercentage] = useState<number>(() => {
    return localStorage.getItem('foodie_promo') === 'WELCOME20' ? 20 : 0;
  });

  useEffect(() => {
    localStorage.setItem('foodie_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('foodie_promo', appliedPromo);
  }, [appliedPromo]);

  const addToCart = (
    food: Food,
    quantity = 1,
    selectedAddOns: FoodAddOn[] = [],
    specialInstructions = ''
  ) => {
    setItems(prevItems => {
      // Check if identical item with same add-ons and instructions exists
      const existingIndex = prevItems.findIndex(item => {
        if (item.food.id !== food.id) return false;
        if ((item.specialInstructions || '') !== specialInstructions) return false;
        const prevAddonIds = (item.selectedAddOns || []).map(a => a.id).sort().join(',');
        const newAddonIds = selectedAddOns.map(a => a.id).sort().join(',');
        return prevAddonIds === newAddonIds;
      });

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: 'ci_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        food,
        quantity,
        selectedAddOns,
        specialInstructions,
      };
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'WELCOME20') {
      setAppliedPromo('WELCOME20');
      setDiscountPercentage(20);
      return { success: true, message: 'Promo code WELCOME20 applied! 20% discount added.' };
    }
    return { success: false, message: 'Invalid promo code. Try WELCOME20' };
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setDiscountPercentage(0);
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const addOnsTotal = (item.selectedAddOns || []).reduce((aSum, a) => aSum + a.price, 0);
      return sum + (item.food.price + addOnsTotal) * item.quantity;
    }, 0);
  }, [items]);

  const deliveryFee = useMemo(() => {
    return items.length > 0 ? 5.00 : 0;
  }, [items]);

  const discountAmount = useMemo(() => {
    if (discountPercentage > 0 && subtotal > 0) {
      return (subtotal * discountPercentage) / 100;
    }
    return 0;
  }, [subtotal, discountPercentage]);

  const total = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal + deliveryFee - discountAmount);
  }, [subtotal, deliveryFee, discountAmount, items]);

  const totalItemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        discountPercentage,
        applyPromoCode,
        removePromoCode,
        subtotal,
        deliveryFee,
        discountAmount,
        total,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
