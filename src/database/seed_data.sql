-- =====================================================
-- AL-KABIR SERVICES SEED DATA
-- Platform: Supabase (PostgreSQL)
-- Purpose: Sample/Demo data for development and testing
-- =====================================================

-- =====================================================
-- SERVICE CATEGORIES
-- =====================================================

INSERT INTO service_categories (name, slug, description, icon, color, display_order, is_active) VALUES
('Cleaning', 'cleaning', 'Professional home and office cleaning services', 'Sparkles', '#10b981', 1, TRUE),
('Repairs', 'repairs', 'Expert repair services for home and office', 'Wrench', '#3b82f6', 2, TRUE),
('Plumbing', 'plumbing', 'Licensed plumbing services and installations', 'Droplet', '#0ea5e9', 3, TRUE),
('Electrical', 'electrical', 'Certified electrical services and repairs', 'Zap', '#f59e0b', 4, TRUE),
('Pest Control', 'pest-control', 'Safe and effective pest control solutions', 'Bug', '#ef4444', 5, TRUE),
('Painting', 'painting', 'Professional painting and decoration services', 'Paintbrush', '#8b5cf6', 6, TRUE),
('Moving', 'moving', 'Reliable moving and relocation services', 'Truck', '#14b8a6', 7, TRUE),
('Furniture Assembly', 'furniture-assembly', 'Expert furniture assembly and installation', 'Package', '#f97316', 8, TRUE),
('IT Support', 'it-support', 'Technical support and IT solutions', 'Monitor', '#6366f1', 9, TRUE),
('Gardening', 'gardening', 'Garden maintenance and landscaping', 'Flower2', '#22c55e', 10, TRUE);

-- =====================================================
-- SERVICES
-- =====================================================

-- Cleaning Services
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order, features) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'cleaning'),
  'Deep Home Cleaning',
  'deep-home-cleaning',
  'Comprehensive deep cleaning for your entire home',
  'Our deep home cleaning service covers every corner of your house. We use eco-friendly products and professional equipment to ensure your home is spotless and sanitized.',
  299.00,
  180,
  TRUE,
  TRUE,
  1,
  '["All rooms cleaning", "Kitchen deep clean", "Bathroom sanitization", "Floor mopping", "Dusting and vacuuming", "Window cleaning"]'::jsonb
),
(
  (SELECT id FROM service_categories WHERE slug = 'cleaning'),
  'Office Cleaning',
  'office-cleaning',
  'Professional office cleaning services',
  'Keep your workspace clean and productive with our professional office cleaning service. Perfect for small to medium-sized offices.',
  399.00,
  240,
  TRUE,
  TRUE,
  2,
  '["Desk cleaning", "Floor cleaning", "Restroom sanitization", "Trash removal", "Kitchen/break room cleaning", "Window cleaning"]'::jsonb
),
(
  (SELECT id FROM service_categories WHERE slug = 'cleaning'),
  'Carpet Cleaning',
  'carpet-cleaning',
  'Deep carpet cleaning and stain removal',
  'Professional carpet cleaning using advanced equipment to remove dirt, stains, and allergens from your carpets.',
  199.00,
  90,
  FALSE,
  TRUE,
  3,
  '["Deep steam cleaning", "Stain treatment", "Deodorization", "Fast drying", "Allergen removal"]'::jsonb
);

-- Plumbing Services
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'plumbing'),
  'Emergency Plumbing',
  'emergency-plumbing',
  '24/7 emergency plumbing services',
  'Fast response emergency plumbing service available 24/7 for urgent issues like leaks, burst pipes, and clogged drains.',
  249.00,
  60,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'plumbing'),
  'Bathroom Plumbing',
  'bathroom-plumbing',
  'Complete bathroom plumbing solutions',
  'Expert bathroom plumbing services including fixture installation, repairs, and upgrades.',
  349.00,
  120,
  FALSE,
  TRUE,
  2
),
(
  (SELECT id FROM service_categories WHERE slug = 'plumbing'),
  'Kitchen Plumbing',
  'kitchen-plumbing',
  'Kitchen sink and appliance plumbing',
  'Professional kitchen plumbing services for sinks, dishwashers, and garbage disposals.',
  299.00,
  90,
  FALSE,
  TRUE,
  3
);

