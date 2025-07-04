# Design Pattern Implementation Guide

## Quick Start

This guide provides practical instructions for implementing the design patterns outlined in the improvement plan.

## 1. Setting Up Your Project

### Directory Structure
```
project/
├── index.html
├── css/
│   ├── main.css
│   └── components/
│       ├── cards.css
│       ├── gallery.css
│       └── hero.css
├── assets/
│   └── images/
│       ├── hero/
│       ├── products/
│       ├── icons/
│       └── gallery/
└── js/
    └── main.js
```

## 2. Image Optimization Workflow

### Before Adding Images:
1. **Resize**: Keep hero images under 1920px width
2. **Compress**: Use tools like TinyPNG or ImageOptim
3. **Convert**: Create WebP versions for modern browsers
4. **Multiple Sizes**: Create responsive variants

### Example Image Set:
```
product-image-large.jpg (1200x800)
product-image-medium.jpg (800x533)
product-image-small.jpg (400x267)
product-image-large.webp
product-image-medium.webp
product-image-small.webp
```

## 3. Component Usage Examples

### Hero Section with Responsive Images
```html
<section class="hero">
    <picture class="hero-background">
        <source media="(min-width: 1200px)" 
                srcset="assets/images/hero/hero-desktop.webp" 
                type="image/webp">
        <source media="(min-width: 768px)" 
                srcset="assets/images/hero/hero-tablet.webp" 
                type="image/webp">
        <source srcset="assets/images/hero/hero-mobile.webp" 
                type="image/webp">
        <img src="assets/images/hero/hero-fallback.jpg" 
             alt="Hero image description" 
             loading="eager">
    </picture>
    <div class="hero-content">
        <h1>Your Title Here</h1>
        <p>Your subtitle text</p>
        <button class="cta-button">Call to Action</button>
    </div>
</section>
```

### Card Component with Lazy Loading
```html
<article class="card">
    <div class="card-image-wrapper">
        <img src="placeholder.jpg" 
             data-src="actual-image.jpg" 
             alt="Product description" 
             class="card-image lazy-load" 
             loading="lazy">
    </div>
    <div class="card-content">
        <h3>Card Title</h3>
        <p>Card description text</p>
        <a href="#" class="card-link">Learn More →</a>
    </div>
</article>
```

## 4. JavaScript Enhancements

### Progressive Image Loading
```javascript
// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Apply to all lazy-load images
document.querySelectorAll('.lazy-load').forEach(img => {
    imageObserver.observe(img);
});
```

### Blur-up Effect
```javascript
// Load low-quality placeholder first
const loadImageProgressive = (img) => {
    const tempImg = new Image();
    tempImg.src = img.dataset.src;
    tempImg.onload = () => {
        img.src = tempImg.src;
        img.classList.add('loaded');
    };
};
```

## 5. Performance Best Practices

### Critical CSS
```html
<!-- Inline critical CSS in <head> -->
<style>
    /* Hero section critical styles */
    .hero { position: relative; height: 100vh; }
    .hero img { width: 100%; height: 100%; object-fit: cover; }
    /* Add other above-the-fold styles */
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Image Preloading
```html
<!-- Preload hero image -->
<link rel="preload" as="image" href="hero-image.webp" type="image/webp">

<!-- DNS prefetch for external images -->
<link rel="dns-prefetch" href="//images.example.com">
```

## 6. Common Patterns Reference

### Aspect Ratio Container
```css
.aspect-ratio-16-9 {
    position: relative;
    padding-bottom: 56.25%; /* 9/16 = 0.5625 */
}

.aspect-ratio-16-9 > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

### Image Hover Zoom
```css
.image-zoom {
    overflow: hidden;
}

.image-zoom img {
    transition: transform 0.3s ease;
}

.image-zoom:hover img {
    transform: scale(1.1);
}
```

### Gradient Overlay
```css
.gradient-overlay {
    position: relative;
}

.gradient-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0,0,0,0.7) 100%
    );
}
```

## 7. Testing Checklist

- [ ] Images load progressively on slow connections
- [ ] Alt text is meaningful and descriptive
- [ ] Touch targets are at least 44x44 pixels
- [ ] Contrast ratios meet WCAG standards
- [ ] Page loads in under 3 seconds on 3G
- [ ] No layout shift when images load
- [ ] Images are optimized (WebP with fallbacks)
- [ ] Responsive images serve appropriate sizes

## 8. Browser Support Considerations

### Modern Approach with Fallbacks
```html
<!-- WebP with JPEG fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>

<!-- CSS Feature Detection -->
@supports (aspect-ratio: 16/9) {
    .image-container {
        aspect-ratio: 16/9;
    }
}
```

## Next Steps

1. Start with the hero section implementation
2. Build one card component and test thoroughly
3. Implement lazy loading for below-the-fold images
4. Add performance monitoring
5. Iterate based on user feedback

Remember: Always test on real devices and network conditions!