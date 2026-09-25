class FoodAddOn {
  final String id;
  final String name;
  final double price;
  bool isSelected;

  FoodAddOn({
    required this.id,
    required this.name,
    required this.price,
    this.isSelected = false,
  });

  FoodAddOn copyWith({bool? isSelected}) {
    return FoodAddOn(
      id: id,
      name: name,
      price: price,
      isSelected: isSelected ?? this.isSelected,
    );
  }
}

class Food {
  final String id;
  final String name;
  final String description;
  final double price;
  final String imageUrl;
  final double rating;
  final int reviews;
  final String categoryId;
  final List<String> ingredients;
  final List<FoodAddOn> addOns;
  final String prepTime;
  final int calories;
  bool isFavorite;

  Food({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
    required this.rating,
    required this.reviews,
    required this.categoryId,
    required this.ingredients,
    List<FoodAddOn>? addOns,
    this.prepTime = '15-20 min',
    this.calories = 420,
    this.isFavorite = false,
  }) : addOns = addOns ?? [];
}
