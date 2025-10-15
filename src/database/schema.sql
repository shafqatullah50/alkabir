-- =====================================================
-- AL-KABIR SERVICES DATABASE SCHEMA
-- Platform: Supabase (PostgreSQL)
-- Version: 1.0
-- Last Updated: October 15, 2025
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS
-- =====================================================

-- Booking status
CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'rescheduled'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'refunded',
  'partial_refund'
);

-- Payment method
CREATE TYPE payment_method AS ENUM (
  'credit_card',
  'debit_card',
  'cash',
  'bank_transfer',
  'digital_wallet'
);

-- Service frequency (for subscriptions)
CREATE TYPE service_frequency AS ENUM (
  'one_time',
  'weekly',
  'bi_weekly',
  'monthly',
  'quarterly'
);

-- Professional availability
CREATE TYPE availability_status AS ENUM (
  'available',
  'busy',
  'on_break',
  'off_duty'
);

-- Job application status
CREATE TYPE application_status AS ENUM (
  'submitted',
  'under_review',
  'shortlisted',
  'interview_scheduled',
  'rejected',
  'accepted'
);

-- Contact inquiry status
CREATE TYPE inquiry_status AS ENUM (
  'new',
  'in_progress',
  'resolved',
  'closed'
);

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'professional', 'admin')),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer-specific information
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  preferred_language TEXT DEFAULT 'en',
  marketing_consent BOOLEAN DEFAULT FALSE,
  loyalty_points INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ADDRESSES
-- =====================================================

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label TEXT, -- e.g., 'Home', 'Office'
  street_address TEXT NOT NULL,
  building_name TEXT,
  apartment_number TEXT,
  city TEXT NOT NULL DEFAULT 'Dubai',
  emirate TEXT NOT NULL DEFAULT 'Dubai',
  area TEXT, -- e.g., 'Downtown', 'Marina'
  landmark TEXT,
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_city ON addresses(city);

-- =====================================================
-- SERVICE CATEGORIES & SERVICES
-- =====================================================

-- Service categories
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT, -- Icon name from lucide-react
  color TEXT, -- Hex color for category
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_categories_slug ON service_categories(slug);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  full_description TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'AED',
  duration_minutes INTEGER, -- Estimated duration
  unit TEXT DEFAULT 'service', -- e.g., 'hour', 'room', 'sqm'
  image_url TEXT,
  features JSONB, -- Array of features
  requirements JSONB, -- Customer requirements
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  metadata JSONB, -- Additional flexible data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_category_id ON services(category_id);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_is_featured ON services(is_featured);

-- Service pricing tiers (optional add-ons)
CREATE TABLE service_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., 'Standard', 'Premium', 'Deluxe'
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  features JSONB,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_pricing_service_id ON service_pricing(service_id);

-- Service add-ons
CREATE TABLE service_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_addons_service_id ON service_addons(service_id);

-- =====================================================
-- PROFESSIONALS (Service Providers)
-- =====================================================

CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL, -- Company employee ID
  specialization TEXT[],
  years_of_experience INTEGER,
  bio TEXT,
  certifications JSONB, -- Array of certifications
  languages TEXT[], -- Languages spoken
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  current_status availability_status DEFAULT 'available',
  hire_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_professionals_user_id ON professionals(user_id);
CREATE INDEX idx_professionals_is_available ON professionals(is_available);

-- Professional services (what services they can perform)
CREATE TABLE professional_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  skill_level TEXT DEFAULT 'intermediate' CHECK (skill_level IN ('beginner', 'intermediate', 'expert')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(professional_id, service_id)
);

CREATE INDEX idx_professional_services_professional_id ON professional_services(professional_id);
CREATE INDEX idx_professional_services_service_id ON professional_services(service_id);

-- Professional availability schedule
CREATE TABLE professional_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_professional_availability_professional_id ON professional_availability(professional_id);

-- =====================================================
-- BOOKINGS
-- =====================================================

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number TEXT UNIQUE NOT NULL, -- e.g., 'ALK-2025-001234'
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  professional_id UUID REFERENCES professionals(id) ON DELETE SET NULL,
  address_id UUID NOT NULL REFERENCES addresses(id) ON DELETE RESTRICT,
  
  -- Scheduling
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  estimated_duration_minutes INTEGER,
  actual_start_time TIMESTAMPTZ,
  actual_end_time TIMESTAMPTZ,
  
  -- Status
  status booking_status DEFAULT 'pending',
  
  -- Pricing
  service_price DECIMAL(10, 2) NOT NULL,
  addons_price DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'AED',
  
  -- Additional details
  special_instructions TEXT,
  customer_notes TEXT,
  internal_notes TEXT, -- Admin/professional notes
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  cancelled_by UUID REFERENCES profiles(id),
  
  -- Frequency (for recurring bookings)
  frequency service_frequency DEFAULT 'one_time',
  parent_booking_id UUID REFERENCES bookings(id), -- For recurring bookings
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_professional_id ON bookings(professional_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);

