/**
 * StyleCoordinator - A comprehensive system for managing styles, themes, and CSS coordination
 */
class StyleCoordinator {
  constructor() {
    this.currentTheme = 'light';
    this.customProperties = new Map();
    this.styleSheets = new Map();
    this.observers = [];
    this.breakpoints = {
      mobile: '768px',
      tablet: '1024px',
      desktop: '1440px'
    };
    
    this.init();
  }

  /**
   * Initialize the Style Coordinator
   */
  init() {
    this.loadTheme(this.currentTheme);
    this.setupMediaQueryObservers();
    this.setupThemeToggle();
  }

  /**
   * Theme Management
   */
  themes = {
    light: {
      '--primary-color': '#3b82f6',
      '--secondary-color': '#64748b',
      '--background-color': '#ffffff',
      '--surface-color': '#f8fafc',
      '--text-primary': '#1e293b',
      '--text-secondary': '#64748b',
      '--border-color': '#e2e8f0',
      '--shadow-color': 'rgba(0, 0, 0, 0.1)',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--error-color': '#ef4444',
      '--info-color': '#06b6d4'
    },
    dark: {
      '--primary-color': '#60a5fa',
      '--secondary-color': '#94a3b8',
      '--background-color': '#0f172a',
      '--surface-color': '#1e293b',
      '--text-primary': '#f1f5f9',
      '--text-secondary': '#94a3b8',
      '--border-color': '#334155',
      '--shadow-color': 'rgba(0, 0, 0, 0.3)',
      '--success-color': '#34d399',
      '--warning-color': '#fbbf24',
      '--error-color': '#f87171',
      '--info-color': '#22d3ee'
    }
  };

  /**
   * Load and apply a theme
   */
  loadTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) {
      console.warn(`Theme '${themeName}' not found`);
      return;
    }

    const root = document.documentElement;
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    this.currentTheme = themeName;
    this.notifyObservers('themeChanged', { theme: themeName });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.loadTheme(newTheme);
  }

  /**
   * Add a custom theme
   */
  addTheme(name, themeObject) {
    this.themes[name] = themeObject;
  }

  /**
   * CSS Custom Properties Management
   */
  setCSSProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
    this.customProperties.set(property, value);
  }

  getCSSProperty(property) {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  }

  /**
   * Dynamic Stylesheet Management
   */
  addStyleSheet(id, cssRules) {
    if (this.styleSheets.has(id)) {
      this.removeStyleSheet(id);
    }

    const style = document.createElement('style');
    style.id = id;
    style.textContent = cssRules;
    document.head.appendChild(style);
    this.styleSheets.set(id, style);
  }

  removeStyleSheet(id) {
    const styleElement = this.styleSheets.get(id);
    if (styleElement) {
      styleElement.remove();
      this.styleSheets.delete(id);
    }
  }

  /**
   * Responsive Design Utilities
   */
  setupMediaQueryObservers() {
    Object.entries(this.breakpoints).forEach(([name, size]) => {
      const mediaQuery = window.matchMedia(`(max-width: ${size})`);
      mediaQuery.addEventListener('change', (e) => {
        this.notifyObservers('breakpointChanged', { 
          breakpoint: name, 
          matches: e.matches 
        });
      });
    });
  }

  /**
   * Component Styling Utilities
   */
  applyComponentStyles(element, styles) {
    if (!element) return;

    Object.entries(styles).forEach(([property, value]) => {
      if (property.startsWith('--')) {
        element.style.setProperty(property, value);
      } else {
        element.style[property] = value;
      }
    });
  }

  /**
   * Animation Coordination
   */
  animateElement(element, keyframes, options = {}) {
    if (!element) return null;

    const defaultOptions = {
      duration: 300,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

    return element.animate(keyframes, { ...defaultOptions, ...options });
  }

  /**
   * Observer Pattern for Style Changes
   */
  subscribe(callback) {
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback);
    };
  }

  notifyObservers(event, data) {
    this.observers.forEach(callback => callback(event, data));
  }

  /**
   * Theme Toggle Setup
   */
  setupThemeToggle() {
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches && this.currentTheme === 'light') {
      this.loadTheme('dark');
    }

    // Listen for system preference changes
    prefersDark.addEventListener('change', (e) => {
      if (e.matches) {
        this.loadTheme('dark');
      } else {
        this.loadTheme('light');
      }
    });
  }

  /**
   * Utility Methods
   */
  generateUtilityClasses() {
    const utilities = `
      /* Spacing Utilities */
      .m-0 { margin: 0; }
      .m-1 { margin: 0.25rem; }
      .m-2 { margin: 0.5rem; }
      .m-3 { margin: 0.75rem; }
      .m-4 { margin: 1rem; }
      .m-5 { margin: 1.25rem; }
      .m-6 { margin: 1.5rem; }

      .p-0 { padding: 0; }
      .p-1 { padding: 0.25rem; }
      .p-2 { padding: 0.5rem; }
      .p-3 { padding: 0.75rem; }
      .p-4 { padding: 1rem; }
      .p-5 { padding: 1.25rem; }
      .p-6 { padding: 1.5rem; }

      /* Flexbox Utilities */
      .flex { display: flex; }
      .flex-col { flex-direction: column; }
      .flex-row { flex-direction: row; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      .align-center { align-items: center; }

      /* Text Utilities */
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      .text-right { text-align: right; }
      .font-bold { font-weight: bold; }
      .font-normal { font-weight: normal; }

      /* Color Utilities */
      .text-primary { color: var(--text-primary); }
      .text-secondary { color: var(--text-secondary); }
      .bg-primary { background-color: var(--primary-color); }
      .bg-surface { background-color: var(--surface-color); }

      /* Border Utilities */
      .border { border: 1px solid var(--border-color); }
      .border-none { border: none; }
      .rounded { border-radius: 0.25rem; }
      .rounded-lg { border-radius: 0.5rem; }

      /* Shadow Utilities */
      .shadow { box-shadow: 0 1px 3px var(--shadow-color); }
      .shadow-lg { box-shadow: 0 10px 15px var(--shadow-color); }
    `;

    this.addStyleSheet('utility-classes', utilities);
  }

  /**
   * Get current theme info
   */
  getCurrentThemeInfo() {
    return {
      name: this.currentTheme,
      properties: this.themes[this.currentTheme]
    };
  }

  /**
   * Reset all styles
   */
  reset() {
    this.styleSheets.forEach((_, id) => this.removeStyleSheet(id));
    this.customProperties.clear();
    this.loadTheme('light');
  }
}

// Export for use in other modules
export default StyleCoordinator;

// Also create a singleton instance for global use
export const styleCoordinator = new StyleCoordinator();