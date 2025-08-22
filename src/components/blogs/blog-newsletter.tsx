"use client"
import React, { useState } from 'react';
import Button from '../root/button';

interface NewsletterSubscriptionProps {
  onSubscribe?: (email: string) => void;
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  onSubscribe,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubscribe) {
        onSubscribe(email);
      }
      
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
    if (isSubmitted) setIsSubmitted(false);
  };

  return (
    <section className={`bg-secondary py-16  -mx-4 lg:-mx-14 ${className}`}>
      <div className="text-center">
        {/* Heading */}
        <h2 className="font-plus-jakarta text-[42px] font-bold text-white ">
          Never Miss a Story
        </h2>
        
        {/* Description */}
        <p className="description !text-white sm:text-lg lg:text-lg -8 sm:mb-10 lg:mb-12 max-w-xl mx-auto leading-relaxed">
          Subscribe to our newsletter for the latest travel stories, tips, and exclusive content delivered straight to your inbox.
        </p>

        {/* Subscription Form */}
        <div className="max-w-md mx-auto">
          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="font-plus-jakarta ">Thank you for subscribing!</h3>
              <p className="description">
                Check your email to confirm your subscription and start receiving our latest stories.
              </p>
            </div>
          ) : (
            <div className="space-y-4 px-2 mt-2">
              <div className="relative">
                <div className="bg-muted-ash backdrop-blur-sm rounded-xl p-1 shadow-lg">
                  <div className="flex flex-row gap-2">
                    <div className="flex-1 min-w-0 ">
                      <input
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address..."
                        className="w-full px-4 py-3 sm:py-3.5 text-black placeholder-[#263939] bg-transparent border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      onClick={handleSubmit}
                      variant="primary"
                    //   className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-red-400 disabled:to-red-400 text-white font-medium px-6 py-3 sm:py-3.5 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap shadow-lg"
                    >
                      {/* {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Subscribing...
                        </div>
                      ) : (
                        'Subscribe to Newsletter'
                      )} */}
                        Subscribe  <span className="hidden lg:flex"> to Newsletter</span>
                    </Button>
                  </div>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="absolute top-full left-0 right-0 mt-2">
                    <p className="text-red-200 text-sm bg-red-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-red-400/30">
                      {error}
                    </p>
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <p className="text-xs muted-color ">
                By subscribing, you agree to our{' '}
                <button 
                  type="button"
                  className="underline hover:text-white transition-colors"
                  onClick={() => console.log('Open Privacy Policy')}
                >
                  Privacy Policy
                </button>{' '}
                and consent to receive updates.
              </p>
            </div>
          )}
        </div>

       
      </div>
    </section>
  );
};

export default NewsletterSubscription;