// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:provider/provider.dart';
import 'package:foodie_restaurant/providers/settings_provider.dart';
import 'package:foodie_restaurant/providers/auth_provider.dart';
import 'package:foodie_restaurant/screens/splash_screen.dart';
import 'package:foodie_restaurant/core/constants.dart';

void main() {
  testWidgets('Splash screen smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => SettingsProvider()),
          ChangeNotifierProvider(create: (_) => AuthProvider()),
        ],
        child: const MaterialApp(
          home: SplashScreen(),
        ),
      ),
    );

    expect(find.text(AppConstants.appName), findsOneWidget);
    expect(find.byIcon(Icons.restaurant_rounded), findsOneWidget);
    expect(find.byType(CircularProgressIndicator), findsOneWidget);

    // Pump frames for animation
    await tester.pump(const Duration(milliseconds: 700));
    expect(find.text(AppConstants.appName), findsOneWidget);
  });
}
