/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/auth-store';
import { logoutUser } from '@/lib/auth-utils';
import {
  Home,
  Calendar,
  Video,
  Play,
  Heart,
  Tag,
  Star,
  CreditCard,
  Settings,
  HelpCircle,
  Bell,
  MessageCircleMore,
  Globe,
  ChevronDown,
  LogOut,
  Menu,

  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Skeleton from '@/components/skeleton/skeleton';
import Button from '@/components/root/button';
// Sidebar menu items interface
export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

// Dashboard layout props
// interface DashboardLayoutProps {
//   children: React.ReactNode;
//   sidebarItems: SidebarItem[];
//   userRole: string;
//   userName: string;
//   userEmail: string;
//   userAvatar?: string;
// }
const sidebarItemsTwo = [

  {
    label: 'Settings', href: '/dashboard/settings', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9881 5.35605L15.6179 4.7136C15.338 4.22772 15.198 3.98479 14.9598 3.88791C14.7216 3.79104 14.4522 3.86748 13.9135 4.02036L12.9983 4.27813C12.6543 4.35745 12.2935 4.31246 11.9794 4.1511L11.7268 4.00531C11.4574 3.83283 11.2503 3.5785 11.1356 3.27956L10.8852 2.53152C10.7205 2.0365 10.6382 1.789 10.4421 1.64743C10.2461 1.50586 9.9857 1.50586 9.46494 1.50586H8.62885C8.10808 1.50586 7.8477 1.50586 7.65167 1.64743C7.45564 1.789 7.3733 2.0365 7.20862 2.53152L6.95815 3.27956C6.84349 3.5785 6.63634 3.83283 6.36703 4.00531L6.11437 4.1511C5.8003 4.31246 5.43944 4.35745 5.09549 4.27813L4.18031 4.02036C3.64156 3.86748 3.37218 3.79104 3.134 3.88791C2.89582 3.98479 2.75584 4.22772 2.47587 4.7136L2.10567 5.35605C1.84324 5.81148 1.71203 6.0392 1.73749 6.28162C1.76296 6.52403 1.93862 6.71938 2.28995 7.11009L3.06323 7.97462C3.25222 8.21389 3.38641 8.63086 3.38641 9.00574C3.38641 9.38086 3.25227 9.79772 3.06325 10.037L2.28995 10.9016C1.93862 11.2923 1.76296 11.4876 1.73749 11.73C1.71203 11.9725 1.84325 12.2002 2.10568 12.6556L2.47585 13.298C2.75582 13.7839 2.89582 14.0269 3.134 14.1237C3.37219 14.2206 3.64157 14.1442 4.18032 13.9913L5.09546 13.7335C5.43947 13.6542 5.8004 13.6992 6.1145 13.8606L6.36712 14.0064C6.63638 14.1789 6.84348 14.4332 6.95813 14.7321L7.20862 15.4802C7.3733 15.9752 7.45564 16.2227 7.65167 16.3643C7.8477 16.5059 8.10808 16.5059 8.62885 16.5059H9.46494C9.9857 16.5059 10.2461 16.5059 10.4421 16.3643C10.6382 16.2227 10.7205 15.9752 10.8852 15.4802L11.1357 14.7321C11.2503 14.4332 11.4574 14.1789 11.7267 14.0064L11.9793 13.8606C12.2934 13.6992 12.6543 13.6542 12.9983 13.7335L13.9135 13.9913C14.4522 14.1442 14.7216 14.2206 14.9598 14.1237C15.198 14.0269 15.338 13.7839 15.6179 13.298L15.9881 12.6556L15.9881 12.6556C16.2505 12.2002 16.3818 11.9725 16.3563 11.73C16.3308 11.4876 16.1552 11.2923 15.8039 10.9016L15.8038 10.9016L15.0305 10.037C14.8415 9.79772 14.7074 9.38086 14.7074 9.00574C14.7074 8.63086 14.8416 8.21389 15.0306 7.97462L15.8038 7.11009C16.1552 6.71938 16.3308 6.52403 16.3563 6.28162C16.3818 6.0392 16.2505 5.81148 15.9881 5.35605Z" stroke="#5A5A5A" strokeLinecap="round" />
      <path d="M11.6406 9C11.6406 10.4497 10.4654 11.625 9.01562 11.625C7.56588 11.625 6.39063 10.4497 6.39063 9C6.39063 7.55025 7.56588 6.375 9.01562 6.375C10.4654 6.375 11.6406 7.55025 11.6406 9Z" stroke="#5A5A5A" />
    </svg>

  },

  {
    label: 'Help & Support', href: '/dashboard/support', icon: <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5C12.1421 15.5 15.5 12.1421 15.5 8Z" stroke="#5A5A5A" />
      <path d="M8.17969 11.75V8C8.17969 7.64645 8.17969 7.46967 8.06985 7.35983C7.96002 7.25 7.78324 7.25 7.42969 7.25" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.99204 5H7.99878" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  },
];

// Default sidebar items for different roles
 const getSidebarItems = (role: string): SidebarItem[] => {
  const baseItems: SidebarItem[] = [
    {
      label: 'Dashboard', href: '/dashboard', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4399_28517)">
          <circle cx="13.3125" cy="4.6875" r="3.1875" stroke="#F26457" strokeWidth="1.5" />
          <circle cx="4.6875" cy="4.6875" r="3.1875" stroke="#F26457" strokeWidth="1.5" />
          <circle cx="13.3125" cy="13.3125" r="3.1875" stroke="#F26457" strokeWidth="1.5" />
          <circle cx="4.6875" cy="13.3125" r="3.1875" stroke="#F26457" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4399_28517">
            <rect width={18} height={18} fill="white" />
          </clipPath>
        </defs>
      </svg>
    },

    {
      label: 'My Bookings', href: '/dashboard/bookings', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.31284 8.93873L5.80394 7.42242C6.22198 7.16837 6.431 7.04135 6.57528 6.86712C7.19972 6.11311 6.64983 4.99946 6.74294 4.12264C6.83932 3.21503 7.70485 1.97369 8.57729 1.58884C8.8458 1.47039 9.15383 1.47039 9.42234 1.58884C10.2948 1.97369 11.1603 3.21504 11.2567 4.12264C11.3498 4.99946 10.7999 6.11312 11.4243 6.86712C11.5686 7.04135 11.7777 7.16837 12.1957 7.42242L14.687 8.93864C15.4495 9.40269 15.7498 9.89795 15.7498 10.8296C15.7498 11.3367 15.5254 11.4726 15.073 11.3691L10.7044 10.3696L10.5082 12.0862C10.4371 12.7086 10.4015 13.0198 10.5044 13.3049C10.7452 13.9725 11.563 14.5193 12.0624 15.0049C12.3384 15.2733 12.6397 16.045 12.3249 16.396C12.1306 16.6127 11.815 16.4368 11.5978 16.3523L9.50626 15.5388C9.25617 15.4415 9.13112 15.3929 8.99982 15.3929C8.86851 15.3929 8.74346 15.4415 8.49337 15.5388L6.40188 16.3523C6.18464 16.4368 5.869 16.6127 5.67469 16.396C5.35995 16.045 5.66119 15.2733 5.93721 15.0049C6.43665 14.5193 7.25442 13.9725 7.49527 13.3049C7.59811 13.0198 7.56255 12.7086 7.49143 12.0862L7.29527 10.3696L2.92694 11.369C2.47427 11.4726 2.24987 11.3366 2.25 10.8293C2.25026 9.89783 2.55053 9.40274 3.31284 8.93873Z" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    },

    {
      label: 'Live Tour', href: '/dashboard/live-tour', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.25 11.25H9.75" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13.5V16.5" stroke="#5A5A5A" />
        <path d="M6 16.5H12" stroke="#5A5A5A" strokeLinecap="round" />
        <path d="M6.75 1.50098C4.78091 1.50724 3.71737 1.56569 2.93918 2.11059C2.61668 2.3364 2.33618 2.6169 2.11036 2.9394C1.5 3.81109 1.5 5.0408 1.5 7.50022C1.5 9.95965 1.5 11.1894 2.11036 12.061C2.33618 12.3835 2.61668 12.664 2.93918 12.8899C3.81087 13.5002 5.04058 13.5002 7.5 13.5002H10.5C12.9594 13.5002 14.1891 13.5002 15.0608 12.8899C15.3833 12.664 15.6638 12.3835 15.8896 12.061C16.4345 11.2829 16.493 10.2193 16.4992 8.25022" stroke="#5A5A5A" strokeLinecap="round" />
        <path d="M14.625 3.10973L14.6722 3.07564C15.4656 2.50283 15.8623 2.21642 16.1812 2.35471C16.5 2.493 16.5 2.95148 16.5 3.86843V4.38157C16.5 5.29852 16.5 5.757 16.1812 5.89529C15.8623 6.03358 15.4656 5.74717 14.6722 5.17436L14.625 5.14027M11.625 6.75H12C13.2374 6.75 13.8562 6.75 14.2406 6.41363C14.625 6.07726 14.625 5.53588 14.625 4.45312V3.79688C14.625 2.71412 14.625 2.17274 14.2406 1.83637C13.8562 1.5 13.2374 1.5 12 1.5H11.625C10.3876 1.5 9.76884 1.5 9.38442 1.83637C9 2.17274 9 2.71412 9 3.79688V4.45312C9 5.53588 9 6.07726 9.38442 6.41363C9.76884 6.75 10.3876 6.75 11.625 6.75Z" stroke="#5A5A5A" strokeLinecap="round" />
      </svg>
    },

    {
      label: 'Reels', href: '/dashboard/reels', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.25 6L9.75 6" stroke="#5A5A5A" strokeLinecap="round" />
        <path d="M1.5 8.25C1.5 5.77513 1.5 4.53769 2.26884 3.76884C3.03769 3 4.27513 3 6.75 3H7.5C9.97487 3 11.2123 3 11.9812 3.76884C12.75 4.53769 12.75 5.77513 12.75 8.25V9.75C12.75 12.2249 12.75 13.4623 11.9812 14.2312C11.2123 15 9.97487 15 7.5 15H6.75C4.27513 15 3.03769 15 2.26884 14.2312C1.5 13.4623 1.5 12.2249 1.5 9.75V8.25Z" stroke="#5A5A5A" />
        <path d="M12.75 6.67939L12.8444 6.60147C14.4313 5.29217 15.2247 4.63752 15.8623 4.95362C16.5 5.26971 16.5 6.31766 16.5 8.41356V9.58644C16.5 11.6823 16.5 12.7303 15.8623 13.0464C15.2247 13.3625 14.4313 12.7078 12.8444 11.3985L12.75 11.3206" stroke="#5A5A5A" strokeLinecap="round" />
      </svg>

    },

    {
      label: 'Saved Tours', href: '/dashboard/saved', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5969 2.99561C12.5857 1.76192 10.8303 2.25909 9.77576 3.05101C9.34339 3.37572 9.1272 3.53807 9 3.53807C8.8728 3.53807 8.65661 3.37572 8.22424 3.05101C7.16971 2.25909 5.41431 1.76192 3.40308 2.99561C0.763551 4.6147 0.166291 9.95614 6.25465 14.4625C7.41429 15.3208 7.99411 15.75 9 15.75C10.0059 15.75 10.5857 15.3208 11.7454 14.4625C17.8337 9.95614 17.2364 4.6147 14.5969 2.99561Z" stroke="#5A5A5A" strokeLinecap="round" />
      </svg>

    },

    {
      label: 'Offers', href: '/dashboard/offers', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1.125" cy="1.125" rx="1.125" ry="1.125" transform="matrix(1 0 0 -1 12 6)" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.08067 8.35795C1.32831 9.19822 1.31213 10.4659 2.00262 11.3578C3.37284 13.1274 4.87255 14.6272 6.64225 15.9974C7.53405 16.6879 8.80178 16.6717 9.64205 15.9193C11.9234 13.8766 14.0127 11.7419 16.0289 9.39596C16.2282 9.16403 16.3529 8.87976 16.3809 8.57522C16.5047 7.22849 16.7589 3.3485 15.7052 2.29481C14.6515 1.24111 10.7715 1.49532 9.42478 1.61907C9.12024 1.64706 8.83597 1.77175 8.60404 1.97109C6.25809 3.98734 4.12335 6.07658 2.08067 8.35795Z" stroke="#5A5A5A" />
        <path d="M5.25 10.5L7.5 12.75" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    },

    {
      label: 'Reviews', href: '/dashboard/reviews', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.25 8.25C2.25 5.4377 2.25 4.03155 2.96619 3.04581C3.19748 2.72745 3.47745 2.44748 3.79581 2.21619C4.78155 1.5 6.1877 1.5 9 1.5C11.8123 1.5 13.2184 1.5 14.2042 2.21619C14.5225 2.44748 14.8025 2.72745 15.0338 3.04581C15.75 4.03155 15.75 5.4377 15.75 8.25V9.75C15.75 12.5623 15.75 13.9684 15.0338 14.9542C14.8025 15.2726 14.5225 15.5525 14.2042 15.7838C13.2184 16.5 11.8123 16.5 9 16.5C6.1877 16.5 4.78155 16.5 3.79581 15.7838C3.47745 15.5525 3.19748 15.2726 2.96619 14.9542C2.25 13.9684 2.25 12.5623 2.25 9.75V8.25Z" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5.25H6M10.125 9H7.875" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    },

    {
      label: 'Payment', href: '/dashboard/payment', icon: <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 13.875C10.5 13.875 11.25 13.875 12 15.375C12 15.375 14.3824 11.625 16.5 10.875" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.125 8.625H4.11826" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.25 14.625H7.875C5.05607 14.625 3.6466 14.625 2.70559 13.8818C2.55508 13.763 2.41589 13.632 2.2896 13.4903C1.5 12.6047 1.5 11.2781 1.5 8.625C1.5 5.97189 1.5 4.64533 2.2896 3.75967C2.41589 3.61802 2.55508 3.48702 2.70559 3.36815C3.6466 2.625 5.05607 2.625 7.875 2.625H10.125C12.9439 2.625 14.3534 2.625 15.2944 3.36815C15.4449 3.48702 15.5841 3.61802 15.7104 3.75967C16.4218 4.55763 16.4923 5.71349 16.4992 7.875V8.25" stroke="#5A5A5A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.875 8.625C10.875 9.66053 10.0355 10.5 9 10.5C7.96447 10.5 7.125 9.66053 7.125 8.625C7.125 7.58947 7.96447 6.75 9 6.75C10.0355 6.75 10.875 7.58947 10.875 8.625Z" stroke="#5A5A5A" />
      </svg>

    },


  ];


  switch (role) {
    case 'host':
      return [
        ...baseItems.slice(0, 2), // Dashboard, My Bookings
        { label: 'My Experiences', href: '/dashboard/experiences', icon: <Tag size={20} /> },
        { label: 'Bookings', href: '/dashboard/bookings', icon: <Calendar size={20} /> },
        { label: 'Earnings', href: '/dashboard/earnings', icon: <CreditCard size={20} /> },
        ...baseItems.slice(6), // Reviews, Payment, Settings, Help
      ];
    case 'facilitator':
      return [
        ...baseItems.slice(0, 2), // Dashboard, My Bookings
        { label: 'Facilitated Tours', href: '/dashboard/facilitated', icon: <Video size={20} /> },
        { label: 'Schedule', href: '/dashboard/schedule', icon: <Calendar size={20} /> },
        ...baseItems.slice(6), // Reviews, Payment, Settings, Help
      ];
    case 'translator':
      return [
        ...baseItems.slice(0, 2), // Dashboard, My Bookings
        { label: 'Translation Jobs', href: '/dashboard/translations', icon: <Globe size={20} /> },
        { label: 'Schedule', href: '/dashboard/schedule', icon: <Calendar size={20} /> },
        ...baseItems.slice(6), // Reviews, Payment, Settings, Help
      ];
    case 'admin':
      return [
        { label: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
        { label: 'Users', href: '/dashboard/users', icon: <Settings size={20} /> },
        { label: 'Experiences', href: '/dashboard/experiences', icon: <Tag size={20} /> },
        { label: 'Bookings', href: '/dashboard/bookings', icon: <Calendar size={20} /> },
        { label: 'Reports', href: '/dashboard/reports', icon: <Star size={20} /> },
        { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
      ];
    default: // guest
      return baseItems;
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { user, isAuthenticated, isLoading } = useAuthStore();
  console.log('[DashboardLayout] user:', user, 'isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  const router = useRouter();

  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('English');


  // Guard: show loading or redirect if not authenticated
  useEffect(() => {
    console.log("Auth Store User:", user, "and is authenticated", isAuthenticated);
    if (!isLoading && (!user || !isAuthenticated)) {
      router.push('/');
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (isLoading) {
    <Skeleton />
  }

  if (!user || !isAuthenticated) {
    // Optionally show a loading spinner or nothing while redirecting
    return null;
  }

  const sidebarItems = getSidebarItems(user?.role?.toLowerCase?.() || '');

  const handleLogout = async () => {
    try {
      await logoutUser();
      // The logout function will handle redirecting to home page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 ">
            <Link href="/dashboard" className="lobster">
              Tourlity
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center relative gap-3 rounded-lg text-sm font-medium transition-colors  
                    ${isActive
                      ? 'text-primary-color font-semibold'
                      : 'secondary-text-color font-normal '
                    }
                  `}
                >
                  {isActive && (
                    <img src="/images/divider.svg" alt="Active" className="left-0" />
                  )}
                  <div className="flex items-center hover:text-[#F26457] relative gap-3 px-3 py-2 transition ">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                      </span>
                    )}
                  </div>

                </Link>
              );
            })}
          </nav>

          <nav className="flex-1 py-4 space-y-2 mt-10">
            {sidebarItemsTwo.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center relative gap-3 rounded-lg text-sm font-medium transition-colors  
                    ${isActive
                      ? 'text-primary-color font-semibold'
                      : 'secondary-text-color font-normal '
                    }
                  `}
                >
                  {isActive && (
                    <img src="/images/divider.svg" alt="Active" className="left-0" />
                  )}
                  <div className="flex items-center hover:text-[#F26457] relative gap-3 px-3 py-1 transition ">
                    {item.icon}
                    <span>{item.label}</span>

                  </div>

                </Link>
              );
            })}
          </nav>

          {/* Become A Host Button */}
          {user?.role === 'GUEST' && (
            <div className="px-4 pb-4">
              <Button variant='primary' className="w-full">
                Become A Host
              </Button>
            </div>
          )}

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Logout"
                >
                  <LogOut size={16} className="text-gray-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>

            {/* Welcome message */}
            <div className="flex-1 text-center lg:text-left lg:ml-4">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ) : (
                <h1 className="text-sm lg:text-[24px] font-plus-jakarta font-semibold text-gray-900">
                  Welcome {user?.firstName} 👋
                </h1>
              )
              }

            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 bg-background rounded-full">
                <Bell size={20} className="text-primary-color" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Messages */}
              <button className="p-2 bg-background rounded-full">
                <MessageCircleMore size={20} className="text-primary-color" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-5 h-5 rounded-full">
                    <img src="/images/flag.png" alt="English" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="description">{language}</span>
                  <ChevronDown size={16} className="muted-color" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
