import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
  Sparkles,
  Wrench,
  Droplets,
  Zap,
  Bug,
  PaintBucket,
  Truck,
  Package,
  Wind,
  Computer,
  Trees,
  Hammer,
  Refrigerator,
  Car,
  ArrowRight,
} from "lucide-react";
import {databases, DATABASE_ID, COLLECTIONS} from "../../utils/appwrite/client";
import {Query} from "appwrite";
import {type ServiceCategories} from "../../types/database";

// Icon mapping for database icon names to Lucide components
const iconMapping: Record<string, any> = {
  Sparkles: Sparkles,
  Wrench: Wrench,
  Droplets: Droplets,
  Zap: Zap,
  Bug: Bug,
  PaintBucket: PaintBucket,
  Truck: Truck,
  Package: Package,
  Wind: Wind,
  Computer: Computer,
  Trees: Trees,
  Hammer: Hammer,
  Refrigerator: Refrigerator,
  Car: Car,
};

// Fallback categories array (updated without colors)
const fallbackCategories = [
  {
    id: "cleaning",
    name: "Cleaning",
    icon: Sparkles,
  },
  {
    id: "repairs",
    name: "Repairs",
    icon: Wrench,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Droplets,
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: Bug,
  },
  {
    id: "painting",
    name: "Painting",
    icon: PaintBucket,
  },
  {
    id: "moving",
    name: "Moving",
    icon: Truck,
  },
  {
    id: "assembly",
    name: "Assembly",
    icon: Package,
  },
];

interface Category {
  id: string;
  name: string;
  icon: any;
  icon_url?: string | null;
  image_url?: string | null;
}

// Loading skeleton component
const CategorySkeleton = ({isMobile = false}: {isMobile?: boolean}) => (
  <div
    className={`bg-card border border-border rounded-xl ${
      isMobile ? "p-4" : "p-6"
    } text-center animate-pulse`}>
    <div
      className={`bg-muted ${
        isMobile ? "w-20 h-20" : "w-24 h-24"
      } rounded-full mx-auto ${isMobile ? "mb-3" : "mb-4"}`}
    />
    <div
      className={`bg-muted ${isMobile ? "h-3" : "h-4"} rounded mx-auto w-3/5`}
    />
  </div>
);

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from Appwrite
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.SERVICE_CATEGORIES,
          [Query.equal("is_active", true), Query.orderAsc("display_order")]
        );

        // Transform database data to component format using proper types
        const transformedCategories: Category[] = response.documents.map(
          (doc: any) => ({
            id: doc.slug || doc.$id,
            name: doc.name,
            icon: iconMapping[doc.icon_url || ""] || Wrench, // fallback to Wrench icon
            icon_url: doc.icon_url,
            image_url: doc.image_url,
          })
        );

        setCategories(transformedCategories);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        // Use fallback categories on error
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className='py-12 md:py-16 bg-background transition-colors duration-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-8 md:mb-12'>
          <h2 className='mb-3 md:mb-4'>Popular Service Categories</h2>
          <p className='max-w-2xl mx-auto'>
            Browse our wide range of professional services for your home and
            office
          </p>
          {error && (
            <p className='text-sm text-red-600 dark:text-red-400 mt-2'>
              {error} - Showing default categories
            </p>
          )}
        </div>

        {/* Category Cards Grid */}
        {/* Loading State */}
        {loading ? (
          <>
            {/* Mobile: Show loading skeletons */}
            <div className='grid grid-cols-3 gap-4 mb-6 md:hidden'>
              {[1, 2, 3].map((i) => (
                <CategorySkeleton key={i} isMobile={true} />
              ))}
            </div>

            {/* Desktop: Show loading skeletons */}
            <div className='hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CategorySkeleton key={i} isMobile={false} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Mobile: Show only 3 cards */}
            <div className='grid grid-cols-3 gap-4 mb-6 md:hidden'>
              {categories.slice(0, 3).map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={`/service/${category.id}`}
                    className='group block'>
                    <div className='bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95'>
                      <div className='w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 bg-gray-50 dark:bg-gray-800 flex items-center justify-center'>
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className='w-full h-full object-cover'
                            loading='lazy'
                          />
                        ) : category.icon_url ? (
                          <img
                            src={category.icon_url}
                            alt={category.name}
                            className='w-12 h-12 object-contain'
                            loading='lazy'
                          />
                        ) : (
                          <Icon className='w-12 h-12 text-muted-foreground' />
                        )}
                      </div>
                      <h3 className='text-xs leading-tight text-foreground'>
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Tablet & Desktop: Show all cards */}
            <div className='hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8'>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={`/service/${category.id}`}
                    className='group'>
                    <div className='bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 card-hover'>
                      <div className='w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 bg-gray-50 dark:bg-gray-800 flex items-center justify-center'>
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className='w-full h-full object-cover'
                            loading='lazy'
                          />
                        ) : category.icon_url ? (
                          <img
                            src={category.icon_url}
                            alt={category.name}
                            className='w-14 h-14 object-contain'
                            loading='lazy'
                          />
                        ) : (
                          <Icon className='w-14 h-14 text-muted-foreground' />
                        )}
                      </div>
                      <h3 className='text-sm text-foreground'>
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* View All Services Button */}
        {!loading && (
          <>
            {/* Mobile: Prominent button */}
            <div className='md:hidden'>
              <Link to='/categories' className='block'>
                <button className='w-full bg-primary text-primary-foreground py-4 px-6 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2'>
                  <span>View All Services</span>
                  <ArrowRight className='w-5 h-5' />
                </button>
              </Link>
            </div>

            {/* Desktop: Text link */}
            <div className='hidden md:block text-center'>
              <Link to='/categories'>
                <button className='text-primary hover:text-primary/80 underline transition-colors inline-flex items-center gap-2'>
                  <span>View All Services</span>
                  <ArrowRight className='w-4 h-4' />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
