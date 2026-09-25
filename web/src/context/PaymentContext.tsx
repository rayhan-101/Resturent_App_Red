import React, { createContext, useContext, useState, useEffect } from 'react';
import { PaymentCard } from '../types';
import { INITIAL_PAYMENT_CARDS } from '../data/mockData';

interface PaymentContextType {
  cards: PaymentCard[];
  activeCard: PaymentCard | undefined;
  addCard: (
    cardHolder: string,
    cardNumber: string,
    expiryDate: string,
    cardType: 'visa' | 'mastercard' | 'amex' | 'discover',
    isDefault?: boolean
  ) => PaymentCard;
  deleteCard: (id: string) => void;
  setDefaultCard: (id: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<PaymentCard[]>(() => {
    const saved = localStorage.getItem('foodie_cards');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PAYMENT_CARDS;
      }
    }
    return INITIAL_PAYMENT_CARDS;
  });

  useEffect(() => {
    localStorage.setItem('foodie_cards', JSON.stringify(cards));
  }, [cards]);

  const activeCard = cards.find(c => c.isDefault) || cards[0];

  const addCard = (
    cardHolder: string,
    cardNumber: string,
    expiryDate: string,
    cardType: 'visa' | 'mastercard' | 'amex' | 'discover',
    isDefault = false
  ): PaymentCard => {
    const newCard: PaymentCard = {
      id: 'p_' + Date.now(),
      cardHolder,
      cardNumber,
      expiryDate,
      cardType,
      isDefault: isDefault || cards.length === 0,
    };

    setCards(prev => {
      let updated = prev;
      if (newCard.isDefault) {
        updated = updated.map(c => ({ ...c, isDefault: false }));
      }
      return [...updated, newCard];
    });

    return newCard;
  };

  const deleteCard = (id: string) => {
    setCards(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length > 0 && !filtered.some(c => c.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultCard = (id: string) => {
    setCards(prev =>
      prev.map(c => ({
        ...c,
        isDefault: c.id === id,
      }))
    );
  };

  return (
    <PaymentContext.Provider
      value={{
        cards,
        activeCard,
        addCard,
        deleteCard,
        setDefaultCard,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
