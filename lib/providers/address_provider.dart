import 'package:flutter/foundation.dart';
import '../models/address.dart';
import '../data/mock_data.dart';

class AddressProvider with ChangeNotifier {
  final List<Address> _addresses = List.from(MockData.addresses);
  String? _selectedAddressId;

  List<Address> get addresses => _addresses;

  Address? get defaultAddress {
    try {
      return _addresses.firstWhere((a) => a.isDefault);
    } catch (_) {
      return _addresses.isNotEmpty ? _addresses.first : null;
    }
  }

  Address? get selectedAddress {
    if (_selectedAddressId != null) {
      try {
        return _addresses.firstWhere((a) => a.id == _selectedAddressId);
      } catch (_) {}
    }
    return defaultAddress;
  }

  void selectAddress(String id) {
    _selectedAddressId = id;
    notifyListeners();
  }

  void addAddress(Address address) {
    if (address.isDefault) {
      for (int i = 0; i < _addresses.length; i++) {
        _addresses[i] = _addresses[i].copyWith(isDefault: false);
      }
    }
    _addresses.add(address);
    _selectedAddressId = address.id;
    notifyListeners();
  }

  void updateAddress(Address updated) {
    final index = _addresses.indexWhere((a) => a.id == updated.id);
    if (index != -1) {
      if (updated.isDefault) {
        for (int i = 0; i < _addresses.length; i++) {
          _addresses[i] = _addresses[i].copyWith(isDefault: false);
        }
      }
      _addresses[index] = updated;
      notifyListeners();
    }
  }

  void deleteAddress(String id) {
    _addresses.removeWhere((a) => a.id == id);
    if (_selectedAddressId == id) {
      _selectedAddressId = null;
    }
    notifyListeners();
  }

  void setDefault(String id) {
    for (int i = 0; i < _addresses.length; i++) {
      _addresses[i] = _addresses[i].copyWith(isDefault: _addresses[i].id == id);
    }
    notifyListeners();
  }
}
