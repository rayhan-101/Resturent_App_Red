import React, { createContext, useContext, useState, useEffect } from 'react';
import { Address } from '../types';
import { INITIAL_ADDRESSES } from '../data/mockData';

interface AddressContextType {
  addresses: Address[];
  activeAddress: Address | undefined;
  addAddress: (title: string, fullAddress: string, city: string, phone: string, isDefault?: boolean) => Address;
  updateAddress: (id: string, updated: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('foodie_addresses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ADDRESSES;
      }
    }
    return INITIAL_ADDRESSES;
  });

  useEffect(() => {
    localStorage.setItem('foodie_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const activeAddress = addresses.find(a => a.isDefault) || addresses[0];

  const addAddress = (
    title: string,
    fullAddress: string,
    city: string,
    phone: string,
    isDefault = false
  ): Address => {
    const newAddress: Address = {
      id: 'a_' + Date.now(),
      title,
      fullAddress,
      city,
      phone,
      isDefault: isDefault || addresses.length === 0,
    };

    setAddresses(prev => {
      let updated = prev;
      if (newAddress.isDefault) {
        updated = updated.map(a => ({ ...a, isDefault: false }));
      }
      return [...updated, newAddress];
    });

    return newAddress;
  };

  const updateAddress = (id: string, updated: Partial<Address>) => {
    setAddresses(prev =>
      prev.map(a => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => {
      const filtered = prev.filter(a => a.id !== id);
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        activeAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
