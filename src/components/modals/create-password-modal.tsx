"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from './base-modal';
import { ArrowLeft } from 'lucide-react';

// Lock icon
const lockIcon = (
  <svg width={16} height={17} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.32985 10.5L9.33464 10.5M6.66797 10.5L6.67275 10.5" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33203 10.4997C3.33203 7.92235 5.42137 5.83301 7.9987 5.83301C10.576 5.83301 12.6654 7.92235 12.6654 10.4997C12.6654 13.077 10.576 15.1663 7.9987 15.1663C5.42137 15.1663 3.33203 13.077 3.33203 10.4997Z" stroke="#A0A0A0" />
    <path d="M11 6.83301V4.83301C11 3.17615 9.65685 1.83301 8 1.83301C6.34315 1.83301 5 3.17615 5 4.83301V6.83301" stroke="#A0A0A0" strokeLinecap="round" />
  </svg>
);

// Check icon for met requirements
const checkIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

// Circle icon for unmet requirements
const circleIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);

export interface CreatePasswordFormData {
  email: string, 
  otp: string,
  newPassword: string,
}

interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

interface CreatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, otp: string, newPassword: string) => void;
  onBack?: () => void;
  email: string; // Add email prop
  otp: string;   // Add otp prop

}

const CreatePasswordModal: React.FC<CreatePasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onBack,
  email, // Receive email as prop
  otp    // Receive otp as prop
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password requirements
  const passwordRequirements: PasswordRequirement[] = [
    {
      id: 'special',
      label: 'Special Characters',
      validator: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    },
    {
      id: 'uppercase',
      label: 'Upper-case',
      validator: (password: string) => /[A-Z]/.test(password)
    },
    {
      id: 'numbers',
      label: 'Numbers',
      validator: (password: string) => /\d/.test(password)
    },
    {
      id: 'length',
      label: '8-16 Characters',
      validator: (password: string) => password.length >= 8 && password.length <= 16
    }
  ];



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all requirements are met
    const allRequirementsMet = passwordRequirements.every(req => 
      req.validator(newPassword)
    );
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Check if all requirements are met
    if (!allRequirementsMet) {
      alert('Please meet all password requirements');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(newPassword, email, otp);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  const commonClasses = "w-full p-3 stroke-color rounded-[14px] focus:outline-none bg-white text-[14px] placeholder-[#A0A0A0] focus:border-transparent border border-gray-300";

  // Check if all requirements are met
  const allRequirementsMet = passwordRequirements.every(req => 
    req.validator(newPassword)
  );

  // Check if passwords match
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';

  // Check if form is valid
  const isFormValid = allRequirementsMet && passwordsMatch;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={false}>
      <div className="p-6 lg:p-10 h-full flex lg:block items-center justify-center flex-col">
        <div className='flex gap-2 items-between'>
          <button className='cursor-pointer' onClick={handleBack}>
            <ArrowLeft className='secondary-text-color'/>
          </button>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Create a new password</h2>
            <p className="text-gray-600 mb-6">No worries we&apos;ll send you reset instruction&apos;s.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {lockIcon}
              </div>
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${commonClasses} pl-10 pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
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

          {/* Password Requirements */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Password must contain</h3>
            <div className="grid grid-cols-2 gap-2">
              {passwordRequirements.map((requirement) => {
                const isMet = requirement.validator(newPassword);
                return (
                  <div key={requirement.id} className="flex items-center gap-2">
                    <div className={`${isMet ? 'text-green-500' : 'text-gray-400'}`}>
                      {isMet ? checkIcon : circleIcon}
                    </div>
                    <span className={`text-sm ${isMet ? 'text-gray-700' : 'text-gray-400'}`}>
                      {requirement.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {lockIcon}
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${commonClasses} pl-10 pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
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
            {confirmPassword && !passwordsMatch && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Confirm Button */}
          <div className='flex justify-center items-center'>
            <Button 
              type="submit" 
              variant="secondary" 
              className={`relative bg-white !px-15 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm'}
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default CreatePasswordModal; 