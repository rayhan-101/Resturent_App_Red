import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../models/order.dart' as model;
import '../providers/cart_provider.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_food_image.dart';

class OrderDetailsScreen extends StatelessWidget {
  final model.Order order;

  const OrderDetailsScreen({Key? key, required this.order}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Order Details'),
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
            // Order ID & Status Header Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            order.id,
                            style: TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: 18,
                              color: isDark
                                  ? AppColors.darkText
                                  : AppColors.text,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            DateFormat(
                              'MMM dd, yyyy • hh:mm a',
                            ).format(order.date),
                            style: TextStyle(
                              color: isDark
                                  ? AppColors.darkSecondaryText
                                  : AppColors.secondaryText,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      _buildStatusBadge(order.status),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.delivery_dining_rounded,
                          color: AppColors.primary,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Estimated Delivery: ${order.estimatedDeliveryTime}',
                          style: const TextStyle(
                            color: AppColors.primary,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // 4-Step Order Tracking Timeline
            Text(
              'ORDER STATUS TRACKER',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: _buildTrackingTimeline(order.status, isDark),
            ),
            const SizedBox(height: 20),

            // Items List
            Text(
              'ORDERED ITEMS',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: order.items.length,
                separatorBuilder: (context, index) => Divider(
                  height: 24,
                  color: isDark
                      ? AppColors.darkDivider
                      : Colors.grey.withValues(alpha: 0.15),
                ),
                itemBuilder: (context, index) {
                  final item = order.items[index];
                  return Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CustomFoodImage(
                        imageUrl: item.food.imageUrl,
                        width: 54,
                        height: 54,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item.food.name,
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
                              '${item.quantity}x @ \$${item.food.price.toStringAsFixed(2)}',
                              style: TextStyle(
                                fontSize: 12,
                                color: isDark
                                    ? AppColors.darkSecondaryText
                                    : AppColors.secondaryText,
                              ),
                            ),
                            if (item.selectedAddOns.isNotEmpty)
                              Padding(
                                padding: const EdgeInsets.only(top: 3),
                                child: Text(
                                  'Add-ons: ${item.selectedAddOns.map((a) => a.name).join(", ")}',
                                  style: const TextStyle(
                                    fontSize: 11,
                                    color: AppColors.primary,
                                  ),
                                ),
                              ),
                            if (item.specialInstructions != null &&
                                item.specialInstructions!.isNotEmpty)
                              Padding(
                                padding: const EdgeInsets.only(top: 2),
                                child: Text(
                                  'Note: "${item.specialInstructions}"',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontStyle: FontStyle.italic,
                                    color: isDark
                                        ? AppColors.darkSecondaryText
                                        : AppColors.secondaryText,
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ),
                      Text(
                        '\$${item.totalPrice.toStringAsFixed(2)}',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
            const SizedBox(height: 20),

            // Delivery & Payment Info
            Text(
              'DELIVERY & PAYMENT',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: Column(
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(
                        Icons.location_on_rounded,
                        color: AppColors.primary,
                        size: 22,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Delivery Address',
                              style: TextStyle(
                                fontSize: 12,
                                color: isDark
                                    ? AppColors.darkSecondaryText
                                    : AppColors.secondaryText,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              order.deliveryAddress,
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 13,
                                color: isDark
                                    ? AppColors.darkText
                                    : AppColors.text,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  Divider(
                    height: 24,
                    color: isDark
                        ? AppColors.darkDivider
                        : Colors.grey.withValues(alpha: 0.15),
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.payment_rounded,
                        color: AppColors.primary,
                        size: 22,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Payment Method',
                              style: TextStyle(
                                fontSize: 12,
                                color: isDark
                                    ? AppColors.darkSecondaryText
                                    : AppColors.secondaryText,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              order.paymentMethod,
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 13,
                                color: isDark
                                    ? AppColors.darkText
                                    : AppColors.text,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Order Summary Breakdown
            Text(
              'PAYMENT SUMMARY',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: Column(
                children: [
                  _buildSummaryRow(
                    'Subtotal',
                    '\$${order.subtotal.toStringAsFixed(2)}',
                    isDark,
                  ),
                  const SizedBox(height: 8),
                  _buildSummaryRow(
                    'Delivery Fee',
                    '\$${order.deliveryFee.toStringAsFixed(2)}',
                    isDark,
                  ),
                  if (order.discount > 0) ...[
                    const SizedBox(height: 8),
                    _buildSummaryRow(
                      'Discount',
                      '-\$${order.discount.toStringAsFixed(2)}',
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
                    'Total Paid',
                    '\$${order.total.toStringAsFixed(2)}',
                    isDark,
                    isTotal: true,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 28),

            // Reorder button
            CustomButton(
              text: 'Reorder All Items',
              icon: Icons.replay_rounded,
              onPressed: () {
                context.read<CartProvider>().reorder(order);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Row(
                      children: [
                        Icon(
                          Icons.check_circle_rounded,
                          color: Colors.white,
                          size: 20,
                        ),
                        SizedBox(width: 8),
                        Text('Items added back to your cart!'),
                      ],
                    ),
                    behavior: SnackBarBehavior.floating,
                    backgroundColor: AppColors.success,
                  ),
                );
              },
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBadge(model.OrderStatus status) {
    String statusText;
    Color statusColor;

    switch (status) {
      case model.OrderStatus.preparing:
        statusText = 'Preparing';
        statusColor = AppColors.warning;
        break;
      case model.OrderStatus.onTheWay:
        statusText = 'On the way';
        statusColor = AppColors.info;
        break;
      case model.OrderStatus.delivered:
        statusText = 'Delivered';
        statusColor = AppColors.success;
        break;
      case model.OrderStatus.cancelled:
        statusText = 'Cancelled';
        statusColor = AppColors.error;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: statusColor.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        statusText,
        style: TextStyle(
          color: statusColor,
          fontWeight: FontWeight.w700,
          fontSize: 12,
        ),
      ),
    );
  }

  Widget _buildTrackingTimeline(model.OrderStatus currentStatus, bool isDark) {
    final steps = [
      {'title': 'Order Placed', 'icon': Icons.receipt_rounded, 'step': 0},
      {'title': 'Preparing', 'icon': Icons.outdoor_grill_rounded, 'step': 1},
      {'title': 'On the Way', 'icon': Icons.delivery_dining_rounded, 'step': 2},
      {'title': 'Delivered', 'icon': Icons.home_rounded, 'step': 3},
    ];

    int currentStepIndex;
    switch (currentStatus) {
      case model.OrderStatus.preparing:
        currentStepIndex = 1;
        break;
      case model.OrderStatus.onTheWay:
        currentStepIndex = 2;
        break;
      case model.OrderStatus.delivered:
        currentStepIndex = 3;
        break;
      case model.OrderStatus.cancelled:
        currentStepIndex = -1;
        break;
    }

    if (currentStepIndex == -1) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.cancel_rounded, color: AppColors.error, size: 28),
          SizedBox(width: 8),
          Text(
            'This order was cancelled.',
            style: TextStyle(
              color: AppColors.error,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      );
    }

    return Row(
      children: List.generate(steps.length, (index) {
        final isCompleted = index <= currentStepIndex;
        final isCurrent = index == currentStepIndex;
        final isLast = index == steps.length - 1;

        return Expanded(
          child: Row(
            children: [
              Expanded(
                child: Column(
                  children: [
                    Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color: isCompleted
                            ? AppColors.primary
                            : (isDark
                                  ? AppColors.darkSurface
                                  : Colors.grey[200]),
                        shape: BoxShape.circle,
                        boxShadow: isCurrent ? AppShadows.primary : null,
                      ),
                      child: Icon(
                        steps[index]['icon'] as IconData,
                        size: 18,
                        color: isCompleted
                            ? Colors.white
                            : (isDark
                                  ? AppColors.darkSecondaryText
                                  : Colors.grey),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      steps[index]['title'] as String,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: isCurrent
                            ? FontWeight.bold
                            : FontWeight.w500,
                        color: isCompleted
                            ? (isDark ? AppColors.darkText : AppColors.text)
                            : (isDark
                                  ? AppColors.darkSecondaryText
                                  : AppColors.secondaryText),
                      ),
                    ),
                  ],
                ),
              ),
              if (!isLast)
                Container(
                  width: 14,
                  height: 3,
                  margin: const EdgeInsets.only(bottom: 20),
                  color: index < currentStepIndex
                      ? AppColors.primary
                      : (isDark ? AppColors.darkDivider : Colors.grey[300]),
                ),
            ],
          ),
        );
      }),
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
            fontSize: isTotal ? 16 : 13,
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
}
