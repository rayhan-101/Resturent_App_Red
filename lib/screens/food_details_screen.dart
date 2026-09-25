import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/food_provider.dart';
import '../providers/cart_provider.dart';
import '../widgets/quantity_selector.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_food_image.dart';

class FoodDetailsScreen extends StatefulWidget {
  final String foodId;
  final String? heroTag;

  const FoodDetailsScreen({Key? key, required this.foodId, this.heroTag})
    : super(key: key);

  @override
  State<FoodDetailsScreen> createState() => _FoodDetailsScreenState();
}

class _FoodDetailsScreenState extends State<FoodDetailsScreen> {
  int _quantity = 1;
  final _instructionsController = TextEditingController();
  final Set<String> _selectedAddOnIds = {};

  @override
  void dispose() {
    _instructionsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final food = context.watch<FoodProvider>().getFoodById(widget.foodId);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final selectedAddOns = food.addOns
        .where((a) => _selectedAddOnIds.contains(a.id))
        .toList();
    final addOnsTotal = selectedAddOns.fold(0.0, (sum, a) => sum + a.price);
    final unitPrice = food.price + addOnsTotal;
    final totalPrice = unitPrice * _quantity;

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: CircleAvatar(
                backgroundColor: (isDark ? Colors.black : Colors.white)
                    .withValues(alpha: 0.85),
                child: IconButton(
                  icon: Icon(
                    Icons.arrow_back_rounded,
                    color: isDark ? Colors.white : AppColors.text,
                    size: 20,
                  ),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: CustomFoodImage(
                imageUrl: food.imageUrl,
                heroTag: widget.heroTag ?? 'food_image_${food.id}',
                fit: BoxFit.cover,
              ),
            ),
            actions: [
              Consumer<FoodProvider>(
                builder: (context, provider, child) {
                  return Padding(
                    padding: const EdgeInsets.only(right: 12.0),
                    child: CircleAvatar(
                      backgroundColor: (isDark ? Colors.black : Colors.white)
                          .withValues(alpha: 0.85),
                      child: IconButton(
                        icon: Icon(
                          food.isFavorite
                              ? Icons.favorite_rounded
                              : Icons.favorite_border_rounded,
                          color: food.isFavorite
                              ? AppColors.error
                              : (isDark ? Colors.white : AppColors.text),
                          size: 20,
                        ),
                        onPressed: () => provider.toggleFavorite(food.id),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.paddingLarge),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title & Base Price
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Text(
                          food.name,
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w800,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        '\$${food.price.toStringAsFixed(2)}',
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          color: AppColors.primary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Rating & Quick Info Badges
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.amber.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(
                              Icons.star_rounded,
                              color: Colors.amber,
                              size: 16,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '${food.rating}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '(${food.reviews} reviews)',
                        style: TextStyle(
                          color: isDark
                              ? AppColors.darkSecondaryText
                              : AppColors.secondaryText,
                          fontSize: 12,
                        ),
                      ),
                      const Spacer(),
                      _buildChip(
                        Icons.access_time_rounded,
                        food.prepTime,
                        isDark,
                      ),
                      const SizedBox(width: 8),
                      _buildChip(
                        Icons.local_fire_department_rounded,
                        '${food.calories} kcal',
                        isDark,
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Description
                  Text(
                    'Description',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.darkText : AppColors.text,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    food.description,
                    style: TextStyle(
                      color: isDark
                          ? AppColors.darkSecondaryText
                          : AppColors.secondaryText,
                      height: 1.6,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Ingredients
                  Text(
                    'Key Ingredients',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.darkText : AppColors.text,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: food.ingredients.map((ingredient) {
                      return Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: isDark ? AppColors.darkCard : AppColors.white,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isDark
                                ? AppColors.darkDivider
                                : Colors.grey.withValues(alpha: 0.2),
                          ),
                        ),
                        child: Text(
                          ingredient,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 24),

                  // Optional Add-ons
                  if (food.addOns.isNotEmpty) ...[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Customize with Add-ons',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppColors.darkText : AppColors.text,
                          ),
                        ),
                        Text(
                          'Optional',
                          style: TextStyle(
                            fontSize: 12,
                            color: isDark
                                ? AppColors.darkSecondaryText
                                : AppColors.secondaryText,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Container(
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkCard : AppColors.white,
                        borderRadius: BorderRadius.circular(
                          AppConstants.cardRadius,
                        ),
                        border: Border.all(
                          color: Colors.grey.withValues(alpha: 0.12),
                        ),
                        boxShadow: AppShadows.soft(context),
                      ),
                      child: Column(
                        children: food.addOns.map((addOn) {
                          final isSelected = _selectedAddOnIds.contains(
                            addOn.id,
                          );
                          return CheckboxListTile(
                            value: isSelected,
                            activeColor: AppColors.primary,
                            title: Text(
                              addOn.name,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: isSelected
                                    ? FontWeight.bold
                                    : FontWeight.w500,
                                color: isDark
                                    ? AppColors.darkText
                                    : AppColors.text,
                              ),
                            ),
                            secondary: Text(
                              '+\$${addOn.price.toStringAsFixed(2)}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: AppColors.primary,
                                fontSize: 13,
                              ),
                            ),
                            onChanged: (bool? val) {
                              setState(() {
                                if (val == true) {
                                  _selectedAddOnIds.add(addOn.id);
                                } else {
                                  _selectedAddOnIds.remove(addOn.id);
                                }
                              });
                            },
                          );
                        }).toList(),
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],

                  // Special instructions
                  Text(
                    'Special Instructions',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.darkText : AppColors.text,
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _instructionsController,
                    maxLines: 2,
                    decoration: InputDecoration(
                      hintText:
                          'e.g. Extra spicy, sauce on the side, no onions...',
                      prefixIcon: const Icon(Icons.note_alt_outlined, size: 20),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(
                          AppConstants.borderRadius,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 120,
                  ), // Bottom padding for sticky sheet
                ],
              ),
            ),
          ),
        ],
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.all(AppConstants.padding),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.white,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.08),
              blurRadius: 16,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: SafeArea(
          child: Row(
            children: [
              QuantitySelector(
                quantity: _quantity,
                onIncrement: () => setState(() => _quantity++),
                onDecrement: () => setState(() {
                  if (_quantity > 1) _quantity--;
                }),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: CustomButton(
                  text: 'Add • \$${totalPrice.toStringAsFixed(2)}',
                  icon: Icons.shopping_bag_rounded,
                  onPressed: () {
                    context.read<CartProvider>().addItem(
                      food,
                      _quantity,
                      specialInstructions: _instructionsController.text.trim(),
                      selectedAddOns: selectedAddOns,
                    );
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).hideCurrentSnackBar();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Row(
                          children: [
                            const Icon(
                              Icons.check_circle_rounded,
                              color: Colors.white,
                              size: 20,
                            ),
                            const SizedBox(width: 8),
                            Text('$_quantity x ${food.name} added to cart'),
                          ],
                        ),
                        behavior: SnackBarBehavior.floating,
                        backgroundColor: AppColors.primary,
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildChip(IconData icon, String text, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkSurface : Colors.grey[100],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: AppColors.primary),
          const SizedBox(width: 4),
          Text(
            text,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: isDark ? AppColors.darkText : AppColors.text,
            ),
          ),
        ],
      ),
    );
  }
}
