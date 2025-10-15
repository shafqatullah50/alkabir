import {useState, useEffect} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {
  Sparkles,
  Search,
  Star,
  ArrowRight,
  Grid3X3,
  LayoutGrid,
} from "lucide-react";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import {Tabs, TabsList, TabsTrigger} from "../components/ui/tabs";
import {categoriesApi} from "../utils/appwrite/mockApis";
import {ServiceCategories} from "../types/database";
import {Skeleton} from "../components/ui/skeleton";

// Icon mapping helper - fallback to Sparkles if icon not found
const getIconComponent = (iconName: string | null) => {
  // For now, return Sparkles as default until we implement proper icon mapping
  return Sparkles;
};

export default function CategoriesPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "featured" | "popular">("all");
  const [categories, setCategories] = useState<ServiceCategories[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className='min-h-screen bg-background transition-colors duration-300'>
      {/* Header - Mobile Optimized */}
      <div className='bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white py-10 md:py-16 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center'>
            Service Categories
          </h1>
          <p className='text-lg md:text-xl text-emerald-100 dark:text-emerald-200 text-center max-w-3xl mx-auto'>
            Browse our complete catalog of service categories to find exactly
            what you need
          </p>
        </div>
      </div>

      {/* Filters - Mobile Optimized */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8'>
        <div className='bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-border'>
          <div className='flex flex-col gap-3 md:gap-4'>
            {/* Search Bar */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground pointer-events-none' />
              <Input
                type='text'
                placeholder='Search categories...'
                className='pl-9 md:pl-10 h-11 md:h-12 text-sm md:text-base'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <Tabs
              value={filter}
              onValueChange={(v: string) =>
                setFilter(v as "all" | "featured" | "popular")
              }
              className='w-full'>
              <TabsList className='grid w-full grid-cols-3 h-10 md:h-12'>
                <TabsTrigger value='all' className='text-xs md:text-sm'>
                  All Categories
                </TabsTrigger>
                <TabsTrigger value='featured' className='text-xs md:text-sm'>
                  Featured
                </TabsTrigger>
                <TabsTrigger value='popular' className='text-xs md:text-sm'>
                  Popular
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Categories Grid - Mobile Optimized */}
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-12 md:pb-16'>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className='bg-card border border-border rounded-xl p-5 md:p-6'>
                <Skeleton className='w-14 h-14 md:w-16 md:h-16 rounded-xl mx-auto mb-3 md:mb-4' />
                <Skeleton className='h-5 md:h-6 w-3/4 mx-auto mb-2' />
                <Skeleton className='h-4 w-full mb-1' />
                <Skeleton className='h-4 w-2/3 mx-auto mb-3' />
                <Skeleton className='h-8 w-full' />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-12 md:pb-16'>
            {filteredCategories.map((category) => {
              const Icon = getIconComponent(category.icon_url);
              return (
                <Link
                  key={category.$id}
                  to={`/services?category=${category.slug}`}
                  className='group block'>
                  <div className='bg-card border border-border rounded-xl p-5 md:p-6 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 h-full active:scale-95 md:active:scale-100'>
                    <div className='flex flex-col h-full'>
                      {/* Icon/Image */}
                      <div className='relative mb-3 md:mb-4'>
                        {category.image_url ? (
                          <div className='w-14 h-14 md:w-16 md:h-16 rounded-xl mx-auto overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30'>
                            <img
                              src={category.image_url}
                              alt={category.name}
                              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                              onError={(e) => {
                                // Fallback to icon if image fails to load
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                            <div className='hidden w-full h-full flex items-center justify-center'>
                              <Icon className='w-7 h-7 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400' />
                            </div>
                          </div>
                        ) : (
                          <div className='w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform bg-emerald-100 dark:bg-emerald-900/30'>
                            <Icon className='w-7 h-7 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400' />
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className='text-base md:text-lg font-semibold text-center mb-2 text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors'>
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className='text-sm text-center flex-1 mb-3 line-clamp-2 text-muted-foreground'>
                        {category.description ||
                          "Explore our professional services in this category"}
                      </p>

                      {/* CTA Button */}
                      <div className='mt-auto'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='w-full border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300'>
                          <LayoutGrid className='w-4 h-4 mr-2' />
                          View Services
                          <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State - Mobile Optimized */}
        {!loading && filteredCategories.length === 0 && (
          <div className='text-center py-12 md:py-16'>
            <div className='bg-card border border-border rounded-xl p-8 md:p-12 max-w-md mx-auto'>
              <Search className='w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-muted-foreground opacity-50' />
              <h3 className='text-lg md:text-xl font-semibold text-foreground mb-2'>
                No Categories Found
              </h3>
              <p className='text-sm md:text-base text-muted-foreground mb-4'>
                We couldn't find any categories matching "{searchQuery}". Try a
                different search term.
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                variant='outline'
                className='border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'>
                Clear Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
