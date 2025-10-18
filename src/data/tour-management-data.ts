import type { TourListing, CustomTourRequest, SavedTour, Booking, HostBooking, HostProposal, BookingReceipt, PaymentSummary, Review } from "@/types/tour-management"

export const myTours: TourListing[] = [
  {
    id: "1",
    title: "Bangkok Street Food Live!",
    description:
      "Join Chef Noi live as she explores Bangkok's vibrant street food scene. Ask questions and taste the culture!",
    categories: ["Food and Cuisine", "Culture and History"],
    location: "Queensland, Australia",
    rating: 4.8,
    reviewCount: 75,
    price: 95,
    image: "/images/img_image.png",
    host: {
      name: "Chloé",
      avatar: "/images/img_image_24x24.png",
    },
    status: "upcoming",
  },
  {
    id: "2",
    title: "Paris Rooftop Fashion Haul",
    description:
      "Exclusive live fashion haul from a Parisian rooftop. Discover the latest trends with stylist Chloé. An unforgettable experience!",
    categories: ["Arts and Crafts", "Nature and Outdoors"],
    location: "Paris, France",
    rating: 4.8,
    reviewCount: 75,
    price: 125,
    image: "/images/img_image_3.png",
    host: {
      name: "Chloé",
      avatar: "/images/img_image_24x24.png",
    },
    status: "upcoming",
  },
]

export const customTourRequests: CustomTourRequest[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    tourType: ["Arts and Crafts", "Nature and Outdoors"],
    location: "Paris, France",
    dateTime: "September 15, 2025 at 9:00 AM",
    groupInfo: "4 People",
    assistanceNeeded: "Translator, Facilitator",
    description:
      "Looking for an educational tour focusing on French Revolution sites and museums. Would appreciate interactive elements suitable for high school students.",
    status: "pending",
    priceRange: "$400-$500",
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    tourType: ["Arts and Crafts", "Nature and Outdoors"],
    location: "Paris, France",
    dateTime: "September 15, 2025 at 9:00 AM",
    groupInfo: "4 People",
    assistanceNeeded: "Translator, Facilitator",
    description:
      "Looking for an educational tour focusing on French Revolution sites and museums. Would appreciate interactive elements suitable for high school students.",
    status: "declined",
    priceRange: "$400-$500",
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    tourType: ["Arts and Crafts", "Nature and Outdoors"],
    location: "Paris, France",
    dateTime: "September 15, 2025 at 9:00 AM",
    groupInfo: "4 People",
    assistanceNeeded: "Translator, Facilitator",
    description:
      "Looking for an educational tour focusing on French Revolution sites and museums. Would appreciate interactive elements suitable for high school students.",
    status: "accepted",
    priceRange: "$400-$500",
  },
  {
    id: "4",
    title: "Historic Downtown Walking Tour",
    tourType: ["Arts and Crafts", "Nature and Outdoors"],
    location: "Paris, France",
    dateTime: "September 15, 2025 at 9:00 AM",
    groupInfo: "4 People",
    assistanceNeeded: "Translator, Facilitator",
    description:
      "Looking for an educational tour focusing on French Revolution sites and museums. Would appreciate interactive elements suitable for high school students.",
    status: "negotiating",
    priceRange: "$400-$500",
  },
]

export const savedTours: SavedTour[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    dateTime: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    host: {
      name: "Maria Santos",
      avatar: "/images/img_image_2.png",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/images/img_image_2.png",
    },
    image: "/images/img_image_10.jpg",
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    dateTime: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    host: {
      name: "Maria Santos",
      avatar: "/images/img_image_2.png",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/images/img_image_2.png",
    },
    image: "/images/img_image_10.jpg",
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    dateTime: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    host: {
      name: "Maria Santos",
      avatar: "/images/img_image_2.png",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/images/img_image_2.png",
    },
    image: "/images/img_image_10.jpg",
  },
]

