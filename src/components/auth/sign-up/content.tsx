/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState, useEffect } from 'react';
import RegistrationForm, { UserType } from '@/components/forms/registration-form';
import OTPModal from '@/components/modals/otp-modal';
import SuccessModal from '@/components/modals/success-modal';
import Button from '@/components/root/button';
import Link from 'next/link';
import { RegistrationFormData } from '@/components/forms/registration-form';
import { forgotPassword, registerUser, verifyForgotOTP, verifyOTP, resetPassword, registerUserWithFiles } from '@/lib/auth-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LoginModal, { LoginFormData } from '@/components/modals/login-modal';
import ForgotPasswordModal from '@/components/modals/forgot-password-modal';
import ResetPasswordOtpModal from '@/components/modals/reset-password';
import CreatePasswordModal from '@/components/modals/create-password-modal';
import { toast } from 'react-toastify';

function SignUpContent() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showForgotOTPModal, setShowForgotOTPModal] = useState(false);
  const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState(''); // Add state for OTP
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/sign-up.png",
      title: "Start Your Journey with Tourlity",
      description:
        "Join a global community of passionate hosts and curious travelers. Whether you're here to share your culture or discover new ones your adventure starts now.",
    },
    {
      image: "/images/sign-up-2.png",
      title: "Share Unique Experiences",
      description:
        "Become a host and share your local culture, food, and stories with travelers from around the world.",
    },
    {
      image: "/images/sign-up-3.png",
      title: "Discover New Destinations",
      description:
        "Explore new places, meet new people, and immerse yourself in authentic experiences.",
    },
    {
      image: "/images/sign-up-4.png",
      title: "Connect & Grow",
      description:
        "Build lasting connections and expand your horizons with Tourlity's vibrant community.",
    },
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      setShowRegistrationForm(true);
    }
  };

  const handleRegistrationSubmit = async (data: RegistrationFormData | globalThis.FormData) => {
    try {
      let result;
      let email = '';

      if (data instanceof globalThis.FormData) {
        // Handle file uploads for host/facilitator/translator
        result = await registerUserWithFiles(data);
        email = data.get('email') as string || '';
      } else {
        // Handle JSON for guest
        result = await registerUser(data);
        email = data.email || '';
      }

      console.log("this is result", result);
      setUserEmail(email);
      setShowRegistrationForm(false);
      toast.success("Registration successful! Please verify your email.");
      setShowOTPModal(true);
      console.log(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  const handleOTPVerify = async (otp: string) => {
    try {
      await verifyOTP(userEmail, otp);
      toast.success("OTP verified successfully");
      setShowOTPModal(false);
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'OTP verification failed');
      } else {
        toast.error('OTP verification failed');
      }
    }
  };

  // const handleOTPResend = () => {
  //   console.log('Resending OTP...');
  // };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    setShowLoginModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      const result = await import('@/lib/auth-utils').then(mod => mod.loginUser(data.email, data.password));
      toast.success("Login successful");
      if (result && result.user) {
        setShowLoginModal(false);
        const dashboardRoute = await import('@/lib/auth-utils').then(mod => mod.getDashboardRoute(result.user.role));
        window.location.href = dashboardRoute;
      } else {
        toast.error('Redirection Failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error from login", error)
        toast.error(error.message);
      } 
    }
  };

  // const handleForgotPassword
  const handleForgotPassword = async () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  const handleForgotOTPVerify = async (otp: string) => {
    try {
      await verifyForgotOTP(userEmail, otp);
      setForgotPasswordOtp(otp); // Store the OTP
      toast.success("OTP verified successfully");
      setShowForgotOTPModal(false);
      setShowCreatePasswordModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'OTP verification failed');
      } 
    }
  };

  const handleForgotPasswordSubmit = async (email: string) => {
    console.log('Forgot password data:', email);
    setUserEmail(email); // Store the email
    try {
      await forgotPassword(email);
      setShowForgotPasswordModal(false);
      toast.success("OTP sent to your email");
      setShowForgotOTPModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Forgot password failed');
      } 
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPasswordModal(false);
    setShowForgotOTPModal(false);
    setShowCreatePasswordModal(false);
    setShowLoginModal(true);
  };

  const handleCreatePasswordSubmit = async (newPassword: string, email: string, otp: string) => {
    console.log('Password:', newPassword, 'Email:', email, 'OTP:', otp);
    try {
      await resetPassword(email, otp, newPassword);
      setShowCreatePasswordModal(false);
      toast.success("Password reset successful, please login");
      setShowLoginModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Password reset failed');
      }
    }
  };

  return (
    <>
      <div className='flex justify-center w-full h-screen'>
        <div className='hidden relative lg:flex flex-1 h-screen w-1/2 justify-center items-center'>
          <div className='flex flex-col gap-5 w-full absolute bottom-15 px-5 lg:px-10 transition-all duration-500'>
            {/* Fixed slider text (title and description change per slide) */}
            <h1 className='text-[30px] lg:text-[42px] font-plus-jakarta text-white font-bold'>
              {slides[currentSlide].title}
            </h1>
            <p className='text-[14px] text-white font-normal font-inter'>
              {slides[currentSlide].description}
            </p>
          </div>
          {/* Slider Image */}
          <img
            src={slides[currentSlide].image}
            alt="Sign Up Slide"
            className='w-full h-screen object-cover transition-all duration-500'
            key={slides[currentSlide].image}
          />
          {/* Slider Indicator */}
          <div className='absolute bottom-5 flex justify-center items-center gap-1'>
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
                className={
                  idx === currentSlide
                    ? " rounded-2xl w-[3px] h-[25px] bg-white transition-all duration-300"
                    : "  rounded-2xl w-[3px] h-[20px] bg-[#e0e0e080] transition-all duration-300"
                }
                style={{ outline: "none" }}
              />
            ))}
          </div>
        </div>

        <div className='flex-1 w-full py-15 lg:w-1/2 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-25'>
          <div>
          <Link href="/" className='flex items-end justify-end'>
            <img src={"/images/logo/logo.svg"} alt="" className='w-10'/>
              <h1 className='lobster !text-3xl'>Tourlity</h1>
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
              <div className='border-stroke bg-white gap-1 border rounded-3xl p-2 mt-6 flex flex-row w-full justify-center items-center'>
                <svg width={18} height={19} className='ml-3' viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.33398 7.83301C2.88845 6.20489 5.09614 6.12823 6.66732 7.83301M5.66405 3.49967C5.66405 4.42015 4.91679 5.16634 3.99501 5.16634C3.07322 5.16634 2.32596 4.42015 2.32596 3.49967C2.32596 2.5792 3.07322 1.83301 3.99501 1.83301C4.91679 1.83301 5.66405 2.5792 5.66405 3.49967Z" stroke="#A0A0A0" strokeLinecap="round" />
                  <path d="M9.33398 15.167C10.8885 13.5389 13.0961 13.4622 14.6673 15.167M13.664 10.8337C13.664 11.7541 12.9168 12.5003 11.995 12.5003C11.0732 12.5003 10.326 11.7541 10.326 10.8337C10.326 9.91318 11.0732 9.16699 11.995 9.16699C12.9168 9.16699 13.664 9.91318 13.664 10.8337Z" stroke="#A0A0A0" strokeLinecap="round" />
                  <path d="M2 9.83333C2 12.4133 4.08667 14.5 6.66667 14.5L6 13.1667" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 2.5H14M10 4.5H14M10 6.5H12.3333" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  required
                >
                  <SelectTrigger className="w-full !bg-transparent !border-0 !shadow-none !outline-none focus:!outline-none focus-visible:!outline-none focus-visible:!ring-0">
                    <SelectValue className='muted-color' placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className='muted-color'>
                    <SelectItem value="guest" className='border-b-1 border-b-[#E0E0E0] rounded-none'>Guest</SelectItem>
                    <SelectItem value="host" className='border-b-1 border-b-[#E0E0E0] rounded-none' >Host</SelectItem>
                    <SelectItem value="facilitator" className='border-b-1 border-b-[#E0E0E0] rounded-none'>Facilitator</SelectItem>
                    <SelectItem value="translator" >Translator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-5 flex flex-col items-center'>
                <Button type="submit" variant='primary' className='mt-6'>
                  Continue
                </Button>

                <p className='text-[16px] text-[#676A6C]'>
                  Already have an account? <button onClick={handleLoginClick} className='text-primary-color'>Log in</button>
                </p>
              </div>
            </form>
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
        // onResend={handleOTPResend}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Account Created Successfully!"
          image="/images/success-icon.png"
          buttonText="Continue to Dashboard"
          onButtonClick={handleSuccess}
        />

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLoginSubmit}
          onForgotPassword={handleForgotPassword}
        />

        <ForgotPasswordModal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
          onSubmit={handleForgotPasswordSubmit}
          onBackToLogin={handleBackToLogin}
        />

        <ResetPasswordOtpModal
          isOpen={showForgotOTPModal}
          onClose={() => setShowForgotOTPModal(false)}
          email={userEmail}
          onVerified={handleForgotOTPVerify}
        />

        <CreatePasswordModal
          isOpen={showCreatePasswordModal}
          onClose={() => setShowCreatePasswordModal(false)}
          onSubmit={handleCreatePasswordSubmit}
          onBack={handleBackToLogin}
          email={userEmail}
          otp={forgotPasswordOtp}
        />
      </div>
    </>
  );
}

export default SignUpContent;


