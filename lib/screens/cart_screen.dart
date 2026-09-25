import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/cart_provider.dart';
import '../widgets/quantity_selector.dart';
import '../widgets/custom_button.dart';
import '../widgets/empty_state_widget.dart';
import '../widgets/custom_food_image.dart';
import 'checkout_screen.dart';
import 'main_wrapper.dart';

class CartScreen extends StatefulWidget {
  final VoidCallback? onExploreMenu;

  const CartScreen({Key? key, this.onExploreMenu}) : super(key: key);

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final _couponController = TextEditingController();
  bool _couponError = false;

  @override
  void dispose() {
    _couponController.dispose();
    super.dispose();
  }

  void _applyCoupon(CartProvider cart) {
    final code = _couponController.text.trim();
    if (code.isEmpty) return;

    final success = cart.applyPromoCode(code);
    if (success) {
      setState(() => _couponError = false);
      _couponController.clear();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              const Icon(
                Icons.celebration_rounded,
                color: Colors.white,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                'Promo code applied! Saved \$${cart.discount.toStringAsFixed(2)}',
              ),
            ],
          ),
          behavior: SnackBarBehavior.floating,
          backgroundColor: AppColors.success,
        ),
      );
    } else {
      setState(() => _couponError = true);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Invalid coupon code. Try WELCOME20 or DISCOUNT10'),
          behavior: SnackBarBehavior.floating,
          backgroundColor: AppColors.error,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Cart'),
        actions: [
          Consumer<CartProvider>(
            builder: (context, cart, child) {
              if (cart.items.isEmpty) return const SizedBox.shrink();
              return IconButton(
                icon: const Icon(Icons.delete_outline_rounded),
                tooltip: 'Clear Cart',
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      title: const Text('Clear Cart?'),
                      content: const Text(
                        'Are you sure you want to remove all items from your cart?',
                      ),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(ctx),
                          child: const Text('Cancel'),
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.error,
                            minimumSize: const Size(80, 36),
                          ),
                          onPressed: () {
                            Navigator.pop(ctx);
                            cart.clearCart();
                          },
                          child: const Text('Clear'),
                        ),
                      ],
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
      body: Consumer<CartProvider>(
        builder: (context, cartProvider, child) {
          if (cartProvider.items.isEmpty) {
            return EmptyStateWidget(
              icon: Icons.shopping_bag_outlined,
              title: 'Your Cart is Empty',
              description:
                  'Looks like you haven\'t added any delicious food yet. Discover mouth-watering dishes in our menu!',
              buttonText: 'Explore Menu',
              onButtonPressed: () {
                if (widget.onExploreMenu != null) {
                  widget.onExploreMenu!();
                } else {
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(
                      builder: (_) => const MainWrapper(initialIndex: 1),
                    ),
                    (route) => false,
                  );
                }
              },
            );
          }

          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppConstants.padding,
                    vertical: 12,
                  ),
                  itemCount: cartProvider.items.length,
                  itemBuilder: (context, index) {
                    final item = cartProvider.items[index];
                    return Container(
                      margin: const EdgeInsets.only(bottom: 14),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkCard : AppColors.white,
                        borderRadius: BorderRadius.circular(
                          AppConstants.cardRadius,
                        ),
                        boxShadow: AppShadows.soft(context),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CustomFoodImage(
                            imageUrl: item.food.imageUrl,
                            width: 84,
                            height: 84,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        item.food.name,
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 15,
                                          color: isDark
                                              ? AppColors.darkText
                                              : AppColors.text,
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                    IconButton(
                                      padding: EdgeInsets.zero,
                                      constraints: const BoxConstraints(),
                                      icon: const Icon(
                                        Icons.close_rounded,
                                        color: AppColors.error,
                                        size: 18,
                                      ),
                                      onPressed: () =>
                                          cartProvider.removeItem(item.id),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '\$${item.unitPrice.toStringAsFixed(2)}',
                                  style: const TextStyle(
                                    color: AppColors.primary,
                                    fontWeight: FontWeight.w800,
                                    fontSize: 15,
                                  ),
                                ),
                                if (item.selectedAddOns.isNotEmpty)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 3),
                                    child: Text(
                                      '+ ${item.selectedAddOns.map((a) => a.name).join(", ")}',
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: isDark
                                            ? AppColors.darkSecondaryText
                                            : AppColors.secondaryText,
                                      ),
                                    ),
                                  ),
                                if (item.specialInstructions != null &&
                                    item.specialInstructions!.isNotEmpty)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 2),
                                    child: Text(
                                      'Note: "${item.specialInstructions}"',
                                      style: const TextStyle(
                                        fontSize: 11,
                                        fontStyle: FontStyle.italic,
                                        color: AppColors.primary,
                                      ),
                                    ),
                                  ),
                                const SizedBox(height: 8),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    QuantitySelector(
                                      quantity: item.quantity,
                                      size: 28,
                                      onIncrement: () =>
                                          cartProvider.updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                          ),
                                      onDecrement: () =>
                                          cartProvider.updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                          ),
                                    ),
                                    Text(
                                      'Total: \$${item.totalPrice.toStringAsFixed(2)}',
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        color: isDark
                                            ? AppColors.darkText
                                            : AppColors.text,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),

              // Bottom Order Summary Sheet
              Container(
                padding: const EdgeInsets.all(AppConstants.paddingLarge),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.white,
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(28),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.08),
                      blurRadius: 18,
                      offset: const Offset(0, -6),
                    ),
                  ],
                ),
                child: SafeArea(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Promo code input
                      if (cartProvider.promoCode.isEmpty)
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _couponController,
                                style: const TextStyle(fontSize: 14),
                                textCapitalization:
                                    TextCapitalization.characters,
                                decoration: InputDecoration(
                                  hintText: 'Promo code (try WELCOME20)',
                                  prefixIcon: const Icon(
                                    Icons.local_offer_outlined,
                                    size: 20,
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 14,
                                    vertical: 12,
                                  ),
                                  errorText: _couponError
                                      ? 'Invalid code'
                                      : null,
                                ),
                              ),
                            ),
                            const SizedBox(width: 10),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                minimumSize: const Size(88, 48),
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              onPressed: () => _applyCoupon(cartProvider),
                              child: const Text('Apply'),
                            ),
                          ],
                        )
                      else
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 10,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.success.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: AppColors.success.withValues(alpha: 0.3),
                            ),
                          ),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.check_circle_rounded,
                                color: AppColors.success,
                                size: 20,
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  'Coupon "${cartProvider.promoCode}" active (-20%)',
                                  style: const TextStyle(
                                    color: AppColors.success,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 13,
                                  ),
                                ),
                              ),
                              GestureDetector(
                                onTap: () => cartProvider.removePromoCode(),
                                child: const Icon(
                                  Icons.close_rounded,
                                  color: AppColors.error,
                                  size: 20,
                                ),
                              ),
                            ],
                          ),
                        ),
                      const SizedBox(height: 16),
                      _buildSummaryRow(
                        'Subtotal',
                        '\$${cartProvider.subtotal.toStringAsFixed(2)}',
                        isDark,
                      ),
                      const SizedBox(height: 8),
                      _buildSummaryRow(
                        'Delivery Fee',
                        '\$${cartProvider.deliveryFee.toStringAsFixed(2)}',
                        isDark,
                      ),
                      if (cartProvider.discount > 0) ...[
                        const SizedBox(height: 8),
                        _buildSummaryRow(
                          'Promo Discount',
                          '-\$${cartProvider.discount.toStringAsFixed(2)}',
                          isDark,
                          color: AppColors.success,
                        ),
                      ],
                      Divider(
                        height: 24,
                        color: isDark
                            ? AppColors.darkDivider
                            : Colors.grey.withValues(alpha: 0.15),
                      ),
                      _buildSummaryRow(
                        'Total Amount',
                        '\$${cartProvider.total.toStringAsFixed(2)}',
                        isDark,
                        isTotal: true,
                      ),
                      const SizedBox(height: 20),
                      CustomButton(
                        text: 'Proceed to Checkout',
                        icon: Icons.arrow_forward_rounded,
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const CheckoutScreen(),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSummaryRow(
    String label,
    String value,
    bool isDark, {
    bool isTotal = false,
    Color? color,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: isTotal ? 16 : 14,
            fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
            color:
                color ??
                (isTotal
                    ? (isDark ? AppColors.darkText : AppColors.text)
                    : (isDark
                          ? AppColors.darkSecondaryText
                          : AppColors.secondaryText)),
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: isTotal ? 20 : 14,
            fontWeight: isTotal ? FontWeight.w800 : FontWeight.w600,
            color:
                color ??
                (isTotal
                    ? AppColors.primary
                    : (isDark ? AppColors.darkText : AppColors.text)),
          ),
        ),
      ],
    );
  }
}
