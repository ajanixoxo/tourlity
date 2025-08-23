/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"
import RegistrationForm, { UserType } from '@/components/forms/registration-form';
import OTPModal from '@/components/modals/otp-modal';
import SuccessModal from '@/components/modals/success-modal';
import Button from '@/components/root/button';
import Link from 'next/link';
import { useState } from 'react';
import { FormData } from '@/components/forms/registration-form';

function SignUpContent() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      setShowRegistrationForm(true);
    }
  };

  const handleRegistrationSubmit = (data: FormData) => {
    console.log('Registration data:', data);
    setUserEmail(data.email || '');
    setShowRegistrationForm(false);
    setShowOTPModal(true);
  };

  const handleOTPVerify = (otp: string) => {
    console.log('OTP verified:', otp);
    setShowOTPModal(false);
    setShowSuccessModal(true);
  };

  const handleOTPResend = () => {
    console.log('Resending OTP...');
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    // Redirect to dashboard or login
  };

  return (
    <>
      <div className='flex justify-center w-full h-screen'>
        <div className='hidden lg:flex flex-1 h-screen w-1/2 justify-center items-center'>
          <img src="/images/sign-up.png" alt="Sign Up" className='w-full h-screen' />
        </div>

        <div className='flex-1 w-full py-15 lg:w-1/2 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-25'>
          <div>
            <Link href="/">
              <h1 className='lobster'>Tourlity</h1>
            </Link>
          </div>

          <div className='lg:w-[80%]'>
            <h1 className="max-w-md [font-family:'Inter',Roboto] text-[30px] font-semibold lg:text-[32px]">
              What are you planning to use Tourlity?
            </h1>
            <p className='description'>
              To begin this journey, tell us what type of account you'd be opening
            </p>

            <form onSubmit={handleContinue} className="flex flex-col gap-25">
              <div className='border-stroke bg-white border rounded-3xl p-2 mt-6 flex flex-row w-full justify-between items-center'>
                <svg width={18} height={19} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.33398 7.83301C2.88845 6.20489 5.09614 6.12823 6.66732 7.83301M5.66405 3.49967C5.66405 4.42015 4.91679 5.16634 3.99501 5.16634C3.07322 5.16634 2.32596 4.42015 2.32596 3.49967C2.32596 2.5792 3.07322 1.83301 3.99501 1.83301C4.91679 1.83301 5.66405 2.5792 5.66405 3.49967Z" stroke="#A0A0A0" strokeLinecap="round" />
                  <path d="M9.33398 15.167C10.8885 13.5389 13.0961 13.4622 14.6673 15.167M13.664 10.8337C13.664 11.7541 12.9168 12.5003 11.995 12.5003C11.0732 12.5003 10.326 11.7541 10.326 10.8337C10.326 9.91318 11.0732 9.16699 11.995 9.16699C12.9168 9.16699 13.664 9.91318 13.664 10.8337Z" stroke="#A0A0A0" strokeLinecap="round" />
                  <path d="M2 9.83333C2 12.4133 4.08667 14.5 6.66667 14.5L6 13.1667" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 2.5H14M10 4.5H14M10 6.5H12.3333" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <select 
                  className='border-none muted-color text-[14px] bg-white p-2 flex flex-1 focus:outline-none focus:bg-white focus:border-none'
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="guest">Guest</option>
                  <option value="host">Host</option>
                  <option value="facilitator">Facilitator</option>
                  <option value="translator">Translator</option>
                </select>
              </div>

              <div className='space-y-5 flex flex-col items-center'>
                <Button type="submit" variant='primary' className='mt-6'>
                  Continue
                </Button>

                <p className='text-[16px] text-[#676A6C]'>
                  Already have an account? <Link href='/sign-in' className='text-primary-color'>Log in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        userType={selectedCategory as UserType}
        onSubmit={handleRegistrationSubmit}
      />


      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={userEmail}
        onVerify={handleOTPVerify}
        onResend={handleOTPResend}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Account Created Successfully!"
        image="/images/success-icon.png"
        buttonText="Continue to Dashboard"
        onButtonClick={handleSuccess}
      />
    </>
  );
}

export default SignUpContent;