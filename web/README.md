# Foodie Restaurant - Web Application

A fully responsive, pixel-accurate web recreation of the Flutter Foodie Restaurant mobile application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Quick Start

1. Open a terminal in the `web` folder:
   ```bash
   cd web
   ```

2. Install dependencies (already installed):
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🎨 Design System & Visual Fidelity

- **Colors:**
  - Primary: `#E85D04` (`bg-primary`, `text-primary`)
  - Secondary: `#F48C06`
  - Primary Dark: `#DC2F02`
  - Light Background: `#FFF9F5`
  - Dark Background: `#141416`
  - Surface/Card (Light): `#FFFFFF`
  - Surface/Card (Dark): `#1F1F24`
- **Typography:** Google Font **Poppins** (weights 300 to 900).
- **Dual Theme Support:** Fully responsive Dark & Light mode toggle with instant persistence in `localStorage`.
- **Soft UI Shadows:** Soft glowing brand elevation shadows matching the Flutter mobile app.

---

## 📱 Responsive Layout System

- **Desktop (1024px+):** Sticky top navigation bar with brand logo, direct links (Home, Menu, Orders, About, Help), search input, theme toggle, favorites shortcut, notifications badge, cart counter, and user profile avatar dropdown.
- **Mobile (< 768px):** Bottom navigation bar identical to Flutter's 5 tabs (Home, Menu, Cart with badge, Orders, Account).
- **Tablet (768px - 1023px):** Fluid multi-column layouts adapting smoothly between mobile and desktop form factors with zero horizontal scrolling.

---

## 🍔 Features Included

1. **Splash Screen (`/`):** Animated brand logo, tagline, and auto-redirect.
2. **Home Screen (`/home`):** Time-based greeting, search bar, interactive 20% OFF promotional banner (`WELCOME20`), category pills filter, Popular Dishes carousel, and Chef Recommended list.
3. **Menu Screen (`/menu`):** Search, live category filtering, and sorting (Popular, Rating, Price: Low to High, Price: High to Low).
4. **Food Details (`/food/:id`):** Full hero image, nutritional calories & prep time badges, ingredients chips, interactive add-on checkboxes with live price updates, special instructions input, and quantity controls.
5. **Cart Screen (`/cart`):** Cart items list with add-ons summary, quantity increment/decrement/remove, promo code input (`WELCOME20` applies 20% discount), subtotal, delivery fee, and total calculations.
6. **Checkout Flow (`/checkout`):** Delivery address selection & Add New Address modal, Payment method selection & Add Card modal, and simulated order placement with confirmation loader.
7. **Order Confirmation (`/order-confirmation/:id`):** Celebration checkmark animation, Order ID, and estimated arrival tracker.
8. **Orders Screen (`/orders`):** Tabs for Active vs Past orders with status badges (`Preparing`, `On the way`, `Delivered`, `Cancelled`).
9. **Live Order Tracking (`/orders/:id`):** 4-step visual stepper (Placed -> Preparing -> On the Way -> Delivered), delivery location, and order cancellation support.
10. **Favorites (`/favorites`):** Saved dishes with quick toggle or add to cart.
11. **Profile Management (`/profile`):** User dashboard, Edit Profile form (`/profile/edit`), Saved Addresses (`/profile/addresses`), Payment Cards with realistic EMV card preview (`/profile/payment-methods`), Settings with Dark Mode & notifications toggles (`/settings`), Help & Support with FAQ accordion (`/help`), About Us (`/about`), Notifications center (`/notifications`), and Authentication (`/login`, `/signup`, Guest mode).
