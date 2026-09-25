import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FoodProvider } from './context/FoodContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AddressProvider } from './context/AddressContext';
import { PaymentProvider } from './context/PaymentContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { SplashScreen } from './pages/SplashScreen';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { FoodDetailsPage } from './pages/FoodDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { SavedAddressesPage } from './pages/SavedAddressesPage';
import { PaymentMethodsPage } from './pages/PaymentMethodsPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Auto scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App Layout Wrapper
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideChromeRoutes = ['/', '/login', '/signup'];
  const hideChrome = hideChromeRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-txt-light dark:text-txt-dark transition-colors duration-200">
      {!hideChrome && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideChrome && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FoodProvider>
          <CartProvider>
            <OrderProvider>
              <AddressProvider>
                <PaymentProvider>
                  <NotificationProvider>
                    <BrowserRouter>
                      <ScrollToTop />
                      <AppLayout>
                        <Routes>
                          {/* Splash Screen */}
                          <Route path="/" element={<SplashScreen />} />

                          {/* Auth */}
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignupPage />} />

                          {/* Main Features */}
                          <Route path="/home" element={<HomePage />} />
                          <Route path="/menu" element={<MenuPage />} />
                          <Route path="/food/:id" element={<FoodDetailsPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                          <Route path="/orders" element={<OrdersPage />} />
                          <Route path="/orders/:id" element={<OrderDetailsPage />} />
                          <Route path="/favorites" element={<FavoritesPage />} />
                          <Route path="/notifications" element={<NotificationsPage />} />

                          {/* Account & Subscreens */}
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/profile/edit" element={<EditProfilePage />} />
                          <Route path="/profile/addresses" element={<SavedAddressesPage />} />
                          <Route path="/profile/payment-methods" element={<PaymentMethodsPage />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="/help" element={<HelpSupportPage />} />
                          <Route path="/about" element={<AboutUsPage />} />

                          {/* Fallback */}
                          <Route path="*" element={<HomePage />} />
                        </Routes>
                      </AppLayout>
                    </BrowserRouter>
                  </NotificationProvider>
                </PaymentProvider>
              </AddressProvider>
            </OrderProvider>
          </CartProvider>
        </FoodProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