-- Electrical Services
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'electrical'),
  'Electrical Installation',
  'electrical-installation',
  'New electrical installations and wiring',
  'Professional electrical installation services for new fixtures, outlets, and wiring systems.',
  399.00,
  180,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'electrical'),
  'Light Fixture Installation',
  'light-fixture-installation',
  'Install ceiling lights, chandeliers, and more',
  'Expert installation of all types of light fixtures including ceiling lights, chandeliers, and wall sconces.',
  149.00,
  60,
  FALSE,
  TRUE,
  2
),
(
  (SELECT id FROM service_categories WHERE slug = 'electrical'),
  'Electrical Troubleshooting',
  'electrical-troubleshooting',
  'Diagnose and fix electrical issues',
  'Comprehensive electrical troubleshooting to identify and resolve any electrical problems in your home or office.',
  199.00,
  90,
  FALSE,
  TRUE,
  3
);

-- Pest Control Services
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'pest-control'),
  'General Pest Control',
  'general-pest-control',
  'Comprehensive pest control treatment',
  'Complete pest control service to eliminate common household pests including ants, cockroaches, and spiders.',
  249.00,
  90,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'pest-control'),
  'Termite Treatment',
  'termite-treatment',
  'Professional termite inspection and treatment',
  'Specialized termite treatment to protect your property from termite damage.',
  599.00,
  180,
  FALSE,
  TRUE,
  2
),
(
  (SELECT id FROM service_categories WHERE slug = 'pest-control'),
  'Bed Bug Treatment',
  'bed-bug-treatment',
  'Effective bed bug elimination',
  'Thorough bed bug treatment using safe and effective methods to eliminate infestations.',
  449.00,
  120,
  FALSE,
  TRUE,
  3
);

-- Painting Services
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'painting'),
  'Interior Painting',
  'interior-painting',
  'Professional interior painting services',
  'High-quality interior painting for homes and offices. Includes surface preparation and cleanup.',
  799.00,
  480,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'painting'),
  'Exterior Painting',
  'exterior-painting',
  'Weather-resistant exterior painting',
  'Durable exterior painting using weather-resistant paints to protect and beautify your property.',
  1299.00,
  600,
  FALSE,
  TRUE,
  2
);

-- Moving Services
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'moving'),
  'Home Moving',
  'home-moving',
  'Complete residential moving service',
  'Full-service home moving including packing, loading, transport, and unpacking.',
  899.00,
  360,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'moving'),
  'Office Relocation',
  'office-relocation',
  'Professional office moving services',
  'Minimize downtime with our efficient office relocation service.',
  1499.00,
  480,
  FALSE,
  TRUE,
  2
);

-- Furniture Assembly
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'furniture-assembly'),
  'Furniture Assembly',
  'furniture-assembly',
  'Expert furniture assembly service',
  'Professional assembly of all types of furniture including IKEA, beds, tables, and wardrobes.',
  149.00,
  90,
  TRUE,
  TRUE,
  1
);

-- IT Support
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'it-support'),
  'Computer Repair',
  'computer-repair',
  'PC and laptop repair services',
  'Expert computer repair for hardware and software issues.',
  199.00,
  90,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'it-support'),
  'Network Setup',
  'network-setup',
  'Home and office network installation',
  'Professional network setup including WiFi, routers, and network security.',
  349.00,
  120,
  FALSE,
  TRUE,
  2
);

-- Gardening
INSERT INTO services (category_id, name, slug, short_description, full_description, base_price, duration_minutes, is_featured, is_active, display_order) VALUES
(
  (SELECT id FROM service_categories WHERE slug = 'gardening'),
  'Garden Maintenance',
  'garden-maintenance',
  'Regular garden care and maintenance',
  'Comprehensive garden maintenance including mowing, trimming, and plant care.',
  299.00,
  120,
  TRUE,
  TRUE,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'gardening'),
  'Landscaping',
  'landscaping',
  'Professional landscaping design',
  'Transform your outdoor space with our professional landscaping service.',
  1499.00,
  480,
  FALSE,
  TRUE,
  2
);

