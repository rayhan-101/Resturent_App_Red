import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/cart_provider.dart';
import '../providers/address_provider.dart';
import '../providers/payment_provider.dart';
import '../widgets/custom_button.dart';
import 'order_confirmation_screen.dart';
import 'saved_addresses_screen.dart';
import 'payment_methods_screen.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({Key? key}) : super(key: key);

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  bool _isLoading = false;

  void _placeOrder() async {
    setState(() => _isLoading = true);

    await Future.delayed(const Duration(milliseconds: 1200));

    if (!mounted) return;

    final cartProvider = context.read<CartProvider>();
    final addressProvider = context.read<AddressProvider>();
    final paymentProvider = context.read<PaymentProvider>();

    final selectedAddr = addressProvider.selectedAddress;
    final addressString = selectedAddr != null
        ? '${selectedAddr.fullAddress}, ${selectedAddr.city}'
        : '123 Main Street, Gulshan-2, Dhaka';

    String paymentString = 'Cash on Delivery';
    if (paymentProvider.paymentType == 'card' &&
        paymentProvider.selectedCard != null) {
      final card = paymentProvider.selectedCard!;
      paymentString = '${card.cardType.toUpperCase()} •••• ${card.lastFour}';
    }

    final orderId = cartProvider.placeOrder(
      deliveryAddress: addressString,
      paymentMethod: paymentString,
    );

    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (_) => OrderConfirmationScreen(orderId: orderId),
      ),
      (route) => route.isFirst,
    );
  }

  @override
  Widget build(BuildContext context) {
    final cartProvider = context.watch<CartProvider>();
    final addressProvider = context.watch<AddressProvider>();
    final paymentProvider = context.watch<PaymentProvider>();
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final currentAddress = addressProvider.selectedAddress;
    final currentCard = paymentProvider.selectedCard;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Checkout'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.padding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Delivery Address Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildSectionTitle('DELIVERY ADDRESS', isDark),
                TextButton.icon(
                  icon: const Icon(Icons.edit_location_alt_rounded, size: 16),
                  label: const Text('Change'),
                  onPressed: () {
                    _showAddressSelector(context, addressProvider);
                  },
                ),
              ],
            ),
            const SizedBox(height: 6),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
                border: Border.all(color: Colors.grey.withValues(alpha: 0.12)),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(
                      Icons.location_on_rounded,
                      color: AppColors.primary,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              currentAddress?.title ?? 'Home',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                                color: isDark
                                    ? AppColors.darkText
                                    : AppColors.text,
                              ),
                            ),
                            if (currentAddress?.isDefault ?? true) ...[
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 6,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: AppColors.primary.withValues(
                                    alpha: 0.1,
                                  ),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text(
                                  'Default',
                                  style: TextStyle(
                                    color: AppColors.primary,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          currentAddress?.fullAddress ??
                              '123 Main Street, Gulshan-2',
                          style: TextStyle(
                            fontSize: 13,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          currentAddress?.city ?? 'Dhaka, Bangladesh',
                          style: TextStyle(
                            fontSize: 12,
                            color: isDark
                                ? AppColors.darkSecondaryText
                                : AppColors.secondaryText,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Phone: ${currentAddress?.phone ?? "+880 1712 345678"}',
                          style: TextStyle(
                            fontSize: 11,
                            color: isDark
                                ? AppColors.darkSecondaryText
                                : AppColors.secondaryText,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Payment Method Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildSectionTitle('PAYMENT METHOD', isDark),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => const PaymentMethodsScreen(),
                      ),
                    );
                  },
                  child: const Text('Manage Cards'),
                ),
              ],
            ),
            const SizedBox(height: 6),

            // Card option
            GestureDetector(
              onTap: () => paymentProvider.selectPaymentType('card'),
              child: Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.white,
                  borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                  border: Border.all(
                    color: paymentProvider.paymentType == 'card'
                        ? AppColors.primary
                        : Colors.grey.withValues(alpha: 0.12),
                    width: paymentProvider.paymentType == 'card' ? 2 : 1,
                  ),
                  boxShadow: AppShadows.soft(context),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.primary.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(
                        Icons.credit_card_rounded,
                        color: AppColors.primary,
                        size: 22,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            currentCard != null
                                ? '${currentCard.cardType.toUpperCase()} Card'
                                : 'Credit / Debit Card',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              color: isDark
                                  ? AppColors.darkText
                                  : AppColors.text,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            currentCard?.maskedNumber ?? '•••• •••• •••• 4582',
                            style: TextStyle(
                              fontSize: 12,
                              color: isDark
                                  ? AppColors.darkSecondaryText
                                  : AppColors.secondaryText,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Radio<String>(
                      value: 'card',
                      groupValue: paymentProvider.paymentType,
                      activeColor: AppColors.primary,
                      onChanged: (val) {
                        if (val != null) paymentProvider.selectPaymentType(val);
                      },
                    ),
                  ],
                ),
              ),
            ),

            // Cash on delivery option
            GestureDetector(
              onTap: () => paymentProvider.selectPaymentType('cod'),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.white,
                  borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                  border: Border.all(
                    color: paymentProvider.paymentType == 'cod'
                        ? AppColors.primary
                        : Colors.grey.withValues(alpha: 0.12),
                    width: paymentProvider.paymentType == 'cod' ? 2 : 1,
                  ),
                  boxShadow: AppShadows.soft(context),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.success.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(
                        Icons.payments_rounded,
                        color: AppColors.success,
                        size: 22,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Cash on Delivery',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              color: isDark
                                  ? AppColors.darkText
                                  : AppColors.text,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'Pay in cash when your order arrives',
                            style: TextStyle(
                              fontSize: 12,
                              color: isDark
                                  ? AppColors.darkSecondaryText
                                  : AppColors.secondaryText,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Radio<String>(
                      value: 'cod',
                      groupValue: paymentProvider.paymentType,
                      activeColor: AppColors.primary,
                      onChanged: (val) {
                        if (val != null) paymentProvider.selectPaymentType(val);
                      },
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Order Summary
            _buildSectionTitle('ORDER SUMMARY', isDark),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
                border: Border.all(color: Colors.grey.withValues(alpha: 0.12)),
              ),
              child: Column(
                children: [
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
                ],
              ),
            ),
            const SizedBox(height: 32),

            // Place Order CTA
            CustomButton(
              text: 'Place Order • \$${cartProvider.total.toStringAsFixed(2)}',
              icon: Icons.check_circle_rounded,
              isLoading: _isLoading,
              onPressed: _placeOrder,
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title, bool isDark) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 11,
        fontWeight: FontWeight.bold,
        letterSpacing: 1.2,
        color: isDark ? AppColors.darkSecondaryText : AppColors.secondaryText,
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
            fontSize: isTotal ? 15 : 13,
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
            fontSize: isTotal ? 18 : 14,
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

  void _showAddressSelector(BuildContext context, AddressProvider provider) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Select Delivery Address',
                    style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.pop(ctx);
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const SavedAddressesScreen(),
                        ),
                      );
                    },
                    child: const Text('Manage'),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              ...provider.addresses.map((addr) {
                final isSelected = provider.selectedAddress?.id == addr.id;
                return ListTile(
                  leading: Icon(
                    Icons.location_on_rounded,
                    color: isSelected ? AppColors.primary : Colors.grey,
                  ),
                  title: Text(
                    addr.title,
                    style: TextStyle(
                      fontWeight: isSelected
                          ? FontWeight.bold
                          : FontWeight.normal,
                    ),
                  ),
                  subtitle: Text(
                    addr.fullAddress,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  trailing: isSelected
                      ? const Icon(
                          Icons.check_rounded,
                          color: AppColors.primary,
                        )
                      : null,
                  onTap: () {
                    provider.selectAddress(addr.id);
                    Navigator.pop(ctx);
                  },
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}
