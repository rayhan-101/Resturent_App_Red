import 'food.dart';

class CartItem {
  final String id;
  final Food food;
  int quantity;
  final String? specialInstructions;
  final List<FoodAddOn> selectedAddOns;

  CartItem({
    required this.id,
    required this.food,
    this.quantity = 1,
    this.specialInstructions,
    List<FoodAddOn>? selectedAddOns,
  }) : selectedAddOns = selectedAddOns ?? [];

  double get unitPrice {
    final addOnsPrice = selectedAddOns.fold(
      0.0,
      (sum, item) => sum + item.price,
    );
    return food.price + addOnsPrice;
  }

  double get totalPrice => unitPrice * quantity;
}
