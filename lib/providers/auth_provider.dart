import 'package:flutter/foundation.dart';
import '../models/user.dart';
import '../data/mock_data.dart';

class AuthProvider with ChangeNotifier {
  User? _currentUser = MockData.currentUser;
  bool _isLoading = false;

  User? get currentUser => _currentUser;
  bool get isAuthenticated => _currentUser != null;
  bool get isLoading => _isLoading;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 800));

    _isLoading = false;

    if (email.isNotEmpty && password.isNotEmpty) {
      _currentUser = MockData.currentUser;
      notifyListeners();
      return true;
    }

    notifyListeners();
    return false;
  }

  Future<bool> signUp(
    String name,
    String email,
    String phone,
    String password,
  ) async {
    _isLoading = true;
    notifyListeners();

    await Future.delayed(const Duration(milliseconds: 800));

    _isLoading = false;

    if (name.isNotEmpty && email.isNotEmpty && password.isNotEmpty) {
      _currentUser = User(
        id: 'u_${DateTime.now().millisecondsSinceEpoch}',
        name: name,
        email: email,
        phone: phone,
        profileImageUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      );
      notifyListeners();
      return true;
    }

    notifyListeners();
    return false;
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }

  void updateProfile({
    required String name,
    required String email,
    required String phone,
    String? profileImageUrl,
  }) {
    if (_currentUser != null) {
      _currentUser = User(
        id: _currentUser!.id,
        name: name,
        email: email,
        phone: phone,
        profileImageUrl: profileImageUrl ?? _currentUser!.profileImageUrl,
      );
      notifyListeners();
    }
  }
}
