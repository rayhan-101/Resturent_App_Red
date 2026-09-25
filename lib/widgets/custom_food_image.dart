import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../core/constants.dart';

class CustomFoodImage extends StatelessWidget {
  final String imageUrl;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;
  final String? heroTag;

  const CustomFoodImage({
    super.key,
    required this.imageUrl,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.heroTag,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    Widget imageWidget;

    if (imageUrl.trim().isEmpty) {
      imageWidget = _buildFallback(isDark);
    } else {
      imageWidget = CachedNetworkImage(
        imageUrl: imageUrl,
        width: width,
        height: height,
        fit: fit,
        placeholder: (context, url) => Container(
          width: width,
          height: height,
          color: isDark ? AppColors.darkSurface : const Color(0xFFF3F4F6),
          child: Center(
            child: SizedBox(
              width: 22,
              height: 22,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                color: AppColors.primary.withValues(alpha: 0.7),
              ),
            ),
          ),
        ),
        errorWidget: (context, url, error) => _buildFallback(isDark),
      );
    }

    if (borderRadius != null) {
      imageWidget = ClipRRect(
        borderRadius: borderRadius!,
        child: imageWidget,
      );
    }

    if (heroTag != null && heroTag!.isNotEmpty) {
      imageWidget = Hero(
        tag: heroTag!,
        child: imageWidget,
      );
    }

    return imageWidget;
  }

  Widget _buildFallback(bool isDark) {
    return Container(
      width: width,
      height: height,
      color: isDark ? AppColors.darkSurface : const Color(0xFFF8F5F2),
      child: Center(
        child: Icon(
          Icons.restaurant_rounded,
          size: (width != null && height != null)
              ? (width! < height! ? width! * 0.38 : height! * 0.38).clamp(16.0, 48.0)
              : 32.0,
          color: AppColors.primary.withValues(alpha: 0.45),
        ),
      ),
    );
  }
}
