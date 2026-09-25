import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../core/constants.dart';
import '../providers/cart_provider.dart';
import '../models/order.dart' as model;
import '../widgets/empty_state_widget.dart';
import 'order_details_screen.dart';

class OrdersScreen extends StatefulWidget {
  final VoidCallback? onExploreMenu;

  const OrdersScreen({Key? key, this.onExploreMenu}) : super(key: key);

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Orders'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primary,
          indicatorWeight: 3,
          labelColor: AppColors.primary,
          unselectedLabelColor: isDark
              ? AppColors.darkSecondaryText
              : AppColors.secondaryText,
          labelStyle: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
          unselectedLabelStyle: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 14,
          ),
          tabs: const [
            Tab(text: 'All Orders'),
            Tab(text: 'Active'),
            Tab(text: 'Past Orders'),
          ],
        ),
      ),
      body: Consumer<CartProvider>(
        builder: (context, cartProvider, child) {
          final allOrders = cartProvider.orders;
          final activeOrders = allOrders
              .where(
                (o) =>
                    o.status == model.OrderStatus.preparing ||
                    o.status == model.OrderStatus.onTheWay,
              )
              .toList();
          final pastOrders = allOrders
              .where(
                (o) =>
                    o.status == model.OrderStatus.delivered ||
                    o.status == model.OrderStatus.cancelled,
              )
              .toList();

          return TabBarView(
            controller: _tabController,
            children: [
              _buildOrdersList(
                context,
                allOrders,
                'No Orders Placed Yet',
                isDark,
              ),
              _buildOrdersList(
                context,
                activeOrders,
                'No Active Orders Right Now',
                isDark,
              ),
              _buildOrdersList(
                context,
                pastOrders,
                'No Completed Orders Yet',
                isDark,
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildOrdersList(
    BuildContext context,
    List<model.Order> orders,
    String emptyMessage,
    bool isDark,
  ) {
    if (orders.isEmpty) {
      return EmptyStateWidget(
        icon: Icons.receipt_long_outlined,
        title: emptyMessage,
        description:
            'Your food orders will show up here with live status updates.',
        buttonText: 'Order Food Now',
        onButtonPressed: widget.onExploreMenu,
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.padding,
        vertical: 14,
      ),
      itemCount: orders.length,
      itemBuilder: (context, index) {
        final order = orders[index];
        return _buildOrderCard(context, order, isDark);
      },
    );
  }

  Widget _buildOrderCard(BuildContext context, model.Order order, bool isDark) {
    String statusText;
    Color statusColor;

    switch (order.status) {
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

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => OrderDetailsScreen(order: order)),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.white,
          borderRadius: BorderRadius.circular(AppConstants.cardRadius),
          boxShadow: AppShadows.soft(context),
          border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: AppColors.primary.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(
                        Icons.receipt_rounded,
                        color: AppColors.primary,
                        size: 20,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          order.id,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                        Text(
                          DateFormat(
                            'MMM dd, yyyy • hh:mm a',
                          ).format(order.date),
                          style: TextStyle(
                            color: isDark
                                ? AppColors.darkSecondaryText
                                : AppColors.secondaryText,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: statusColor.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    statusText,
                    style: TextStyle(
                      color: statusColor,
                      fontWeight: FontWeight.w700,
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            Text(
              order.items
                  .map((e) => '${e.quantity}x ${e.food.name}')
                  .join(', '),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
                fontSize: 13,
                height: 1.4,
              ),
            ),
            Divider(
              height: 24,
              color: isDark
                  ? AppColors.darkDivider
                  : Colors.grey.withValues(alpha: 0.15),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Total Price',
                      style: TextStyle(
                        fontSize: 11,
                        color: isDark
                            ? AppColors.darkSecondaryText
                            : AppColors.secondaryText,
                      ),
                    ),
                    Text(
                      '\$${order.total.toStringAsFixed(2)}',
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 16,
                        color: AppColors.primary,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      'View Details',
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                    const SizedBox(width: 4),
                    const Icon(
                      Icons.arrow_forward_ios_rounded,
                      size: 12,
                      color: AppColors.primary,
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
