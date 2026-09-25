import 'package:flutter/foundation.dart';
import '../models/payment_method.dart';
import '../data/mock_data.dart';

class PaymentProvider with ChangeNotifier {
  final List<PaymentCard> _cards = List.from(MockData.paymentCards);
  String? _selectedCardId;
  String _paymentType = 'card'; // 'card' or 'cod'

  List<PaymentCard> get cards => _cards;
  String get paymentType => _paymentType;

  PaymentCard? get defaultCard {
    try {
      return _cards.firstWhere((c) => c.isDefault);
    } catch (_) {
      return _cards.isNotEmpty ? _cards.first : null;
    }
  }

  PaymentCard? get selectedCard {
    if (_selectedCardId != null) {
      try {
        return _cards.firstWhere((c) => c.id == _selectedCardId);
      } catch (_) {}
    }
    return defaultCard;
  }

  void selectPaymentType(String type) {
    _paymentType = type;
    notifyListeners();
  }

  void selectCard(String id) {
    _selectedCardId = id;
    _paymentType = 'card';
    notifyListeners();
  }

  void addCard(PaymentCard card) {
    if (card.isDefault) {
      for (int i = 0; i < _cards.length; i++) {
        _cards[i] = _cards[i].copyWith(isDefault: false);
      }
    }
    _cards.add(card);
    _selectedCardId = card.id;
    notifyListeners();
  }

  void deleteCard(String id) {
    _cards.removeWhere((c) => c.id == id);
    if (_selectedCardId == id) {
      _selectedCardId = null;
    }
    notifyListeners();
  }

  void setDefault(String id) {
    for (int i = 0; i < _cards.length; i++) {
      _cards[i] = _cards[i].copyWith(isDefault: _cards[i].id == id);
    }
    notifyListeners();
  }
}
