import { Host } from "@/types";
export const hosts: Host[] = [
    {
        id: "1",
        name: 'Marco Rossi',
        location: 'Rome Italy',
        rating: 4.8,
        reviews: 75,
        description: 'Passionate chef with 20+ years of experience sharing authentic Roman cuisine and family recipes passed down for generations.',
        specialties: ['Cooking', 'Food Tour', 'Wine Tasting'],
        image: '/images/img_image_292x372.png',
        isActive: true,
        avatar: "",
        reviewCount: 0,
        verified: false,
        responseTime: "",
        languages: []
    },
    {
        id: "2",
        name: 'Akiko Tanaka',
        location: 'Kyoto, Japan',
        rating: 5.0,
        reviews: 197,
        description: 'Tea ceremony master and cultural historian offering authentic Japanese experiences and insights into traditional arts and customs.',
        specialties: ['Tea Ceremony', 'Cultural Tour', 'Calligraphy'],
        image: '/images/img_image_8.png',
        isActive: false,
        avatar: "",
        reviewCount: 0,
        verified: false,
        responseTime: "",
        languages: []
    },
    {
        id: "3",
        name: 'Isabella Santos',
        location: 'Rio de Janeiro, Brazil',
        rating: 4.6,
        reviews: 54,
        description: 'Professional samba dancer and carnival performer sharing the rhythm and joy of Brazilian culture through dance, music, and local experiences.',
        specialties: ['Dance', 'Carnival', 'Music'],
        image: '/images/img_image_10.png',
        isActive: false,
        avatar: "",
        reviewCount: 0,
        verified: false,
        responseTime: "",
        languages: []
    }
  ];