export const bookings: Booking[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    dateTime: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    host: {
      name: "Maria Santos",
      avatar: "/images/img_image_2.png",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/images/img_image_2.png",
    },
    image: "/images/img_image_10.jpg",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    dateTime: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    host: {
      name: "Maria Santos",
      avatar: "/images/img_image_2.png",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/images/img_image_2.png",
    },
    image: "/images/img_image_10.jpg",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    dateTime: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    host: {
      name: "Maria Santos",
      avatar: "/images/img_image_2.png",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/images/img_image_2.png",
    },
    image: "/images/img_image_10.jpg",
    status: "in-progress",
  },
]
export const hostProposals: HostProposal[] = [
  {
    id: "1",
    hostName: "Marco Rossi",
    hostRole: "Cooking Experience Host",
    hostAvatar: "/images/img_image_2.png",
    rating: 4.8,
    reviewCount: 75,
    baseTourPrice: 520,
    additionalServices: [
      { name: "Wheelchair Access", price: 30 },
      { name: "Skip-the-line", price: 25 },
    ],
    totalPrice: 575,
    responseTime: "Responds in 2-4 hours",
  },
  {
    id: "2",
    hostName: "Marco Rossi",
    hostRole: "Cooking Experience Host",
    hostAvatar: "/images/img_image_2.png",
    rating: 4.8,
    reviewCount: 75,
    baseTourPrice: 520,
    additionalServices: [
      { name: "Wheelchair Access", price: 30 },
      { name: "Skip-the-line", price: 25 },
    ],
    totalPrice: 575,
    responseTime: "Responds in 2-4 hours",
  },
  {
    id: "3",
    hostName: "Marco Rossi",
    hostRole: "Cooking Experience Host",
    hostAvatar: "/images/img_image_2.png",
    rating: 4.8,
    reviewCount: 75,
    baseTourPrice: 520,
    additionalServices: [
      { name: "Wheelchair Access", price: 30 },
      { name: "Skip-the-line", price: 25 },
    ],
    totalPrice: 575,
    responseTime: "Responds in 2-4 hours",
  },
]

export const hostBookings: HostBooking[] = [
  {
    id: "1",
    title: "Street Food Safari",
    amount: 450.54,
    dateTime: "Jul 01, 2025 9:00 am",
    status: "completed",
    guestName: "John Doe",
    guestAvatar: "/images/img_image_10.jpg",
  },
  {
    id: "2",
    title: "Lagos By Night",
    amount: 589.99,
    dateTime: "Jun 28, 2025 9:00 am",
    status: "pending",
    guestName: "Jane Smith",
    guestAvatar: "/images/img_image_10.jpg",
  },
  {
    id: "3",
    title: "Lagos By Night",
    amount: 589.99,
    dateTime: "Jun 28, 2025 9:00 am",
    status: "pending",
    guestName: "Jane Smith",
    guestAvatar: "/images/img_image_10.jpg",
  },
  {
    id: "4",
    title: "Food Market Experience",
    amount: 406.27,
    dateTime: "Jun 20, 2025 9:00 am",
    status: "in-progress",
    guestName: "Bob Johnson",
    guestAvatar: "/images/img_image_10.jpg",
  },
  {
    id: "5",
    title: "Lagos By Night",
    amount: 589.99,
    dateTime: "Jun 28, 2025 9:00 am",
    status: "pending",
    guestName: "Jane Smith",
    guestAvatar: "/images/img_image_10.jpg",
  },
]

export const bookingReceipt: BookingReceipt = {
  id: "1",
  receiptNumber: "#RCP-2025-00214",
  issuedDate: "08 September 2025",
  tourName: "Lagos By Night",
  status: "completed",
  dateTime: "Jul 01, 2025 9:00 am",
  location: "Ikeja, Lagos",
  tourId: "#002247",
  customerDetails: {
    name: "Crownz",
    email: "Crownz001@gmail.com",
    phone: "08012345678",
  },
  hostDetails: {
    name: "Crownz",
    email: "Crownz001@gmail.com",
    emergencyContact: "08012345678",
  },
  paymentDetails: {
    amount: 589.0,
    method: "Paypal",
    transactionId: "00112233445566",
    transactionDate: "Jul 01, 2025",
  },
}

