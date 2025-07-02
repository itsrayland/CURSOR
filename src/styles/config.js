/**
 * Style Configuration
 * Central configuration for styling options and theme customization
 */

const StyleConfig = {
  // Animation settings
  animations: {
    enabled: true,
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      default: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Typography scale
  typography: {
    scale: 1.25, // Major third scale
    baseFontSize: 16,
    fonts: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      monospace: 'Monaco, Consolas, "Courier New", monospace'
    }
  },

  // Breakpoints for responsive design
  breakpoints: {
    mobile: 576,
    tablet: 768,
    desktop: 1024,
    wide: 1440
  },

  // Shadow presets
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    elevated: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)'
  },

  // Custom theme builder
  createTheme: function(name, colors) {
    return {
      name: name,
      primary: colors.primary || '#3498db',
      secondary: colors.secondary || '#2ecc71',
      danger: colors.danger || '#e74c3c',
      warning: colors.warning || '#f39c12',
      background: colors.background || '#ffffff',
      surface: colors.surface || '#f8f9fa',
      text: colors.text || '#2c3e50',
      textSecondary: colors.textSecondary || '#7f8c8d',
      border: colors.border || '#dee2e6',
      ...colors // Allow additional custom properties
    };
  },

  // Predefined custom themes
  customThemes: {
    sunset: {
      name: 'Sunset Theme',
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      danger: '#ee5a6f',
      warning: '#feca57',
      background: '#fff5f5',
      surface: '#ffe0e0',
      text: '#2d3436',
      textSecondary: '#636e72',
      border: '#ffcccc'
    },
    forest: {
      name: 'Forest Theme',
      primary: '#27ae60',
      secondary: '#16a085',
      danger: '#c0392b',
      warning: '#f39c12',
      background: '#f8fdf9',
      surface: '#e8f5e9',
      text: '#1b5e20',
      textSecondary: '#2e7d32',
      border: '#a5d6a7'
    },
    midnight: {
      name: 'Midnight Theme',
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      danger: '#ff7675',
      warning: '#fdcb6e',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#b2bec3',
      border: '#2d3436'
    }
  },

  // Theme transition settings
  themeTransition: {
    duration: 300,
    properties: ['background-color', 'color', 'border-color', 'box-shadow']
  },

  // Accessibility settings
  accessibility: {
    highContrast: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    focusOutlineWidth: 3,
    minimumContrastRatio: 4.5
  },

  // Initialize configuration
  init: function() {
    // Apply reduced motion if preferred
    if (this.accessibility.reducedMotion) {
      this.animations.enabled = false;
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
    }

    // Set CSS custom properties for shadows
    Object.entries(this.shadows).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--shadow-${key}`, value);
    });

    // Log configuration status
    console.log('StyleConfig initialized', {
      animations: this.animations.enabled,
      reducedMotion: this.accessibility.reducedMotion
    });
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => StyleConfig.init());
} else {
  StyleConfig.init();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StyleConfig;
} else {
  window.StyleConfig = StyleConfig;
}