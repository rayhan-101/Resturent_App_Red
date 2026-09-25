import 'package:flutter/foundation.dart' hide Category;
import '../models/food.dart';
import '../models/category.dart';
import '../data/mock_data.dart';

enum FoodSortOption { popular, rating, priceLowHigh, priceHighLow }

class FoodProvider with ChangeNotifier {
  List<Food> _foods = [];
  List<Category> _categories = [];
  String _searchQuery = '';
  String _selectedCategoryId = '';
  FoodSortOption _sortOption = FoodSortOption.popular;

  FoodProvider() {
    _foods = List.from(MockData.foods);
    _categories = List.from(MockData.categories);
  }

  String get searchQuery => _searchQuery;
  String get selectedCategoryId => _selectedCategoryId;
  FoodSortOption get sortOption => _sortOption;
  List<Category> get categories => _categories;

  List<Food> get foods {
    List<Food> filtered = List.from(_foods);

    if (_searchQuery.trim().isNotEmpty) {
      final query = _searchQuery.toLowerCase().trim();
      filtered = filtered.where((f) {
        final matchesName = f.name.toLowerCase().contains(query);
        final matchesDesc = f.description.toLowerCase().contains(query);
        final matchesIngredient = f.ingredients.any(
          (i) => i.toLowerCase().contains(query),
        );
        return matchesName || matchesDesc || matchesIngredient;
      }).toList();
    }

    if (_selectedCategoryId.isNotEmpty) {
      filtered = filtered
          .where((f) => f.categoryId == _selectedCategoryId)
          .toList();
    }

    switch (_sortOption) {
      case FoodSortOption.rating:
        filtered.sort((a, b) => b.rating.compareTo(a.rating));
        break;
      case FoodSortOption.priceLowHigh:
        filtered.sort((a, b) => a.price.compareTo(b.price));
        break;
      case FoodSortOption.priceHighLow:
        filtered.sort((a, b) => b.price.compareTo(a.price));
        break;
      case FoodSortOption.popular:
        // Default order
        break;
    }

    return filtered;
  }

  int get searchResultCount => foods.length;

  List<Food> get popularFoods {
    final sorted = List<Food>.from(_foods)
      ..sort((a, b) => b.rating.compareTo(a.rating));
    return sorted.take(5).toList();
  }

  List<Food> get recommendedFoods {
    final sorted = List<Food>.from(_foods)
      ..sort((a, b) => b.reviews.compareTo(a.reviews));
    return sorted.take(5).toList();
  }

  List<Food> get favoriteFoods {
    return _foods.where((f) => f.isFavorite).toList();
  }

  void toggleFavorite(String foodId) {
    final index = _foods.indexWhere((f) => f.id == foodId);
    if (index >= 0) {
      _foods[index].isFavorite = !_foods[index].isFavorite;
      notifyListeners();
    }
  }

  void search(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void clearSearch() {
    _searchQuery = '';
    notifyListeners();
  }

  void selectCategory(String categoryId) {
    if (_selectedCategoryId == categoryId) {
      _selectedCategoryId = ''; // deselect
    } else {
      _selectedCategoryId = categoryId;
    }
    notifyListeners();
  }

  void setSortOption(FoodSortOption option) {
    _sortOption = option;
    notifyListeners();
  }

  Food getFoodById(String id) {
    return _foods.firstWhere((f) => f.id == id, orElse: () => _foods.first);
  }
}
