import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function BlogPostPage() {
  const { postId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const post = {
    id: postId,
    title:
      "10 Essential Home Maintenance Tasks for Every Season",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=1200",
        alt: "10 Essential Home Maintenance Tasks for Every Season",
      },
      {
        url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200",
        alt: "Home maintenance tools and equipment",
      },
      {
        url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200",
        alt: "Professional home maintenance service",
      },
    ],
    category: "Home Maintenance",
    author: "Sarah Johnson",
    date: "October 10, 2025",
    readTime: "5 min read",
    content: `
      <p>Maintaining your home doesn't have to be overwhelming. By breaking down tasks by season, you can keep your home in excellent condition year-round without feeling stressed.</p>

      <h2>Spring Maintenance</h2>
      <p>As winter fades, spring is the perfect time to refresh and repair your home after the harsh weather.</p>
      <ul>
        <li>Clean gutters and downspouts to prevent water damage</li>
        <li>Inspect roof for winter damage</li>
        <li>Service air conditioning before summer heat</li>
        <li>Check exterior paint and siding</li>
        <li>Test sprinkler systems and adjust watering schedules</li>
      </ul>

      <h2>Summer Maintenance</h2>
      <p>Summer is ideal for outdoor projects and keeping your cooling systems running efficiently.</p>
      <ul>
        <li>Power wash exterior surfaces</li>
        <li>Seal driveway cracks</li>
        <li>Clean and repair deck or patio</li>
        <li>Trim trees and shrubs away from house</li>
        <li>Check and clean window and door screens</li>
      </ul>

      <h2>Fall Maintenance</h2>
      <p>Prepare your home for winter with these essential fall tasks.</p>
      <ul>
        <li>Clean gutters again after leaves fall</li>
        <li>Service heating system before cold weather</li>
        <li>Seal gaps around windows and doors</li>
        <li>Drain outdoor faucets and store hoses</li>
        <li>Inspect chimney and fireplace</li>
      </ul>

      <h2>Winter Maintenance</h2>
      <p>Keep your home safe and warm during the coldest months.</p>
      <ul>
        <li>Check insulation in attic and basement</li>
        <li>Prevent pipe freezing with insulation</li>
        <li>Monitor for ice dams on roof</li>
        <li>Test smoke and carbon monoxide detectors</li>
        <li>Keep snow and ice clear from walkways</li>
      </ul>

      <h2>Year-Round Tasks</h2>
      <p>Some maintenance tasks should be done regularly throughout the year:</p>
      <ul>
        <li>Replace HVAC filters monthly</li>
        <li>Test GFCI outlets quarterly</li>
        <li>Clean dryer vents to prevent fires</li>
        <li>Inspect plumbing for leaks</li>
        <li>Check water heater and flush sediment</li>
      </ul>

      <h2>When to Call a Professional</h2>
      <p>While many tasks can be DIY, don't hesitate to call a professional for:</p>
      <ul>
        <li>Electrical work beyond basic fixture replacement</li>
        <li>Major plumbing repairs or installations</li>
        <li>Roof repairs or replacement</li>
        <li>HVAC system repairs</li>
        <li>Structural issues or foundation problems</li>
      </ul>

      <p>Regular maintenance saves money in the long run by preventing costly repairs and extending the life of your home's systems and components. Create a maintenance calendar and stick to it!</p>
    `,
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % post.images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + post.images.length) % post.images.length,
    );
  };

  const relatedPosts = [
    {
      id: "2",
      title: "How to Choose the Right Plumber",
      image:
        "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400",
      category: "Guides",
    },
    {
      id: "3",
      title: "Deep Cleaning vs Regular Cleaning",
      image:
        "https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=400",
      category: "Cleaning Tips",
    },
    {
      id: "4",
      title: "DIY Home Repairs Guide",
      image:
        "https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=400",
      category: "DIY Tips",
    },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section - 50-60% viewport height with carousel */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background Image Carousel - Full Width */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={post.images[currentImageIndex].url}
            alt={post.images[currentImageIndex].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          {/* Dark Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          {/* Bottom Gradient Overlay - Smooth transition to section below */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/95 to-transparent transition-colors duration-300"></div>
        </div>

        {/* Content Container - With site-wide horizontal padding */}
        <div className="relative h-full w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 flex flex-col">
          {/* Breadcrumb - Inside Hero, No Background */}
          <div className="py-3 md:py-4 z-20">
            <Breadcrumb>
              <BreadcrumbList className="items-center">
                {[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.category },
                ].map((segment, index) => {
                  const isLast = index === 2;
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbItem className="font-[Alan_Sans] flex items-center justify-center">
                        {isLast ? (
                          <BreadcrumbPage className="text-white/90 font-medium">
                            {segment.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link
                              to={segment.href || "#"}
                              className="text-white/70 hover:text-white transition-colors font-medium"
                            >
                              {segment.label}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className="text-white/50" />
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Navigation Arrows - Inside container */}
          {post.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-foreground w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg z-10 touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-foreground w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 shadow-lg z-10 touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Image Counter - Inside container */}
          {post.images.length > 1 && (
            <div className="absolute top-4 right-4 md:right-6 lg:right-8 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium z-10">
              {currentImageIndex + 1} / {post.images.length}
            </div>
          )}

          {/* Thumbnail Strip - Desktop Only, inside container */}
          {post.images.length > 1 && (
            <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 z-10">
              {post.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentImageIndex === index
                      ? "ring-2 ring-emerald-400 scale-110"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <ImageWithFallback
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Header */}
      <article className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 py-8 md:py-12">
        {/* Content */}
        <div className=" mx-auto m-[0px]">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4 border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
            {post.category}
          </Badge>

          <h1 className="text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-300 bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border transition-colors duration-300">
            <div className="flex items-center space-x-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Article Content with Custom Styling */}
          <div
            className="blog-content text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to Action */}
          <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-emerald-950/30 rounded-2xl text-center border border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-foreground mb-4">
              <span className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Need Professional Help?
              </span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our verified professionals are ready to help with
              all your home maintenance needs
            </p>
            <Link to="/categories">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Browse Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-foreground mb-6 flex items-center">
            <span>Related Articles</span>
            <span className="ml-3 h-0.5 flex-1 bg-gradient-to-r from-emerald-600 to-transparent dark:from-emerald-400 rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.id}`}
                className="group"
              >
                <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.title}
                      className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-2 border border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
                      {related.category}
                    </Badge>
                    <h3 className="text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {related.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Custom Blog Content Styles */}
      <style>{`
        .blog-content {
          font-size: 1.0625rem;
          line-height: 1.8;
        }

        .blog-content h2 {
          color: var(--color-foreground);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid;
          border-image: linear-gradient(to right, #10b981, #14b8a6) 1;
          position: relative;
        }

        .dark .blog-content h2 {
          border-image: linear-gradient(to right, #34d399, #2dd4bf) 1;
        }

        .blog-content h2::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #10b981, #14b8a6);
          border-radius: 2px;
        }

        .dark .blog-content h2::after {
          background: linear-gradient(to right, #34d399, #2dd4bf);
        }

        .blog-content p {
          color: var(--color-foreground);
          margin-bottom: 1.25rem;
          opacity: 0.9;
        }

        .blog-content ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          list-style: none;
        }

        .blog-content ul li {
          color: var(--color-foreground);
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.7;
        }

        .blog-content ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .dark .blog-content ul li::before {
          color: #34d399;
        }

        .blog-content ul li:hover {
          color: #10b981;
        }

        .dark .blog-content ul li:hover {
          color: #34d399;
        }

        .blog-content strong {
          color: #10b981;
          font-weight: 700;
        }

        .dark .blog-content strong {
          color: #34d399;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.7;
          }

          .blog-content h2 {
            font-size: 1.5rem;
            margin-top: 2rem;
          }

          .blog-content ul {
            padding-left: 1rem;
          }

          .blog-content ul li {
            padding-left: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}