-- =====================================================
-- SERVICE ADD-ONS
-- =====================================================

INSERT INTO service_addons (service_id, name, description, price, is_active) VALUES
-- Cleaning add-ons
(
  (SELECT id FROM services WHERE slug = 'deep-home-cleaning'),
  'Balcony Cleaning',
  'Deep cleaning of balcony area',
  49.00,
  TRUE
),
(
  (SELECT id FROM services WHERE slug = 'deep-home-cleaning'),
  'Inside Cabinets',
  'Cleaning inside kitchen cabinets',
  79.00,
  TRUE
),
(
  (SELECT id FROM services WHERE slug = 'deep-home-cleaning'),
  'Oven Cleaning',
  'Deep oven cleaning and degreasing',
  99.00,
  TRUE
),

-- Plumbing add-ons
(
  (SELECT id FROM services WHERE slug = 'emergency-plumbing'),
  'Parts & Materials',
  'Additional parts and materials',
  150.00,
  TRUE
),

-- Pest Control add-ons
(
  (SELECT id FROM services WHERE slug = 'general-pest-control'),
  'Follow-up Visit',
  'Additional follow-up treatment',
  149.00,
  TRUE
);

-- =====================================================
-- FAQ CATEGORIES
-- =====================================================

INSERT INTO faq_categories (name, slug, description, display_order) VALUES
('General', 'general', 'General questions about AL-Kabir services', 1),
('Booking', 'booking', 'Questions about booking and scheduling', 2),
('Payment', 'payment', 'Payment and pricing related questions', 3),
('Services', 'services', 'Questions about specific services', 4),
('Cancellation', 'cancellation', 'Cancellation and refund policies', 5);

-- =====================================================
-- FAQs
-- =====================================================

INSERT INTO faqs (category_id, question, answer, display_order, is_published) VALUES
(
  (SELECT id FROM faq_categories WHERE slug = 'general'),
  'What areas do you serve in the UAE?',
  'We currently serve all areas across Dubai, Abu Dhabi, Sharjah, Ajman, and the Northern Emirates. Our service coverage is expanding constantly to reach more customers.',
  1,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'general'),
  'Are your service providers licensed and insured?',
  'Yes, all our service providers are licensed professionals, fully insured, and background-checked. We employ our own trained staff rather than using independent contractors.',
  2,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'booking'),
  'How far in advance should I book?',
  'We recommend booking at least 24-48 hours in advance for regular services. However, we also offer same-day service for emergency situations based on availability.',
  1,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'booking'),
  'Can I reschedule my appointment?',
  'Yes, you can reschedule your appointment up to 24 hours before the scheduled time at no additional charge through your customer dashboard or by calling customer service.',
  2,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'payment'),
  'What payment methods do you accept?',
  'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, cash, bank transfers, and digital wallets.',
  1,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'payment'),
  'When do I need to pay?',
  'Payment is required at the time of booking for most services. For certain large projects, we may accept payment upon service completion.',
  2,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'services'),
  'Do you provide cleaning supplies and equipment?',
  'Yes, our professionals come fully equipped with all necessary cleaning supplies, tools, and equipment. You don''t need to provide anything.',
  1,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'services'),
  'What if I''m not satisfied with the service?',
  'Customer satisfaction is our priority. If you''re not completely satisfied, please contact us within 24 hours and we''ll send someone to re-service at no additional charge or provide a refund.',
  2,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'cancellation'),
  'What is your cancellation policy?',
  'You can cancel or reschedule up to 24 hours before your appointment with no penalty. Cancellations within 24 hours are subject to a 50% cancellation fee. No-shows are non-refundable.',
  1,
  TRUE
),
(
  (SELECT id FROM faq_categories WHERE slug = 'cancellation'),
  'How long does it take to process refunds?',
  'Once approved, refunds are typically processed within 5-10 business days, depending on your payment method and financial institution.',
  2,
  TRUE
);

-- =====================================================
-- BLOG CATEGORIES
-- =====================================================

