import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Server API base URL
const serverUrl = `${supabaseUrl}/functions/v1/make-server-4b12d838`;

// Helper for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${serverUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  short_name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  price_from: number | null;
  price_to: number | null;
  rating: number | null;
  reviews_count: number | null;
  bookings_count: number | null;
  is_active: boolean;
}

export interface Booking {
  id: string;
  user_id: string | null;
  service_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_date: string;
  service_time: string;
  address: string;
  city: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_price: number | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_avatar: string | null;
  rating: number;
  comment: string;
  service_name: string | null;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

// Helper functions for common queries
export const servicesApi = {
  async getAll() {
    try {
      return await apiCall('/services');
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  async getBySlug(slug: string) {
    try {
      return await apiCall(`/services/${slug}`);
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  async getPopular(limit = 6) {
    try {
      const services = await apiCall('/services');
      return services.slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular services:', error);
      return [];
    }
  },
};

export const bookingsApi = {
  async create(booking: Partial<Booking>) {
    try {
      return await apiCall('/bookings', {
        method: 'POST',
        body: JSON.stringify(booking),
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  async getUserBookings(userId: string) {
    try {
      return await apiCall(`/bookings/${userId}`);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      return [];
    }
  },
};

export const testimonialsApi = {
  async getFeatured() {
    try {
      return await apiCall('/testimonials');
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  async getAll() {
    try {
      return await apiCall('/testimonials');
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },
};

export const profilesApi = {
  async get(userId: string) {
    // Use Supabase auth user metadata for now
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return {
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || null,
        phone: user.user_metadata?.phone || null,
        address: null,
        city: 'Dubai',
        avatar_url: null,
        created_at: user.created_at,
        updated_at: user.updated_at || user.created_at,
      } as Profile;
    }
    throw new Error('User not found');
  },

  async update(userId: string, updates: Partial<Profile>) {
    // Update user metadata
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    
    if (error) throw error;
    
    return {
      id: userId,
      ...updates,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Profile;
  },
};
