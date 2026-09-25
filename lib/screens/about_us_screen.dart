import 'package:flutter/material.dart';
import '../core/constants.dart';

class AboutUsScreen extends StatelessWidget {
  const AboutUsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('About Us'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.paddingLarge),
        child: Column(
          children: [
            // Restaurant Logo / Hero
            Container(
              width: 110,
              height: 110,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [AppColors.primary, AppColors.secondary],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withValues(alpha: 0.35),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: const Center(
                child: Icon(
                  Icons.restaurant_rounded,
                  size: 54,
                  color: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 18),
            Text(
              AppConstants.appName,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w800,
                color: isDark ? AppColors.darkText : AppColors.text,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              AppConstants.restaurantTagline,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14,
                color: AppColors.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 24),

            // Highlight Cards Row
            Row(
              children: [
                Expanded(
                  child: _buildBadge(
                    context,
                    Icons.eco_rounded,
                    '100% Fresh',
                    'Daily farm picks',
                    isDark,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildBadge(
                    context,
                    Icons.electric_bolt_rounded,
                    '30 Mins',
                    'Fast delivery',
                    isDark,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildBadge(
                    context,
                    Icons.star_rounded,
                    '4.9 Rated',
                    '10k+ reviews',
                    isDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 28),

            // Story Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Our Story',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.darkText : AppColors.text,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'Founded in 2018, Foodie Restaurant began with a singular mission: to craft gourmet artisanal meals using only honest, ethically sourced ingredients. Our master chefs combine traditional kitchen craftsmanship with bold modern gastronomy to deliver extraordinary culinary experiences straight to your table.',
                    style: TextStyle(
                      fontSize: 13,
                      height: 1.6,
                      color: isDark
                          ? AppColors.darkSecondaryText
                          : AppColors.secondaryText,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Details info card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.white,
                borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                boxShadow: AppShadows.soft(context),
              ),
              child: Column(
                children: [
                  _buildInfoTile(
                    Icons.access_time_rounded,
                    'Opening Hours',
                    AppConstants.restaurantHours,
                    isDark,
                  ),
                  const Divider(height: 20),
                  _buildInfoTile(
                    Icons.location_on_rounded,
                    'Address',
                    AppConstants.restaurantAddress,
                    isDark,
                  ),
                  const Divider(height: 20),
                  _buildInfoTile(
                    Icons.phone_rounded,
                    'Phone',
                    AppConstants.restaurantPhone,
                    isDark,
                  ),
                  const Divider(height: 20),
                  _buildInfoTile(
                    Icons.email_rounded,
                    'Email',
                    AppConstants.restaurantEmail,
                    isDark,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 28),

            // Social Media links
            Text(
              'FOLLOW US',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: isDark
                    ? AppColors.darkSecondaryText
                    : AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 14),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildSocialButton(Icons.camera_alt_rounded, 'Instagram'),
                const SizedBox(width: 16),
                _buildSocialButton(Icons.facebook_rounded, 'Facebook'),
                const SizedBox(width: 16),
                _buildSocialButton(Icons.alternate_email_rounded, 'Twitter'),
                const SizedBox(width: 16),
                _buildSocialButton(Icons.play_circle_fill_rounded, 'YouTube'),
              ],
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildBadge(
    BuildContext context,
    IconData icon,
    String title,
    String subtitle,
    bool isDark,
  ) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.white,
        borderRadius: BorderRadius.circular(AppConstants.cardRadius),
        border: Border.all(color: Colors.grey.withValues(alpha: 0.1)),
        boxShadow: AppShadows.soft(context),
      ),
      child: Column(
        children: [
          Icon(icon, color: AppColors.primary, size: 24),
          const SizedBox(height: 8),
          Text(
            title,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 12,
              color: isDark ? AppColors.darkText : AppColors.text,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 10,
              color: isDark
                  ? AppColors.darkSecondaryText
                  : AppColors.secondaryText,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoTile(
    IconData icon,
    String label,
    String value,
    bool isDark,
  ) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: AppColors.primary, size: 20),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  color: isDark
                      ? AppColors.darkSecondaryText
                      : AppColors.secondaryText,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkText : AppColors.text,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSocialButton(IconData icon, String tooltip) {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.primary,
        shape: BoxShape.circle,
      ),
      child: IconButton(
        icon: Icon(icon, color: Colors.white, size: 20),
        tooltip: tooltip,
        onPressed: () {},
      ),
    );
  }
}
