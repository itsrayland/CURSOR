# White House Website & Style Guide

A professionally designed White House-style website with a comprehensive design system and style guide.

## 🏛️ Features

### Main Website (`index.html`)
- **Professional Government Design**: Clean, authoritative layout with presidential aesthetics
- **Responsive Layout**: Fully responsive design that works on all devices
- **Modern Navigation**: Sticky header with smooth scrolling navigation
- **Hero Section**: Prominent messaging area with call-to-action buttons
- **Content Sections**: 
  - Latest news and press briefings
  - Administration profiles
  - Key policy issues
  - Contact information
- **Official Color Scheme**: Navy blue, white, and red reflecting American flag colors

### Design System (`style-guide.html`)
- **Complete Color Palette**: Primary, secondary, and supporting colors with hex codes
- **Typography Guidelines**: Serif headings (Georgia) and sans-serif body text (Source Sans Pro)
- **Component Library**: Buttons, cards, navigation, and category tags
- **Layout System**: Spacing scale and responsive grid system
- **Usage Guidelines**: Best practices for accessibility, responsive design, and content voice

## 🎨 Design Features

- **Color Scheme**: 
  - Primary Blue (#003366) - Headers and navigation
  - Secondary Blue (#1f4788) - Supporting elements
  - Accent Red (#cc0000) - Call-to-action buttons
  - Gold (#d4af37) - Presidential seal accents
- **Typography**: 
  - Georgia serif for formal headings
  - Source Sans Pro for readable body text
- **Components**: Professional buttons, content cards, and navigation elements
- **Accessibility**: WCAG compliant color contrast and semantic HTML

## 🚀 Getting Started

### View the Website
1. Open `index.html` in your web browser
2. Navigate through the different sections
3. Click "View Style Guide" in the footer to see the design system

### Local Development
Run a local server to properly view the website:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP (if available)
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 File Structure

```
/
├── index.html           # Main website homepage
├── style.css           # Main stylesheet with design system
├── style-guide.html    # Comprehensive style guide
├── style-guide.css     # Style guide specific styles
└── README.md          # This documentation
```

## 🎯 Key Design Principles

1. **Authority & Trust**: Professional government aesthetic
2. **Accessibility**: WCAG 2.1 compliant design
3. **Responsive**: Mobile-first approach
4. **Consistency**: Systematic use of colors, typography, and spacing
5. **Usability**: Clear navigation and information hierarchy

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Customization

The design system uses CSS custom properties (variables) for easy customization:

```css
:root {
    --primary-blue: #003366;
    --secondary-blue: #1f4788;
    --accent-red: #cc0000;
    --gold: #d4af37;
    /* ... other variables */
}
```

## 🌟 Style Guide Highlights

The style guide (`style-guide.html`) includes:
- **Color Palette**: Visual swatches with hex codes and usage guidelines
- **Typography**: Font samples and hierarchy demonstrations
- **Components**: Interactive examples of all UI elements
- **Layout System**: Spacing scale and grid system documentation
- **Usage Guidelines**: Best practices for visual hierarchy, accessibility, responsive design, and content voice

## 🏆 Professional Standards

This website meets professional government web standards:
- Accessible design (WCAG 2.1)
- Semantic HTML structure
- Progressive enhancement
- Performance optimized
- SEO friendly markup

---

**Note**: This is a demonstration website showcasing professional government web design principles and is not affiliated with any official government entity. 