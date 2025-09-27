"use client"
import { useState } from 'react';
import Button from '@/components/root/button';
import BaseModal from './base-modal';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
  // onResend: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  email,
  onVerify,
  // onResend 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle paste event for any input field
  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted data contains only digits and is 6 characters long
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp(newOtp);
      // Focus the last input after pasting
      const lastInput = document.getElementById(`otp-5`);
      lastInput?.focus();
    } 
    console.log(index)
  };
 

  // Allow typing one digit at a time or handle pasted content
  const handleChange = (index: number, value: string) => {
    // If user types more than one character (shouldn't happen with maxLength=1, but just in case)
    if (value.length > 1) {
      value = value.slice(-1); // Take only the last character
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input when typing
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

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const otpString = otp.join('');
    if (otpString.length === 6) {
      try {
        await onVerify(otpString);
      } catch (error) {
        setError('Failed to verify OTP. Please try again.');
        console.log(error)
        alert(`Failed to verify OTP. Please try again. ${error}`)
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 w-full flex lg:block items-center justify-center flex-col">
        <h2 className="text-[20px] lg:text-[32px] font-semibold text-primary-color font-plus-jakarta text-center mb-2">
          Thanks for Signing up!
        </h2>
        <p className="text-secondary-text text-center mb-6 text-[12px] lg:text-[14px]">
          We&apos;ve sent an OTP Verification code to {email}.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-3">
            Enter OTP
          </label>
          <div className="grid grid-cols-6 gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e, index)}
                className="lg:w-12 lg:h-12 w-10 h-10 border stroke-color rounded-lg text-center text-lg bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            ))}
          </div>
          {error && (
            <p className="text-sm text-red-500 font-light text-center mt-3">
              {error}
            </p>
          )}
          <p className="text-sm muted-color font-light text-center mt-3">
            Remember to check your spam folder!
          </p>
        </div>
        <div className="space-y-3 flex flex-col items-center">
          <Button
            variant="secondary"
            onClick={handleSubmit}
            className="w-auto !px-7 !bg-white"
            disabled={otp.join('').length !== 6}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-[#FF6B6B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Confirming...
              </span>
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default OTPModal;