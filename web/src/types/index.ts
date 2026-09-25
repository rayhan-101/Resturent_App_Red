export interface FoodAddOn {
  id: string;
  name: string;
  price: number;
}

export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  categoryId: string;
  prepTime: string;
  calories: number;
  ingredients: string[];
  addOns?: FoodAddOn[];
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconUrl: string;
}

export interface CartItem {
  id: string;
  food: Food;
  quantity: number;
  selectedAddOns?: FoodAddOn[];
  specialInstructions?: string;
}

export type OrderStatus = 'preparing' | 'onTheWay' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string; // ISO string for easy serialization
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryAddress: string;
  paymentMethod: string;
  estimatedDeliveryTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
}

export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover';
  isDefault: boolean;
}

export type NotificationType = 'order' | 'promo' | 'system';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string; // ISO string
  isRead: boolean;
  type: NotificationType;
}
