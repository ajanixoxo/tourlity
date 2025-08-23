"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from './base-modal';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ 
  isOpen, 
  onClose, 
  email, 
  onVerify, 
  onResend 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onVerify(otpString);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h2 className="text-xl font-semibold text-[#FF6B6B] text-center mb-2">
          Thanks for Signing up!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We&apos;ve sent an OTP Verification code to {email}.
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Enter OTP
          </label>
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-3">
            Remember to check your spam folder!
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            className="w-full"
            disabled={otp.join('').length !== 6}
          >
            Confirm
          </Button>
          <button
            type="button"
            onClick={onResend}
            className="w-full text-sm text-[#FF6B6B] hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default OTPModal;