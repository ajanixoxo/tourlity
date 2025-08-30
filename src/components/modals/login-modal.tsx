"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from './base-modal';
import { ArrowLeft } from 'lucide-react';
import { loginUser, getDashboardRoute } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';

// Short SVG icons
const icons = {
  email: <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.83203 4.5L6.44071 7.11131C8.13976 8.07401 8.85763 8.07401 10.5567 7.11131L15.1654 4.5" stroke="#A0A0A0" strokeLinejoin="round" />
    <path d="M1.84254 9.48342C1.88613 11.5271 1.90792 12.549 2.662 13.3059C3.41609 14.0629 4.46559 14.0892 6.56458 14.142C7.85824 14.1745 9.13916 14.1745 10.4328 14.142C12.5318 14.0892 13.5813 14.0629 14.3354 13.3059C15.0895 12.549 15.1113 11.5271 15.1549 9.48342C15.1689 8.8263 15.1689 8.17306 15.1549 7.51594C15.1113 5.47225 15.0895 4.4504 14.3354 3.69345C13.5813 2.9365 12.5318 2.91013 10.4328 2.85739C9.13916 2.82488 7.85824 2.82488 6.56458 2.85738C4.46558 2.91012 3.41609 2.93648 2.662 3.69344C1.90791 4.45039 1.88612 5.47224 1.84254 7.51593C1.82853 8.17305 1.82853 8.8263 1.84254 9.48342Z" stroke="#A0A0A0" strokeLinejoin="round" />
  </svg>,

  lock: <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.32985 10.5L9.33464 10.5M6.66797 10.5L6.67275 10.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33203 10.4997C3.33203 7.92235 5.42137 5.83301 7.9987 5.83301C10.576 5.83301 12.6654 7.92235 12.6654 10.4997C12.6654 13.077 10.576 15.1663 7.9987 15.1663C5.42137 15.1663 3.33203 13.077 3.33203 10.4997Z" stroke="#A0A0A0" />
    <path d="M11 6.83301V4.83301C11 3.17615 9.65685 1.83301 8 1.83301C6.34315 1.83301 5 3.17615 5 4.83301V6.83301" stroke="#A0A0A0" strokeLinecap="round" />
  </svg>,
};

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onForgotPassword,

}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Call onSubmit prop so parent can handle login logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (onSubmit) {
        await onSubmit(formData);
        onClose();
      } else {
        const result = await loginUser(formData.email, formData.password);
        if (result && result.user) {
          onClose();
          const dashboardRoute = getDashboardRoute(result.user.role);
          router.push(dashboardRoute);
        } else {
          setError('Login failed');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleOAuthLogin = (provider: string) => {
    console.log(`OAuth login with ${provider}`);
    // Implement OAuth login logic here
  };

  const commonClasses = "w-full p-3 stroke-color rounded-[14px] focus:outline-none bg-white text-[14px] placeholder-[#A0A0A0] focus:border-transparent border border-gray-300";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={false}>
      <div className="p-6 lg:p-10 h-full">
        <div className='flex gap-2 text-center  items-center lg:items-between'>
          <button className='lg:hidden cursor-pointer' onClick={onClose}>
            <ArrowLeft className='secondary-text-color'/>
          </button>
          <div className='w-full'>
            <h2 className="text-2xl font-semibold mb-2">Log In to Your Account</h2>
            <p className="text-gray-600 mb-6">Welcome back! Choose your preferred sign-in method..</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icons.email}
              </div>
              <input
                type="email"
                placeholder="e.g., crownzdesigns@gmail.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`${commonClasses} pl-10`}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icons.lock}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`${commonClasses} pl-10 pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[#FF6B6B] hover:underline"
            >
              Forgot your password?
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <div className='flex justify-center items-center'>
            <Button 
              type="submit" 
              variant="secondary" 
              className="relative bg-white !px-15"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Log In'}
            </Button>
          </div>

          {/* Terms and Privacy */}
          {/* <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-[#FF6B6B] hover:underline">Terms of Use</a>{' '}
            and confirm you have read our{' '}
            <a href="/privacy" className="text-[#FF6B6B] hover:underline">Privacy Policy</a>.
          </p> */}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#FAF9F6] text-gray-500">or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3 lg:px-20 mb-3">
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              className="flex items-center justify-center py-4 border border-gray-300 rounded-[8px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin('apple')}
              className="flex items-center justify-center py-4 border border-gray-300 rounded-[8px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin('facebook')}
              className="flex items-center justify-center py-4 border border-gray-300 rounded-[8px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>

        </form>
      </div>
    </BaseModal>
  );
};

export default LoginModal; 