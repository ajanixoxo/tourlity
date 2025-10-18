/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  UserCheck,
  FileText,
  Calendar,
  MessageSquare,
  CreditCard,
  FolderOpen,
  BarChart3,
  Bell,
  ChevronDown,
} from "lucide-react"
import Button from "../root/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Verification & Approval",
    href: "/admin/verification",
    icon: UserCheck,
  },
  {
    title: "Listing Moderation",
    href: "/admin/listings",
    icon: FileText,
  },
  {
    title: "Booking Oversight",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Support Resolution",
    href: "/admin/support",
    icon: MessageSquare,
  },
  {
    title: "Payment Management",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Content Management",
    href: "/admin/content",
    icon: FolderOpen,
  },
  {
    title: "Analytics & Performance",
    href: "/admin/analytics",
    icon: BarChart3,
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary-color">
              Tourlity
            </Link>
            <h1 className="text-xl font-medium text-gray-900">Welcome Crownz 👋</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <img src="/uk-flag.png" alt="English" className="w-6 h-6 rounded" />
              <span className="text-sm text-gray-700">English</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-coral-50 text-coral-600" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/crownz-profile.jpg" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Crownz Design</p>
                <p className="text-xs text-gray-500 truncate">Crownzdesign@gm...</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
