import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/food_provider.dart';
import '../widgets/food_card.dart';
import '../widgets/category_card.dart';
import '../widgets/cart_icon_badge.dart';
import '../widgets/empty_state_widget.dart';
import 'cart_screen.dart';

class MenuScreen extends StatelessWidget {
  const MenuScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final foodProvider = context.watch<FoodProvider>();
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Our Menu'),
        actions: [
          IconButton(
            icon: const CartIconBadge(size: 22),
            tooltip: 'My Cart',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const CartScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.tune_rounded),
            tooltip: 'Filter & Sort',
            onPressed: () => _showSortModal(context, foodProvider),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Search Input Bar
          Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppConstants.padding,
              vertical: 8,
            ),
            child: Container(
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
            ),
          ),

          // Categories Horizontal Bar
          SizedBox(
            height: 48,
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(
                horizontal: AppConstants.padding,
                vertical: 4,
              ),
              scrollDirection: Axis.horizontal,
              itemCount: foodProvider.categories.length + 1,
              itemBuilder: (context, index) {
                if (index == 0) {
                  final isAllSelected = foodProvider.selectedCategoryId.isEmpty;
                  return GestureDetector(
                    onTap: () => foodProvider.selectCategory(''),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      margin: const EdgeInsets.only(right: 12),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 18,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: isAllSelected
                            ? AppColors.primary
                            : (isDark ? AppColors.darkCard : AppColors.white),
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: isAllSelected ? AppShadows.primary : null,
                      ),
                      child: Center(
                        child: Text(
                          'All Items',
                          style: TextStyle(
                            fontWeight: isAllSelected
                                ? FontWeight.w700
                                : FontWeight.w600,
                            fontSize: 13,
                            color: isAllSelected
                                ? Colors.white
                                : (isDark
                                      ? AppColors.darkText
                                      : AppColors.text),
                          ),
                        ),
                      ),
                    ),
                  );
                }

                final category = foodProvider.categories[index - 1];
                return CategoryCard(
                  category: category,
                  isSelected: foodProvider.selectedCategoryId == category.id,
                  onTap: () => foodProvider.selectCategory(category.id),
                );
              },
            ),
          ),

          // Search Results Count & Active Filter Indicator
          Padding(
            padding: const EdgeInsets.fromLTRB(
              AppConstants.padding,
              12,
              AppConstants.padding,
              8,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  foodProvider.searchQuery.isNotEmpty
                      ? '${foodProvider.searchResultCount} results for "${foodProvider.searchQuery}"'
                      : '${foodProvider.searchResultCount} dishes available',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: isDark
                        ? AppColors.darkSecondaryText
                        : AppColors.secondaryText,
                  ),
                ),
                GestureDetector(
                  onTap: () => _showSortModal(context, foodProvider),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        _getSortLabel(foodProvider.sortOption),
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: AppColors.primary,
                        ),
                      ),
                      const Icon(
                        Icons.arrow_drop_down_rounded,
                        color: AppColors.primary,
                        size: 18,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Grid of Foods or Empty State
          Expanded(
            child: foodProvider.foods.isEmpty
                ? EmptyStateWidget(
                    icon: Icons.search_off_rounded,
                    title: 'No Dishes Found',
                    description:
                        'We couldn\'t find any meals matching your current search or category filter.',
                    buttonText: 'Reset Filters',
                    onButtonPressed: () {
                      foodProvider.clearSearch();
                      foodProvider.selectCategory('');
                    },
                  )
                : GridView.builder(
                    padding: const EdgeInsets.all(AppConstants.padding),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.78,
                          crossAxisSpacing: 14,
                          mainAxisSpacing: 14,
                        ),
                    itemCount: foodProvider.foods.length,
                    itemBuilder: (context, index) {
                      final food = foodProvider.foods[index];
                      return FoodCard(
                        food: food,
                        margin: EdgeInsets.zero,
                        heroTag: 'menu_${food.id}',
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  String _getSortLabel(FoodSortOption option) {
    switch (option) {
      case FoodSortOption.popular:
        return 'Popular';
      case FoodSortOption.rating:
        return 'Highest Rated';
      case FoodSortOption.priceLowHigh:
        return 'Price: Low to High';
      case FoodSortOption.priceHighLow:
        return 'Price: High to Low';
    }
  }

  void _showSortModal(BuildContext context, FoodProvider provider) {
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
              const Text(
                'Sort Dishes By',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              ...FoodSortOption.values.map((opt) {
                final isSelected = provider.sortOption == opt;
                return ListTile(
                  title: Text(
                    _getSortLabel(opt),
                    style: TextStyle(
                      fontWeight: isSelected
                          ? FontWeight.bold
                          : FontWeight.normal,
                    ),
                  ),
                  trailing: isSelected
                      ? const Icon(
                          Icons.check_rounded,
                          color: AppColors.primary,
                        )
                      : null,
                  onTap: () {
                    provider.setSortOption(opt);
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
