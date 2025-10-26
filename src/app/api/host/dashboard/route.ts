import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerUser } from "@/lib/get-server-user"
import { format, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns"

export async function GET() {
  try {
    // Get authenticated user
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "HOST") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get date ranges
    const today = new Date()
    const last30Days = subDays(today, 30)
    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)

    // Fetch all required data in parallel
    const [
      tourStats,
      bookingStats,
      monthlyStats,
      reviews,
      recentActivity,
      pendingTours
    ] = await Promise.all([
      // Tour statistics
      prisma.tour.aggregate({
        where: {
          hostId: user.id,
          status: 'ACTIVE'
        },
        _count: {
          _all: true,
        },
        _avg: {
          rating: true
        }
      }),

      // Booking statistics
      prisma.booking.aggregate({
        where: {
          tour: {
            hostId: user.id
          },
          status: 'COMPLETED',
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

      // Monthly statistics
      prisma.booking.aggregate({
        where: {
          tour: {
            hostId: user.id
          },
          status: 'COMPLETED',
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

      // Recent reviews
      prisma.review.findMany({
        where: {
          tour: {
            hostId: user.id
          }
        },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          tour: {
            select: {
              id: true,
              title: true
            }
          },
          reviewer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }),

      // Recent activity (bookings)
      prisma.booking.findMany({
        where: {
          tour: {
            hostId: user.id
          }
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          amount: true,
          tour: {
            select: {
              id: true,
              title: true,
              images: true
            }
          },
          guest: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      }),

      // Pending tours count
      prisma.tour.count({
        where: {
          hostId: user.id,
          status: 'PENDING_APPROVAL'
        }
      })
    ])

    // Calculate chart data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, i)
      return date
    }).reverse()

    // Get bookings data for each day
    const bookingsData = await Promise.all(
      last7Days.map(async (date) => {
        const dayStart = startOfDay(date)
        const dayEnd = endOfDay(date)
        
        const count = await prisma.booking.count({
          where: {
            tour: {
              hostId: user.id
            },
            createdAt: {
              gte: dayStart,
              lte: dayEnd
            }
          }
        })

        return {
          name: format(date, 'MMM dd'),
          value: count
        }
      })
    )

    const chartData = bookingsData

    // Transform reviews into required format
    const reviewHighlights = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      text: review.comment,
      tourName: review.tour.title,
      guestName: `${review.reviewer.firstName} ${review.reviewer.lastName}`
    }))

    // Transform activity into required format
    const activities = recentActivity.map(booking => ({
      id: booking.id,
      tourName: booking.tour?.title ?? "Tour",
      guest: `${booking.guest?.firstName ?? ""} ${booking.guest?.lastName ?? ""}`,
      status: booking.status.toLowerCase() as "completed" | "pending" | "cancelled",
      dateTime: new Date(booking.createdAt).toLocaleString()
    }))

    // Get upcoming tours count (tours with future start dates)
    const upcomingToursCount = await prisma.tour.count({
      where: {
        hostId: user.id,
        status: 'ACTIVE',
        startDate: {
          gt: new Date()
        }
      }
    })

    // Get pending reviews count (bookings completed without reviews)
    const pendingReviewsCount = await prisma.booking.count({
      where: {
        tour: {
          hostId: user.id
        },
        status: 'COMPLETED',
        // review: null
      }
    })

    const dashboardData = {
      metrics: [
        {
          title: "Total Tours",
          value: tourStats._count._all,
          change: "+0% from last month",
          changeType: "positive",
          icon: "plane"
        },
        {
          title: "Total Earnings",
          value: `$${bookingStats._sum.amount || 0}`,
          change: `+${monthlyStats._sum.amount || 0}% this month`,
          changeType: "positive",
          icon: "dollar"
        },
        {
          title: "Average Rating",
          value: tourStats._avg.rating?.toFixed(1) || "0.0",
          change: "No change",
          changeType: "positive",
          icon: "star"
        },
        {
          title: "Monthly Bookings",
          value: monthlyStats._count._all,
          change: `${monthlyStats._count._all} new this month`,
          changeType: "positive",
          icon: "calendar"
        }
      ],
      chartData,
      quickActions: [
        {
          id: "pending-tours",
          title: "Pending Tour Approvals",
          description: `You have ${pendingTours} tours pending approval`,
          icon: "plane",
          status: pendingTours > 0 ? "warning" : "info"
        },
        {
          id: "upcoming-tours",
          title: "Upcoming Tours",
          description: `${upcomingToursCount} tours scheduled`,
          icon: "calendar",
          status: "info"
        },
        {
          id: "pending-reviews",
          title: "Pending Reviews",
          description: `${pendingReviewsCount} reviews need attention`,
          icon: "star",
          status: pendingReviewsCount > 0 ? "warning" : "info"
        },
        {
          id: "messages",
          title: "Message Requests",
          description: "No new messages",
          icon: "message",
          status: "info"
        }
      ],
      recentActivity: activities,
      reviewHighlights,
      hasData: tourStats._count._all > 0
    }
 console.log(dashboardData)
    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error("Error in host dashboard:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
