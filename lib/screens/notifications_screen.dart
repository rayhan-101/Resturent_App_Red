import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../core/constants.dart';
import '../models/notification_item.dart';
import '../providers/notification_provider.dart';
import '../widgets/empty_state_widget.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          Consumer<NotificationProvider>(
            builder: (context, provider, child) {
              if (provider.notifications.isEmpty)
                return const SizedBox.shrink();
              return TextButton(
                onPressed: () => provider.markAllAsRead(),
                child: const Text(
                  'Mark all read',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
              );
            },
          ),
        ],
      ),
      body: Consumer<NotificationProvider>(
        builder: (context, provider, child) {
          final items = provider.notifications;

          if (items.isEmpty) {
            return const EmptyStateWidget(
              icon: Icons.notifications_off_rounded,
              title: 'No Notifications Yet',
              description:
                  'You\'re all caught up! Order updates, special offers, and news will appear right here.',
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.symmetric(
              horizontal: AppConstants.padding,
              vertical: 12,
            ),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];
              return Dismissible(
                key: Key(item.id),
                direction: DismissDirection.endToStart,
                background: Container(
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.only(right: 20),
                  margin: const EdgeInsets.only(bottom: 12),
                  decoration: BoxDecoration(
                    color: AppColors.error,
                    borderRadius: BorderRadius.circular(
                      AppConstants.cardRadius,
                    ),
                  ),
                  child: const Icon(
                    Icons.delete_outline_rounded,
                    color: Colors.white,
                  ),
                ),
                onDismissed: (_) {
                  provider.deleteNotification(item.id);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Notification dismissed'),
                      duration: Duration(seconds: 1),
                    ),
                  );
                },
                child: _buildNotificationCard(context, item, provider, isDark),
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildNotificationCard(
    BuildContext context,
    NotificationItem item,
    NotificationProvider provider,
    bool isDark,
  ) {
    IconData icon;
    Color iconColor;

    switch (item.type) {
      case NotificationType.order:
        icon = Icons.receipt_long_rounded;
        iconColor = AppColors.primary;
        break;
      case NotificationType.promo:
        icon = Icons.local_offer_rounded;
        iconColor = AppColors.secondary;
        break;
      case NotificationType.system:
        icon = Icons.info_outline_rounded;
        iconColor = AppColors.info;
        break;
    }

    return GestureDetector(
      onTap: () => provider.markAsRead(item.id),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: item.isRead
              ? (isDark ? AppColors.darkCard : AppColors.white)
              : (isDark
                    ? AppColors.primary.withValues(alpha: 0.12)
                    : const Color(0xFFFFF6EE)),
          borderRadius: BorderRadius.circular(AppConstants.cardRadius),
          border: Border.all(
            color: item.isRead
                ? (isDark
                      ? AppColors.darkDivider
                      : Colors.grey.withValues(alpha: 0.12))
                : AppColors.primary.withValues(alpha: 0.35),
            width: item.isRead ? 1 : 1.5,
          ),
          boxShadow: AppShadows.soft(context),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: iconColor.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: iconColor, size: 22),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          item.title,
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: item.isRead
                                ? FontWeight.w600
                                : FontWeight.w700,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                      ),
                      if (!item.isRead)
                        Container(
                          width: 8,
                          height: 8,
                          margin: const EdgeInsets.only(left: 6),
                          decoration: const BoxDecoration(
                            color: AppColors.primary,
                            shape: BoxShape.circle,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    item.message,
                    style: TextStyle(
                      fontSize: 13,
                      color: isDark
                          ? AppColors.darkSecondaryText
                          : AppColors.secondaryText,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    DateFormat('MMM dd • hh:mm a').format(item.time),
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
    );
  }
}
