import 'cart_item.dart';

enum OrderStatus { preparing, onTheWay, delivered, cancelled }

class Order {
  final String id;
  final DateTime date;
  final List<CartItem> items;
  final double subtotal;
  final double deliveryFee;
  final double discount;
  final double total;
  final OrderStatus status;
  final String deliveryAddress;
  final String paymentMethod;
  final String estimatedDeliveryTime;

  Order({
    required this.id,
    required this.date,
    required this.items,
    required this.total,
    required this.status,
    double? subtotal,
    this.deliveryFee = 5.0,
    this.discount = 0.0,
    this.deliveryAddress = '123 Main Street, Dhaka, Bangladesh',
    this.paymentMethod = 'Credit / Debit Card',
    this.estimatedDeliveryTime = '30 - 45 mins',
  }) : subtotal = subtotal ?? (total - deliveryFee + discount);
}
