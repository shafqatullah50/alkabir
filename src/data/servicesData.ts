export interface Service {
  id: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  fullDescription: string;
  images: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
  beforeAfter: Array<{
    before: string;
    after: string;
    title: string;
    description: string;
  }>;
  rating: number;
  reviewCount: number;
  totalBookings: string;
  startingPrice: number;
  currency: string;
  duration: string;
  highlights: string[];
  serviceAreas: {
    dubai: string[];
    abuDhabi: string[];
    sharjah: string[];
    other: string[];
  };
  included: Array<{
    category: string;
    items: string[];
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
    image: string;
  }>;
  pricingPackages: Array<{
    name: string;
    price: number;
    duration: string;
    ideal: string;
    popular?: boolean;
    features: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
    image: string;
  }>;
  customerReviews: Array<{
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    location: string;
    verified: boolean;
    propertyType: string;
  }>;
  relatedServices: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }>;
}

export const servicesData: Record<string, Service> = {
  cleaning: {
    id: 'cleaning',
    name: 'Professional House Cleaning Services in Dubai & UAE',
    shortName: 'House Cleaning',
    metaTitle: 'Professional House Cleaning Services in Dubai, Abu Dhabi & UAE | AL-Kabir',
    metaDescription: 'Book trusted house cleaning services across UAE. Company-employed cleaners, eco-friendly products, 100% satisfaction guarantee.',
    description: 'AL-Kabir provides premium professional house cleaning services across Dubai, Abu Dhabi, Sharjah, and all UAE emirates. Our company-employed, trained cleaning specialists use eco-friendly products and advanced equipment to deliver exceptional results for your home.',
    fullDescription: `
      <h2>Professional House Cleaning Services in the UAE</h2>
      <p>AL-Kabir is your trusted partner for comprehensive house cleaning services throughout the United Arab Emirates. With over 150 company-employed cleaning professionals, we deliver exceptional residential cleaning services to villas, apartments, and homes across Dubai, Abu Dhabi, Sharjah, and all seven emirates.</p>
      
      <h3>Why Choose AL-Kabir for House Cleaning?</h3>
      <p>Unlike freelance cleaners or online platforms, AL-Kabir employs, trains, and manages all our cleaning staff directly. This ensures consistent quality, reliability, and accountability. Our cleaners undergo rigorous background checks, professional training, and regular quality assessments.</p>
      
      <h3>Our Cleaning Process</h3>
      <p>We follow a systematic 12-point cleaning checklist that covers every area of your home. Our team arrives with professional-grade equipment and eco-friendly cleaning products that are safe for children and pets.</p>
    `,
    images: [
      { url: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=1200', alt: 'Professional cleaning', caption: 'Our professional cleaning team in action' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200', alt: 'Clean apartment', caption: 'Spotless results in every room' },
      { url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200', alt: 'Cleaning equipment', caption: 'Professional equipment' },
      { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200', alt: 'Clean kitchen', caption: 'Sparkling clean kitchens' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200', alt: 'Clean bathroom', caption: 'Sanitized bathrooms' },
      { url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200', alt: 'Vacuum cleaning', caption: 'Deep cleaning service' }
    ],
    beforeAfter: [
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400', title: 'Living Room Transformation', description: 'Deep cleaning bringing new life' },
      { before: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400', after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400', title: 'Kitchen Deep Clean', description: 'From greasy to gleaming' },
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', title: 'Bathroom Sanitization', description: 'Hospital-grade cleanliness' }
    ],
    rating: 4.8,
    reviewCount: 847,
    totalBookings: '5,200+',
    startingPrice: 199,
    currency: 'AED',
    duration: '2-4 hours',
    highlights: [
      'Company-employed & background-checked staff',
      'Eco-friendly, non-toxic cleaning products',
      'Commercial-grade equipment included',
      '100% satisfaction guarantee',
      'Same-day service available',
      'Licensed & insured company',
      'Flexible scheduling',
      '24/7 customer support'
    ],
    serviceAreas: {
      dubai: ['Dubai Marina', 'JBR', 'Downtown Dubai', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Motor City', 'JLT', 'DIFC', 'Palm Jumeirah', 'Deira', 'Bur Dubai', 'Al Barsha', 'Al Karama', 'Mirdif'],
      abuDhabi: ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Khalifa City', 'Al Reef'],
      sharjah: ['Al Majaz', 'Al Nahda', 'Muwaileh', 'Al Khan'],
      other: ['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
    },
    included: [
      {
        category: 'All Rooms',
        items: ['Complete dusting of all surfaces', 'Vacuuming and mopping floors', 'Cleaning skirting boards', 'Window sills cleaning', 'Light switches sanitization', 'Mirror cleaning']
      },
      {
        category: 'Kitchen',
        items: ['Countertop sanitization', 'Cabinet exterior cleaning', 'Sink cleaning', 'Stovetop cleaning', 'Microwave cleaning', 'Refrigerator exterior']
      },
      {
        category: 'Bathrooms',
        items: ['Toilet deep cleaning', 'Shower and tub scrubbing', 'Sink polishing', 'Mirror cleaning', 'Floor scrubbing', 'Exhaust fan cleaning']
      },
      {
        category: 'Additional',
        items: ['Trash removal', 'Air freshening', 'Quality inspection', 'Satisfaction follow-up']
      }
    ],
    benefits: [
      { icon: 'Users', title: 'Company-Employed Staff', description: 'All cleaners directly employed and trained by AL-Kabir', image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=400' },
      { icon: 'Shield', title: 'Fully Licensed & Insured', description: 'Complete insurance coverage throughout UAE', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
      { icon: 'Award', title: 'Quality Guarantee', description: '100% satisfaction guarantee on all services', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400' },
      { icon: 'Wrench', title: 'Professional Equipment', description: 'Commercial-grade equipment included', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400' }
    ],
    pricingPackages: [
      { name: 'Studio/1BR', price: 199, duration: '2-3 hours', ideal: 'Up to 600 sq ft', features: ['All basic cleaning', '1 bedroom', '1 bathroom', 'Kitchen & living area'] },
      { name: '2BR Apartment', price: 299, duration: '3-4 hours', ideal: '600-1000 sq ft', popular: true, features: ['All basic cleaning', '2 bedrooms', '2 bathrooms', 'Kitchen & living areas'] },
      { name: '3BR Apartment', price: 399, duration: '4-5 hours', ideal: '1000-1500 sq ft', features: ['All basic cleaning', '3 bedrooms', '2-3 bathrooms', 'Kitchen & living areas'] },
      { name: 'Villa/Townhouse', price: 599, duration: '5-7 hours', ideal: '1500+ sq ft', features: ['All basic cleaning', '4+ bedrooms', 'Multiple bathrooms', 'All common areas', 'Balconies/terraces'] }
    ],
    faqs: [
      { question: 'What areas do you serve in the UAE?', answer: 'We serve all seven emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.' },
      { question: 'Are your cleaners employed by AL-Kabir?', answer: 'Yes, all our cleaning staff are directly employed by AL-Kabir with full background checks and training.' },
      { question: 'What cleaning products do you use?', answer: 'We use premium eco-friendly, non-toxic cleaning products that are safe for families and pets.' }
    ],
    process: [
      { step: 1, title: 'Book Online Instantly', description: 'Select service, date and time', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300' },
      { step: 2, title: 'Team Arrives On Time', description: 'Professional team with equipment', image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=300' },
      { step: 3, title: 'Systematic Cleaning', description: 'Following comprehensive checklist', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300' },
      { step: 4, title: 'Quality Inspection', description: 'Final walkthrough and check', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300' }
    ],
    customerReviews: [
      { id: 1, name: 'Fatima Al-Zarooni', rating: 5, comment: 'Outstanding service! Very professional and thorough. The cleaning team was punctual and left my villa sparkling clean. I\'m extremely impressed with AL-Kabir\'s attention to detail.', date: '1 week ago', location: 'Dubai Marina', verified: true, propertyType: 'Villa' },
      { id: 2, name: 'John Smith', rating: 5, comment: 'Best cleaning service in Dubai! They cleaned every corner of my apartment and were very respectful. Will definitely book again for regular cleaning.', date: '2 weeks ago', location: 'Business Bay', verified: true, propertyType: '2BR Apartment' },
      { id: 3, name: 'Layla Hassan', rating: 5, comment: 'I\'ve tried several cleaning companies but AL-Kabir is by far the best. The team is well-trained, uses quality products, and the results are always perfect. My go-to for monthly deep cleaning!', date: '3 days ago', location: 'JBR', verified: true, propertyType: '3BR Apartment' },
      { id: 4, name: 'Michael Thompson', rating: 4, comment: 'Very good service overall. The cleaners were efficient and professional. Only minor feedback is I wish they had arrived 10 minutes earlier, but the quality of work was excellent.', date: '5 days ago', location: 'Downtown Dubai', verified: true, propertyType: 'Studio' },
      { id: 5, name: 'Ahmed Al-Maktoum', rating: 5, comment: 'Exceptional service! They cleaned our entire villa including the outdoor areas. The staff was courteous and did an amazing job. Highly recommend AL-Kabir to everyone in Dubai!', date: '1 week ago', location: 'Arabian Ranches', verified: true, propertyType: 'Villa' },
      { id: 6, name: 'Sophie Martin', rating: 5, comment: 'Professional and reliable! I booked them for a move-out cleaning and they exceeded expectations. The landlord was impressed with how spotless the apartment was. Thank you AL-Kabir!', date: '2 weeks ago', location: 'JLT', verified: true, propertyType: '2BR Apartment' },
      { id: 7, name: 'Khalid Rahman', rating: 5, comment: 'Great experience from booking to completion. Easy online booking, team arrived on time, and cleaning was top-notch. The eco-friendly products they use are a big plus for my family.', date: '4 days ago', location: 'Al Barsha', verified: true, propertyType: '3BR Apartment' },
      { id: 8, name: 'Emma Wilson', rating: 5, comment: 'I use AL-Kabir for weekly cleaning and they never disappoint. Same team comes every week, they know my preferences, and my home always looks perfect. Worth every dirham!', date: '6 days ago', location: 'Palm Jumeirah', verified: true, propertyType: 'Villa' },
      { id: 9, name: 'Youssef Ibrahim', rating: 4, comment: 'Good value for money. The cleaning was thorough and the team was respectful of our home. Would have been 5 stars if they had paid more attention to the balcony area.', date: '1 week ago', location: 'Mirdif', verified: true, propertyType: '2BR Apartment' }
    ],
    relatedServices: [
      { id: 'deep-cleaning', name: 'Deep Cleaning Service', price: 349, description: 'Intensive cleaning service', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
      { id: 'carpet-cleaning', name: 'Carpet Cleaning', price: 199, description: 'Professional steam cleaning', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400' }
    ]
  },

  plumbing: {
    id: 'plumbing',
    name: 'Professional Plumbing Services in Dubai & UAE',
    shortName: 'Plumbing',
    metaTitle: 'Expert Plumbing Services in Dubai, Abu Dhabi & UAE | AL-Kabir',
    metaDescription: 'Licensed plumbers for repairs, installations, and emergency services across UAE. 24/7 availability, fixed pricing.',
    description: 'AL-Kabir offers comprehensive plumbing services across the UAE with licensed, experienced plumbers. From leak repairs to complete installations, our team handles all residential and commercial plumbing needs with expertise and professionalism.',
    fullDescription: `
      <h2>Expert Plumbing Services in UAE</h2>
      <p>With over 20 years of experience, AL-Kabir provides professional plumbing services throughout Dubai, Abu Dhabi, and all UAE emirates. Our licensed plumbers are equipped to handle everything from minor repairs to major installations.</p>
      
      <h3>Comprehensive Plumbing Solutions</h3>
      <p>We specialize in pipe repairs, leak detection, water heater installation, drainage systems, and bathroom fitting. All our plumbers are certified and carry the latest tools for efficient service delivery.</p>
    `,
    images: [
      { url: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=1200', alt: 'Plumber at work', caption: 'Licensed plumbers' },
      { url: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=1200', alt: 'Pipe repair', caption: 'Expert pipe repairs' },
      { url: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4092?w=1200', alt: 'Water heater', caption: 'Water heater installation' },
      { url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200', alt: 'Plumbing tools', caption: 'Professional equipment' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200', alt: 'Bathroom fitting', caption: 'Bathroom installations' },
      { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200', alt: 'Kitchen sink', caption: 'Kitchen plumbing' }
    ],
    beforeAfter: [
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', title: 'Bathroom Upgrade', description: 'Complete bathroom fitting' },
      { before: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400', after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400', title: 'Kitchen Sink Installation', description: 'Modern sink fitting' },
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=400', title: 'Pipe Replacement', description: 'New piping system' }
    ],
    rating: 4.9,
    reviewCount: 654,
    totalBookings: '3,800+',
    startingPrice: 149,
    currency: 'AED',
    duration: '1-3 hours',
    highlights: [
      'Licensed & certified plumbers',
      '24/7 emergency service available',
      'Fixed pricing - no surprises',
      'Quality parts & materials',
      'Same-day service available',
      '1-year warranty on workmanship',
      'Free inspection & quote',
      'All plumbing work covered'
    ],
    serviceAreas: {
      dubai: ['Dubai Marina', 'JBR', 'Downtown Dubai', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Motor City', 'JLT', 'DIFC', 'Palm Jumeirah', 'Deira', 'Bur Dubai', 'Al Barsha', 'Al Karama', 'Mirdif'],
      abuDhabi: ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Khalifa City', 'Al Reef'],
      sharjah: ['Al Majaz', 'Al Nahda', 'Muwaileh', 'Al Khan'],
      other: ['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
    },
    included: [
      {
        category: 'Leak Repairs',
        items: ['Pipe leak detection', 'Tap and faucet repair', 'Toilet leak fixing', 'Shower leak repair', 'Water heater leak repair', 'Emergency leak stoppage']
      },
      {
        category: 'Installations',
        items: ['Water heater installation', 'Bathroom fitting', 'Kitchen sink installation', 'Dishwasher connection', 'Washing machine hookup', 'Shower installation']
      },
      {
        category: 'Drainage',
        items: ['Drain unclogging', 'Sewer line cleaning', 'Main line clearing', 'Grease trap cleaning', 'Storm drain service', 'Video pipe inspection']
      },
      {
        category: 'Maintenance',
        items: ['Regular inspections', 'Preventive maintenance', 'Pipe replacement', 'Valve replacement', 'Water pressure adjustment', 'System testing']
      }
    ],
    benefits: [
      { icon: 'Users', title: 'Licensed Plumbers', description: 'All plumbers are licensed and certified professionals', image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400' },
      { icon: 'Shield', title: '24/7 Emergency Service', description: 'Round-the-clock availability for urgent plumbing issues', image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=400' },
      { icon: 'Award', title: 'Quality Guarantee', description: '1-year warranty on all workmanship', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
      { icon: 'Wrench', title: 'Professional Tools', description: 'Latest equipment for all plumbing work', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' }
    ],
    pricingPackages: [
      { name: 'Basic Repair', price: 149, duration: '1 hour', ideal: 'Minor fixes', features: ['Tap/faucet repair', 'Leak fixing', 'Basic installation', 'Parts extra'] },
      { name: 'Standard Service', price: 299, duration: '2-3 hours', ideal: 'Regular jobs', popular: true, features: ['Multiple repairs', 'Installation work', 'Drain cleaning', 'Parts included'] },
      { name: 'Bathroom Fitting', price: 899, duration: 'Full day', ideal: 'Complete bathroom', features: ['Full bathroom setup', 'All fixtures', 'Professional finish', 'All materials'] },
      { name: 'Emergency Service', price: 249, duration: 'Immediate', ideal: '24/7 urgent', features: ['Immediate response', 'Any plumbing issue', 'Night/weekend available', 'Parts extra'] }
    ],
    faqs: [
      { question: 'Do you provide 24/7 emergency plumbing?', answer: 'Yes, we offer 24/7 emergency plumbing services across Dubai and UAE for urgent issues like major leaks, burst pipes, and blocked drains.' },
      { question: 'Are your plumbers licensed?', answer: 'All our plumbers are licensed, certified, and have years of experience. They undergo regular training to stay updated with the latest techniques.' },
      { question: 'What is included in the service price?', answer: 'Our quoted price includes labor and basic service. Major parts and materials are quoted separately for transparency.' }
    ],
    process: [
      { step: 1, title: 'Request Service', description: 'Call or book online with details', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300' },
      { step: 2, title: 'Plumber Arrives', description: 'Licensed plumber with tools', image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=300' },
      { step: 3, title: 'Diagnosis & Repair', description: 'Expert assessment and fixing', image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=300' },
      { step: 4, title: 'Testing & Cleanup', description: 'Quality check and site cleanup', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300' }
    ],
    customerReviews: [
      { id: 1, name: 'Mohammed Al-Mansoori', rating: 5, comment: 'Fixed our water heater quickly and efficiently. Very professional plumber who explained everything. The pricing was transparent and fair. Highly recommend AL-Kabir for any plumbing needs!', date: '3 days ago', location: 'JBR', verified: true, propertyType: 'Apartment' },
      { id: 2, name: 'Sarah Johnson', rating: 5, comment: 'Had a major leak at 2 AM and called their emergency service. The plumber arrived in 30 minutes and fixed everything! Saved us from major water damage. Incredible service!', date: '1 week ago', location: 'Dubai Marina', verified: true, propertyType: 'Villa' },
      { id: 3, name: 'Ali Hassan', rating: 5, comment: 'Needed complete bathroom fitting for our new apartment. The AL-Kabir plumber did an outstanding job - professional installation, clean work, and finished on time. Very satisfied!', date: '5 days ago', location: 'Business Bay', verified: true, propertyType: '2BR Apartment' },
      { id: 4, name: 'Jennifer Brown', rating: 4, comment: 'Called them for a blocked drain issue. The plumber was knowledgeable and fixed it quickly. Only wish they had called before arriving, but overall great service and reasonable pricing.', date: '2 weeks ago', location: 'Downtown Dubai', verified: true, propertyType: '3BR Apartment' },
      { id: 5, name: 'Omar Abdullah', rating: 5, comment: 'Excellent plumbing service! Had multiple issues - leaking tap, running toilet, and low water pressure. They fixed everything in one visit. Licensed plumber who really knew his work.', date: '4 days ago', location: 'Arabian Ranches', verified: true, propertyType: 'Villa' },
      { id: 6, name: 'Lisa Anderson', rating: 5, comment: 'Very impressed with AL-Kabir plumbing. They installed our new kitchen sink and dishwasher perfectly. Clean, professional, and the 1-year warranty gives peace of mind!', date: '1 week ago', location: 'JLT', verified: true, propertyType: 'Apartment' },
      { id: 7, name: 'Rashid Al-Zaabi', rating: 5, comment: 'Had water heater replacement done. The plumber was punctual, professional, and completed the job efficiently. Cleaned up after himself too. Great service from start to finish!', date: '6 days ago', location: 'Al Barsha', verified: true, propertyType: 'Villa' },
      { id: 8, name: 'Natalie Garcia', rating: 5, comment: 'Best plumbing service in UAE! Fixed our shower leak that other companies couldn\'t solve. The plumber was experienced and the price was very reasonable. Will always use AL-Kabir!', date: '3 days ago', location: 'Sharjah', verified: true, propertyType: '2BR Apartment' },
      { id: 9, name: 'Hassan Mohammed', rating: 4, comment: 'Good service overall. Plumber was skilled and fixed the problem. Arrived within the time window given. Would give 5 stars if the parts were included in the quoted price.', date: '1 week ago', location: 'Mirdif', verified: true, propertyType: 'Apartment' }
    ],
    relatedServices: [
      { id: 'electrical', name: 'Electrical Services', price: 149, description: 'Licensed electricians', image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?w=400' },
      { id: 'handyman', name: 'Handyman Services', price: 99, description: 'General repairs', image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=400' }
    ]
  },

  electrical: {
    id: 'electrical',
    name: 'Professional Electrical Services in Dubai & UAE',
    shortName: 'Electrical Work',
    metaTitle: 'Licensed Electrical Services in Dubai, Abu Dhabi & UAE | AL-Kabir',
    metaDescription: 'Certified electricians for installations, repairs, and maintenance. 24/7 emergency service across UAE.',
    description: 'AL-Kabir provides professional electrical services with licensed electricians across UAE. From simple repairs to complete rewiring, we ensure safe and reliable electrical work for homes and offices.',
    fullDescription: `
      <h2>Licensed Electrical Services in UAE</h2>
      <p>Our certified electricians handle all types of electrical work including installations, repairs, maintenance, and troubleshooting. Safety and compliance with UAE regulations are our top priorities.</p>
      
      <h3>Comprehensive Electrical Solutions</h3>
      <p>We offer complete electrical services including lighting installation, power outlet repairs, circuit breaker replacement, wiring, and electrical panel upgrades.</p>
    `,
    images: [
      { url: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?w=1200', alt: 'Electrician working', caption: 'Licensed electricians' },
      { url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200', alt: 'Electrical panel', caption: 'Panel installation' },
      { url: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4092?w=1200', alt: 'Wiring work', caption: 'Professional wiring' },
      { url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200', alt: 'Tools', caption: 'Professional equipment' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', alt: 'Lighting', caption: 'Lighting installation' },
      { url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=1200', alt: 'Circuit work', caption: 'Circuit repairs' }
    ],
    beforeAfter: [
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', title: 'Lighting Upgrade', description: 'Modern LED installation' },
      { before: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400', after: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400', title: 'Panel Replacement', description: 'New electrical panel' },
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400', title: 'Complete Rewiring', description: 'Safe new wiring system' }
    ],
    rating: 4.9,
    reviewCount: 523,
    totalBookings: '2,900+',
    startingPrice: 149,
    currency: 'AED',
    duration: '1-4 hours',
    highlights: [
      'Licensed & certified electricians',
      'UAE regulation compliant',
      '24/7 emergency electrical service',
      'Safety inspections included',
      'Quality materials used',
      '1-year workmanship warranty',
      'Free safety assessment',
      'Same-day service available'
    ],
    serviceAreas: {
      dubai: ['Dubai Marina', 'JBR', 'Downtown Dubai', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Motor City', 'JLT', 'DIFC', 'Palm Jumeirah', 'Deira', 'Bur Dubai', 'Al Barsha', 'Al Karama', 'Mirdif'],
      abuDhabi: ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Khalifa City', 'Al Reef'],
      sharjah: ['Al Majaz', 'Al Nahda', 'Muwaileh', 'Al Khan'],
      other: ['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
    },
    included: [
      {
        category: 'Installations',
        items: ['Light fixture installation', 'Ceiling fan installation', 'Power outlet installation', 'Switch installation', 'Appliance wiring', 'Smart home setup']
      },
      {
        category: 'Repairs',
        items: ['Outlet repairs', 'Switch replacement', 'Circuit breaker fixing', 'Wiring repairs', 'Light fixture repair', 'Electrical troubleshooting']
      },
      {
        category: 'Upgrades',
        items: ['Panel upgrades', 'Rewiring services', 'Circuit additions', 'Voltage optimization', 'LED lighting conversion', 'Energy efficiency upgrades']
      },
      {
        category: 'Safety',
        items: ['Safety inspections', 'Code compliance check', 'Grounding verification', 'GFCI installation', 'Surge protection', 'Smoke detector setup']
      }
    ],
    benefits: [
      { icon: 'Users', title: 'Certified Electricians', description: 'All electricians are licensed and certified', image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?w=400' },
      { icon: 'Shield', title: 'Safety First', description: 'Complete compliance with UAE electrical codes', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400' },
      { icon: 'Award', title: 'Quality Work', description: '1-year warranty on all electrical work', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
      { icon: 'Wrench', title: 'Professional Tools', description: 'Latest testing and installation equipment', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' }
    ],
    pricingPackages: [
      { name: 'Minor Repairs', price: 149, duration: '1 hour', ideal: 'Small fixes', features: ['Switch/outlet repair', 'Light fixing', 'Basic wiring', 'Parts extra'] },
      { name: 'Standard Service', price: 299, duration: '2-3 hours', ideal: 'Regular work', popular: true, features: ['Multiple installations', 'Circuit work', 'Troubleshooting', 'Parts included'] },
      { name: 'Rewiring Package', price: 1499, duration: '2-3 days', ideal: 'Full apartment', features: ['Complete rewiring', 'New panel', 'All materials', 'Safety certified'] },
      { name: 'Emergency Service', price: 249, duration: 'Immediate', ideal: '24/7 urgent', features: ['Immediate response', 'Any electrical issue', 'Safety priority', 'Night service'] }
    ],
    faqs: [
      { question: 'Are your electricians licensed?', answer: 'Yes, all our electricians are licensed by relevant UAE authorities and certified to perform all types of electrical work safely.' },
      { question: 'Do you provide emergency electrical services?', answer: 'Yes, we offer 24/7 emergency electrical services for power outages, electrical faults, and safety hazards.' },
      { question: 'Is your work compliant with UAE regulations?', answer: 'Absolutely. All our electrical work complies with UAE building codes and safety regulations.' }
    ],
    process: [
      { step: 1, title: 'Book Service', description: 'Describe your electrical issue', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300' },
      { step: 2, title: 'Electrician Arrives', description: 'Licensed professional with tools', image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?w=300' },
      { step: 3, title: 'Safe Repairs', description: 'Expert electrical work', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300' },
      { step: 4, title: 'Safety Testing', description: 'Complete system check', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300' }
    ],
    customerReviews: [
      { id: 1, name: 'Ahmed Hassan', rating: 5, comment: 'Professional electrician who fixed all our electrical issues quickly and safely. Very knowledgeable about UAE electrical codes. The work was clean and tested thoroughly. Highly recommend!', date: '2 days ago', location: 'Downtown Dubai', verified: true, propertyType: 'Apartment' },
      { id: 2, name: 'Lisa Anderson', rating: 5, comment: 'Great service! The electrician was very knowledgeable and explained everything clearly. Installed new lighting in our villa and it looks amazing. Safe, professional work!', date: '1 week ago', location: 'Arabian Ranches', verified: true, propertyType: 'Villa' },
      { id: 3, name: 'Khalid Al-Rashid', rating: 5, comment: 'Had a power trip issue that was driving us crazy. AL-Kabir electrician diagnosed the problem quickly and fixed it properly. Licensed professional who knows what he\'s doing!', date: '4 days ago', location: 'JBR', verified: true, propertyType: '3BR Apartment' },
      { id: 4, name: 'Rachel Thompson', rating: 4, comment: 'Very good electrical service. The electrician was punctual and professional. Replaced several outlets and switches. Only minor issue was waiting for some specific parts.', date: '1 week ago', location: 'Dubai Marina', verified: true, propertyType: '2BR Apartment' },
      { id: 5, name: 'Saeed Mohammed', rating: 5, comment: 'Outstanding emergency service! Called them at midnight for a complete power failure. Electrician arrived in 40 minutes and restored power. This is what professional service looks like!', date: '3 days ago', location: 'Business Bay', verified: true, propertyType: 'Apartment' },
      { id: 6, name: 'Diana Martinez', rating: 5, comment: 'Needed complete rewiring for our old apartment. AL-Kabir team was professional, worked efficiently, and finished in 2 days as promised. All work is certified and compliant. Excellent!', date: '2 weeks ago', location: 'Deira', verified: true, propertyType: '3BR Apartment' },
      { id: 7, name: 'Faisal Al-Maktoum', rating: 5, comment: 'Very satisfied with the chandelier installation service. The electrician was careful, professional, and ensured everything was properly wired and secure. Great attention to detail!', date: '5 days ago', location: 'Palm Jumeirah', verified: true, propertyType: 'Villa' },
      { id: 8, name: 'Sophie Williams', rating: 5, comment: 'Excellent service from booking to completion. Had new outdoor lighting installed and ceiling fan wiring done. Licensed electrician, fair pricing, quality work. Will use again!', date: '1 week ago', location: 'JLT', verified: true, propertyType: 'Apartment' },
      { id: 9, name: 'Tariq Rahman', rating: 4, comment: 'Good electrical service. Fixed our circuit breaker issue and tested all outlets. Professional work. The only improvement would be to provide a more detailed invoice.', date: '6 days ago', location: 'Sharjah', verified: true, propertyType: '2BR Apartment' }
    ],
    relatedServices: [
      { id: 'plumbing', name: 'Plumbing Services', price: 149, description: 'Licensed plumbers', image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400' },
      { id: 'handyman', name: 'Handyman Services', price: 99, description: 'General repairs', image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=400' }
    ]
  },

  painting: {
    id: 'painting',
    name: 'Professional Painting Services in Dubai & UAE',
    shortName: 'Painting',
    metaTitle: 'Expert Painting Services in Dubai, Abu Dhabi & UAE | AL-Kabir',
    metaDescription: 'Professional painters for interior & exterior painting. Quality finish guaranteed across UAE.',
    description: 'AL-Kabir offers professional painting services across UAE with skilled painters. From single rooms to complete villas, we deliver high-quality finishes using premium paints and materials.',
    fullDescription: `
      <h2>Professional Painting Services in UAE</h2>
      <p>Transform your space with AL-Kabir's expert painting services. Our skilled painters deliver flawless finishes for interior and exterior projects across Dubai, Abu Dhabi, and all UAE emirates.</p>
      
      <h3>Quality Painting Solutions</h3>
      <p>We use premium quality paints from leading brands, ensuring durability and beautiful results. Our team handles surface preparation, priming, painting, and finishing with meticulous attention to detail.</p>
    `,
    images: [
      { url: 'https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=1200', alt: 'Painter at work', caption: 'Professional painters' },
      { url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200', alt: 'Interior painting', caption: 'Interior painting' },
      { url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200', alt: 'Exterior painting', caption: 'Exterior work' },
      { url: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4092?w=1200', alt: 'Paint colors', caption: 'Color consultation' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200', alt: 'Finished room', caption: 'Perfect finish' },
      { url: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200', alt: 'Wall preparation', caption: 'Surface preparation' }
    ],
    beforeAfter: [
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400', title: 'Living Room Makeover', description: 'Fresh new look' },
      { before: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400', after: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400', title: 'Bedroom Refresh', description: 'Modern color scheme' },
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400', title: 'Exterior Transformation', description: 'Stunning curb appeal' }
    ],
    rating: 4.7,
    reviewCount: 432,
    totalBookings: '2,100+',
    startingPrice: 899,
    currency: 'AED',
    duration: '1-5 days',
    highlights: [
      'Experienced professional painters',
      'Premium quality paints',
      'Free color consultation',
      'Surface preparation included',
      'Furniture protection',
      'Clean & tidy work',
      '2-year paint warranty',
      'Interior & exterior painting'
    ],
    serviceAreas: {
      dubai: ['Dubai Marina', 'JBR', 'Downtown Dubai', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Motor City', 'JLT', 'DIFC', 'Palm Jumeirah', 'Deira', 'Bur Dubai', 'Al Barsha', 'Al Karama', 'Mirdif'],
      abuDhabi: ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Khalifa City', 'Al Reef'],
      sharjah: ['Al Majaz', 'Al Nahda', 'Muwaileh', 'Al Khan'],
      other: ['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
    },
    included: [
      {
        category: 'Preparation',
        items: ['Surface cleaning', 'Hole filling', 'Sanding', 'Priming', 'Furniture covering', 'Floor protection']
      },
      {
        category: 'Painting',
        items: ['Two coats minimum', 'Premium paints', 'Even coverage', 'Clean edges', 'Ceiling painting', 'Trim & doors']
      },
      {
        category: 'Finishing',
        items: ['Final touch-ups', 'Clean removal of tape', 'Site cleanup', 'Debris removal', 'Final inspection', 'Quality check']
      },
      {
        category: 'Additional',
        items: ['Color consultation', 'Free quotes', 'Material delivery', 'Warranty certificate', 'Maintenance tips', 'After-care service']
      }
    ],
    benefits: [
      { icon: 'Users', title: 'Skilled Painters', description: 'Experienced painters with years of expertise', image: 'https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=400' },
      { icon: 'Shield', title: 'Premium Paints', description: 'Only top-quality, durable paint brands', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400' },
      { icon: 'Award', title: '2-Year Warranty', description: 'Warranty on paint and workmanship', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400' },
      { icon: 'Wrench', title: 'Complete Service', description: 'From preparation to final cleanup', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' }
    ],
    pricingPackages: [
      { name: 'Single Room', price: 899, duration: '1-2 days', ideal: 'One bedroom', features: ['Surface prep', '2 coats paint', 'Premium paint', 'Clean finish'] },
      { name: '2BR Apartment', price: 2499, duration: '3-4 days', ideal: '2 bedrooms', popular: true, features: ['All rooms', 'Ceiling included', 'Premium paints', 'Full service'] },
      { name: '3BR Apartment', price: 3999, duration: '5-6 days', ideal: '3 bedrooms', features: ['Complete apartment', 'All rooms & ceiling', 'Premium quality', 'Full warranty'] },
      { name: 'Villa Painting', price: 7999, duration: '7-10 days', ideal: 'Full villa', features: ['Interior & exterior', 'All surfaces', 'Premium materials', 'Complete service'] }
    ],
    faqs: [
      { question: 'What brands of paint do you use?', answer: 'We use premium brands like Dulux, Jotun, and Nippon for durability and excellent finish.' },
      { question: 'How long does painting take?', answer: 'A single room takes 1-2 days, apartments 3-6 days, and villas 7-10 days depending on size.' },
      { question: 'Do you provide color consultation?', answer: 'Yes, we offer free color consultation to help you choose the perfect colors for your space.' }
    ],
    process: [
      { step: 1, title: 'Consultation', description: 'Free quote and color advice', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300' },
      { step: 2, title: 'Preparation', description: 'Surface prep and protection', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=300' },
      { step: 3, title: 'Painting', description: 'Professional application', image: 'https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=300' },
      { step: 4, title: 'Finishing', description: 'Touch-ups and cleanup', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300' }
    ],
    customerReviews: [
      { id: 1, name: 'Khalid Al-Rashid', rating: 5, comment: 'Excellent painting work! Very professional team who transformed our entire villa. The finish is flawless and the color consultation was extremely helpful. Worth every dirham!', date: '1 week ago', location: 'Jumeirah', verified: true, propertyType: 'Villa' },
      { id: 2, name: 'Emma Wilson', rating: 5, comment: 'Beautiful finish and great color advice. The painters were meticulous with preparation and cleanup. Our apartment looks brand new! Highly recommend AL-Kabir for painting!', date: '2 weeks ago', location: 'Dubai Marina', verified: true, propertyType: '3BR Apartment' },
      { id: 3, name: 'Abdullah Al-Maktoum', rating: 5, comment: 'Outstanding painting service! Repainted our entire apartment in just 4 days. The team was professional, clean, and the finish is perfect. Premium quality paints used!', date: '5 days ago', location: 'Business Bay', verified: true, propertyType: '2BR Apartment' },
      { id: 4, name: 'Jennifer Martinez', rating: 4, comment: 'Very good painting service. The team was professional and the results are great. Only minor issue was they needed an extra day to complete, but quality is excellent.', date: '1 week ago', location: 'JBR', verified: true, propertyType: 'Apartment' },
      { id: 5, name: 'Omar Hassan', rating: 5, comment: 'Superb painting work! Used AL-Kabir for our villa exterior and interior. The painters are true professionals - excellent preparation, smooth application, and perfect finish!', date: '3 days ago', location: 'Arabian Ranches', verified: true, propertyType: 'Villa' },
      { id: 6, name: 'Sarah Thompson', rating: 5, comment: 'Very impressed with the painting quality. They helped us choose modern colors and the execution was flawless. Clean work, no mess, and beautiful results. Thank you AL-Kabir!', date: '2 weeks ago', location: 'Downtown Dubai', verified: true, propertyType: '3BR Apartment' },
      { id: 7, name: 'Hassan Al-Zaabi', rating: 5, comment: 'Best painting service in UAE! Professional team, premium Jotun paints, and attention to detail is exceptional. Our home looks amazing. The 2-year warranty is a great bonus!', date: '4 days ago', location: 'Palm Jumeirah', verified: true, propertyType: 'Villa' },
      { id: 8, name: 'Michelle Anderson', rating: 5, comment: 'Excellent experience from consultation to completion. The painters were skilled, respectful, and very clean. Our bedroom transformation is stunning! Highly recommend!', date: '1 week ago', location: 'JLT', verified: true, propertyType: '2BR Apartment' },
      { id: 9, name: 'Rashid Mohammed', rating: 4, comment: 'Good painting service with quality results. The team was professional and completed on time. Would have been 5 stars if the color samples were provided earlier for selection.', date: '6 days ago', location: 'Al Barsha', verified: true, propertyType: 'Apartment' }
    ],
    relatedServices: [
      { id: 'deep-cleaning', name: 'Deep Cleaning', price: 349, description: 'Post-painting cleanup', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
      { id: 'handyman', name: 'Handyman Services', price: 99, description: 'General repairs', image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=400' }
    ]
  },

  handyman: {
    id: 'handyman',
    name: 'Professional Handyman Services in Dubai & UAE',
    shortName: 'Handyman Services',
    metaTitle: 'Expert Handyman Services in Dubai, Abu Dhabi & UAE | AL-Kabir',
    metaDescription: 'Skilled handymen for all home repairs and maintenance. Furniture assembly, mounting, fixing, and more.',
    description: 'AL-Kabir provides versatile handyman services across UAE for all your home maintenance needs. From furniture assembly to minor repairs, our skilled handymen handle it all efficiently.',
    fullDescription: `
      <h2>Versatile Handyman Services in UAE</h2>
      <p>Our skilled handymen are equipped to handle a wide range of home maintenance and repair tasks. Whether it's furniture assembly, TV mounting, door repairs, or general fixing, we've got you covered.</p>
      
      <h3>Complete Home Maintenance</h3>
      <p>We offer comprehensive handyman services including carpentry, furniture assembly, picture hanging, shelf installation, door and window repairs, and much more.</p>
    `,
    images: [
      { url: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=1200', alt: 'Handyman working', caption: 'Skilled handymen' },
      { url: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4092?w=1200', alt: 'Furniture assembly', caption: 'Furniture assembly' },
      { url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200', alt: 'TV mounting', caption: 'TV mounting service' },
      { url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200', alt: 'Tools', caption: 'Professional tools' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200', alt: 'Home repair', caption: 'Home repairs' },
      { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200', alt: 'Installation', caption: 'Installation work' }
    ],
    beforeAfter: [
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400', title: 'Furniture Assembly', description: 'Professional assembly' },
      { before: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400', after: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400', title: 'TV Wall Mount', description: 'Perfect installation' },
      { before: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400', after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400', title: 'Shelf Installation', description: 'Secure mounting' }
    ],
    rating: 4.8,
    reviewCount: 389,
    totalBookings: '1,800+',
    startingPrice: 99,
    currency: 'AED',
    duration: '1-3 hours',
    highlights: [
      'Multi-skilled handymen',
      'All tools provided',
      'Same-day service',
      'Fixed hourly rates',
      'No job too small',
      'Quality workmanship',
      'Flexible scheduling',
      'Satisfaction guaranteed'
    ],
    serviceAreas: {
      dubai: ['Dubai Marina', 'JBR', 'Downtown Dubai', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Motor City', 'JLT', 'DIFC', 'Palm Jumeirah', 'Deira', 'Bur Dubai', 'Al Barsha', 'Al Karama', 'Mirdif'],
      abuDhabi: ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Khalifa City', 'Al Reef'],
      sharjah: ['Al Majaz', 'Al Nahda', 'Muwaileh', 'Al Khan'],
      other: ['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
    },
    included: [
      {
        category: 'Assembly',
        items: ['Furniture assembly', 'IKEA assembly', 'Bed frame assembly', 'Wardrobe assembly', 'Office furniture', 'Outdoor furniture']
      },
      {
        category: 'Mounting',
        items: ['TV wall mounting', 'Picture hanging', 'Shelf installation', 'Mirror mounting', 'Curtain rod installation', 'Kitchen rack mounting']
      },
      {
        category: 'Repairs',
        items: ['Door repairs', 'Window fixing', 'Cabinet repairs', 'Drawer fixing', 'Handle replacement', 'Lock installation']
      },
      {
        category: 'Maintenance',
        items: ['Touch-up painting', 'Caulking', 'Weather stripping', 'General fixing', 'Minor carpentry', 'Small installations']
      }
    ],
    benefits: [
      { icon: 'Users', title: 'Skilled Handymen', description: 'Multi-skilled professionals for all tasks', image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=400' },
      { icon: 'Shield', title: 'Tools Included', description: 'All necessary tools and equipment provided', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
      { icon: 'Award', title: 'Quality Work', description: 'Professional finish on all jobs', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400' },
      { icon: 'Wrench', title: 'Versatile Service', description: 'One handyman for multiple tasks', image: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4092?w=400' }
    ],
    pricingPackages: [
      { name: '1 Hour Service', price: 99, duration: '1 hour', ideal: 'Quick tasks', features: ['Single task', 'Tools included', 'Expert handyman', 'No minimum'] },
      { name: '3 Hour Package', price: 249, duration: '3 hours', ideal: 'Multiple tasks', popular: true, features: ['Multiple jobs', 'Best value', 'All tools', 'Same handyman'] },
      { name: 'Half Day', price: 399, duration: '4 hours', ideal: 'Major projects', features: ['Extended service', 'Multiple rooms', 'Complete jobs', 'All included'] },
      { name: 'Full Day', price: 699, duration: '8 hours', ideal: 'Large projects', features: ['Full day service', 'Multiple projects', 'Best rate', 'Complete service'] }
    ],
    faqs: [
      { question: 'What tasks can your handymen do?', answer: 'Our handymen handle furniture assembly, TV mounting, picture hanging, minor repairs, installations, and general home maintenance tasks.' },
      { question: 'Do you bring tools?', answer: 'Yes, our handymen come fully equipped with all necessary tools and equipment for most common tasks.' },
      { question: 'Can I book for multiple tasks?', answer: 'Absolutely! You can book by the hour and have our handyman complete multiple tasks during that time.' }
    ],
    process: [
      { step: 1, title: 'List Your Tasks', description: 'Tell us what needs to be done', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300' },
      { step: 2, title: 'Handyman Arrives', description: 'Skilled professional with tools', image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=300' },
      { step: 3, title: 'Work Completed', description: 'Efficient task completion', image: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4092?w=300' },
      { step: 4, title: 'Quality Check', description: 'Your satisfaction verified', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300' }
    ],
    customerReviews: [
      { id: 1, name: 'David Brown', rating: 5, comment: 'Great handyman! Assembled all my IKEA furniture quickly and perfectly. Very skilled with tools and cleaned up after himself. Saved me hours of frustration. Highly recommend AL-Kabir!', date: '3 days ago', location: 'JLT', verified: true, propertyType: 'Apartment' },
      { id: 2, name: 'Ayesha Mohammed', rating: 5, comment: 'Very helpful and skilled handyman. Fixed multiple things in one visit - door handles, curtain rods, TV mounting, and picture hanging. Great value for the hourly rate!', date: '1 week ago', location: 'Al Barsha', verified: true, propertyType: 'Villa' },
      { id: 3, name: 'Robert Johnson', rating: 5, comment: 'Excellent handyman service! Needed help with furniture assembly and wall mounting. The handyman was professional, efficient, and brought all necessary tools. Very satisfied!', date: '4 days ago', location: 'Dubai Marina', verified: true, propertyType: '2BR Apartment' },
      { id: 4, name: 'Maryam Al-Zaabi', rating: 4, comment: 'Good service overall. The handyman was skilled and completed all tasks. Only wish was more communication about estimated time for each task. But quality work done!', date: '5 days ago', location: 'Business Bay', verified: true, propertyType: 'Apartment' },
      { id: 5, name: 'Thomas Anderson', rating: 5, comment: 'Booked a 3-hour package and the handyman completed everything on my list! Assembled wardrobe, mounted TV, hung mirrors, and fixed cabinet doors. Incredibly efficient!', date: '2 days ago', location: 'Downtown Dubai', verified: true, propertyType: '3BR Apartment' },
      { id: 6, name: 'Noura Hassan', rating: 5, comment: 'Very impressed with AL-Kabir handyman service. He was punctual, professional, and very skilled. Assembled all our bedroom furniture and kitchen shelves. Excellent work!', date: '1 week ago', location: 'Arabian Ranches', verified: true, propertyType: 'Villa' },
      { id: 7, name: 'James Wilson', rating: 5, comment: 'The handyman was fantastic! Multi-skilled and tackled various jobs around our apartment. From fixing doors to installing shelves - did it all perfectly. Will book again!', date: '6 days ago', location: 'JBR', verified: true, propertyType: 'Apartment' },
      { id: 8, name: 'Laila Ahmed', rating: 5, comment: 'Best handyman service in Dubai! Same-day service, brought all tools, and completed multiple tasks efficiently. The handyman was respectful and cleaned up after. Highly recommend!', date: '3 days ago', location: 'Motor City', verified: true, propertyType: 'Villa' },
      { id: 9, name: 'Christopher Lee', rating: 4, comment: 'Good handyman service. Completed all tasks within the booked time. Professional and skilled. Would rate 5 stars if the hourly rate included some basic hardware.', date: '1 week ago', location: 'Mirdif', verified: true, propertyType: '2BR Apartment' }
    ],
    relatedServices: [
      { id: 'painting', name: 'Painting Services', price: 899, description: 'Professional painting', image: 'https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=400' },
      { id: 'cleaning', name: 'House Cleaning', price: 199, description: 'Complete cleaning', image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=400' }
    ]
  }
};

export const getServiceById = (id: string): Service | undefined => {
  return servicesData[id];
};

export const getAllServices = (): Service[] => {
  return Object.values(servicesData);
};
