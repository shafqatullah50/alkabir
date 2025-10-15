import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: '1',
      title: '10 Essential Home Maintenance Tasks for Every Season',
      excerpt: 'Keep your home in top shape year-round with these essential maintenance tasks. Learn what to do in spring, summer, fall, and winter.',
      image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=800',
      category: 'Home Maintenance',
      author: 'Sarah Johnson',
      date: 'October 10, 2025',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'How to Choose the Right Plumber: A Complete Guide',
      excerpt: 'Finding a reliable plumber can be challenging. This comprehensive guide will help you make the right choice for your plumbing needs.',
      image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=800',
      category: 'Guides',
      author: 'Michael Chen',
      date: 'October 8, 2025',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'Deep Cleaning vs Regular Cleaning: What\'s the Difference?',
      excerpt: 'Understand the key differences between deep cleaning and regular cleaning services to make an informed decision.',
      image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=800',
      category: 'Cleaning Tips',
      author: 'Emily Davis',
      date: 'October 5, 2025',
      readTime: '4 min read',
    },
    {
      id: '4',
      title: 'DIY Home Repairs: When to Call a Professional',
      excerpt: 'Learn which home repairs you can tackle yourself and when it\'s time to call in the experts.',
      image: 'https://images.unsplash.com/photo-1584677191047-38f48d0db64e?w=800',
      category: 'DIY Tips',
      author: 'David Martinez',
      date: 'October 3, 2025',
      readTime: '6 min read',
    },
    {
      id: '5',
      title: 'Spring Cleaning Checklist: Room by Room Guide',
      excerpt: 'Get your home sparkling clean with our comprehensive spring cleaning checklist covering every room.',
      image: 'https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=800',
      category: 'Cleaning Tips',
      author: 'Lisa Garcia',
      date: 'October 1, 2025',
      readTime: '8 min read',
    },
    {
      id: '6',
      title: 'Understanding Your Home\'s Electrical System',
      excerpt: 'A beginner-friendly guide to understanding your home\'s electrical system and common electrical issues.',
      image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?w=800',
      category: 'Home Improvement',
      author: 'Robert Wilson',
      date: 'September 28, 2025',
      readTime: '10 min read',
    },
  ];

  const categories = ['All', 'Home Maintenance', 'Cleaning Tips', 'Guides', 'DIY Tips', 'Home Improvement'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white transition-colors duration-300">
        <div className="h-64 md:h-72 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl mb-4">Blog & Resources</h1>
            <p className="text-xl text-emerald-100 dark:text-emerald-200 max-w-2xl mx-auto">
              Tips, guides, and insights for maintaining your home and office in the UAE
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 h-12 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700'
                    : 'bg-card text-foreground border border-border hover:bg-accent hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Link to={`/blog/${filteredPosts[0].id}`}>
            <div className="bg-card rounded-xl shadow-lg overflow-hidden mb-12 hover:shadow-2xl transition-all duration-300 border border-border card-hover">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 w-fit mb-3">
                    {filteredPosts[0].category}
                  </Badge>
                  <h2 className="text-3xl text-foreground mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{filteredPosts[0].date}</span>
                    </div>
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <div className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border card-hover">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 w-fit mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
          </div>
        )}

        {/* Newsletter Subscription - Enhanced Design */}
        <div className="mt-16 relative overflow-hidden rounded-2xl">
          {/* Background Gradient with Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-700 dark:via-teal-700 dark:to-emerald-800 transition-colors duration-300"></div>
          
          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
          
          {/* Content */}
          <div className="relative px-8 py-12 lg:px-16 lg:py-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-3xl lg:text-4xl mb-4 text-white">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-emerald-50 dark:text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Get expert home maintenance tips, exclusive guides, and special offers delivered straight to your inbox every week
              </p>
              
              {/* Subscription Form */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-14 bg-white/95 backdrop-blur-sm text-gray-900 border-0 placeholder:text-gray-500 focus:bg-white transition-all duration-300 shadow-lg"
                />
                <Button className="h-14 px-8 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-emerald-700 dark:hover:bg-gray-100 shadow-xl btn-hover-lift border-0">
                  Subscribe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-50 dark:text-emerald-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>15,800+ subscribers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
