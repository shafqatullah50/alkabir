import {useState, useEffect} from "react";
import {
  Star,
  Quote,
  MapPin,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {ImageWithFallback} from "../figma/ImageWithFallback";
import {Badge} from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {testimonialsApi, Testimonial} from "../../utils/appwrite/mockApis";

// Fallback testimonials for offline/error state
const fallbackTestimonials = [
  {
    id: 1,
    name: "Fatima Al-Zarooni",
    location: "Dubai Marina",
    propertyType: "Villa",
    rating: 5,
    service: "House Cleaning",
    comment:
      "Outstanding service! The AL-Kabir team transformed my villa. Every corner was spotless, and they used eco-friendly products which is important for my children. The staff were professional, respectful, and efficient. Worth every dirham!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    verified: true,
    date: "1 week ago",
  },
  {
    id: 2,
    name: "Mohammed Hassan",
    location: "Arabian Ranches",
    propertyType: "Villa",
    rating: 5,
    service: "House Cleaning",
    comment:
      "Best cleaning service in Dubai, hands down. Professional team, eco-friendly products, excellent results, and fair pricing. AL-Kabir has been cleaning our villa bi-weekly for 6 months - consistently excellent service.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    verified: true,
    date: "2 weeks ago",
  },
  {
    id: 3,
    name: "Sarah Ahmed",
    location: "JBR",
    propertyType: "1BR Apartment",
    rating: 5,
    service: "House Cleaning",
    comment:
      "Excellent deep cleaning service! My apartment looks brand new. The team paid attention to every detail - even cleaned areas I didn't expect. Very happy with the service and will definitely book regularly.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    verified: true,
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "John Smith",
    location: "Business Bay",
    propertyType: "2BR Apartment",
    rating: 5,
    service: "House Cleaning",
    comment:
      "I've used several cleaning services in Dubai, but AL-Kabir is by far the best. They're always on time, thorough, and professional. The fact that they're company-employed staff makes a huge difference in quality and reliability.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    verified: true,
    date: "1 month ago",
  },
  {
    id: 5,
    name: "Ahmed Al-Mansoori",
    location: "JBR",
    propertyType: "Apartment",
    rating: 5,
    service: "Plumbing",
    comment:
      "Fixed our water heater quickly and professionally! The plumber arrived on time with all the necessary equipment. Very knowledgeable and explained everything clearly. Excellent service!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    verified: true,
    date: "3 days ago",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    location: "Dubai Marina",
    propertyType: "Villa",
    rating: 5,
    service: "Plumbing",
    comment:
      "Emergency service was excellent. They arrived within 30 minutes of my call and fixed the burst pipe immediately. Professional, efficient, and very reasonable pricing. Highly recommend!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    verified: true,
    date: "1 week ago",
  },
  {
    id: 7,
    name: "Khalid Al-Rashid",
    location: "Jumeirah",
    propertyType: "Villa",
    rating: 5,
    service: "Painting",
    comment:
      "Excellent painting work! Very professional team who completed our villa painting in record time. The finish is perfect and they were very clean and tidy. Great color advice too!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    verified: true,
    date: "2 weeks ago",
  },
  {
    id: 8,
    name: "Emma Wilson",
    location: "Dubai Marina",
    propertyType: "3BR Apartment",
    rating: 5,
    service: "Painting",
    comment:
      "Beautiful finish and great color advice. The painters were meticulous and respectful of our home. They covered everything properly and cleaned up perfectly afterwards. Highly recommend!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    verified: true,
    date: "3 weeks ago",
  },
  {
    id: 9,
    name: "David Brown",
    location: "JLT",
    propertyType: "Apartment",
    rating: 5,
    service: "Handyman",
    comment:
      "Great handyman! Assembled all my IKEA furniture quickly and perfectly. Very skilled and brought all his own tools. Saved me hours of frustration. Will definitely book again!",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    verified: true,
    date: "5 days ago",
  },
  {
    id: 10,
    name: "Ayesha Mohammed",
    location: "Al Barsha",
    propertyType: "Villa",
    rating: 5,
    service: "Handyman",
    comment:
      "Very helpful and skilled handyman. Fixed multiple things around the house including doors, shelves, and mounted our TV perfectly. Professional service and great value for money.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    verified: true,
    date: "1 week ago",
  },
  {
    id: 11,
    name: "Omar Abdullah",
    location: "Downtown Dubai",
    propertyType: "Apartment",
    rating: 5,
    service: "Electrical",
    comment:
      "Professional electrician who fixed all our electrical issues quickly and safely. Very knowledgeable and explained everything clearly. Great service and reasonable pricing!",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
    verified: true,
    date: "4 days ago",
  },
  {
    id: 12,
    name: "Jennifer Taylor",
    location: "Arabian Ranches",
    propertyType: "Villa",
    rating: 5,
    service: "Electrical",
    comment:
      "Excellent electrical service! The electrician was punctual, professional, and very thorough with the safety inspection. Fixed all issues and provided helpful maintenance tips. Highly recommend!",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
    verified: true,
    date: "2 weeks ago",
  },
  {
    id: 13,
    name: "Rashid Al-Maktoum",
    location: "Palm Jumeirah",
    propertyType: "Villa",
    rating: 5,
    service: "Multiple Services",
    comment:
      "We use AL-Kabir for all our home maintenance needs - cleaning, plumbing, and electrical work. Consistently excellent service across all teams. Professional, reliable, and trustworthy company.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    verified: true,
    date: "1 month ago",
  },
  {
    id: 14,
    name: "Linda Martinez",
    location: "Downtown Dubai",
    propertyType: "3BR Apartment",
    rating: 5,
    service: "House Cleaning",
    comment:
      "I was impressed from start to finish. Easy booking, prompt arrival, thorough cleaning, and very respectful staff. My bathroom has never been this clean! Highly recommend AL-Kabir.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
    verified: true,
    date: "3 weeks ago",
  },
  {
    id: 15,
    name: "Hassan Ibrahim",
    location: "Sharjah",
    propertyType: "2BR Apartment",
    rating: 5,
    service: "House Cleaning",
    comment:
      "Fantastic cleaning service in Sharjah! The team was professional and thorough. Great to have a reliable company that serves outside Dubai as well. Will be booking monthly.",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400",
    verified: true,
    date: "1 week ago",
  },
];

// Transform Supabase testimonial to display format
const transformTestimonial = (t: Testimonial, index: number) => ({
  id: index + 1,
  name: t.customer_name,
  location: "Dubai", // Default location
  propertyType: "Customer",
  rating: t.rating,
  service: t.service_name || "Service",
  comment: t.comment,
  image:
    t.customer_avatar ||
    `https://images.unsplash.com/photo-${1494790108377 + index}?w=400`,
  verified: true,
  date: new Date(t.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }),
});

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsApi.getFeatured();
        if (data && data.length > 0) {
          const transformed = data.map(transformTestimonial);
          setTestimonials(transformed);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Keep using fallback testimonials
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className='py-16 bg-background transition-colors duration-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-4'>
            <Star className='w-4 h-4 fill-emerald-700 dark:fill-emerald-400' />
            <span className='text-sm'>4.8 Average Rating • 2,845+ Reviews</span>
          </div>
          <h2 className='text-3xl lg:text-4xl text-foreground mb-4'>
            What Our Customers Say
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Real reviews from real customers across the UAE who trust AL-Kabir
            for their home service needs
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className='w-full'>
          <CarouselContent className='-ml-2 md:-ml-4'>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className='pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3'>
                <div className='bg-card rounded-xl p-6 relative hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border card-hover'>
                  <Quote className='absolute top-4 right-4 w-10 h-10 text-emerald-100 dark:text-emerald-900/30' />

                  {/* Header */}
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center space-x-3'>
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className='w-12 h-12 rounded-full object-cover border-2 border-emerald-100 dark:border-emerald-900/50'
                      />
                      <div>
                        <div className='flex items-center space-x-2'>
                          <h4 className='text-base text-foreground'>
                            {testimonial.name}
                          </h4>
                          {testimonial.verified && (
                            <BadgeCheck className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
                          )}
                        </div>
                        <div className='flex items-center space-x-1 text-xs text-muted-foreground'>
                          <MapPin className='w-3 h-3' />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className='flex items-center space-x-1 mb-3'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-4 h-4 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>

                  {/* Service Badge */}
                  <div className='flex items-center space-x-2 mb-3'>
                    <Badge className='bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'>
                      {testimonial.service}
                    </Badge>
                    <span className='text-xs text-muted-foreground'>
                      {testimonial.propertyType}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className='text-sm text-foreground leading-relaxed relative z-10 flex-1 mb-3'>
                    "{testimonial.comment}"
                  </p>

                  {/* Footer */}
                  <div className='flex items-center justify-between pt-3 border-t border-border'>
                    <span className='text-xs text-muted-foreground'>
                      {testimonial.date}
                    </span>
                    {testimonial.verified && (
                      <Badge variant='secondary' className='text-xs'>
                        <BadgeCheck className='w-3 h-3 mr-1' />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex -left-12' />
          <CarouselNext className='hidden md:flex -right-12' />
        </Carousel>

        {/* Stats Row */}
        <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
          <div className='bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300'>
            <div className='text-3xl text-emerald-600 dark:text-emerald-400 mb-2'>
              15,800+
            </div>
            <div className='text-sm text-muted-foreground'>Happy Customers</div>
          </div>
          <div className='bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300'>
            <div className='text-3xl text-emerald-600 dark:text-emerald-400 mb-2'>
              4.8★
            </div>
            <div className='text-sm text-muted-foreground'>Average Rating</div>
          </div>
          <div className='bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300'>
            <div className='text-3xl text-emerald-600 dark:text-emerald-400 mb-2'>
              2,845+
            </div>
            <div className='text-sm text-muted-foreground'>
              Customer Reviews
            </div>
          </div>
          <div className='bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300'>
            <div className='text-3xl text-emerald-600 dark:text-emerald-400 mb-2'>
              98%
            </div>
            <div className='text-sm text-muted-foreground'>
              Satisfaction Rate
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-muted-foreground mb-4'>
            Trusted by residents across Dubai, Abu Dhabi, Sharjah, and all UAE
            Emirates
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            <Badge variant='secondary' className='bg-card border-border'>
              <BadgeCheck className='w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400' />
              100% Verified Reviews
            </Badge>
            <Badge variant='secondary' className='bg-card border-border'>
              <Star className='w-4 h-4 mr-1 text-yellow-500 fill-yellow-500' />
              Google Rated 4.8/5
            </Badge>
            <Badge variant='secondary' className='bg-card border-border'>
              <MapPin className='w-4 h-4 mr-1 text-blue-600 dark:text-blue-400' />
              All 7 Emirates Served
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