INSERT INTO blog_categories (name, slug, description) VALUES
('Home Tips', 'home-tips', 'Tips and tricks for home maintenance'),
('Cleaning Guides', 'cleaning-guides', 'Comprehensive cleaning guides'),
('DIY Projects', 'diy-projects', 'Do-it-yourself home improvement projects'),
('Company News', 'company-news', 'AL-Kabir news and updates'),
('Seasonal Advice', 'seasonal-advice', 'Seasonal home care advice');

-- =====================================================
-- BLOG TAGS
-- =====================================================

INSERT INTO blog_tags (name, slug) VALUES
('cleaning', 'cleaning'),
('maintenance', 'maintenance'),
('diy', 'diy'),
('tips', 'tips'),
('home-improvement', 'home-improvement'),
('eco-friendly', 'eco-friendly'),
('organization', 'organization'),
('dubai', 'dubai'),
('uae', 'uae');

-- =====================================================
-- BLOG POSTS (Sample)
-- =====================================================

INSERT INTO blog_posts (category_id, title, slug, excerpt, content, is_published, published_at, reading_time_minutes) VALUES
(
  (SELECT id FROM blog_categories WHERE slug = 'home-tips'),
  '10 Essential Home Maintenance Tips for Dubai Residents',
  '10-essential-home-maintenance-tips-dubai',
  'Keep your Dubai home in top condition with these expert maintenance tips tailored for the UAE climate.',
  '<h2>Introduction</h2><p>Living in Dubai comes with unique challenges for home maintenance due to the extreme heat and sandy conditions. Here are 10 essential tips to keep your home in excellent condition.</p><h3>1. AC Maintenance</h3><p>Regular AC maintenance is crucial in Dubai''s climate. Clean or replace filters monthly and schedule professional servicing every 3 months.</p><h3>2. Seal Windows and Doors</h3><p>Check window and door seals regularly to prevent sand infiltration and maintain energy efficiency.</p>',
  TRUE,
  NOW() - INTERVAL '7 days',
  8
),
(
  (SELECT id FROM blog_categories WHERE slug = 'cleaning-guides'),
  'The Ultimate Guide to Deep Cleaning Your Kitchen',
  'ultimate-guide-deep-cleaning-kitchen',
  'A comprehensive step-by-step guide to deep cleaning every part of your kitchen.',
  '<h2>Getting Started</h2><p>A deep kitchen clean should be done at least once a month. Here''s how to do it right.</p><h3>Step 1: Declutter</h3><p>Remove everything from countertops, cabinets, and drawers.</p><h3>Step 2: Clean from Top to Bottom</h3><p>Start with ceiling fans and light fixtures, then work your way down.</p>',
  TRUE,
  NOW() - INTERVAL '14 days',
  12
),
(
  (SELECT id FROM blog_categories WHERE slug = 'company-news'),
  'AL-Kabir Expands Services to Northern Emirates',
  'alkabir-expands-northern-emirates',
  'We are excited to announce our expansion to Ras Al Khaimah, Fujairah, and Umm Al Quwain.',
  '<h2>Exciting Growth</h2><p>We''re thrilled to announce that AL-Kabir services are now available in the Northern Emirates! This expansion allows us to serve more customers across the UAE.</p><p>Our full range of services is now available in:</p><ul><li>Ras Al Khaimah</li><li>Fujairah</li><li>Umm Al Quwain</li><li>Ajman</li></ul>',
  TRUE,
  NOW() - INTERVAL '3 days',
  5
);

-- =====================================================
-- JOB POSITIONS
-- =====================================================

