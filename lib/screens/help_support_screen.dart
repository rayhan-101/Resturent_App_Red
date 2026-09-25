import 'package:flutter/material.dart';
import '../core/constants.dart';

class HelpSupportScreen extends StatelessWidget {
  const HelpSupportScreen({Key? key}) : super(key: key);

  final List<Map<String, String>> _faqs = const [
    {
      'question': 'How do I place an order?',
      'answer':
          'Browse our menu from the Home or Menu tabs, choose your desired dishes, customize with add-ons if you wish, and add them to your cart. Once ready, navigate to the Cart screen, apply any discount coupons (like WELCOME20), tap "Proceed to Checkout", confirm your delivery address and payment method, and tap "Place Order".',
    },
    {
      'question': 'How can I cancel my order?',
      'answer':
          'You can cancel an order within 5 minutes of placing it while it is in the "Preparing" stage. To do so, open the order from the "Orders" tab and tap "Cancel Order" or call our support hotline directly at ${AppConstants.restaurantPhone}.',
    },
    {
      'question': 'How can I change my address?',
      'answer':
          'Go to your Profile tab and select "Saved Addresses". From there, you can edit existing addresses, delete old ones, or add a new delivery location. You can also edit the delivery address directly on the Checkout screen before placing your order.',
    },
    {
      'question': 'What payment methods are supported?',
      'answer':
          'We support all major Credit and Debit cards (Visa, Mastercard, American Express) as well as Cash on Delivery (COD). You can save multiple cards under Profile > Payment Methods.',
    },
    {
      'question': 'How can I contact the restaurant directly?',
      'answer':
          'You can contact our restaurant staff via phone at ${AppConstants.restaurantPhone} or by emailing us at ${AppConstants.restaurantEmail}. Our support desk is active every day from 10:00 AM to 11:00 PM.',
    },
    {
      'question': 'What are your delivery fees and delivery times?',
      'answer':
          'Standard delivery fee is a flat \$5.00 for orders under our regular service radius. Most orders are prepared fresh and delivered within 30 to 45 minutes.',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Help & Support'),
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
            // Contact Channels Header
            Text(
              'CONTACT SUPPORT',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildContactAction(
                    context,
                    icon: Icons.phone_rounded,
                    title: 'Call Us',
                    subtitle: 'Quick support',
                    color: AppColors.primary,
                    onTap: () => _showContactDialog(
                      context,
                      'Call Support',
                      'Dialing support team at ${AppConstants.restaurantPhone}...\n(Demo simulation)',
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildContactAction(
                    context,
                    icon: Icons.email_rounded,
                    title: 'Email Us',
                    subtitle: 'Replies in 1hr',
                    color: AppColors.secondary,
                    onTap: () => _showContactDialog(
                      context,
                      'Email Support',
                      'Composing email to ${AppConstants.restaurantEmail}...\n(Demo simulation)',
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildContactAction(
                    context,
                    icon: Icons.chat_rounded,
                    title: 'Live Chat',
                    subtitle: 'Instant agent',
                    color: AppColors.success,
                    onTap: () => _showContactDialog(
                      context,
                      'Live Chat',
                      'Connecting with an online support representative...\n(Demo simulation)',
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 28),

            // FAQs Header
            Text(
              'FREQUENTLY ASKED QUESTIONS',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            ..._faqs.map((faq) => _buildFaqCard(context, faq, isDark)),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildContactAction(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Material(
      color: isDark ? AppColors.darkCard : AppColors.white,
      borderRadius: BorderRadius.circular(AppConstants.cardRadius),
      child: InkWell(
        borderRadius: BorderRadius.circular(AppConstants.cardRadius),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(AppConstants.cardRadius),
            border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
            boxShadow: AppShadows.soft(context),
          ),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.12),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 22),
              ),
              const SizedBox(height: 10),
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkText : AppColors.text,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 10,
                  color: isDark
                      ? AppColors.darkSecondaryText
                      : AppColors.secondaryText,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFaqCard(
    BuildContext context,
    Map<String, String> faq,
    bool isDark,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.white,
        borderRadius: BorderRadius.circular(AppConstants.cardRadius),
        border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
        boxShadow: AppShadows.soft(context),
      ),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          iconColor: AppColors.primary,
          collapsedIconColor: isDark
              ? AppColors.darkSecondaryText
              : AppColors.secondaryText,
          tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          title: Text(
            faq['question']!,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: isDark ? AppColors.darkText : AppColors.text,
            ),
          ),
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: Text(
                faq['answer']!,
                style: TextStyle(
                  fontSize: 13,
                  color: isDark
                      ? AppColors.darkSecondaryText
                      : AppColors.secondaryText,
                  height: 1.5,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showContactDialog(BuildContext context, String title, String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Row(
          children: [
            const Icon(Icons.support_agent_rounded, color: AppColors.primary),
            const SizedBox(width: 8),
            Text(title),
          ],
        ),
        content: Text(message, style: const TextStyle(height: 1.4)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'OK',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