export const paymentSummary: PaymentSummary = {
  hostFee: 850.0,
  facilitatorFee: 150.0,
  translatorFee: 200.0,
  platformFee: 45.0,
  taxes: 98.4,
  total: 1343.4,
}

export const amenitiesOptions = [
  { id: "special-deals", label: "Special deals", icon: "Tag" },
  { id: "adventure", label: "Adventure", icon: "Mountain" },
  { id: "things-to-do", label: "Things to do", icon: "List" },
  { id: "sport", label: "Sport", icon: "Trophy" },
  { id: "food", label: "Food", icon: "UtensilsCrossed" },
  { id: "solo", label: "Solo", icon: "User" },
  { id: "water-activity", label: "Water Activity", icon: "Waves" },
  { id: "mobile-ticketing", label: "Mobile Ticketing", icon: "Smartphone" },
  { id: "stay", label: "Stay", icon: "Hotel" },
  { id: "accessibility", label: "Accessibility", icon: "Accessibility" },
  { id: "wifi", label: "Wi-Fi", icon: "Wifi" },
  { id: "instructor", label: "Instructor", icon: "GraduationCap" },
  { id: "luxury", label: "Luxury", icon: "Crown" },
  { id: "reserve-pay-later", label: "Reserve Now and Pay Later", icon: "Calendar" },
  { id: "transfer", label: "Transfer", icon: "Car" },
]

export const reviews: Review[] = [
  {
    id: "1",
    hostName: "Marco Rossi",
    hostRole: "Cooking Experience Host",
    hostAvatar: "/images/img_image_2.png",
    reviewText:
      "Sharing my family's pasta-making traditions has been incredibly rewarding. I've met amazing people from around the world and built a thriving business doing what I love.",
    rating: 4.3,
    reviewCount: 98,
  },
  {
    id: "2",
    hostName: "Yuki Tanaka",
    hostRole: "Tea Ceremony Host",
    hostAvatar: "/images/img_image_10.jpg",
    reviewText:
      "Hosting tea ceremonies allows me to preserve and share our cultural heritage. It's wonderful to see guests discover the beauty and tranquility of this ancient practice.",
    rating: 4.8,
    reviewCount: 75,
  },
  {
    id: "3",
    hostName: "Sofia Martinez",
    hostRole: "Street Art Tour Host",
    hostAvatar: "/images/img_image_2.png",
    reviewText:
      "Through my street art tours, I've been able to showcase our city's creative spirit and support local artists. Every tour brings new perspectives and connections.",
    rating: 4.9,
    reviewCount: 300,
  },
  {
    id: "4",
    hostName: "Yuki Tanaka",
    hostRole: "Tea Ceremony Host",
    hostAvatar: "/images/img_image_10.jpg",
    reviewText:
      "Hosting tea ceremonies allows me to preserve and share our cultural heritage. It's wonderful to see guests discover the beauty and tranquility of this ancient practice.",
    rating: 4.8,
    reviewCount: 75,
  },
  {
    id: "5",
    hostName: "Sofia Martinez",
    hostRole: "Street Art Tour Host",
    hostAvatar: "/images/img_image_2.png",
    reviewText:
      "Through my street art tours, I've been able to showcase our city's creative spirit and support local artists. Every tour brings new perspectives and connections.",
    rating: 4.9,
    reviewCount: 300,
  },
  {
    id: "6",
    hostName: "Marco Rossi",
    hostRole: "Cooking Experience Host",
    hostAvatar: "/images/img_image_2.png",
    reviewText:
      "Sharing my family's pasta-making traditions has been incredibly rewarding. I've met amazing people from around the world and built a thriving business doing what I love.",
    rating: 4.3,
    reviewCount: 98,
  },
]