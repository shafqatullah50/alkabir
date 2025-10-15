import {
  Client,
  Account,
  Databases,
  Storage,
  Teams,
  Functions,
  Messaging,
} from "appwrite";

// Environment variables for Appwrite configuration
const APPWRITE_ENDPOINT =
  (import.meta as any).env?.VITE_APPWRITE_ENDPOINT ||
  "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID =
  (import.meta as any).env?.VITE_APPWRITE_PROJECT_ID || "68ef7430003e3353356b";

// Initialize Appwrite Client
export const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const functions = new Functions(client);
export const messaging = new Messaging(client);

// Database and collection IDs
export const DATABASE_ID = "main";
export const COLLECTIONS = {
  PROFILES: "profiles",
  CUSTOMERS: "customers",
  ADDRESSES: "addresses",
  SERVICE_CATEGORIES: "service_categories",
  SERVICES: "services",
  BOOKINGS: "bookings",
  PROFESSIONALS: "professionals",
  PAYMENTS: "payments",
  REVIEWS: "reviews",
  BLOG_CATEGORIES: "blog_categories",
  BLOG_POSTS: "blog_posts",
  NOTIFICATIONS: "notifications",
  PROMOCODES: "promocodes",
  CONTACT_INQUIRIES: "contact_inquiries",
  PACKAGES: "packages",
} as const;

export type CollectionId = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
