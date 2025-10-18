import type { Tour } from "@/types"

export const tours: Tour[] = [
  {
    id: "1",
    title: "Bangkok Street Food Live!",
    description:
      "Join Chef Noi live as we explore Bangkok's vibrant street food scene. Ask questions and taste the culture!",
    price: 95,
    rating: 4.8,
    reviewCount: 76,
    location: "Bangkok, Thailand",
    country: "Thailand",
    duration: "3 hours",
    groupSize: "6-10 people",
    language: ["English", "Thai"],
    categories: ["Food and Cuisine", "Culture and History"],
    images: "/images/img_image.png", // ✅ from experiences
    host: {
      id: "host1",
      name: "Chef Noi",
      avatar: "/images/img_image_24x24.png", // ✅ from experiences
      rating: 4.9,
      reviewCount: 124,
      description: "Local Bangkok chef with 15 years experience",
      verified: true,
      responseTime: "1 hour",
      languages: ["English", "Thai"],
      location: "",
      reviews: 0,
      specialties: [],
      image: "/images/img_image_292x368.png", // ✅ synced
      isActive: false,
    },
    isLive: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Paris Rooftop Fashion Haul",
    description:
      "Exclusive live fashion haul from a Parisian rooftop. Discover the latest trends with stylist Chloé. An unforgettable experience!",
    price: 125,
    rating: 4.7,
    reviewCount: 52,
    location: "Paris, France",
    country: "France",
    duration: "2 hours",
    groupSize: "8-12 people",
    language: ["English", "French"],
    categories: ["Arts and Crafts", "Nature and Outdoors"],
    images: "/images/img_image_3.png", // ✅ from experiences
    host: {
      id: "host2",
      name: "Chloé",
      avatar: "/images/img_image_24x24.png", // ✅ from experiences
      rating: 4.8,
      reviewCount: 89,
      description: "Parisian fashion stylist and influencer",
      verified: true,
      responseTime: "2 hours",
      languages: ["English", "French"],
      location: "",
      reviews: 0,
      specialties: [],
      image: "/images/img_image_3.png", // ✅ synced
      isActive: false,
    },
    isFeatured: true,
  },
  {
    id: "3",
    title: "Andes Mountain Hiking Adventure",
    description:
      "Kayak beneath towering cliffs, waterfalls, and wildlife in one of nature's most breathtaking settings.",
    price: 60,
    rating: 4.8,
    reviewCount: 91,
    location: "Milford, New Zealand",
    country: "New Zealand",
    duration: "4 hours",
    groupSize: "6-12 people",
    language: ["English"],
    categories: ["Nature and Outdoors"],
    images: "/imagesimg_image_10.jpg", // ✅ from experiences
    host: {
      id: "host4",
      name: "Sandra",
      avatar: "/images/img_image_2.png", // ✅ from experiences
      rating: 4.9,
      reviewCount: 156,
      description: "Adventure guide specializing in Milford Sound",
      verified: true,
      responseTime: "1 hour",
      languages: ["English"],
      location: "",
      reviews: 0,
      specialties: [],
      image: "/imagesimg_image_10.jpg", // ✅ synced
      isActive: false,
    },
  },
  {
    id: "4",
    title: "Paris Rooftop Fashion Haul",
    description:
      "Exclusive live fashion haul from a Parisian rooftop. Discover the latest trends with stylist Chloé. An unforgettable experience!",
    price: 125,
    rating: 4.7,
    reviewCount: 52,
    location: "Paris, France",
    country: "France",
    duration: "2 hours",
    groupSize: "8-12 people",
    language: ["English", "French"],
    categories: ["Arts and Crafts", "Nature and Outdoors"],
    images: "/images/img_image_3.png", // ✅ same as experience 3
    host: {
      id: "host2",
      name: "Chloé",
      avatar: "/images/img_image_24x24.png", // ✅ from experiences
      rating: 4.8,
      reviewCount: 89,
      description: "Parisian fashion stylist and influencer",
      verified: true,
      responseTime: "2 hours",
      languages: ["English", "French"],
      location: "",
      reviews: 0,
      specialties: [],
      image: "/images/img_image_3.png",
      isActive: false,
    },
  },
  {
    id: "5",
    title: "Bangkok Street Food Live!",
    description:
      "Join Chef Noi live as we explore Bangkok's vibrant street food scene. Ask questions and taste the culture!",
    price: 95,
    rating: 4.8,
    reviewCount: 76,
    location: "Bangkok, Thailand",
    country: "Thailand",
    duration: "3 hours",
    groupSize: "6-10 people",
    language: ["English", "Thai"],
    categories: ["Food and Cuisine", "Culture and History"],
    images: "/images/img_image_292x368.png", // ✅ from experiences
    host: {
      id: "host1",
      name: "Chef Noi",
      avatar: "/images/img_image_24x24.png", // ✅ from experiences
      rating: 4.9,
      reviewCount: 124,
      description: "Local Bangkok chef with 15 years experience",
      verified: true,
      responseTime: "1 hour",
      languages: ["English", "Thai"],
      location: "",
      reviews: 0,
      specialties: [],
      image: "/images/img_image_292x368.png", // ✅ synced
      isActive: false,
    },
    isLive: true,
  },
]
