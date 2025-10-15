/**
 * Mock API functions to replace Supabase APIs temporarily
 * This allows the app to function while we migrate to Appwrite
 */

import {databases, DATABASE_ID, COLLECTIONS} from "./client";
import {ServiceCategories} from "../../types/database";
import {Query} from "appwrite";

// Mock Service type
export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  price_from?: number;
  rating?: number;
  reviews_count?: number;
  category?: string;
  created_at: string;
  updated_at: string;
}

// Mock Testimonial type
export interface Testimonial {
  id: string;
  customer_name: string;
  service_name: string;
  rating: number;
  comment: string;
  customer_avatar?: string;
  created_at: string;
  is_featured: boolean;
}

// Mock services data
const mockServices: Service[] = [
  {
    id: "1",
    name: "House Cleaning",
    description: "Professional deep cleaning for your home",
    slug: "house-cleaning",
    icon: "Sparkles",
    price_from: 99,
    rating: 4.8,
    reviews_count: 324,
    category: "cleaning",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Plumbing Services",
    description: "Expert plumbing repairs and installations",
    slug: "plumbing-services",
    icon: "Droplets",
    price_from: 149,
    rating: 4.9,
    reviews_count: 256,
    category: "maintenance",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Electrical Services",
    description: "Safe and reliable electrical work",
    slug: "electrical-services",
    icon: "Zap",
    price_from: 129,
    rating: 4.7,
    reviews_count: 198,
    category: "maintenance",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Handyman Services",
    description: "General repairs and maintenance",
    slug: "handyman-services",
    icon: "Wrench",
    price_from: 89,
    rating: 4.6,
    reviews_count: 142,
    category: "maintenance",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Painting Services",
    description: "Professional interior and exterior painting",
    slug: "painting-services",
    icon: "PaintBucket",
    price_from: 199,
    rating: 4.8,
    reviews_count: 267,
    category: "improvement",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Pest Control",
    description: "Safe and effective pest elimination",
    slug: "pest-control",
    icon: "Bug",
    price_from: 179,
    rating: 4.9,
    reviews_count: 189,
    category: "maintenance",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock testimonials data
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    customer_name: "Fatima Al-Zarooni",
    service_name: "House Cleaning",
    rating: 5,
    comment:
      "Outstanding service! The AL-Kabir team transformed my villa. Every corner was spotless, and they used eco-friendly products which is important for my children.",
    customer_avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    is_featured: true,
  },
  {
    id: "2",
    customer_name: "Mohammed Hassan",
    service_name: "House Cleaning",
    rating: 5,
    comment:
      "Best cleaning service in Dubai, hands down. Professional team, eco-friendly products, excellent results, and fair pricing.",
    customer_avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    is_featured: true,
  },
  {
    id: "3",
    customer_name: "Sarah Ahmed",
    service_name: "House Cleaning",
    rating: 5,
    comment:
      "Excellent deep cleaning service! My apartment looks brand new. The team paid attention to every detail.",
    customer_avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
    is_featured: true,
  },
  {
    id: "4",
    customer_name: "Ahmed Al-Mansoori",
    service_name: "Plumbing",
    rating: 5,
    comment:
      "Fixed our water heater quickly and professionally! The plumber arrived on time with all the necessary equipment.",
    customer_avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    is_featured: true,
  },
  {
    id: "5",
    customer_name: "Lisa Anderson",
    service_name: "Plumbing",
    rating: 5,
    comment:
      "Emergency service was excellent. They arrived within 30 minutes of my call and fixed the burst pipe immediately.",
    customer_avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    is_featured: true,
  },
];

// Mock API functions
export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockServices;
  },

  getById: async (id: string): Promise<Service | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockServices.find((service) => service.id === id) || null;
  },

  getBySlug: async (slug: string): Promise<Service | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockServices.find((service) => service.slug === slug) || null;
  },

  getFeatured: async (): Promise<Service[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockServices.slice(0, 4); // Return first 4 as featured
  },
};

export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTestimonials;
  },

  getFeatured: async (): Promise<Testimonial[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockTestimonials.filter((testimonial) => testimonial.is_featured);
  },

  getByService: async (serviceName: string): Promise<Testimonial[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTestimonials.filter((testimonial) =>
      testimonial.service_name.toLowerCase().includes(serviceName.toLowerCase())
    );
  },
};

// Categories API - Real Appwrite integration
export const categoriesApi = {
  getAll: async (): Promise<ServiceCategories[]> => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SERVICE_CATEGORIES,
        [Query.equal("is_active", true), Query.orderAsc("display_order")]
      );
      return response.documents as unknown as ServiceCategories[];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getById: async (categoryId: string): Promise<ServiceCategories | null> => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.SERVICE_CATEGORIES,
        categoryId
      );
      return response as unknown as ServiceCategories;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  },

  getBySlug: async (slug: string): Promise<ServiceCategories | null> => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SERVICE_CATEGORIES,
        [Query.equal("slug", slug), Query.equal("is_active", true)]
      );
      return response.documents.length > 0
        ? (response.documents[0] as unknown as ServiceCategories)
        : null;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }
  },
};

// Export types and mock data for easy access
export {mockServices, mockTestimonials};
