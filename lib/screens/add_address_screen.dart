import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';
import '../core/constants.dart';
import '../models/address.dart';
import '../providers/address_provider.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_text_field.dart';

class AddAddressScreen extends StatefulWidget {
  final Address? addressToEdit;

  const AddAddressScreen({Key? key, this.addressToEdit}) : super(key: key);

  @override
  State<AddAddressScreen> createState() => _AddAddressScreenState();
}

class _AddAddressScreenState extends State<AddAddressScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _titleController;
  late final TextEditingController _addressController;
  late final TextEditingController _cityController;
  late final TextEditingController _phoneController;
  bool _isDefault = false;
  String _selectedType = 'Home';

  @override
  void initState() {
    super.initState();
    final edit = widget.addressToEdit;
    _titleController = TextEditingController(text: edit?.title ?? 'Home');
    _addressController = TextEditingController(text: edit?.fullAddress ?? '');
    _cityController = TextEditingController(
      text: edit?.city ?? 'Dhaka, Bangladesh',
    );
    _phoneController = TextEditingController(
      text: edit?.phone ?? '+880 1712 345678',
    );
    _isDefault = edit?.isDefault ?? false;
    _selectedType = edit != null ? edit.title : 'Home';
  }

  @override
  void dispose() {
    _titleController.dispose();
    _addressController.dispose();
    _cityController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _saveAddress() {
    if (_formKey.currentState!.validate()) {
      final provider = context.read<AddressProvider>();

      if (widget.addressToEdit != null) {
        final updated = widget.addressToEdit!.copyWith(
          title: _titleController.text.trim(),
          fullAddress: _addressController.text.trim(),
          city: _cityController.text.trim(),
          phone: _phoneController.text.trim(),
          isDefault: _isDefault,
        );
        provider.updateAddress(updated);
      } else {
        final newAddress = Address(
          id: const Uuid().v4(),
          title: _titleController.text.trim(),
          fullAddress: _addressController.text.trim(),
          city: _cityController.text.trim(),
          phone: _phoneController.text.trim(),
          isDefault: _isDefault,
        );
        provider.addAddress(newAddress);
      }

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            widget.addressToEdit != null
                ? 'Address updated!'
                : 'Address added successfully!',
          ),
          behavior: SnackBarBehavior.floating,
          backgroundColor: AppColors.success,
        ),
      );

      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.addressToEdit != null ? 'Edit Address' : 'Add New Address',
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.paddingLarge),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Address Type',
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                  color: isDark ? AppColors.darkText : AppColors.text,
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: ['Home', 'Work', 'Other'].map((type) {
                  final isSelected = _selectedType == type;
                  return Padding(
                    padding: const EdgeInsets.only(right: 12.0),
                    child: ChoiceChip(
                      label: Text(type),
                      selected: isSelected,
                      selectedColor: AppColors.primary,
                      labelStyle: TextStyle(
                        color: isSelected
                            ? Colors.white
                            : (isDark ? AppColors.darkText : AppColors.text),
                        fontWeight: FontWeight.w600,
                      ),
                      onSelected: (selected) {
                        if (selected) {
                          setState(() {
                            _selectedType = type;
                            _titleController.text = type;
                          });
                        }
                      },
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 20),
              CustomTextField(
                label: 'Label / Name',
                hint: 'e.g. Home, Office, Vacation House',
                prefixIcon: Icons.label_outline_rounded,
                controller: _titleController,
                validator: (val) =>
                    val == null || val.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 20),
              CustomTextField(
                label: 'Full Street Address',
                hint: 'e.g. 123 Main Street, Apt 4B',
                prefixIcon: Icons.location_on_rounded,
                controller: _addressController,
                maxLines: 2,
                validator: (val) =>
                    val == null || val.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 20),
              CustomTextField(
                label: 'City / Area',
                hint: 'e.g. Dhaka, Bangladesh',
                prefixIcon: Icons.location_city_rounded,
                controller: _cityController,
                validator: (val) =>
                    val == null || val.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 20),
              CustomTextField(
                label: 'Phone Number',
                hint: 'Contact number for courier',
                prefixIcon: Icons.phone_rounded,
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                validator: (val) =>
                    val == null || val.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Checkbox(
                    value: _isDefault,
                    activeColor: AppColors.primary,
                    onChanged: (val) =>
                        setState(() => _isDefault = val ?? false),
                  ),
                  Text(
                    'Set as default delivery address',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: isDark ? AppColors.darkText : AppColors.text,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),
              CustomButton(
                text: widget.addressToEdit != null
                    ? 'Update Address'
                    : 'Save Address',
                onPressed: _saveAddress,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
