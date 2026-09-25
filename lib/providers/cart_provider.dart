import 'package:flutter/foundation.dart';
import '../models/cart_item.dart';
import '../models/food.dart';
import '../models/order.dart';
import '../data/mock_data.dart';
import 'package:uuid/uuid.dart';

class CartProvider with ChangeNotifier {
  final List<CartItem> _items = [];
  final double _deliveryFee = 5.0;
  double _discount = 0.0;
  String _promoCode = '';

  // Seed with mock orders so orders screen is rich and complete immediately
  late final List<Order> _orders;

  CartProvider() {
    _orders = MockData.getInitialOrders();
  }

  List<CartItem> get items => _items;
  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);
  double get subtotal => _items.fold(0, (sum, item) => sum + item.totalPrice);
  double get deliveryFee => _items.isEmpty ? 0.0 : _deliveryFee;
  double get discount => _discount;
  String get promoCode => _promoCode;
  double get total => (_items.isEmpty)
      ? 0.0
      : ((subtotal + deliveryFee - _discount).clamp(0.0, double.infinity));

  List<Order> get orders => _orders;

  void addItem(
    Food food,
    int quantity, {
    String? specialInstructions,
    List<FoodAddOn>? selectedAddOns,
  }) {
    // Check if identical item with same special instructions and add-ons exists
    final addOnIds = (selectedAddOns ?? []).map((a) => a.id).toSet();
    final index = _items.indexWhere((item) {
      if (item.food.id != food.id) return false;
      if (item.specialInstructions != specialInstructions) return false;
      final itemAddOnIds = item.selectedAddOns.map((a) => a.id).toSet();
      return setEquals(itemAddOnIds, addOnIds);
    });

    if (index >= 0) {
      _items[index].quantity += quantity;
    } else {
      _items.add(
        CartItem(
          id: const Uuid().v4(),
          food: food,
          quantity: quantity,
          specialInstructions: specialInstructions,
          selectedAddOns: selectedAddOns,
        ),
      );
    }
    _recalculateDiscount();
    notifyListeners();
  }

  void removeItem(String id) {
    _items.removeWhere((item) => item.id == id);
    if (_items.isEmpty) {
      _discount = 0.0;
      _promoCode = '';
    } else {
      _recalculateDiscount();
    }
    notifyListeners();
  }

  void updateQuantity(String id, int quantity) {
    final index = _items.indexWhere((item) => item.id == id);
    if (index >= 0) {
      if (quantity > 0) {
        _items[index].quantity = quantity;
      } else {
        _items.removeAt(index);
      }
      if (_items.isEmpty) {
        _discount = 0.0;
        _promoCode = '';
      } else {
        _recalculateDiscount();
      }
      notifyListeners();
    }
  }

  void _recalculateDiscount() {
    if (_promoCode.isEmpty) return;
    if (_promoCode == 'WELCOME20') {
      _discount = subtotal * 0.20;
    } else if (_promoCode == 'DISCOUNT10') {
      _discount = subtotal > 10 ? 10.0 : subtotal;
    } else if (_promoCode == 'FOODIE5') {
      _discount = subtotal > 5 ? 5.0 : subtotal;
    }
  }

  bool applyPromoCode(String code) {
    final formatted = code.trim().toUpperCase();
    if (formatted == 'WELCOME20') {
      _promoCode = formatted;
      _discount = subtotal * 0.20;
      notifyListeners();
      return true;
    } else if (formatted == 'DISCOUNT10') {
      _promoCode = formatted;
      _discount = subtotal > 10 ? 10.0 : subtotal;
      notifyListeners();
      return true;
    } else if (formatted == 'FOODIE5') {
      _promoCode = formatted;
      _discount = subtotal > 5 ? 5.0 : subtotal;
      notifyListeners();
      return true;
    } else {
      return false;
    }
  }

  void removePromoCode() {
    _promoCode = '';
    _discount = 0.0;
    notifyListeners();
  }

  void clearCart() {
    _items.clear();
    _discount = 0.0;
    _promoCode = '';
    notifyListeners();
  }

  void reorder(Order order) {
    for (var item in order.items) {
      addItem(
        item.food,
        item.quantity,
        specialInstructions: item.specialInstructions,
        selectedAddOns: item.selectedAddOns,
      );
    }
  }

  String placeOrder({String? deliveryAddress, String? paymentMethod}) {
    if (_items.isEmpty) return '';

    final newOrder = Order(
      id: 'ORD-${const Uuid().v4().substring(0, 4).toUpperCase()}${const Uuid().v4().substring(0, 4).toUpperCase()}',
      date: DateTime.now(),
      items: List.from(_items),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: discount,
      total: total,
      status: OrderStatus.preparing,
      deliveryAddress: deliveryAddress ?? '123 Main Street, Gulshan-2, Dhaka',
      paymentMethod: paymentMethod ?? 'Cash on Delivery',
      estimatedDeliveryTime: '30 - 40 mins',
    );

    _orders.insert(0, newOrder);
    clearCart();
    return newOrder.id;
  }
}
