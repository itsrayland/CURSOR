/**
 * StyleCoordinator - Manages dynamic styling and themes for the tasker application
 */
class StyleCoordinator {
  constructor() {
    this.themes = {
      light: {
        name: 'Light Theme',
        primary: '#3498db',
        secondary: '#2ecc71',
        danger: '#e74c3c',
        warning: '#f39c12',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#2c3e50',
        textSecondary: '#7f8c8d',
        border: '#dee2e6'
      },
      dark: {
        name: 'Dark Theme',
        primary: '#5dade2',
        secondary: '#58d68d',
        danger: '#ec7063',
        warning: '#f4d03f',
        background: '#1a1a1a',
        surface: '#2d2d2d',
        text: '#ecf0f1',
        textSecondary: '#95a5a6',
        border: '#404040'
      },
      ocean: {
        name: 'Ocean Theme',
        primary: '#00796b',
        secondary: '#00acc1',
        danger: '#ff5252',
        warning: '#ffc107',
        background: '#f5f5f5',
        surface: '#e0f2f1',
        text: '#004d40',
        textSecondary: '#00695c',
        border: '#b2dfdb'
      }
    };
    
    this.currentTheme = 'light';
    this.customProperties = new Map();
    this.callbacks = [];
  }

  /**
   * Initialize the style coordinator
   */
  init() {
    this.loadSavedTheme();
    this.applyTheme(this.currentTheme);
    this.setupThemeToggle();
  }

  /**
   * Load saved theme from localStorage
   */
  loadSavedTheme() {
    const saved = localStorage.getItem('tasker-theme');
    if (saved && this.themes[saved]) {
      this.currentTheme = saved;
    }
  }

  /**
   * Apply a theme to the document
   */
  applyTheme(themeName) {
    if (!this.themes[themeName]) {
      console.error(`Theme "${themeName}" not found`);
      return;
    }

    const theme = this.themes[themeName];
    const root = document.documentElement;

    // Apply CSS custom properties
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== 'name') {
        root.style.setProperty(`--color-${key}`, value);
      }
    });

    // Save theme preference
    this.currentTheme = themeName;
    localStorage.setItem('tasker-theme', themeName);

    // Notify callbacks
    this.notifyThemeChange(themeName, theme);
  }

  /**
   * Setup theme toggle functionality
   */
  setupThemeToggle() {
    // This will be called from the UI
    document.addEventListener('DOMContentLoaded', () => {
      const themeSelector = document.getElementById('theme-selector');
      if (themeSelector) {
        themeSelector.value = this.currentTheme;
        themeSelector.addEventListener('change', (e) => {
          this.applyTheme(e.target.value);
        });
      }
    });
  }

  /**
   * Register a callback for theme changes
   */
  onThemeChange(callback) {
    this.callbacks.push(callback);
  }

  /**
   * Notify all callbacks of theme change
   */
  notifyThemeChange(themeName, theme) {
    this.callbacks.forEach(callback => {
      callback(themeName, theme);
    });
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.themes[this.currentTheme];
  }

  /**
   * Add a custom theme
   */
  addTheme(name, themeConfig) {
    this.themes[name] = { ...this.themes.light, ...themeConfig, name };
  }

  /**
   * Set a custom CSS property
   */
  setCustomProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
    this.customProperties.set(property, value);
  }

  /**
   * Get all available themes
   */
  getAvailableThemes() {
    return Object.entries(this.themes).map(([key, theme]) => ({
      key,
      name: theme.name
    }));
  }
}

// Export for use in modules or create global instance
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StyleCoordinator;
} else {
  window.StyleCoordinator = StyleCoordinator;
}