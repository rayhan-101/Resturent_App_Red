import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<boolean>;
  guestLogin: () => void;
  updateProfile: (name: string, email: string, phone: string, profileImageUrl?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('foodie_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER; // Default authenticated like Flutter app demo
  });

  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('foodie_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('foodie_user');
    }
  }, [currentUser]);

  const login = async (email: string): Promise<boolean> => {
    const user: User = {
      ...INITIAL_USER,
      email: email || INITIAL_USER.email,
    };
    setCurrentUser(user);
    return true;
  };

  const signup = async (name: string, email: string, phone: string): Promise<boolean> => {
    const user: User = {
      id: 'u_' + Date.now(),
      name,
      email,
      phone,
      profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    };
    setCurrentUser(user);
    return true;
  };

  const guestLogin = () => {
    setCurrentUser({
      id: 'guest',
      name: 'Foodie Guest',
      email: 'guest@foodie.com',
      phone: '+1 (800) 000-0000',
    });
  };

  const updateProfile = (name: string, email: string, phone: string, profileImageUrl?: string) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name,
        email,
        phone,
        profileImageUrl: profileImageUrl || prev.profileImageUrl,
      };
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        signup,
        guestLogin,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
