import 'package:flutter/material.dart';
import '../core/constants.dart';
import '../widgets/cart_icon_badge.dart';
import 'home_screen.dart';
import 'menu_screen.dart';
import 'cart_screen.dart';
import 'orders_screen.dart';
import 'profile_screen.dart';

class MainWrapper extends StatefulWidget {
  final int initialIndex;

  const MainWrapper({Key? key, this.initialIndex = 0}) : super(key: key);

  @override
  State<MainWrapper> createState() => _MainWrapperState();
}

class _MainWrapperState extends State<MainWrapper> {
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
  }

  void _navigateToTab(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final screens = [
      HomeScreen(onExploreMenu: () => _navigateToTab(1)),
      const MenuScreen(),
      CartScreen(onExploreMenu: () => _navigateToTab(1)),
      OrdersScreen(onExploreMenu: () => _navigateToTab(1)),
      const ProfileScreen(),
    ];

    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: screens),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.white,
          border: Border(
            top: BorderSide(
              color: isDark ? AppColors.darkDivider : AppColors.divider,
              width: 0.8,
            ),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.25 : 0.04),
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          top: false,
          bottom: true,
          child: SizedBox(
            height: 54,
            child: Row(
              children: [
                _buildNavItem(
                  index: 0,
                  label: 'Home',
                  icon: Icons.home_outlined,
                  selectedIcon: Icons.home_rounded,
                  isDark: isDark,
                ),
                _buildNavItem(
                  index: 1,
                  label: 'Menu',
                  icon: Icons.restaurant_menu_outlined,
                  selectedIcon: Icons.restaurant_menu_rounded,
                  isDark: isDark,
                ),
                _buildNavItem(
                  index: 2,
                  label: 'Cart',
                  customIcon: CartIconBadge(
                    isSelected: _currentIndex == 2,
                    size: 21,
                    color: _currentIndex == 2
                        ? AppColors.primary
                        : (isDark
                            ? AppColors.darkSecondaryText
                            : AppColors.secondaryText),
                  ),
                  isDark: isDark,
                ),
                _buildNavItem(
                  index: 3,
                  label: 'Orders',
                  icon: Icons.receipt_long_outlined,
                  selectedIcon: Icons.receipt_long_rounded,
                  isDark: isDark,
                ),
                _buildNavItem(
                  index: 4,
                  label: 'Account',
                  icon: Icons.person_outline_rounded,
                  selectedIcon: Icons.person_rounded,
                  isDark: isDark,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required int index,
    required String label,
    IconData? icon,
    IconData? selectedIcon,
    Widget? customIcon,
    required bool isDark,
  }) {
    final isSelected = _currentIndex == index;
    final activeColor = AppColors.primary;
    final inactiveColor =
        isDark ? AppColors.darkSecondaryText : AppColors.secondaryText;

    return Expanded(
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => _navigateToTab(index),
          splashColor: AppColors.primary.withValues(alpha: 0.08),
          highlightColor: Colors.transparent,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              customIcon ??
                  Icon(
                    isSelected ? selectedIcon : icon,
                    size: 21,
                    color: isSelected ? activeColor : inactiveColor,
                  ),
              const SizedBox(height: 3),
              Text(
                label,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                  color: isSelected ? activeColor : inactiveColor,
                  letterSpacing: 0.1,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
