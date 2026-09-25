import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  UtensilsCrossed,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);
    await signup(name, email, phone, password);
    setIsLoading(false);
    navigate('/home', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#FFF9F5] to-orange-50/40 dark:from-[#141416] dark:to-[#1a1412]">
      <div className="w-full max-w-md bg-card-light dark:bg-card-dark rounded-card p-6 sm:p-8 border border-neutral-100 dark:border-neutral-800 shadow-dropdown">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-primary-glow mb-3">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-txt-light dark:text-txt-dark">
            Create an <span className="text-primary">Account</span>
          </h1>
          <p className="text-xs text-txt-muted dark:text-txt-mutedDark mt-1">
            Join Foodie Restaurant for delicious food delivery
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-input bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-semantic-error text-xs font-bold">
            {errorMsg}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 890"
                className="w-full pl-10 pr-4 py-2.5 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3.5 top-3 text-neutral-400 hover:text-txt-light"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-txt-muted dark:text-txt-mutedDark mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-txt-muted dark:text-txt-mutedDark cursor-pointer">
              I agree to the <span className="text-primary font-bold">Terms & Privacy</span>
            </label>
          </div>

          {/* Sign Up CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-button bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm shadow-primary-glow flex items-center justify-center gap-2 active:scale-95 transition-all mt-4"
          >
            <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-xs text-txt-muted dark:text-txt-mutedDark">
          Already have an account?{' '}
          <NavLink to="/login" className="text-primary font-black hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};
