class PaymentCard {
  final String id;
  final String cardHolder;
  final String cardNumber;
  final String expiryDate;
  final String cardType;
  final bool isDefault;

  PaymentCard({
    required this.id,
    required this.cardHolder,
    required this.cardNumber,
    required this.expiryDate,
    required this.cardType,
    this.isDefault = false,
  });

  String get lastFour {
    final clean = cardNumber.replaceAll(' ', '');
    if (clean.length >= 4) {
      return clean.substring(clean.length - 4);
    }
    return clean;
  }

  String get maskedNumber {
    return '•••• •••• •••• $lastFour';
  }

  PaymentCard copyWith({
    String? id,
    String? cardHolder,
    String? cardNumber,
    String? expiryDate,
    String? cardType,
    bool? isDefault,
  }) {
    return PaymentCard(
      id: id ?? this.id,
      cardHolder: cardHolder ?? this.cardHolder,
      cardNumber: cardNumber ?? this.cardNumber,
      expiryDate: expiryDate ?? this.expiryDate,
      cardType: cardType ?? this.cardType,
      isDefault: isDefault ?? this.isDefault,
    );
  }
}
