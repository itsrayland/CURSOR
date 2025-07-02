# StyleCoordinator Guide

## Overview

The StyleCoordinator is a dynamic theming system designed for the Tasker application. It provides a centralized way to manage themes, colors, and styling across your application with smooth transitions and localStorage persistence.

## Features

- **Multiple Built-in Themes**: Light, Dark, and Ocean themes included
- **Dynamic Theme Switching**: Smooth transitions between themes
- **Theme Persistence**: Saves user's theme preference in localStorage
- **Custom Theme Support**: Easy to add new themes
- **CSS Custom Properties**: Uses modern CSS variables for flexibility
- **Event System**: Subscribe to theme changes
- **Accessibility Support**: Respects prefers-reduced-motion

## Basic Usage

### 1. Initialize StyleCoordinator

```javascript
const styleCoordinator = new StyleCoordinator();
styleCoordinator.init();
```

### 2. Apply a Theme

```javascript
// Apply a theme by name
styleCoordinator.applyTheme('dark');

// Get current theme
const currentTheme = styleCoordinator.getCurrentTheme();
```

### 3. Listen for Theme Changes

```javascript
styleCoordinator.onThemeChange((themeName, theme) => {
  console.log(`Theme changed to: ${themeName}`);
  // Update UI elements based on new theme
});
```

## Theme Structure

Each theme contains the following properties:

```javascript
{
  name: 'Theme Name',           // Display name
  primary: '#3498db',          // Primary brand color
  secondary: '#2ecc71',        // Secondary brand color
  danger: '#e74c3c',           // Error/danger color
  warning: '#f39c12',          // Warning color
  background: '#ffffff',       // Main background
  surface: '#f8f9fa',          // Card/surface background
  text: '#2c3e50',             // Primary text color
  textSecondary: '#7f8c8d',    // Secondary text color
  border: '#dee2e6'            // Border color
}
```

## Adding Custom Themes

### Method 1: Using addTheme()

```javascript
styleCoordinator.addTheme('custom', {
  name: 'My Custom Theme',
  primary: '#9b59b6',
  secondary: '#3498db',
  // ... other colors
});
```

### Method 2: Using StyleConfig

```javascript
// In config.js
const customTheme = StyleConfig.createTheme('Sunset', {
  primary: '#ff6b6b',
  secondary: '#4ecdc4',
  background: '#fff5f5',
  // ... other colors
});

styleCoordinator.addTheme('sunset', customTheme);
```

## CSS Integration

The StyleCoordinator sets CSS custom properties that can be used in your stylesheets:

```css
.element {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

## Advanced Features

### Custom Properties

Set additional CSS custom properties:

```javascript
styleCoordinator.setCustomProperty('--custom-spacing', '24px');
styleCoordinator.setCustomProperty('--custom-radius', '8px');
```

### Get Available Themes

```javascript
const themes = styleCoordinator.getAvailableThemes();
// Returns: [{key: 'light', name: 'Light Theme'}, ...]
```

### Theme Selector Integration

The StyleCoordinator automatically integrates with a select element:

```html
<select id="theme-selector">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="ocean">Ocean</option>
</select>
```

## Configuration Options

Use `StyleConfig` for advanced configuration:

```javascript
// Disable animations for accessibility
StyleConfig.animations.enabled = false;

// Custom shadow presets
StyleConfig.shadows.custom = '0 4px 8px rgba(0,0,0,0.1)';

// Initialize configuration
StyleConfig.init();
```

## Best Practices

1. **Initialize Early**: Call `init()` as early as possible to prevent flash of unstyled content
2. **Use Semantic Names**: Name custom themes based on their appearance or purpose
3. **Test Accessibility**: Ensure sufficient color contrast in all themes
4. **Smooth Transitions**: Use CSS transitions for theme changes
5. **Fallback Values**: Always provide fallback colors in CSS

## Example Implementation

```javascript
// Complete setup example
document.addEventListener('DOMContentLoaded', () => {
  // Create and initialize StyleCoordinator
  const coordinator = new StyleCoordinator();
  
  // Add custom theme
  coordinator.addTheme('midnight', {
    name: 'Midnight',
    primary: '#6c5ce7',
    background: '#0a0a0a',
    text: '#ffffff',
    // ... other colors
  });
  
  // Initialize with saved theme
  coordinator.init();
  
  // Listen for changes
  coordinator.onThemeChange((name, theme) => {
    updateUIForTheme(theme);
  });
});
```

## Troubleshooting

### Theme Not Persisting
- Check browser localStorage is enabled
- Verify theme name exists in themes object

### Styles Not Applying
- Ensure CSS is using correct custom property names
- Check that StyleCoordinator is initialized before use

### Flash of Unstyled Content
- Initialize StyleCoordinator in `<head>` or early in page load
- Use inline critical CSS for initial theme