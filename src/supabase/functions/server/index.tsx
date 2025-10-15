import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize default data on server start
async function initializeDefaultData() {
  try {
    // Check if data already exists
    const existing = await kv.get("initialized");
    if (existing) {
      console.log("Data already initialized");
      return;
    }

    console.log("Initializing default data...");

    // Default services
    const services = [
      {
        id: "house-cleaning",
        name: "Professional House Cleaning",
        short_name: "House Cleaning",
        slug: "house-cleaning",
        description: "Deep cleaning service for your entire home with eco-friendly products",
        icon: "Home",
        price_from: 199,
        price_to: 499,
        rating: 4.8,
        reviews_count: 245,
        bookings_count: 1250,
        is_active: true,
      },
      {
        id: "office-cleaning",
        name: "Office Cleaning Services",
        short_name: "Office Cleaning",
        slug: "office-cleaning",
        description: "Keep your workspace pristine and professional",
        icon: "Building",
        price_from: 299,
        price_to: 799,
        rating: 4.9,
        reviews_count: 180,
        bookings_count: 890,
        is_active: true,
      },
      {
        id: "carpet-cleaning",
        name: "Deep Carpet & Upholstery Cleaning",
        short_name: "Carpet Cleaning",
        slug: "carpet-cleaning",
        description: "Professional steam cleaning for carpets and furniture",
        icon: "Sofa",
        price_from: 149,
        price_to: 399,
        rating: 4.7,
        reviews_count: 320,
        bookings_count: 1580,
        is_active: true,
      },
      {
        id: "plumbing",
        name: "Professional Plumbing Services",
        short_name: "Plumbing",
        slug: "plumbing",
        description: "Expert plumbers for all your plumbing needs",
        icon: "Droplet",
        price_from: 99,
        price_to: 599,
        rating: 4.8,
        reviews_count: 410,
        bookings_count: 2100,
        is_active: true,
      },
      {
        id: "electrical",
        name: "Electrical Installation & Repair",
        short_name: "Electrical Work",
        slug: "electrical",
        description: "Licensed electricians for safe electrical work",
        icon: "Zap",
        price_from: 129,
        price_to: 699,
        rating: 4.9,
        reviews_count: 385,
        bookings_count: 1950,
        is_active: true,
      },
      {
        id: "pest-control",
        name: "Comprehensive Pest Control",
        short_name: "Pest Control",
        slug: "pest-control",
        description: "Safe and effective pest elimination services",
        icon: "Bug",
        price_from: 179,
        price_to: 449,
        rating: 4.7,
        reviews_count: 290,
        bookings_count: 1420,
        is_active: true,
      },
      {
        id: "painting",
        name: "Interior & Exterior Painting",
        short_name: "Painting",
        slug: "painting",
        description: "Professional painting services for homes and offices",
        icon: "Paintbrush",
        price_from: 249,
        price_to: 1299,
        rating: 4.8,
        reviews_count: 265,
        bookings_count: 1340,
        is_active: true,
      },
      {
        id: "moving",
        name: "Professional Moving Services",
        short_name: "Moving",
        slug: "moving",
        description: "Stress-free moving with careful handling of your belongings",
        icon: "Truck",
        price_from: 399,
        price_to: 1499,
        rating: 4.9,
        reviews_count: 520,
        bookings_count: 2650,
        is_active: true,
      },
      {
        id: "furniture-assembly",
        name: "Furniture Assembly Service",
        short_name: "Furniture Assembly",
        slug: "furniture-assembly",
        description: "Expert assembly of all types of furniture",
        icon: "Armchair",
        price_from: 79,
        price_to: 299,
        rating: 4.7,
        reviews_count: 445,
        bookings_count: 2280,
        is_active: true,
      },
      {
        id: "it-support",
        name: "Home & Office IT Support",
        short_name: "IT Support",
        slug: "it-support",
        description: "Technical support for all your IT needs",
        icon: "Monitor",
        price_from: 149,
        price_to: 599,
        rating: 4.8,
        reviews_count: 310,
        bookings_count: 1580,
        is_active: true,
      },
      {
        id: "gardening",
        name: "Garden Maintenance & Landscaping",
        short_name: "Gardening",
        slug: "gardening",
        description: "Professional garden care and landscaping services",
        icon: "Flower",
        price_from: 199,
        price_to: 799,
        rating: 4.6,
        reviews_count: 195,
        bookings_count: 980,
        is_active: true,
      },
    ];

    // Store services
    for (const service of services) {
      await kv.set(`service:${service.slug}`, service);
    }

    // Default testimonials
    const testimonials = [
      {
        id: "test-1",
        customer_name: "Ahmed Al-Mansouri",
        rating: 5,
        comment: "Excellent service! The cleaning team was professional and thorough. My house has never looked better.",
        service_name: "House Cleaning",
        is_featured: true,
        is_approved: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "test-2",
        customer_name: "Sarah Johnson",
        rating: 5,
        comment: "Very impressed with the moving service. They handled all our belongings with great care.",
        service_name: "Moving",
        is_featured: true,
        is_approved: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "test-3",
        customer_name: "Mohammed Hassan",
        rating: 4,
        comment: "Quick and efficient plumbing repair. Fixed my leaking pipe in no time!",
        service_name: "Plumbing",
        is_featured: true,
        is_approved: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "test-4",
        customer_name: "Fatima Al-Ali",
        rating: 5,
        comment: "The pest control team was amazing. No more cockroaches! Highly recommend.",
        service_name: "Pest Control",
        is_featured: true,
        is_approved: true,
        created_at: new Date().toISOString(),
      },
    ];

    for (const testimonial of testimonials) {
      await kv.set(`testimonial:${testimonial.id}`, testimonial);
    }

    // Mark as initialized
    await kv.set("initialized", true);
    console.log("Default data initialized successfully");
  } catch (error) {
    console.error("Error initializing default data:", error);
  }
}

// Initialize on startup
initializeDefaultData();

// Health check endpoint
app.get("/make-server-4b12d838/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all services
app.get("/make-server-4b12d838/services", async (c) => {
  try {
    const services = await kv.getByPrefix("service:");
    return c.json(services || []);
  } catch (error) {
    console.error("Error fetching services:", error);
    return c.json({ error: "Failed to fetch services" }, 500);
  }
});

// Get service by slug
app.get("/make-server-4b12d838/services/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const service = await kv.get(`service:${slug}`);
    if (!service) {
      return c.json({ error: "Service not found" }, 404);
    }
    return c.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return c.json({ error: "Failed to fetch service" }, 500);
  }
});

// Get featured testimonials
app.get("/make-server-4b12d838/testimonials", async (c) => {
  try {
    const testimonials = await kv.getByPrefix("testimonial:");
    return c.json(testimonials || []);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return c.json({ error: "Failed to fetch testimonials" }, 500);
  }
});

// Create booking
app.post("/make-server-4b12d838/bookings", async (c) => {
  try {
    const body = await c.req.json();
    const bookingId = `booking:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const booking = {
      id: bookingId,
      ...body,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    await kv.set(bookingId, booking);
    return c.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// Get user bookings
app.get("/make-server-4b12d838/bookings/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const allBookings = await kv.getByPrefix("booking:");
    const userBookings = (allBookings || []).filter((b: any) => b.user_id === userId);
    return c.json(userBookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

Deno.serve(app.fetch);