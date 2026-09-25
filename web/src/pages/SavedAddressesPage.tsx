import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Home,
  Briefcase
} from 'lucide-react';
import { useAddress } from '../context/AddressContext';

export const SavedAddressesPage: React.FC = () => {
  const navigate = useNavigate();
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useAddress();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState('Home');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('Dhaka, Bangladesh');
  const [phone, setPhone] = useState('+880 1712 345678');
  const [isDefault, setIsDefault] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullAddress.trim()) return;

    addAddress(title, fullAddress, city, phone, isDefault);
    setShowAddModal(false);
    setFullAddress('');
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              type="button"
              className="p-2 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark hover:text-primary shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-txt-light dark:text-txt-dark">
              Saved Addresses
            </h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-button bg-primary text-white text-xs font-bold shadow-primary-glow hover:bg-primary-dark transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>

        {/* Address Cards */}
        <div className="space-y-3.5">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 bg-card-light dark:bg-card-dark rounded-card border shadow-soft-light dark:shadow-soft-dark transition-all ${
                addr.isDefault
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-neutral-100 dark:border-neutral-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-full bg-orange-50 dark:bg-neutral-800 text-primary">
                    {addr.title.toLowerCase().includes('work') ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <Home className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-txt-light dark:text-txt-dark">
                        {addr.title}
                      </h4>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-txt-muted dark:text-txt-mutedDark mt-0.5">
                      {addr.fullAddress}, {addr.city}
                    </p>
                    <p className="text-xs text-txt-muted dark:text-txt-mutedDark font-medium mt-0.5">
                      Phone: {addr.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      type="button"
                      className="px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-orange-50 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    >
                      Make Default
                    </button>
                  )}
                  {addresses.length > 1 && (
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      type="button"
                      className="p-1.5 text-neutral-400 hover:text-semantic-error rounded-md transition-colors"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card-light dark:bg-card-dark rounded-card p-6 border border-border-light dark:border-border-dark shadow-dropdown animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-txt-light dark:text-txt-dark mb-4">
              Add New Address
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                  Address Label (e.g. Home, Work, Gym)
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                  Full Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 45, Road 11, Block D"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                  City & Country
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-txt-muted dark:text-txt-mutedDark mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="setDefAddr"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
                />
                <label htmlFor="setDefAddr" className="text-xs font-semibold text-txt-light dark:text-txt-dark cursor-pointer">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  type="button"
                  className="flex-1 py-2.5 rounded-button bg-neutral-100 dark:bg-neutral-800 text-txt-light dark:text-txt-dark font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-button bg-primary text-white font-bold text-xs shadow-primary-glow hover:bg-primary-dark"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
