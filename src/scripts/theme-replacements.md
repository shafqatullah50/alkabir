# Systematic Theme Replacements

## Pattern Applied to All Files

### Background Colors
- `bg-white` → `bg-card` (for card-like elements) or `bg-background` (for page backgrounds)
- `bg-gray-50` → `bg-accent/50` or `bg-muted`
- `bg-gray-100` → `bg-accent`
- `from-gray-50` → `from-accent/30`
- `to-gray-50` → `to-accent/30`

### Text Colors
- `text-gray-900` → `text-foreground`
- `text-gray-800` → `text-foreground`
- `text-gray-700` → `text-foreground`
- `text-gray-600` → `text-muted-foreground`
- `text-gray-500` → `text-muted-foreground`
- `text-gray-400` → `text-muted-foreground`

### Border Colors
- `border-gray-100` → `border-border`
- `border-gray-200` → `border-border`
- `border-gray-300` → `border-border`

### Brand Colors (Add Dark Variants)
- `text-emerald-600` → `text-emerald-600 dark:text-emerald-400`
- `text-emerald-700` → `text-emerald-700 dark:text-emerald-400`
- `bg-emerald-600` → `bg-emerald-600 dark:bg-emerald-600`
- `bg-emerald-100` → `bg-emerald-100 dark:bg-emerald-900/30`
- `bg-emerald-50` → `bg-emerald-50/20 dark:bg-emerald-950/10`

### Gradient Backgrounds
- `from-blue-600 to-indigo-700` → `from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800`

### Hover States
- `hover:bg-gray-50` → `hover:bg-accent`
- `hover:bg-gray-100` → `hover:bg-accent`
- `hover:text-gray-600` → `hover:text-muted-foreground`
- `hover:border-blue-300` → `hover:border-emerald-300 dark:hover:border-emerald-600`

### Always Add
- `transition-colors duration-300` to sections/containers
- `card-hover` class to hoverable cards
- Dark mode variants for all brand colors
