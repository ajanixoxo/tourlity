'use client';

import { Dot, X } from 'lucide-react'
import Link from 'next/link'
import Button from './button'
import React, { useState } from 'react'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='relative h-20 z-[999]'>
      {/* Main Navbar */}
      <div className={`absolute w-full flex flex-col ${isMobileMenuOpen ? "shadow-lg" : ""}  justify-between py-1 px-2 items-center bg-white border rounded-3xl border-gray-200`}>
        <div className='flex justify-between p-2 items-center w-full'>
          <div className='flex items-center gap-5'>
            {/* Logo */}
            <Link href="/">
              <h1 className='lobster'>Tourlity</h1>
            </Link>

            {/* Line - Hidden on mobile */}
            <div className='hidden lg:block'>
              <svg width="2" height="18" viewBox="0 0 2 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L0.999999 17" stroke="#E0E0E0" strokeOpacity="0.7" strokeLinecap="round" />
              </svg>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className='hidden lg:block'>
              <ul className='flex justify-between gap-3 items-center text-[14px] secondary-text-color navlink'>
                <li><Link href='/explore-tour' className='flex gap-2 justify-between items-center hover:text-[#CA3F33] transition'>Explore Tours</Link></li>
                <li>
                  <Link href='/become-a-host' className='flex gap-2 justify-between items-center hover:text-[#CA3F33] transition'>
                    <Dot className='w-4 h-4 muted-color' /> Become a Host
                  </Link>
                </li>
                <li><Link href='/about' className='flex gap-2 justify-between items-center hover:text-[#CA3F33] transition'><Dot className='w-4 h-4 muted-color' />About</Link></li>
                <li><Link href='/contact' className='flex gap-2 justify-between items-center hover:text-[#CA3F33] transition'><Dot className='w-4 h-4 muted-color' />Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Desktop Buttons - Hidden on mobile */}
          <div className='hidden lg:flex justify-center items-center gap-2'>
            <Button variant='secondary'>Access Account</Button>
            <Button variant='primary'>Create Account</Button>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={toggleMobileMenu}
            className='lg:hidden p-2 text-charcoal hover:text-primary-color transition-colors'
          >
            {isMobileMenuOpen ? <X size={24} /> : <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5L20 5" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12L20 12" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 19L14 19" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>}
          </button>
        </div>

        {/* Mobile Dropdown Menu - Inside the same container */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full relative mt-2 z-50 ">
            {/* Navigation Links */}
            <div className="space-y-6 mb-6 px-2">
              <Link
                href='/explore-tour'
                className='block text-charcoal hover:text-primary-color transition-colors text-[16px]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore Tours
              </Link>
              <Link
                href='/become-a-host'
                className='block text-charcoal hover:text-primary-color transition-colors text-[16px]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Host
              </Link>
              <Link
                href='/about'
                className='block text-charcoal hover:text-primary-color transition-colors text-[16px]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href='/contact'
                className='block text-charcoal hover:text-primary-color transition-colors text-[16px]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Buttons */}
            <div className="gap-3 justify-between flex mb-3">
              <Link href=''>
                <Button
                  variant='secondary'
                  className=' !px-4  !text-[13px]'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Access Account
                </Button></Link>

              <Link href='/sign-up'> <Button
                variant='primary'
                className=' !px-4 !text-[13px]'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Account
              </Button></Link>

            </div>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar