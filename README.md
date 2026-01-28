# AESTECH - Laboratory Skincare Website

A minimalist, elegant static website for a premium skincare product manufacturer with in-house R&D laboratory.

## 🎨 Design Philosophy

**Minimalist Elegance** - The website embodies sophistication through simplicity, using only:
- **Colors**: Black (#000000), White (#FFFFFF), and carefully curated grays
- **Typography**: 
  - Cormorant Garamond (Serif) - For headings and elegant display text
  - Montserrat (Sans-serif) - For body text and UI elements
- **Style**: Clean lines, generous whitespace, subtle animations, and premium feel

## 🚀 Framework & Technology

**Vite** - Ultra-lightweight and fast build tool
- **Why Vite?** 
  - Extremely lightweight (minimal dependencies)
  - Lightning-fast dev server with instant HMR
  - Optimized production builds
  - Perfect for static sites
  - No framework overhead - pure HTML/CSS/JS

**Tech Stack:**
- HTML5 (Semantic markup)
- CSS3 (Custom properties, animations, grid/flexbox)
- Vanilla JavaScript (No dependencies)
- Google Fonts (Cormorant Garamond & Montserrat)

**Bundle Size:** ~50KB total (minified + gzipped)

## 📋 Website Sections

### 1. **Hero Section**
- Full-screen elegant introduction
- Animated title and subtitle
- Call-to-action button
- Scroll indicator with floating animation

### 2. **About Section**
- Laboratory focus and R&D capabilities
- Split layout with text and imagery
- Emphasis on precision and scientific approach

### 3. **Product Categories**
- Four main product lines:
  - **Precision Serums** - Advanced targeted care
  - **Hydration Solutions** - Daily moisturizers
  - **Gentle Cleansers** - pH-balanced foundation
  - **Targeted Treatments** - Specialized solutions
- Grid layout with hover effects
- 3D tilt animation on product cards

### 4. **Company Strategy**
- Four core pillars:
  - **Research-Driven** - Laboratory-backed formulations
  - **Pure Ingredients** - Sustainable sourcing
  - **Tested Excellence** - Clinical trials
  - **Sustainable Practice** - Environmental responsibility
- Dark background for contrast and emphasis

### 5. **Client Testimonials**
- Three authentic client reviews
- Professional credentials
- Elegant quote styling
- Slide-in animations

### 6. **Footer**
- Comprehensive navigation
- Contact information
- Brand messaging
- Responsive grid layout

## 🎭 Interactive Features

- **Smooth Scroll Navigation** - Seamless section transitions
- **Scroll-triggered Animations** - Intersection Observer API
- **Staggered Fade-ins** - Sequential element reveals
- **3D Product Cards** - Mouse-tracking tilt effect
- **Parallax Hero** - Subtle depth on scroll
- **Navbar Transparency** - Adapts on scroll
- **Canvas Placeholders** - Elegant generated imagery

## 🏃 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173/`

### Production Build
```bash
npm run build
```
Outputs to `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
Aestech-WEB/
├── index.html          # Main HTML structure
├── style.css           # Complete design system & styles
├── main.js             # Interactive enhancements
├── public/
│   └── images/         # Image assets (placeholders generated via canvas)
├── package.json        # Dependencies
└── README.md          # This file
```

## 🎨 Design System

### Color Palette
```css
--color-pure-white: #FFFFFF
--color-off-white: #FAFAFA
--color-light-gray: #E8E8E8
--color-medium-gray: #B8B8B8
--color-dark-gray: #4A4A4A
--color-charcoal: #2A2A2A
--color-pure-black: #000000
```

### Typography Scale
```css
--text-5xl: 5rem      /* Hero titles */
--text-4xl: 4rem      /* Section headings */
--text-2xl: 2rem      /* Subsection headings */
--text-lg: 1.125rem   /* Large body text */
--text-base: 1rem     /* Body text */
--text-sm: 0.875rem   /* Small text */
--text-xs: 0.75rem    /* Tiny text */
```

### Spacing Scale
```css
--space-xs: 0.5rem
--space-sm: 1rem
--space-md: 2rem
--space-lg: 4rem
--space-xl: 6rem
--space-2xl: 8rem
```

## 📱 Responsive Design

- **Desktop**: Full multi-column layouts, all effects enabled
- **Tablet** (< 1024px): Simplified grids, adjusted spacing
- **Mobile** (< 768px): Single column, optimized touch targets

## ✨ Key Features

1. **SEO Optimized**
   - Semantic HTML5
   - Proper meta tags
   - Heading hierarchy
   - Descriptive alt texts

2. **Performance**
   - Minimal dependencies
   - Optimized animations (GPU-accelerated)
   - Lazy-loaded effects
   - Efficient CSS (no bloat)

3. **Accessibility**
   - Keyboard navigation
   - ARIA labels where needed
   - High contrast ratios
   - Focus indicators

4. **Browser Support**
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - Graceful degradation for older browsers

## 🎯 Brand Guidelines

**Voice & Tone:**
- Sophisticated yet approachable
- Scientific but not clinical
- Premium without pretension
- Confident and authoritative

**Visual Language:**
- Minimalist and refined
- Emphasis on whitespace
- Subtle, elegant animations
- Monochromatic sophistication

## 📝 Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
  --color-pure-black: #000000;
  /* Modify as needed */
}
```

### Adding Content
Update sections in `index.html` following the existing structure and class naming conventions.

### Modifying Animations
Adjust timing and effects in `main.js` and CSS animation keyframes.

## 🚢 Deployment

The built site is completely static and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

Simply run `npm run build` and upload the `dist/` folder.

## 📄 License

© 2026 AESTECH. All rights reserved.

---

**Crafted with precision and care** ✨
