# Style Coordinator Guide

The Style Coordinator is a comprehensive styling system that provides theme management, responsive design utilities, component styling, and dynamic CSS coordination for modern web applications.

## Table of Contents

- [Quick Start](#quick-start)
- [Theme Management](#theme-management)
- [Component Styling](#component-styling)
- [Utility Classes](#utility-classes)
- [Responsive Design](#responsive-design)
- [Animations](#animations)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Examples](#examples)

## Quick Start

### 1. Basic Setup

```html
<!-- Include the base CSS -->
<link rel="stylesheet" href="src/styles/base.css">

<!-- Include the Style Coordinator -->
<script type="module">
  import { styleCoordinator } from './src/styles/StyleCoordinator.js';
  
  // Initialize utility classes
  styleCoordinator.generateUtilityClasses();
</script>
```

### 2. Simple Theme Toggle

```javascript
import { styleCoordinator } from './src/styles/StyleCoordinator.js';

// Toggle between light and dark themes
document.getElementById('themeToggle').addEventListener('click', () => {
  styleCoordinator.toggleTheme();
});
```

## Theme Management

### Built-in Themes

The Style Coordinator comes with two built-in themes:

- **Light Theme**: Clean, modern light theme
- **Dark Theme**: Easy-on-the-eyes dark theme

### Adding Custom Themes

```javascript
// Add a custom theme
styleCoordinator.addTheme('ocean', {
  '--primary-color': '#0ea5e9',
  '--secondary-color': '#0369a1',
  '--background-color': '#f0f9ff',
  '--surface-color': '#e0f2fe',
  '--text-primary': '#0c4a6e',
  '--text-secondary': '#0369a1',
  '--border-color': '#7dd3fc',
  '--shadow-color': 'rgba(14, 165, 233, 0.1)',
  '--success-color': '#059669',
  '--warning-color': '#d97706',
  '--error-color': '#dc2626',
  '--info-color': '#0ea5e9'
});

// Load the custom theme
styleCoordinator.loadTheme('ocean');
```

### Theme Variables

All themes use CSS custom properties (variables) for consistency:

| Variable | Purpose |
|----------|---------|
| `--primary-color` | Main brand color |
| `--secondary-color` | Secondary brand color |
| `--background-color` | Page background |
| `--surface-color` | Card/panel backgrounds |
| `--text-primary` | Primary text color |
| `--text-secondary` | Secondary text color |
| `--border-color` | Border color |
| `--shadow-color` | Box shadow color |
| `--success-color` | Success state color |
| `--warning-color` | Warning state color |
| `--error-color` | Error state color |
| `--info-color` | Info state color |

### System Theme Detection

The Style Coordinator automatically detects and respects the user's system theme preference:

```javascript
// Auto-detect system theme (happens automatically on init)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
  styleCoordinator.loadTheme('dark');
}
```

## Component Styling

### Using Component Presets

The Style Coordinator includes preset styles for common components:

```javascript
import { styleConfig } from './src/styles/config.js';

// Apply button styling
const button = document.querySelector('.my-button');
styleCoordinator.applyComponentStyles(button, {
  ...styleConfig.components.button.base,
  ...styleConfig.components.button.variants.primary
});
```

### Component Examples

#### Buttons

```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-outline">Outline Button</button>
<button class="btn-ghost">Ghost Button</button>
```

#### Cards

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

#### Alerts

```html
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
<div class="alert alert-info">Info message</div>
```

## Utility Classes

The Style Coordinator generates utility classes for rapid development:

### Spacing

```html
<!-- Margin -->
<div class="m-0">No margin</div>
<div class="m-4">1rem margin</div>
<div class="m-6">1.5rem margin</div>

<!-- Padding -->
<div class="p-2">0.5rem padding</div>
<div class="p-4">1rem padding</div>
```

### Flexbox

```html
<div class="flex justify-center align-center">
  <span>Centered content</span>
</div>

<div class="flex flex-col">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Typography

```html
<p class="text-center font-bold">Centered bold text</p>
<p class="text-primary">Primary colored text</p>
<p class="text-secondary">Secondary colored text</p>
```

### Colors

```html
<div class="bg-primary text-white">Primary background</div>
<div class="bg-surface">Surface background</div>
```

## Responsive Design

### Breakpoint System

The Style Coordinator includes a responsive breakpoint system:

- **Mobile**: 768px and below
- **Tablet**: 1024px and below
- **Desktop**: 1440px and above

### Breakpoint Events

```javascript
// Listen for breakpoint changes
styleCoordinator.subscribe((event, data) => {
  if (event === 'breakpointChanged') {
    console.log(`Breakpoint: ${data.breakpoint}, Active: ${data.matches}`);
    
    if (data.breakpoint === 'mobile' && data.matches) {
      // Mobile-specific code
    }
  }
});
```

### Responsive Utilities

```css
/* Automatically included in base.css */
@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .component-grid {
    grid-template-columns: 1fr;
  }
}
```

## Animations

### Simple Animations

```javascript
// Animate an element
const element = document.querySelector('.my-element');
const keyframes = [
  { transform: 'scale(1)', opacity: 1 },
  { transform: 'scale(1.1)', opacity: 0.8 },
  { transform: 'scale(1)', opacity: 1 }
];

styleCoordinator.animateElement(element, keyframes, {
  duration: 500,
  easing: 'ease-in-out'
});
```

### Loading States

```html
<div class="loading">
  <p>Loading content...</p>
  <span class="spinner"></span>
</div>
```

## Configuration

### Custom Configuration

```javascript
import { createStyleConfig } from './src/styles/config.js';

const customConfig = createStyleConfig({
  defaultTheme: 'dark',
  breakpoints: {
    mobile: '600px',
    tablet: '900px',
    desktop: '1200px'
  },
  themes: {
    custom: {
      '--primary-color': '#ff6b6b',
      '--background-color': '#f8f9fa'
      // ... other theme properties
    }
  }
});
```

### Performance Options

```javascript
// Configure performance settings
const config = {
  performance: {
    debounceThemeChange: 100,
    cacheStyles: true,
    lazyLoadStyles: true
  }
};
```

## API Reference

### StyleCoordinator Class

#### Methods

##### `loadTheme(themeName)`
Load and apply a theme by name.

```javascript
styleCoordinator.loadTheme('dark');
```

##### `toggleTheme()`
Toggle between light and dark themes.

```javascript
styleCoordinator.toggleTheme();
```

##### `addTheme(name, themeObject)`
Add a custom theme.

```javascript
styleCoordinator.addTheme('custom', {
  '--primary-color': '#ff6b6b'
});
```

##### `setCSSProperty(property, value)`
Set a CSS custom property dynamically.

```javascript
styleCoordinator.setCSSProperty('--primary-color', '#ff0000');
```

##### `getCSSProperty(property)`
Get the current value of a CSS property.

```javascript
const primaryColor = styleCoordinator.getCSSProperty('--primary-color');
```

##### `addStyleSheet(id, cssRules)`
Add a dynamic stylesheet.

```javascript
styleCoordinator.addStyleSheet('custom-styles', `
  .my-class { color: red; }
`);
```

##### `removeStyleSheet(id)`
Remove a dynamic stylesheet.

```javascript
styleCoordinator.removeStyleSheet('custom-styles');
```

##### `applyComponentStyles(element, styles)`
Apply styles to an element.

```javascript
styleCoordinator.applyComponentStyles(element, {
  backgroundColor: 'var(--primary-color)',
  color: 'white'
});
```

##### `animateElement(element, keyframes, options)`
Animate an element using the Web Animations API.

```javascript
styleCoordinator.animateElement(element, keyframes, { duration: 1000 });
```

##### `subscribe(callback)`
Subscribe to Style Coordinator events.

```javascript
const unsubscribe = styleCoordinator.subscribe((event, data) => {
  console.log(event, data);
});

// Later, unsubscribe
unsubscribe();
```

##### `getCurrentThemeInfo()`
Get information about the current theme.

```javascript
const themeInfo = styleCoordinator.getCurrentThemeInfo();
console.log(themeInfo.name); // 'light' or 'dark'
console.log(themeInfo.properties); // Theme CSS properties
```

##### `generateUtilityClasses()`
Generate utility CSS classes.

```javascript
styleCoordinator.generateUtilityClasses();
```

##### `reset()`
Reset all styles to defaults.

```javascript
styleCoordinator.reset();
```

### Events

The Style Coordinator emits the following events:

- `themeChanged`: When a theme is changed
- `breakpointChanged`: When a responsive breakpoint is crossed

## Examples

### Complete Theme Switcher

```html
<div class="theme-switcher">
  <button data-theme="light">Light</button>
  <button data-theme="dark">Dark</button>
  <button data-theme="ocean">Ocean</button>
</div>

<script type="module">
  import { styleCoordinator } from './src/styles/StyleCoordinator.js';
  
  // Add custom themes
  styleCoordinator.addTheme('ocean', {
    '--primary-color': '#0ea5e9',
    '--background-color': '#f0f9ff'
    // ... other properties
  });
  
  // Setup theme switcher
  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      styleCoordinator.loadTheme(theme);
      
      // Update active state
      document.querySelectorAll('[data-theme]').forEach(btn => 
        btn.classList.toggle('active', btn.dataset.theme === theme)
      );
    });
  });
</script>
```

### Dynamic Component Styling

```javascript
// Create a styled component dynamically
function createStyledButton(text, variant = 'primary') {
  const button = document.createElement('button');
  button.textContent = text;
  
  // Apply base button styles
  styleCoordinator.applyComponentStyles(button, {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  });
  
  // Apply variant styles
  if (variant === 'primary') {
    styleCoordinator.applyComponentStyles(button, {
      backgroundColor: 'var(--primary-color)',
      color: 'white'
    });
  } else if (variant === 'outline') {
    styleCoordinator.applyComponentStyles(button, {
      backgroundColor: 'transparent',
      color: 'var(--primary-color)',
      border: '1px solid var(--primary-color)'
    });
  }
  
  return button;
}

// Usage
const primaryButton = createStyledButton('Primary Button', 'primary');
const outlineButton = createStyledButton('Outline Button', 'outline');
```

### Responsive Layout Manager

```javascript
class ResponsiveLayoutManager {
  constructor() {
    this.currentBreakpoint = null;
    this.setupBreakpointListener();
  }
  
  setupBreakpointListener() {
    styleCoordinator.subscribe((event, data) => {
      if (event === 'breakpointChanged') {
        this.handleBreakpointChange(data);
      }
    });
  }
  
  handleBreakpointChange({ breakpoint, matches }) {
    if (matches) {
      this.currentBreakpoint = breakpoint;
      this.updateLayout();
    }
  }
  
  updateLayout() {
    const container = document.querySelector('.responsive-container');
    
    if (this.currentBreakpoint === 'mobile') {
      styleCoordinator.applyComponentStyles(container, {
        flexDirection: 'column',
        padding: '1rem'
      });
    } else {
      styleCoordinator.applyComponentStyles(container, {
        flexDirection: 'row',
        padding: '2rem'
      });
    }
  }
}

// Initialize
const layoutManager = new ResponsiveLayoutManager();
```

---

## Browser Support

The Style Coordinator supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

To contribute to the Style Coordinator:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.