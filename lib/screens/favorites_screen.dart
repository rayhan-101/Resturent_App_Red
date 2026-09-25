import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/constants.dart';
import '../providers/food_provider.dart';
import '../widgets/empty_state_widget.dart';
import '../widgets/food_card.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Favorite Dishes'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Consumer<FoodProvider>(
        builder: (context, foodProvider, child) {
          final favorites = foodProvider.favoriteFoods;

          if (favorites.isEmpty) {
            return EmptyStateWidget(
              icon: Icons.favorite_border_rounded,
              title: 'No Favorites Saved',
              description:
                  'You haven\'t added any dishes to your favorites yet. Browse the menu and tap the heart icon on any dish you love.',
              buttonText: 'Browse Menu',
              onButtonPressed: () => Navigator.pop(context),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(AppConstants.padding),
            itemCount: favorites.length,
            itemBuilder: (context, index) {
              final food = favorites[index];
              return FoodCard(
                food: food,
                isHorizontal: true,
                heroTag: 'fav_${food.id}',
              );
            },
          );
        },
      ),
    );
  }
}
