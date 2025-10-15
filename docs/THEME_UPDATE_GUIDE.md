# Theme Color Migration Guide

## Quick Reference for Dark Mode Updates

### Background Colors
- `bg-white` → `bg-card` or `bg-background`
- `bg-gray-50` → `bg-accent` or `bg-muted`
- `bg-gray-100` → `bg-accent`
- `bg-gray-900` → `bg-card` (in dark mode context)

### Text Colors
- `text-gray-900` → `text-foreground`
- `text-gray-600` → `text-muted-foreground`
- `text-gray-500` → `text-muted-foreground`
- `text-gray-400` → `text-muted-foreground`

### Border Colors
- `border-gray-100` → `border-border`
- `border-gray-200` → `border-border`

### Brand Colors (Add dark mode variants)
- `text-emerald-600` → `text-emerald-600 dark:text-emerald-400`
- `bg-emerald-600` → `bg-emerald-600 dark:bg-emerald-600`

### Transitions
- Add `transition-colors duration-300` to elements with background/text colors

## Component-Specific Updates Needed

### ✅ Completed
- Header
- Footer  
- Button component
- HeroSection

### 🔄 In Progress
- FeaturedCategories
- FeaturedProfessionals
- Testimonials
- OurTeam
- WhyChooseUs
- HowItWorks
- ServiceCoverage

### ⏳ Pending
- All Pages (Login, Signup, Dashboard, etc.)
- Service cards
- Forms
- Modals
