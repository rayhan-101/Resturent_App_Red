import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  UtensilsCrossed,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();

  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    navigate('/home', { replace: true });
  };

  const handleGuest = () => {
    guestLogin();
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
            Welcome <span className="text-primary">Back!</span>
          </h1>
          <p className="text-xs text-txt-muted dark:text-txt-mutedDark mt-1">
            Sign in to order your favorite gourmet dishes
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
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
                className="w-full pl-10 pr-10 py-3 rounded-input bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-txt-light dark:text-txt-dark outline-none focus:border-primary shadow-sm"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-txt-light"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-txt-light dark:text-txt-dark font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-primary"
              />
              <span>Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => alert('Password reset link sent to demo email.')}
              className="text-primary font-bold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-button bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm shadow-primary-glow flex items-center justify-center gap-2 active:scale-95 transition-all mt-6"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Guest Login Option */}
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
          <button
            onClick={handleGuest}
            type="button"
            className="w-full py-2.5 rounded-button border border-neutral-200 dark:border-neutral-700 text-txt-light dark:text-txt-dark font-bold text-xs hover:bg-orange-50 dark:hover:bg-neutral-800 flex items-center justify-center gap-2 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-primary" />
            <span>Continue as Guest</span>
          </button>
        </div>

        {/* Link to Sign Up */}
        <p className="mt-6 text-center text-xs text-txt-muted dark:text-txt-mutedDark">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-primary font-black hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};
