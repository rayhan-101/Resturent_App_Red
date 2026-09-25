import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Check, User, Mail, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, email, phone);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/profile')}
            type="button"
            className="p-2 rounded-full bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-txt-light dark:text-txt-dark hover:text-primary shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-black text-txt-light dark:text-txt-dark">
            Edit Profile
          </h1>
        </div>

        {/* Profile Photo with Edit Badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={
                currentUser?.profileImageUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-md"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-primary-glow hover:bg-primary-dark transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-txt-muted dark:text-txt-mutedDark mt-2">
            Tap to change photo
          </span>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-input bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-txt-light dark:text-txt-dark focus:border-primary outline-none shadow-sm"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-input bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-txt-light dark:text-txt-dark focus:border-primary outline-none shadow-sm"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-input bg-card-light dark:bg-card-dark border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-txt-light dark:text-txt-dark focus:border-primary outline-none shadow-sm"
              />
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full mt-6 py-3.5 rounded-button font-black text-xs sm:text-sm text-white shadow-primary-glow flex items-center justify-center gap-2 active:scale-95 transition-all ${
              isSaved ? 'bg-semantic-success' : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Profile Updated!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