-- Booking add-ons (selected add-ons for a booking)
CREATE TABLE booking_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  addon_id UUID NOT NULL REFERENCES service_addons(id) ON DELETE RESTRICT,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_booking_addons_booking_id ON booking_addons(booking_id);

-- Booking history (track status changes)
CREATE TABLE booking_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  previous_status booking_status,
  new_status booking_status NOT NULL,
  changed_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_booking_history_booking_id ON booking_history(booking_id);

-- =====================================================
-- PAYMENTS
-- =====================================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'AED',
  payment_method payment_method NOT NULL,
  status payment_status DEFAULT 'pending',
  
  -- Payment gateway details
  transaction_id TEXT UNIQUE, -- External payment gateway transaction ID
  gateway_response JSONB, -- Full response from payment gateway
  
  -- Card details (last 4 digits only)
  card_last_four TEXT,
  card_brand TEXT, -- visa, mastercard, etc.
  
  -- Refund information
  refund_amount DECIMAL(10, 2) DEFAULT 0,
  refund_reason TEXT,
  refunded_at TIMESTAMPTZ,
  
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_customer_id ON payments(customer_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);

-- Payment methods (saved customer payment methods)
CREATE TABLE customer_payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  card_last_four TEXT NOT NULL,
  card_brand TEXT NOT NULL,
  card_expiry_month INTEGER NOT NULL,
  card_expiry_year INTEGER NOT NULL,
  cardholder_name TEXT NOT NULL,
  
  is_default BOOLEAN DEFAULT FALSE,
  
  -- Tokenized card info (from payment gateway)
  payment_token TEXT, -- Encrypted token
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customer_payment_methods_customer_id ON customer_payment_methods(customer_id);

-- =====================================================
-- REVIEWS & RATINGS
-- =====================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  
  -- Detailed ratings
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  
  is_verified BOOLEAN DEFAULT TRUE, -- Verified purchase
  is_published BOOLEAN DEFAULT TRUE,
  admin_response TEXT,
  responded_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_is_published ON reviews(is_published);

-- =====================================================
-- BLOG
-- =====================================================

CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  views INTEGER DEFAULT 0,
  reading_time_minutes INTEGER,
  
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);

-- Blog tags
CREATE TABLE blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- =====================================================
-- FAQs
-- =====================================================

CREATE TABLE faq_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES faq_categories(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faqs_category_id ON faqs(category_id);
CREATE INDEX idx_faqs_is_published ON faqs(is_published);

-- =====================================================
-- CONTACT INQUIRIES
-- =====================================================

CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status inquiry_status DEFAULT 'new',
  
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  admin_notes TEXT,
  resolved_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);

-- =====================================================
-- CAREERS
-- =====================================================

CREATE TABLE job_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('full_time', 'part_time', 'contract')),
  
  description TEXT NOT NULL,
  requirements JSONB, -- Array of requirements
  responsibilities JSONB, -- Array of responsibilities
  benefits JSONB, -- Array of benefits
  
  salary_range_min DECIMAL(10, 2),
  salary_range_max DECIMAL(10, 2),
  currency TEXT DEFAULT 'AED',
  
  is_active BOOLEAN DEFAULT TRUE,
  positions_available INTEGER DEFAULT 1,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_positions_slug ON job_positions(slug);
CREATE INDEX idx_job_positions_is_active ON job_positions(is_active);

CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position_id UUID NOT NULL REFERENCES job_positions(id) ON DELETE CASCADE,
  
  -- Applicant info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Application details
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  
  years_of_experience INTEGER,
  expected_salary DECIMAL(10, 2),
  available_from DATE,
  
  status application_status DEFAULT 'submitted',
  
  -- Admin fields
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_position_id ON job_applications(position_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_email ON job_applications(email);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'booking', 'payment', 'review', 'system'
  related_id UUID, -- Related booking/payment/etc ID
  action_url TEXT,
  
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- PROMOCODES & DISCOUNTS
-- =====================================================

CREATE TABLE promocodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount_amount DECIMAL(10, 2), -- For percentage discounts
  min_order_amount DECIMAL(10, 2),
  
  usage_limit INTEGER, -- Total usage limit
  usage_count INTEGER DEFAULT 0,
  per_user_limit INTEGER, -- Per customer limit
  
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Restrictions
  applicable_services UUID[], -- Array of service IDs
  applicable_categories UUID[], -- Array of category IDs
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_promocodes_code ON promocodes(code);
CREATE INDEX idx_promocodes_is_active ON promocodes(is_active);

-- Promocode usage tracking
CREATE TABLE promocode_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  promocode_id UUID NOT NULL REFERENCES promocodes(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  discount_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_promocode_usage_promocode_id ON promocode_usage(promocode_id);
CREATE INDEX idx_promocode_usage_customer_id ON promocode_usage(customer_id);

-- =====================================================
-- SYSTEM SETTINGS
-- =====================================================

CREATE TABLE system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON professionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_positions_updated_at BEFORE UPDATE ON job_positions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_promocodes_updated_at BEFORE UPDATE ON promocodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_payment_methods_updated_at BEFORE UPDATE ON customer_payment_methods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate booking number
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_number = 'ALK-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('booking_number_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE booking_number_seq;
CREATE TRIGGER set_booking_number BEFORE INSERT ON bookings FOR EACH ROW EXECUTE FUNCTION generate_booking_number();

-- Update service average rating when review is added/updated
CREATE OR REPLACE FUNCTION update_service_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE services
  SET 
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM reviews
      WHERE service_id = NEW.service_id AND is_published = TRUE
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE service_id = NEW.service_id AND is_published = TRUE
    )
  WHERE id = NEW.service_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_rating_on_review AFTER INSERT OR UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_service_rating();

-- Update professional average rating
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE professionals
  SET 
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM reviews
      WHERE professional_id = NEW.professional_id AND is_published = TRUE
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE professional_id = NEW.professional_id AND is_published = TRUE
    )
  WHERE id = NEW.professional_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_professional_rating_on_review AFTER INSERT OR UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_professional_rating();

-- Track booking status changes in history
CREATE OR REPLACE FUNCTION track_booking_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO booking_history (booking_id, previous_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, NEW.updated_at);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_booking_status AFTER UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION track_booking_status_change();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Customers: Users can read their own customer data
CREATE POLICY "Users can view own customer data" ON customers FOR SELECT USING (
  user_id = auth.uid()
);

-- Addresses: Users can manage their own addresses
CREATE POLICY "Users can view own addresses" ON addresses FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own addresses" ON addresses FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own addresses" ON addresses FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own addresses" ON addresses FOR DELETE USING (user_id = auth.uid());

-- Bookings: Customers can view their own bookings
CREATE POLICY "Customers can view own bookings" ON bookings FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Customers can create bookings" ON bookings FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Payments: Customers can view their own payments
CREATE POLICY "Customers can view own payments" ON payments FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Reviews: Customers can manage their own reviews
CREATE POLICY "Customers can view own reviews" ON reviews FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Customers can create reviews" ON reviews FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Payment methods: Customers can manage their own payment methods
CREATE POLICY "Customers can view own payment methods" ON customer_payment_methods FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Customers can insert payment methods" ON customer_payment_methods FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Customers can delete payment methods" ON customer_payment_methods FOR DELETE USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Notifications: Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Public read access for certain tables
CREATE POLICY "Public can view active service categories" ON service_categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view published reviews" ON reviews FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published blog posts" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published FAQs" ON faqs FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view active job positions" ON job_positions FOR SELECT USING (is_active = TRUE);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE profiles IS 'User profile information extending Supabase auth.users';
COMMENT ON TABLE customers IS 'Customer-specific information and preferences';
COMMENT ON TABLE addresses IS 'Customer service addresses';
COMMENT ON TABLE service_categories IS 'Service category taxonomy';
COMMENT ON TABLE services IS 'Available services offered by AL-Kabir';
COMMENT ON TABLE professionals IS 'Service provider/employee information';
COMMENT ON TABLE bookings IS 'Service bookings and appointments';
COMMENT ON TABLE payments IS 'Payment transactions and records';
COMMENT ON TABLE reviews IS 'Customer reviews and ratings';
COMMENT ON TABLE blog_posts IS 'Blog content management';
COMMENT ON TABLE faqs IS 'Frequently asked questions';
COMMENT ON TABLE contact_inquiries IS 'Customer contact form submissions';
COMMENT ON TABLE job_applications IS 'Career application submissions';
COMMENT ON TABLE promocodes IS 'Promotional codes and discounts';
