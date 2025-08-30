"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from './base-modal';
import { ArrowLeft } from 'lucide-react';

// Email icon
const emailIcon = (
  <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.83203 4.5L6.44071 7.11131C8.13976 8.07401 8.85763 8.07401 10.5567 7.11131L15.1654 4.5" stroke="#A0A0A0" strokeLinejoin="round" />
    <path d="M1.84254 9.48342C1.88613 11.5271 1.90792 12.549 2.662 13.3059C3.41609 14.0629 4.46559 14.0892 6.56458 14.142C7.85824 14.1745 9.13916 14.1745 10.4328 14.142C12.5318 14.0892 13.5813 14.0629 14.3354 13.3059C15.0895 12.549 15.1113 11.5271 15.1549 9.48342C15.1689 8.8263 15.1689 8.17306 15.1549 7.51594C15.1113 5.47225 15.0895 4.4504 14.3354 3.69345C13.5813 2.9365 12.5318 2.91013 10.4328 2.85739C9.13916 2.82488 7.85824 2.82488 6.56458 2.85738C4.46558 2.91012 3.41609 2.93648 2.662 3.69344C1.90791 4.45039 1.88612 5.47224 1.84254 7.51593C1.82853 8.17305 1.82853 8.8263 1.84254 9.48342Z" stroke="#A0A0A0" strokeLinejoin="round" />
  </svg>
);

export interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email:string) => void;
  onBackToLogin?: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onBackToLogin
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      onClose();
    }
  };

  const commonClasses = "w-full p-3 stroke-color rounded-[14px] focus:outline-none bg-white text-[14px] placeholder-[#A0A0A0] focus:border-transparent border border-gray-300";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={false}>
      <div className="p-6 lg:p-10 h-full">
        <div className='flex gap-2 items-between'>
          <button className='cursor-pointer' onClick={handleBackToLogin}>
            <ArrowLeft className='secondary-text-color'/>
          </button>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Forgot your password?</h2>
            <p className="text-gray-600 mb-6">No worries we&apos;ll send you reset instruction&apos;s.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {emailIcon}
              </div>
              <input
                type="email"
                placeholder="e.g., crownzdesigns@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`${commonClasses} pl-10`}
                required
              />
            </div>
          </div>

          {/* Send Reset Email Button */}
          <div className='flex justify-center items-center'>
            <Button 
              type="submit" 
              variant="secondary" 
              className="relative bg-white !px-15"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Email'}
            </Button>
          </div>

          {/* Back to Login Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-sm text-[#FF6B6B] hover:underline"
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ForgotPasswordModal; 