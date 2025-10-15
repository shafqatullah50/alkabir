# AL-Kabir Services Database Schema

Complete PostgreSQL database schema for the AL-Kabir on-demand home and office services platform, designed for Supabase.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Structure](#database-structure)
- [Installation](#installation)
- [Table Descriptions](#table-descriptions)
- [Relationships](#relationships)
- [Security](#security)
- [Triggers & Functions](#triggers--functions)
- [Seed Data](#seed-data)
- [Queries & Examples](#queries--examples)

## 🎯 Overview

This database schema supports a comprehensive service marketplace platform with:

- ✅ **User Management** - Customers, professionals, and admin roles
- ✅ **Service Catalog** - Categories, services, pricing, and add-ons
- ✅ **Booking System** - Appointments, scheduling, and status tracking
- ✅ **Payment Processing** - Transactions, refunds, and saved payment methods
- ✅ **Reviews & Ratings** - Customer feedback and professional ratings
- ✅ **Content Management** - Blog, FAQs, and dynamic content
- ✅ **Career Portal** - Job positions and applications
- ✅ **Marketing** - Promocodes and discount management
- ✅ **Communication** - Notifications and contact inquiries

## 🗄️ Database Structure

### Core Tables (24 total)

#### User & Authentication
- `profiles` - User profile information
- `customers` - Customer-specific data
- `professionals` - Service provider information
- `addresses` - Customer service addresses

#### Services
- `service_categories` - Service taxonomy
- `services` - Available services
- `service_pricing` - Pricing tiers
- `service_addons` - Additional service options
- `professional_services` - Professional capabilities
- `professional_availability` - Scheduling

#### Bookings & Payments
- `bookings` - Service appointments
- `booking_addons` - Selected add-ons
- `booking_history` - Status change tracking
- `payments` - Payment transactions
- `customer_payment_methods` - Saved payment cards

#### Reviews
- `reviews` - Customer feedback and ratings

#### Content
- `blog_categories` - Blog taxonomy
- `blog_posts` - Blog content
- `blog_tags` - Post tags
- `blog_post_tags` - Tag associations
- `faq_categories` - FAQ grouping
- `faqs` - Frequently asked questions

#### Communication
- `contact_inquiries` - Contact form submissions
- `notifications` - User notifications

#### Careers
- `job_positions` - Open positions
- `job_applications` - Candidate applications

#### Marketing
- `promocodes` - Discount codes
- `promocode_usage` - Redemption tracking

#### System
- `system_settings` - Configuration

## 🚀 Installation

### Step 1: Setup Supabase Project

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to the SQL Editor

### Step 2: Run Schema

```sql
-- Run the schema file
-- Copy contents of schema.sql and execute in Supabase SQL Editor
```

### Step 3: Load Seed Data (Optional)

```sql
-- Run the seed data file for sample data
-- Copy contents of seed_data.sql and execute
```

### Step 4: Verify Installation

```sql
-- Check tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verify sample data
SELECT COUNT(*) as service_count FROM services;
SELECT COUNT(*) as category_count FROM service_categories;
```

## 📊 Table Descriptions

### User Tables

#### `profiles`
Extends Supabase `auth.users` with additional profile information.

**Key Fields:**
- `id` - References auth.users
- `email` - User email (unique)
- `full_name` - Display name
- `role` - customer | professional | admin

#### `customers`
Customer-specific information and preferences.

**Key Fields:**
- `user_id` - References profiles
- `loyalty_points` - Reward points balance
- `total_bookings` - Booking count

#### `professionals`
Service provider/employee information.

**Key Fields:**
- `user_id` - References profiles
- `employee_id` - Company employee ID
- `specialization` - Services they can perform
- `average_rating` - Professional rating

### Service Tables

#### `service_categories`
Top-level service taxonomy (Cleaning, Plumbing, etc.).

**Key Fields:**
- `name` - Category name
- `slug` - URL-friendly identifier
- `icon` - Lucide icon name
- `color` - Brand color

#### `services`
Individual services offered.

**Key Fields:**
- `category_id` - Parent category
- `name` - Service name
- `base_price` - Starting price (AED)
- `duration_minutes` - Estimated duration
- `is_featured` - Show on homepage
- `average_rating` - Calculated from reviews

### Booking Tables

#### `bookings`
Service appointments and orders.

**Key Fields:**
- `booking_number` - Auto-generated (ALK-2025-001234)
- `customer_id` - Who booked
- `service_id` - What service
- `professional_id` - Assigned professional
- `status` - pending | confirmed | in_progress | completed | cancelled
- `scheduled_date/time` - When
- `total_amount` - Final price

### Payment Tables

#### `payments`
Payment transactions.

**Key Fields:**
- `booking_id` - Related booking
- `amount` - Payment amount
- `payment_method` - credit_card | debit_card | cash | etc.
- `status` - pending | completed | failed | refunded
- `transaction_id` - Gateway transaction ID

## 🔗 Relationships

### Entity Relationship Diagram

```
profiles (1) ─── (1) customers
    │
    └─── (1) professionals
    
customers (1) ─── (*) addresses
    │
    └─── (*) bookings
    
services (1) ─── (*) bookings
    │
    ├─── (*) service_addons
    └─── (*) reviews
    
professionals (1) ─── (*) bookings
    │
    ├─── (*) professional_services
    ├─── (*) professional_availability
    └─── (*) reviews
    
bookings (1) ─── (1) payments
    │
    ├─── (*) booking_addons
    ├─── (0..1) reviews
    └─── (*) booking_history
```

## 🔒 Security

### Row Level Security (RLS)

RLS is enabled on all user-facing tables:

**Customer Policies:**
- ✅ Customers can view/edit their own profiles
- ✅ Customers can manage their own addresses
- ✅ Customers can view their own bookings
- ✅ Customers can create reviews for their bookings
- ✅ Customers can manage their saved payment methods

**Professional Policies:**
- ✅ Professionals can view their assigned bookings
- ✅ Professionals can update booking status
- ✅ Professionals can view their reviews

**Public Policies:**
- ✅ Anyone can view active services and categories
- ✅ Anyone can view published reviews
- ✅ Anyone can view published blog posts
- ✅ Anyone can view FAQs

**Example Policy:**
```sql
-- Customers can view their own bookings
CREATE POLICY "Customers can view own bookings" 
ON bookings FOR SELECT 
USING (
  customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  )
);
```

## ⚡ Triggers & Functions

### Automatic Timestamp Updates

All tables with `updated_at` automatically update on modification:

```sql
CREATE TRIGGER update_bookings_updated_at 
BEFORE UPDATE ON bookings 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

### Booking Number Generation

Auto-generates unique booking numbers (ALK-2025-001234):

```sql
CREATE TRIGGER set_booking_number 
BEFORE INSERT ON bookings 
FOR EACH ROW 
EXECUTE FUNCTION generate_booking_number();
```

### Rating Calculations

Automatically updates service and professional ratings:

```sql
-- Updates service.average_rating when review added/updated
CREATE TRIGGER update_service_rating_on_review 
AFTER INSERT OR UPDATE ON reviews 
FOR EACH ROW 
EXECUTE FUNCTION update_service_rating();
```

### Booking History Tracking

Tracks all status changes:

```sql
CREATE TRIGGER track_booking_status 
AFTER UPDATE ON bookings 
FOR EACH ROW 
EXECUTE FUNCTION track_booking_status_change();
```

## 🌱 Seed Data

The `seed_data.sql` file includes:

- ✅ **10 Service Categories** - All major service types
- ✅ **20+ Services** - Sample services with pricing
- ✅ **Service Add-ons** - Optional extras
- ✅ **5 FAQ Categories** - Organized help content
- ✅ **10 FAQs** - Common questions
- ✅ **3 Blog Categories** - Content organization
- ✅ **3 Blog Posts** - Sample content
- ✅ **9 Blog Tags** - Content tagging
- ✅ **3 Job Positions** - Career opportunities
- ✅ **3 Promocodes** - Active discounts
- ✅ **System Settings** - Configuration

## 📝 Queries & Examples

### Common Queries

#### Get all active services with category

```sql
SELECT 
  s.id,
  s.name,
  s.slug,
  s.base_price,
  s.average_rating,
  sc.name as category_name,
  sc.slug as category_slug
FROM services s
JOIN service_categories sc ON s.category_id = sc.id
WHERE s.is_active = TRUE
ORDER BY s.display_order;
```

#### Get customer bookings with service details

```sql
SELECT 
  b.id,
  b.booking_number,
  b.scheduled_date,
  b.scheduled_time,
  b.status,
  b.total_amount,
  s.name as service_name,
  p.full_name as professional_name
FROM bookings b
JOIN services s ON b.service_id = s.id
JOIN customers c ON b.customer_id = c.id
LEFT JOIN professionals pr ON b.professional_id = pr.id
LEFT JOIN profiles p ON pr.user_id = p.id
WHERE c.user_id = 'USER_ID_HERE'
ORDER BY b.scheduled_date DESC;
```

#### Get service reviews with customer info

```sql
SELECT 
  r.rating,
  r.title,
  r.comment,
  r.created_at,
  p.full_name as customer_name,
  s.name as service_name
FROM reviews r
JOIN customers c ON r.customer_id = c.id
JOIN profiles p ON c.user_id = p.id
JOIN services s ON r.service_id = s.id
WHERE r.is_published = TRUE
  AND s.slug = 'SERVICE_SLUG_HERE'
ORDER BY r.created_at DESC
LIMIT 10;
```

#### Calculate booking totals

```sql
SELECT 
  b.id,
  b.service_price,
  COALESCE(SUM(ba.price * ba.quantity), 0) as addons_total,
  b.discount_amount,
  b.tax_amount,
  b.total_amount
FROM bookings b
LEFT JOIN booking_addons ba ON b.id = ba.booking_id
WHERE b.id = 'BOOKING_ID_HERE'
GROUP BY b.id;
```

#### Get professional schedule

```sql
SELECT 
  pa.day_of_week,
  pa.start_time,
  pa.end_time,
  pa.is_available
FROM professional_availability pa
WHERE pa.professional_id = 'PROFESSIONAL_ID_HERE'
ORDER BY pa.day_of_week;
```

#### Check promocode validity

```sql
SELECT 
  code,
  discount_type,
  discount_value,
  usage_count,
  usage_limit,
  valid_from,
  valid_until,
  is_active
FROM promocodes
WHERE code = 'PROMOCODE_HERE'
  AND is_active = TRUE
  AND NOW() BETWEEN valid_from AND valid_until
  AND (usage_limit IS NULL OR usage_count < usage_limit);
```

### Analytics Queries

#### Top performing services

```sql
SELECT 
  s.name,
  s.total_bookings,
  s.average_rating,
  SUM(b.total_amount) as total_revenue
FROM services s
LEFT JOIN bookings b ON s.id = b.service_id
  AND b.status = 'completed'
GROUP BY s.id, s.name
ORDER BY s.total_bookings DESC
LIMIT 10;
```

#### Customer lifetime value

```sql
SELECT 
  p.full_name,
  c.total_bookings,
  SUM(b.total_amount) as lifetime_value,
  AVG(b.total_amount) as avg_booking_value
FROM customers c
JOIN profiles p ON c.user_id = p.id
LEFT JOIN bookings b ON c.id = b.customer_id
  AND b.status IN ('completed')
GROUP BY c.id, p.full_name
ORDER BY lifetime_value DESC;
```

#### Monthly revenue

```sql
SELECT 
  DATE_TRUNC('month', b.scheduled_date) as month,
  COUNT(*) as total_bookings,
  SUM(b.total_amount) as total_revenue,
  AVG(b.total_amount) as avg_booking_value
FROM bookings b
WHERE b.status = 'completed'
  AND b.scheduled_date >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month DESC;
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🤝 Support

For questions or issues with the database schema:
- Email: dev@alkabir.ae
- Documentation: /database/README.md

## 📄 License

Proprietary - AL-Kabir Services LLC © 2025
