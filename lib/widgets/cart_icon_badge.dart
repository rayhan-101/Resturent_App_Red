import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/cart_provider.dart';

class CartIconBadge extends StatelessWidget {
  final bool isSelected;
  final double size;
  final Color? color;

  const CartIconBadge({
    Key? key,
    this.isSelected = false,
    this.size = 24.0,
    this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<CartProvider>(
      builder: (context, cartProvider, child) {
        final iconWidget = Icon(
          isSelected
              ? Icons.shopping_bag_rounded
              : Icons.shopping_bag_outlined,
          size: size,
          color: isSelected ? AppColors.primary : color,
        );

        if (cartProvider.itemCount == 0) {
          return iconWidget;
        }

        return Badge(
          backgroundColor: AppColors.primary,
          textColor: AppColors.white,
          label: Text(
            cartProvider.itemCount > 99
                ? '99+'
                : cartProvider.itemCount.toString(),
            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
          ),
          child: iconWidget,
        );
      },
    );
  }
}
