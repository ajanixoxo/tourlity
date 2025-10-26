import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerUser } from "@/lib/get-server-user"
import { format, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns"

export async function GET() {
  try {
    // Get authenticated user and verify admin role
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const today = new Date()
    const last30Days = subDays(today, 30)
    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)

    // Fetch all required data in parallel
    const [
      userStats,
      tourStats,
      bookingStats,
      monthlyStats,
      pendingTours,
      pendingHosts,
      recentTours
    ] = await Promise.all([
      // User statistics
      prisma.user.groupBy({
        by: ['role'],
        _count: {
          _all: true
        },
        where: {
          NOT: {
            role: 'ADMIN'
          }
        }
      }),

      // Tour statistics
      prisma.tour.aggregate({
        _count: {
          _all: true
        },
        _sum: {
          currentInPersonSlots: true,
          currentVirtualSlots: true
        },
        _avg: {
          rating: true
        }
      }),

      // Booking statistics for last 30 days
      prisma.booking.aggregate({
        where: {
          createdAt: {
            gte: last30Days
          }
        },
        _count: {
          _all: true
        },
        _sum: {
          amount: true
        }
      }),

      // Monthly booking statistics
      prisma.booking.aggregate({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd
          }
        },
        _count: {
          _all: true
        },
        _sum: {
          amount: true
        }
      }),

      // Pending tour approvals
      prisma.tour.count({
        where: {
          status: 'PENDING_APPROVAL'
        }
      }),

      // Pending host verifications
      prisma.user.count({
        where: {
          role: 'HOST',
          status: 'PENDING'
        }
      }),

      // Recent tour listings
      prisma.tour.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          host: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          },
          _count: {
            select: {
              bookings: true,
              reviews: true
            }
          }
        }
      })
    ])

    // Calculate chart data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, i)
      return date
    }).reverse()

    // Get daily metrics
    const dailyMetrics = await Promise.all(
      last7Days.map(async (date) => {
        const dayStart = startOfDay(date)
        const dayEnd = endOfDay(date)
        
        const [bookings, revenue, newUsers] = await Promise.all([
          // Daily bookings
          prisma.booking.count({
            where: {
              createdAt: {
                gte: dayStart,
                lte: dayEnd
              }
            }
          }),
          // Daily revenue
          prisma.booking.aggregate({
            where: {
              createdAt: {
                gte: dayStart,
                lte: dayEnd
              }
            },
            _sum: {
              amount: true
            }
          }),
          // New users
          prisma.user.count({
            where: {
              createdAt: {
                gte: dayStart,
                lte: dayEnd
              }
            }
          })
        ])

        return {
          name: format(date, 'MMM dd'),
          bookings,
          revenue: revenue._sum.amount || 0,
          users: newUsers
        }
      })
    )

    // Format user stats
    const userCounts = {
      hosts: 0,
      guests: 0,
      facilitators: 0
    }
    userStats.forEach(stat => {
      if (stat.role === 'HOST') userCounts.hosts = stat._count._all
      if (stat.role === 'GUEST') userCounts.guests = stat._count._all
      if (stat.role === 'FACILITATOR') userCounts.facilitators = stat._count._all
    })

    const dashboardData = {
      metrics: [
        {
          title: "Total Users",
          value: userStats.reduce((acc, curr) => acc + curr._count._all, 0),
          change: "+12% from last month",
          changeType: "positive",
          icon: "users"
        },
        {
          title: "Total Revenue",
          value: `$${bookingStats._sum.amount || 0}`,
          change: `+$${monthlyStats._sum.amount || 0} this month`,
          changeType: "positive",
          icon: "dollar"
        },
        {
          title: "Active Tours",
          value: tourStats._count._all,
          change: "+5 new tours",
          changeType: "positive",
          icon: "plane"
        },
        {
          title: "Total Bookings",
          value: bookingStats._count._all,
          change: `${monthlyStats._count._all} this month`,
          changeType: "positive",
          icon: "calendar"
        }
      ],
      chartData: dailyMetrics,
      quickActions: [
        {
          id: "pending-tours",
          title: "Tour Approvals",
          description: `${pendingTours} tours need review`,
          icon: "plane",
          status: pendingTours > 0 ? "warning" : "info"
        },
        {
          id: "pending-hosts",
          title: "Host Verifications",
          description: `${pendingHosts} hosts awaiting verification`,
          icon: "users",
          status: pendingHosts > 0 ? "warning" : "info"
        },
        {
          id: "support",
          title: "Support Tickets",
          description: "No pending tickets",
          icon: "message",
          status: "info"
        }
      ],
      recentTours: recentTours.map(tour => ({
        id: tour.id,
        title: tour.title,
        status: tour.status,
        host: {
          name: `${tour.host.firstName} ${tour.host.lastName}`,
          avatar: tour.host.avatar
        },
        stats: {
          bookings: tour._count.bookings,
          reviews: tour._count.reviews
        }
      })),
      userStats: userCounts,
      hasData: true
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error("Error in admin dashboard:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
