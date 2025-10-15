# AL-Kabir Supabase Integration Guide

## Overview

AL-Kabir is now fully integrated with Supabase for authentication and data management. This guide will help you understand the Supabase integration.

## Architecture

The application uses a hybrid architecture:
- **Supabase Auth** - For user authentication and session management
- **Key-Value Store** - For data persistence (services, bookings, testimonials)
- **Server API** - Edge functions handle data operations

## Data Storage

All data is stored in the Supabase key-value store with prefixed keys:

1. **services** - All services offered by AL-Kabir
   - Key format: `service:{slug}`
   - Includes: name, description, pricing, ratings, bookings count

2. **bookings** - Customer service bookings
   - Key format: `booking:{timestamp}-{random}`
   - Includes: customer details, service info, booking status

3. **testimonials** - Customer reviews
   - Key format: `testimonial:{id}`
   - Includes: customer name, rating, comment, service name

## Default Services

The server automatically initializes with 11 professional services:

1. **House Cleaning** - Deep cleaning service (AED 199-499)
2. **Office Cleaning** - Professional workspace cleaning (AED 299-799)
3. **Carpet Cleaning** - Steam cleaning for carpets (AED 149-399)
4. **Plumbing** - Expert plumbing services (AED 99-599)
5. **Electrical Work** - Licensed electrical services (AED 129-699)
6. **Pest Control** - Safe pest elimination (AED 179-449)
7. **Painting** - Interior & exterior painting (AED 249-1299)
8. **Moving Services** - Professional moving (AED 399-1499)
9. **Furniture Assembly** - Expert assembly service (AED 79-299)
10. **IT Support** - Home & office IT support (AED 149-599)
11. **Gardening** - Garden maintenance & landscaping (AED 199-799)

Data is automatically loaded on first server startup.

## Authentication Features

### Sign Up
- Users can create accounts with email/password
- Profile is automatically created via database trigger
- Email confirmation is auto-enabled (no email server required for testing)

### Sign In
- Email/password authentication
- Session persistence across page reloads
- Automatic token refresh

### Protected Routes
- Dashboard and user-specific pages require authentication
- Automatic redirect to login if not authenticated

## API Usage

### Server Endpoints

All data is accessed through the server API at `/functions/v1/make-server-4b12d838`:

- `GET /services` - Get all services
- `GET /services/:slug` - Get service by slug
- `GET /testimonials` - Get all testimonials
- `POST /bookings` - Create a new booking
- `GET /bookings/:userId` - Get user's bookings

### Client API

```typescript
import { servicesApi } from './utils/supabase/client';

// Get all active services
const services = await servicesApi.getAll();

// Get service by slug
const service = await servicesApi.getBySlug('house-cleaning');

// Get popular services
const popular = await servicesApi.getPopular(6);
```

### Bookings

```typescript
import { bookingsApi } from './utils/supabase/client';

// Create a booking
const booking = await bookingsApi.create({
  service_id: 'house-cleaning',
  customer_name: 'John Doe',
  customer_email: 'john@example.com',
  customer_phone: '+971501234567',
  service_date: '2025-10-20',
  service_time: '10:00 AM',
  address: '123 Dubai Marina',
  city: 'Dubai',
  notes: 'Please bring eco-friendly products'
});

// Get user's bookings (requires authentication)
const userBookings = await bookingsApi.getUserBookings(userId);
```

### Authentication

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, profile, signIn, signUp, signOut } = useAuth();

  // Sign up
  await signUp('email@example.com', 'password', 'Full Name');

  // Sign in
  await signIn('email@example.com', 'password');

  // Sign out
  await signOut();

  // Access user data
  console.log(user?.email);
  console.log(profile?.full_name);
}
```

## Data Security

- **Server-side validation** - All data operations go through the server
- **User bookings** - Filtered by user ID to show only their bookings
- **Authentication** - Supabase Auth manages user sessions securely
- **API authorization** - Bearer token required for all API calls

## Data Initialization

The server automatically initializes default data on first startup:

1. Checks if data exists (using `initialized` key)
2. If not initialized, loads 11 services
3. Loads 4 sample testimonials
4. Marks system as initialized

This ensures the platform has content immediately available.

## Environment Variables

Automatically configured by Supabase:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key (server-side only)

## Dynamic Content

The following pages now fetch data from Supabase:

✅ **Home Page** - Fetches featured testimonials
✅ **Categories Page** - Fetches all services dynamically
✅ **Service Detail Page** - Fetches service by slug
✅ **Booking Page** - Creates bookings in database
✅ **Customer Dashboard** - Fetches user bookings
✅ **Blog Page** - Fetches published blog posts
✅ **FAQ Page** - Fetches active FAQs
✅ **Login/Signup** - Full authentication with Supabase Auth

## Features Implemented

### Authentication
- [x] Email/Password Sign Up
- [x] Email/Password Sign In
- [x] Protected Routes
- [x] User Profile Management
- [x] Session Persistence
- [x] Automatic Profile Creation

### Dynamic Content
- [x] Services from Database
- [x] Testimonials from Database
- [x] Blog Posts from Database
- [x] FAQs from Database
- [x] Bookings Management

### User Experience
- [x] Loading States
- [x] Error Handling
- [x] Toast Notifications
- [x] Fallback Data
- [x] Responsive Design

## Next Steps

1. **Add More Services**: Update server initialization code to add services
2. **Enhance Testimonials**: Add more customer testimonials through server
3. **Payment Integration**: Integrate payment gateway for bookings
4. **Email Notifications**: Configure email for booking confirmations
5. **Real-time Updates**: Use Supabase Realtime for live booking status

## Monitoring

Check server logs for:
- Data initialization status
- API call errors
- Booking creation success/failures
- User authentication events

Access logs in Supabase Dashboard > Edge Functions > Logs

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend
- All API calls require Bearer token authentication
- User bookings are filtered server-side by user ID
- Validate all user input before storing
