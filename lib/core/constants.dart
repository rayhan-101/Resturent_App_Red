import 'package:flutter/material.dart';

class AppColors {
  // Primary brand colors
  static const Color primary = Color(0xFFE85D04);
  static const Color primaryDark = Color(0xFFDC2F02);
  static const Color primaryLight = Color(0xFFFFBA08);
  static const Color secondary = Color(0xFFF48C06);

  // Light theme backgrounds & surfaces
  static const Color background = Color(0xFFFFF9F5);
  static const Color cardBg = Color(0xFFFFFFFF);
  static const Color surface = Color(0xFFFFFFFF);

  // Dark theme backgrounds & surfaces
  static const Color darkBackground = Color(0xFF141416);
  static const Color darkCard = Color(0xFF1F1F24);
  static const Color darkSurface = Color(0xFF26262C);

  // Typography
  static const Color text = Color(0xFF222222);
  static const Color secondaryText = Color(0xFF777777);
  static const Color darkText = Color(0xFFF5F5F7);
  static const Color darkSecondaryText = Color(0xFFA0A0A8);

  // General colors
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static const Color error = Color(0xFFD32F2F);
  static const Color success = Color(0xFF388E3C);
  static const Color warning = Color(0xFFF57C00);
  static const Color info = Color(0xFF1976D2);
  static const Color divider = Color(0xFFEEEEEE);
  static const Color darkDivider = Color(0xFF2E2E35);
  static const Color shimmerBase = Color(0xFFE0E0E0);
  static const Color shimmerHighlight = Color(0xFFF5F5F5);
}

class AppConstants {
  static const String appName = 'Foodie Restaurant';
  static const String restaurantTagline = 'Delicious food delivered with love.';
  static const String restaurantAddress =
      '452 Gourmet Way, Food District, NY 10012';
  static const String restaurantPhone = '+1 (800) 555-FOOD';
  static const String restaurantEmail = 'support@foodierestaurant.com';
  static const String restaurantHours = 'Mon - Sun: 10:00 AM - 11:00 PM';

  static const double borderRadius = 16.0;
  static const double cardRadius = 18.0;
  static const double buttonRadius = 14.0;
  static const double padding = 16.0;
  static const double paddingLarge = 24.0;
  static const double paddingSmall = 8.0;
}

class AppRadius {
  static const BorderRadius small = BorderRadius.all(Radius.circular(8));
  static const BorderRadius medium = BorderRadius.all(Radius.circular(14));
  static const BorderRadius large = BorderRadius.all(Radius.circular(18));
  static const BorderRadius xlarge = BorderRadius.all(Radius.circular(24));
  static const BorderRadius full = BorderRadius.all(Radius.circular(999));
}

class AppShadows {
  static List<BoxShadow> soft(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    if (isDark) {
      return [
        BoxShadow(
          color: Colors.black.withValues(alpha: 0.3),
          blurRadius: 12,
          offset: const Offset(0, 4),
        ),
      ];
    }
    return [
      BoxShadow(
        color: const Color(0xFFE85D04).withValues(alpha: 0.07),
        blurRadius: 16,
        offset: const Offset(0, 6),
      ),
      BoxShadow(
        color: Colors.black.withValues(alpha: 0.03),
        blurRadius: 6,
        offset: const Offset(0, 2),
      ),
    ];
  }

  static List<BoxShadow> primary = [
    BoxShadow(
      color: const Color(0xFFE85D04).withValues(alpha: 0.35),
      blurRadius: 18,
      offset: const Offset(0, 8),
    ),
  ];
}
