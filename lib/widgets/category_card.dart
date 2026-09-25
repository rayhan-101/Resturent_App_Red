import 'package:flutter/material.dart';
import '../core/constants.dart';
import '../models/category.dart';

class CategoryCard extends StatelessWidget {
  final Category category;
  final bool isSelected;
  final VoidCallback onTap;

  const CategoryCard({
    Key? key,
    required this.category,
    required this.isSelected,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        margin: const EdgeInsets.only(right: 12),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primary
              : (isDark ? AppColors.darkCard : AppColors.white),
          borderRadius: BorderRadius.circular(30),
          boxShadow: isSelected
              ? AppShadows.primary
              : [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.04),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            _getCategoryIcon(isDark),
            const SizedBox(width: 8),
            Text(
              category.name,
              style: TextStyle(
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w600,
                fontSize: 13,
                color: isSelected
                    ? AppColors.white
                    : (isDark ? AppColors.darkText : AppColors.text),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _getCategoryIcon(bool isDark) {
    IconData iconData;
    switch (category.name.toLowerCase()) {
      case 'burgers':
        iconData = Icons.lunch_dining_rounded;
        break;
      case 'pizza':
        iconData = Icons.local_pizza_rounded;
        break;
      case 'chicken':
        iconData = Icons.dinner_dining_rounded;
        break;
      case 'pasta':
        iconData = Icons.ramen_dining_rounded;
        break;
      case 'desserts':
        iconData = Icons.icecream_rounded;
        break;
      case 'drinks':
        iconData = Icons.local_cafe_rounded;
        break;
      default:
        iconData = Icons.fastfood_rounded;
    }

    return Container(
      padding: const EdgeInsets.all(6),
      decoration: BoxDecoration(
        color: isSelected
            ? AppColors.white
            : (isDark ? AppColors.darkBackground : AppColors.background),
        shape: BoxShape.circle,
      ),
      child: Icon(
        iconData,
        size: 18,
        color: isSelected
            ? AppColors.primary
            : (isDark ? AppColors.darkText : AppColors.text),
      ),
    );
  }
}