INSERT INTO job_positions (title, slug, department, location, employment_type, description, requirements, responsibilities, salary_range_min, salary_range_max, is_active, positions_available) VALUES
(
  'Senior Cleaning Specialist',
  'senior-cleaning-specialist',
  'Operations',
  'Dubai, UAE',
  'full_time',
  'We are looking for experienced cleaning specialists to join our growing team. This role involves leading cleaning teams and ensuring high-quality service delivery.',
  '["Minimum 3 years experience in professional cleaning", "Valid UAE driving license", "Excellent communication skills in English and Arabic", "Physical fitness and stamina", "Attention to detail"]'::jsonb,
  '["Lead and supervise cleaning teams", "Ensure quality standards are met", "Train new team members", "Maintain cleaning equipment", "Interact with customers professionally"]'::jsonb,
  3500.00,
  5000.00,
  TRUE,
  5
),
(
  'Licensed Electrician',
  'licensed-electrician',
  'Technical Services',
  'Dubai, UAE',
  'full_time',
  'Join our technical team as a licensed electrician. Must have UAE electrical license and proven experience.',
  '["Valid UAE electrical license", "Minimum 5 years experience", "Knowledge of UAE electrical codes", "English language proficiency", "Own tools preferred"]'::jsonb,
  '["Install and repair electrical systems", "Troubleshoot electrical issues", "Ensure compliance with safety standards", "Maintain service records", "Provide excellent customer service"]'::jsonb,
  5000.00,
  8000.00,
  TRUE,
  3
),
(
  'Customer Service Representative',
  'customer-service-representative',
  'Customer Support',
  'Dubai, UAE',
  'full_time',
  'We are seeking friendly and professional customer service representatives to join our support team.',
  '["Excellent communication skills", "Fluent in English and Arabic", "Customer service experience", "Computer literacy", "Problem-solving skills"]'::jsonb,
  '["Handle customer inquiries", "Process bookings and payments", "Resolve customer issues", "Maintain customer records", "Coordinate with service teams"]'::jsonb,
  4000.00,
  6000.00,
  TRUE,
  4
);

-- =====================================================
-- PROMOCODES
-- =====================================================

INSERT INTO promocodes (code, description, discount_type, discount_value, max_discount_amount, min_order_amount, usage_limit, valid_from, valid_until, is_active) VALUES
(
  'WELCOME20',
  'Welcome discount for new customers - 20% off first booking',
  'percentage',
  20.00,
  100.00,
  200.00,
  1000,
  NOW(),
  NOW() + INTERVAL '90 days',
  TRUE
),
(
  'SUMMER50',
  'Summer special - AED 50 off',
  'fixed_amount',
  50.00,
  NULL,
  300.00,
  500,
  NOW(),
  NOW() + INTERVAL '60 days',
  TRUE
),
(
  'CLEAN30',
  '30% off cleaning services',
  'percentage',
  30.00,
  150.00,
  250.00,
  200,
  NOW(),
  NOW() + INTERVAL '30 days',
  TRUE
);

-- =====================================================
-- SYSTEM SETTINGS
-- =====================================================

INSERT INTO system_settings (key, value, description) VALUES
('site_name', '"AL-Kabir Services"', 'Platform name'),
('contact_email', '"support@alkabir.ae"', 'Main contact email'),
('contact_phone', '"+971 4 XXX XXXX"', 'Main contact phone'),
('business_hours', '{"sunday": "9:00-18:00", "monday": "9:00-18:00", "tuesday": "9:00-18:00", "wednesday": "9:00-18:00", "thursday": "9:00-18:00", "friday": "closed", "saturday": "closed"}'::jsonb, 'Business operating hours'),
('service_areas', '["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"]'::jsonb, 'Service coverage areas'),
('currency', '"AED"', 'Default currency'),
('tax_rate', '0.05', 'VAT rate (5%)'),
('booking_advance_hours', '24', 'Minimum hours in advance for booking'),
('cancellation_hours', '24', 'Hours before appointment for free cancellation'),
('late_cancellation_fee_percent', '50', 'Late cancellation fee percentage');

-- =====================================================
-- SAMPLE REVIEWS (for display purposes)
-- =====================================================

-- Note: These would normally be linked to actual bookings
-- This is just sample data for the review display sections

COMMENT ON TABLE service_categories IS 'Sample data: 10 service categories covering all AL-Kabir services';
COMMENT ON TABLE services IS 'Sample data: 20+ services across different categories with pricing and details';
COMMENT ON TABLE faqs IS 'Sample data: 10 frequently asked questions across 5 categories';
COMMENT ON TABLE blog_posts IS 'Sample data: 3 blog posts for content demonstration';
COMMENT ON TABLE job_positions IS 'Sample data: 3 job openings in different departments';
COMMENT ON TABLE promocodes IS 'Sample data: 3 active promotional codes';
