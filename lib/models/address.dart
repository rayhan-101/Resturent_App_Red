class Address {
  final String id;
  final String title;
  final String fullAddress;
  final String city;
  final String phone;
  final bool isDefault;

  Address({
    required this.id,
    required this.title,
    required this.fullAddress,
    this.city = 'Dhaka, Bangladesh',
    this.phone = '+880 1712 345678',
    this.isDefault = false,
  });

  Address copyWith({
    String? id,
    String? title,
    String? fullAddress,
    String? city,
    String? phone,
    bool? isDefault,
  }) {
    return Address(
      id: id ?? this.id,
      title: title ?? this.title,
      fullAddress: fullAddress ?? this.fullAddress,
      city: city ?? this.city,
      phone: phone ?? this.phone,
      isDefault: isDefault ?? this.isDefault,
    );
  }
}
