import type { DashboardData } from "./dashboard"

// Host Dashboard Data
export const hostDashboardData: DashboardData = {
  metrics: [
    {
      title: "Active Tours",
      value: 3,
      change: "+0.5%",
      changeType: "positive",
      icon: "plane",
    },
    {
      title: "Total Earnings",
      value: "$245,000",
      change: "-0.5%",
      changeType: "negative",
      icon: "dollar",
    },
    {
      title: "Avg. Guest Rating",
      value: 4.8,
      change: "+0.5%",
      changeType: "positive",
      icon: "star",
    },
    {
      title: "Tour Views",
      value: 100,
      change: "-0.5%",
      changeType: "negative",
      icon: "eye",
    },
  ],
  chartData: [
    { name: "Jan", value: 900 },
    { name: "Feb", value: 450 },
    { name: "Mar", value: 1000 },
    { name: "Apr", value: 700 },
    { name: "May", value: 900 },
    { name: "Jun", value: 750 },
    { name: "Jul", value: 700 },
    { name: "Aug", value: 1000 },
    { name: "Sep", value: 1000 },
    { name: "Oct", value: 600 },
    { name: "Nov", value: 850 },
    { name: "Dec", value: 600 },
  ],
  quickActions: [
    {
      id: "1",
      title: "Tour update",
      description: "Your tour 'Island Walk' is pending approval",
      icon: "plane",
      status: "info",
    },
    {
      id: "2",
      title: "Bookings update",
      description: "You have 2 pending bookings for this weekend",
      icon: "calendar",
      status: "warning",
    },
  ],
  recentActivity: [
    {
      id: "1",
      tourName: "Street Food Safari",
      guest: "Michael Stevens",
      status: "completed",
      dateTime: "Jul 01, 2025 9:00 am",
    },
    {
      id: "2",
      tourName: "Lagos By Night",
      guest: "Sophia Rodriguez",
      status: "pending",
      dateTime: "Jun 28, 2025 9:00 am",
    },
  ],
  reviewHighlights: [
    {
      id: "1",
      rating: 5,
      text: "Marco's pasta-making class was the highlight of our trip to Rome! His knowledge of Italian cuisine and warm personality made for an unforgettable experience. We not only learned how to make authentic pasta but also about the history and culture behind the dishes.",
      tourName: "Street Food Safari",
      guestName: "Michael Stevens",
    },
  ],
  hasData: true,
}

// Facilitator Dashboard Data
export const facilitatorDashboardData: DashboardData = {
  metrics: [
    {
      title: "Assigned Tours",
      value: 24,
      change: "+0.5%",
      changeType: "positive",
      icon: "plane",
    },
    {
      title: "Upcoming Sessions",
      value: 8,
      change: "-0.5%",
      changeType: "negative",
      icon: "calendar",
    },
    {
      title: "Translator Requests",
      value: 3,
      change: "+0.5%",
      changeType: "positive",
      icon: "languages",
    },
    {
      title: "Avg. Completion Score",
      value: 4.8,
      change: "-0.5%",
      changeType: "negative",
      icon: "star",
    },
  ],
  chartData: [
    { name: "Mon", value: 15 },
    { name: "Tue", value: 8 },
    { name: "Wed", value: 4 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 7 },
    { name: "Sat", value: 5 },
    { name: "Sun", value: 10 },
  ],
  quickActions: [
    {
      id: "1",
      title: "Tour in progress",
      description: "City Walking Tour - Group A",
      icon: "plane",
    },
    {
      id: "2",
      title: "Pending Report",
      description: "Museum Tour - Due in 2 hours",
      icon: "file",
    },
    {
      id: "3",
      title: "Translator Assigned",
      description: "Spanish - Tomorrow's Tour",
      icon: "languages",
    },
    {
      id: "4",
      title: "Missing Checklist",
      description: "Pre-tour requirements incomplete",
      icon: "checklist",
    },
  ],
  recentActivity: [
    {
      id: "1",
      tourName: "Historical District Tour",
      host: "Michael Stevens",
      status: "completed",
      dateTime: "Jul 01, 2025 9:00 am",
    },
  ],
  reviewHighlights: [
    {
      id: "1",
      rating: 5,
      text: "Marco's pasta-making class was the highlight of our trip to Rome! His knowledge of Italian cuisine and warm personality made for an unforgettable experience. We not only learned how to make authentic pasta but also about the history and culture behind the dishes.",
    },
  ],
  hasData: true,
}

// Translator Dashboard Data
export const translatorDashboardData: DashboardData = {
  metrics: [
    {
      title: "Assigned Tours",
      value: 24,
      change: "+0.5%",
      changeType: "positive",
      icon: "plane",
    },
    {
      title: "Upcoming Sessions",
      value: 8,
      change: "-0.5%",
      changeType: "negative",
      icon: "calendar",
    },
    {
      title: "Avg. Completion Score",
      value: 4.6,
      change: "+0.5%",
      changeType: "positive",
      icon: "star",
    },
    {
      title: "Earnings",
      value: "$300",
      change: "-0.5%",
      changeType: "negative",
      icon: "dollar",
    },
  ],
  chartData: [
    { name: "Mon", value: 15 },
    { name: "Tue", value: 8 },
    { name: "Wed", value: 4 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 7 },
    { name: "Sat", value: 5 },
    { name: "Sun", value: 10 },
  ],
  quickActions: [
    {
      id: "1",
      title: "Tour starting Soon",
      description: "City Walking Tour - In 5 mins",
      icon: "plane",
    },
    {
      id: "2",
      title: "Prep Material Available",
      description: "Museum Tour - Due in 2 hours",
      icon: "file",
    },
    {
      id: "3",
      title: "Translate Live",
      description: "Spanish - Tomorrow's Tour",
      icon: "languages",
    },
    {
      id: "4",
      title: "Feedback Requested",
      description: "Japan Tour Experience",
      icon: "message",
    },
  ],
  recentActivity: [
    {
      id: "1",
      tourName: "Historical District Tour",
      host: "Michael Stevens",
      status: "completed",
      dateTime: "Jul 01, 2025 9:00 am",
    },
  ],
  reviewHighlights: [
    {
      id: "1",
      rating: 5,
      text: "Marco's pasta-making class was the highlight of our trip to Rome! His knowledge of Italian cuisine and warm personality made for an unforgettable experience. We not only learned how to make authentic pasta but also about the history and culture behind the dishes.",
    },
  ],
  hasData: true,
}

// Empty state data
export const emptyDashboardData: DashboardData = {
  metrics: [
    {
      title: "Active Tours",
      value: 0,
      change: "+0.5%",
      changeType: "positive",
      icon: "plane",
    },
    {
      title: "Total Earnings",
      value: 0,
      change: "-0.5%",
      changeType: "negative",
      icon: "dollar",
    },
    {
      title: "Avg. Guest Rating",
      value: 0,
      change: "+0.5%",
      changeType: "positive",
      icon: "star",
    },
    {
      title: "Tour Views",
      value: 0,
      change: "-0.5%",
      changeType: "negative",
      icon: "eye",
    },
  ],
  chartData: [],
  quickActions: [],
  recentActivity: [],
  reviewHighlights: [],
  hasData: false,
}
