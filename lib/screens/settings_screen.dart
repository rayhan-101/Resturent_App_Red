import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/settings_provider.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final settings = context.watch<SettingsProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.padding),
        children: [
          _buildSectionHeader('PREFERENCES', isDark),
          _buildSettingsCard(context, isDark, [
            SwitchListTile(
              title: const Text(
                'Dark Mode',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
              subtitle: const Text(
                'Toggle between light and dark themes',
                style: TextStyle(fontSize: 12),
              ),
              secondary: const Icon(
                Icons.dark_mode_outlined,
                color: AppColors.primary,
              ),
              value: settings.isDarkMode,
              activeColor: AppColors.primary,
              onChanged: (val) =>
                  context.read<SettingsProvider>().toggleTheme(val),
            ),
            const Divider(height: 1),
            SwitchListTile(
              title: const Text(
                'Push Notifications',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
              subtitle: const Text(
                'Receive real-time order and discount alerts',
                style: TextStyle(fontSize: 12),
              ),
              secondary: const Icon(
                Icons.notifications_none_rounded,
                color: AppColors.primary,
              ),
              value: settings.notificationsEnabled,
              activeColor: AppColors.primary,
              onChanged: (val) =>
                  context.read<SettingsProvider>().setNotificationsEnabled(val),
            ),
            const Divider(height: 1),
            ListTile(
              leading: const Icon(
                Icons.language_rounded,
                color: AppColors.primary,
              ),
              title: const Text(
                'Language',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
              subtitle: Text(
                settings.selectedLanguage,
                style: const TextStyle(fontSize: 12),
              ),
              trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
              onTap: () => _showLanguageDialog(context, settings),
            ),
            const Divider(height: 1),
            SwitchListTile(
              title: const Text(
                'Location Services',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
              subtitle: const Text(
                'Enable GPS for faster delivery address detection',
                style: TextStyle(fontSize: 12),
              ),
              secondary: const Icon(
                Icons.my_location_rounded,
                color: AppColors.primary,
              ),
              value: settings.locationEnabled,
              activeColor: AppColors.primary,
              onChanged: (val) =>
                  context.read<SettingsProvider>().setLocationEnabled(val),
            ),
          ]),
          const SizedBox(height: 24),
          _buildSectionHeader('LEGAL & POLICIES', isDark),
          _buildSettingsCard(context, isDark, [
            ListTile(
              leading: const Icon(
                Icons.privacy_tip_outlined,
                color: AppColors.primary,
              ),
              title: const Text(
                'Privacy Policy',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
              trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
              onTap: () => _showLegalDialog(
                context,
                'Privacy Policy',
                'At Foodie Restaurant, your privacy is our top priority. We collect customer names, phone numbers, and delivery addresses strictly for order fulfillment. We never share or sell personal information to third parties. All mock payment data is processed securely in memory without persisting sensitive credentials.',
              ),
            ),
            const Divider(height: 1),
            ListTile(
              leading: const Icon(
                Icons.description_outlined,
                color: AppColors.primary,
              ),
              title: const Text(
                'Terms & Conditions',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
              trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
              onTap: () => _showLegalDialog(
                context,
                'Terms & Conditions',
                'By using Foodie Restaurant app, you agree to place orders responsibly. All prices and discounts are subject to local restaurant availability. Cancellation of orders is permitted within 5 minutes of placement. Delivery times are estimates and may vary slightly during peak dining hours.',
              ),
            ),
          ]),
          const SizedBox(height: 32),
          Center(
            child: Column(
              children: [
                Text(
                  AppConstants.appName,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: isDark
                        ? AppColors.darkSecondaryText
                        : AppColors.secondaryText,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Version 2.1.0 (Build 42)',
                  style: TextStyle(
                    color: isDark
                        ? AppColors.darkSecondaryText
                        : AppColors.secondaryText,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(left: 8, bottom: 8),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
          color: isDark ? AppColors.darkSecondaryText : AppColors.secondaryText,
        ),
      ),
    );
  }

  Widget _buildSettingsCard(
    BuildContext context,
    bool isDark,
    List<Widget> children,
  ) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.white,
        borderRadius: BorderRadius.circular(AppConstants.cardRadius),
        boxShadow: AppShadows.soft(context),
      ),
      child: Material(
        color: Colors.transparent,
        clipBehavior: Clip.antiAlias,
        borderRadius: BorderRadius.circular(AppConstants.cardRadius),
        child: Column(children: children),
      ),
    );
  }

  void _showLanguageDialog(BuildContext context, SettingsProvider settings) {
    showDialog(
      context: context,
      builder: (ctx) => SimpleDialog(
        title: const Text('Select Language'),
        children: ['English', 'Spanish', 'French', 'Bengali'].map((lang) {
          return SimpleDialogOption(
            onPressed: () {
              settings.setLanguage(lang);
              Navigator.pop(ctx);
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(lang, style: const TextStyle(fontSize: 16)),
                if (settings.selectedLanguage == lang)
                  const Icon(
                    Icons.check_circle_rounded,
                    color: AppColors.primary,
                    size: 20,
                  ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  void _showLegalDialog(BuildContext context, String title, String content) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        content: SingleChildScrollView(
          child: Text(
            content,
            style: const TextStyle(height: 1.5, fontSize: 14),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text(
              'Close',
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
