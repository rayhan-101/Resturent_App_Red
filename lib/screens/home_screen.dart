import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../models/category.dart';
import '../providers/auth_provider.dart';
import '../providers/food_provider.dart';
import '../providers/notification_provider.dart';
import '../providers/cart_provider.dart';
import '../providers/settings_provider.dart';
import '../widgets/food_card.dart';
import '../widgets/category_card.dart';
import '../widgets/cart_icon_badge.dart';
import '../widgets/empty_state_widget.dart';
import 'notifications_screen.dart';
import 'favorites_screen.dart';
import 'cart_screen.dart';

class HomeScreen extends StatefulWidget {
  final VoidCallback? onExploreMenu;

  const HomeScreen({Key? key, this.onExploreMenu}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _categoryScrollController = ScrollController();
  final Map<int, GlobalKey> _categoryKeys = {};
  String _lastScrolledCategoryId = '';

  @override
  void dispose() {
    _categoryScrollController.dispose();
    super.dispose();
  }

  GlobalKey _getKeyForIndex(int index) {
    return _categoryKeys.putIfAbsent(index, () => GlobalKey());
  }

  void _scrollToCategory(int index) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final key = _categoryKeys[index];
      final targetContext = key?.currentContext;
      if (targetContext != null) {
        Scrollable.ensureVisible(
          targetContext,
          duration: const Duration(milliseconds: 350),
          curve: Curves.easeInOut,
          alignment: 0.5,
        );
      }
    });
  }

  String _getTimeGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = context.watch<AuthProvider>();
    final notifProvider = context.watch<NotificationProvider>();
    final foodProvider = context.watch<FoodProvider>();
    final user = authProvider.currentUser;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final selectedCatId = foodProvider.selectedCategoryId;
    if (_lastScrolledCategoryId != selectedCatId) {
      _lastScrolledCategoryId = selectedCatId;
      final targetIndex = selectedCatId.isEmpty
          ? 0
          : (foodProvider.categories.indexWhere((c) => c.id == selectedCatId) +
                1);
      if (targetIndex >= 0) {
        _scrollToCategory(targetIndex);
      }
    }

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.padding,
            vertical: 12,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with Avatar, Greeting, and Quick Actions
              Row(
                children: [
                  CircleAvatar(
                    radius: 22,
                    backgroundImage: NetworkImage(
                      user?.profileImageUrl ??
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${_getTimeGreeting()} 👋',
                          style: TextStyle(
                            color: isDark
                                ? AppColors.darkSecondaryText
                                : AppColors.secondaryText,
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        Text(
                          user?.name ?? 'Foodie Guest',
                          style: TextStyle(
                            fontWeight: FontWeight.w800,
                            fontSize: 17,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  // Dark Mode Toggle Button
                  Consumer<SettingsProvider>(
                    builder: (context, settings, child) {
                      return GestureDetector(
                        onTap: () => settings.toggleTheme(!settings.isDarkMode),
                        child: Container(
                          margin: const EdgeInsets.only(left: 6),
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: isDark ? AppColors.darkCard : AppColors.white,
                            shape: BoxShape.circle,
                            boxShadow: AppShadows.soft(context),
                          ),
                          child: Icon(
                            settings.isDarkMode
                                ? Icons.wb_sunny_rounded
                                : Icons.nightlight_round,
                            color: settings.isDarkMode
                                ? AppColors.primaryLight
                                : AppColors.primary,
                            size: 19,
                          ),
                        ),
                      );
                    },
                  ),
                  // Favorites Button
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const FavoritesScreen(),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.only(left: 6),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkCard : AppColors.white,
                        shape: BoxShape.circle,
                        boxShadow: AppShadows.soft(context),
                      ),
                      child: const Icon(
                        Icons.favorite_rounded,
                        color: AppColors.error,
                        size: 19,
                      ),
                    ),
                  ),
                  // Notification Button with Badge
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const NotificationsScreen(),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.only(left: 6),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkCard : AppColors.white,
                        shape: BoxShape.circle,
                        boxShadow: AppShadows.soft(context),
                      ),
                      child: Badge(
                        isLabelVisible: notifProvider.unreadCount > 0,
                        backgroundColor: AppColors.primary,
                        label: Text('${notifProvider.unreadCount}'),
                        child: Icon(
                          Icons.notifications_none_rounded,
                          color: isDark ? AppColors.darkText : AppColors.text,
                          size: 19,
                        ),
                      ),
                    ),
                  ),
                  // Cart Button with Badge
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const CartScreen(),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.only(left: 6),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkCard : AppColors.white,
                        shape: BoxShape.circle,
                        boxShadow: AppShadows.soft(context),
                      ),
                      child: const CartIconBadge(size: 19),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // Search Bar
              Consumer<FoodProvider>(
                builder: (context, foodProvider, child) {
                  return Container(
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.darkCard : AppColors.white,
                      borderRadius: BorderRadius.circular(50),
                      border: Border.all(
                        color: isDark
                            ? AppColors.darkDivider
                            : const Color(0xFFEFEFEF),
                        width: 1.0,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(
                            alpha: isDark ? 0.2 : 0.03,
                          ),
                          blurRadius: 10,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: TextField(
                      onChanged: (value) => foodProvider.search(value),
                      style: TextStyle(
                        color: isDark ? AppColors.darkText : AppColors.text,
                        fontSize: 14,
                      ),
                      decoration: InputDecoration(
                        hintText: 'Search for food...',
                        hintStyle: TextStyle(
                          color: isDark
                              ? AppColors.darkSecondaryText
                              : AppColors.secondaryText.withValues(alpha: 0.8),
                          fontSize: 14,
                        ),
                        filled: true,
                        fillColor: isDark ? AppColors.darkCard : AppColors.white,
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 14,
                        ),
                        prefixIcon: Icon(
                          Icons.search_rounded,
                          color: isDark
                              ? AppColors.darkSecondaryText
                              : AppColors.secondaryText,
                          size: 21,
                        ),
                        suffixIcon: foodProvider.searchQuery.isNotEmpty
                            ? IconButton(
                                icon: const Icon(Icons.close_rounded, size: 18),
                                onPressed: () => foodProvider.clearSearch(),
                              )
                            : null,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                          borderSide: BorderSide.none,
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                          borderSide: BorderSide.none,
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(50),
                          borderSide: const BorderSide(
                            color: AppColors.primary,
                            width: 1.5,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 20),

              // Promotional Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(AppConstants.cardRadius),
                  gradient: const LinearGradient(
                    colors: [Color(0xFFE85D04), Color(0xFFF48C06)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  boxShadow: AppShadows.primary,
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.25),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text(
                              'PROMO CODE: WELCOME20',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w800,
                                fontSize: 10,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Get 20% OFF',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 22,
                              height: 1.1,
                            ),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            'On your entire order today!',
                            style: TextStyle(color: Colors.white, fontSize: 12),
                          ),
                          const SizedBox(height: 14),
                          ElevatedButton(
                            onPressed: () {
                              context.read<CartProvider>().applyPromoCode(
                                'WELCOME20',
                              );
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Row(
                                    children: [
                                      Icon(
                                        Icons.celebration_rounded,
                                        color: Colors.white,
                                        size: 20,
                                      ),
                                      SizedBox(width: 8),
                                      Text(
                                        'Code WELCOME20 copied & applied to cart!',
                                      ),
                                    ],
                                  ),
                                  behavior: SnackBarBehavior.floating,
                                  backgroundColor: AppColors.success,
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: AppColors.primary,
                              elevation: 0,
                              minimumSize: const Size(120, 36),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                              ),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            child: const Text(
                              'Claim 20% OFF',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.fastfood_rounded,
                        size: 54,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Categories Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Categories',
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.darkText : AppColors.text,
                    ),
                  ),
                  if (widget.onExploreMenu != null)
                    TextButton(
                      onPressed: widget.onExploreMenu,
                      child: const Text(
                        'See All',
                        style: TextStyle(
                          color: AppColors.primary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 10),
              SizedBox(
                height: 44,
                child: Consumer<FoodProvider>(
                  builder: (context, foodProvider, child) {
                    final isAllSelected =
                        foodProvider.selectedCategoryId.isEmpty;
                    return SingleChildScrollView(
                      controller: _categoryScrollController,
                      scrollDirection: Axis.horizontal,
                      physics: const BouncingScrollPhysics(),
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: Row(
                        children: [
                          Container(
                            key: _getKeyForIndex(0),
                            child: GestureDetector(
                              onTap: () {
                                foodProvider.selectCategory('');
                                _scrollToCategory(0);
                              },
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: const EdgeInsets.only(right: 12),
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 8,
                                ),
                                decoration: BoxDecoration(
                                  color: isAllSelected
                                      ? AppColors.primary
                                      : (isDark
                                          ? AppColors.darkCard
                                          : AppColors.white),
                                  borderRadius: BorderRadius.circular(30),
                                  boxShadow: isAllSelected
                                      ? AppShadows.primary
                                      : [
                                          BoxShadow(
                                            color: Colors.black.withValues(
                                              alpha: isDark ? 0.2 : 0.04,
                                            ),
                                            blurRadius: 8,
                                            offset: const Offset(0, 2),
                                          ),
                                        ],
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(6),
                                      decoration: BoxDecoration(
                                        color: isAllSelected
                                            ? AppColors.white
                                            : (isDark
                                                ? AppColors.darkBackground
                                                : AppColors.background),
                                        shape: BoxShape.circle,
                                      ),
                                      child: Icon(
                                        Icons.restaurant_rounded,
                                        size: 16,
                                        color: isAllSelected
                                            ? AppColors.primary
                                            : (isDark
                                                ? AppColors.darkText
                                                : AppColors.text),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      'All',
                                      style: TextStyle(
                                        fontWeight: isAllSelected
                                            ? FontWeight.w700
                                            : FontWeight.w600,
                                        fontSize: 13,
                                        color: isAllSelected
                                            ? AppColors.white
                                            : (isDark
                                                ? AppColors.darkText
                                                : AppColors.text),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          ...List.generate(foodProvider.categories.length, (i) {
                            final index = i + 1;
                            final category = foodProvider.categories[i];
                            return Container(
                              key: _getKeyForIndex(index),
                              child: CategoryCard(
                                category: category,
                                isSelected:
                                    foodProvider.selectedCategoryId ==
                                    category.id,
                                onTap: () {
                                  foodProvider.selectCategory(category.id);
                                  _scrollToCategory(index);
                                },
                              ),
                            );
                          }),
                        ],
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 24),

              // Dynamic Food Section (Category Filter / Search / Default All)
              Consumer<FoodProvider>(
                builder: (context, foodProvider, child) {
                  // 1. If actively searching
                  if (foodProvider.searchQuery.trim().isNotEmpty) {
                    final searchFoods = foodProvider.foods;
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Search Results (${searchFoods.length})',
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                        const SizedBox(height: 14),
                        if (searchFoods.isEmpty)
                          EmptyStateWidget(
                            icon: Icons.search_off_rounded,
                            title: 'No Dishes Found',
                            description:
                                'We couldn\'t find anything matching "${foodProvider.searchQuery}".',
                            buttonText: 'Clear Search',
                            onButtonPressed: () => foodProvider.clearSearch(),
                          )
                        else
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: searchFoods.length,
                            itemBuilder: (context, index) {
                              return FoodCard(
                                food: searchFoods[index],
                                isHorizontal: true,
                                heroTag: 'home_search_${searchFoods[index].id}',
                              );
                            },
                          ),
                      ],
                    );
                  }

                  // 2. If a specific category is selected
                  if (foodProvider.selectedCategoryId.isNotEmpty) {
                    final categoryFoods = foodProvider.foods;
                    final selectedCat = foodProvider.categories.firstWhere(
                      (c) => c.id == foodProvider.selectedCategoryId,
                      orElse: () => Category(
                        id: '',
                        name: 'Category',
                        iconUrl: '',
                      ),
                    );

                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '${selectedCat.name} (${categoryFoods.length})',
                              style: TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.bold,
                                color: isDark
                                    ? AppColors.darkText
                                    : AppColors.text,
                              ),
                            ),
                            TextButton.icon(
                              onPressed: () => foodProvider.selectCategory(''),
                              icon: const Icon(Icons.clear_rounded, size: 16),
                              label: const Text(
                                'Show All',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              style: TextButton.styleFrom(
                                foregroundColor: AppColors.primary,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 14),
                        if (categoryFoods.isEmpty)
                          EmptyStateWidget(
                            icon: Icons.fastfood_outlined,
                            title: 'No Dishes in ${selectedCat.name}',
                            description:
                                'There are no dishes currently available in this category.',
                            buttonText: 'Show All Dishes',
                            onButtonPressed: () =>
                                foodProvider.selectCategory(''),
                          )
                        else
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: categoryFoods.length,
                            itemBuilder: (context, index) {
                              return FoodCard(
                                food: categoryFoods[index],
                                isHorizontal: true,
                                heroTag: 'home_cat_${categoryFoods[index].id}',
                              );
                            },
                          ),
                      ],
                    );
                  }

                  // 3. Default state ("All" is selected) -> Popular Dishes + Chef Recommended
                  final popularFoods = foodProvider.popularFoods;
                  final recFoods = foodProvider.recommendedFoods;

                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Popular Dishes 🔥',
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                          color: isDark ? AppColors.darkText : AppColors.text,
                        ),
                      ),
                      const SizedBox(height: 14),
                      SizedBox(
                        height: 230,
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: popularFoods.length,
                          itemBuilder: (context, index) {
                            return FoodCard(
                              food: popularFoods[index],
                              heroTag: 'popular_${popularFoods[index].id}',
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 24),
                      Text(
                        'Chef Recommended 👨‍🍳',
                        style: TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                          color: isDark ? AppColors.darkText : AppColors.text,
                        ),
                      ),
                      const SizedBox(height: 14),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: recFoods.length,
                        itemBuilder: (context, index) {
                          return FoodCard(
                            food: recFoods[index],
                            isHorizontal: true,
                            heroTag: 'rec_${recFoods[index].id}',
                          );
                        },
                      ),
                    ],
                  );
                },
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
