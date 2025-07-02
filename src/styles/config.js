/**
 * Style Coordinator Configuration
 * Customize themes, breakpoints, and other styling options
 */

export const styleConfig = {
  // Default theme settings
  defaultTheme: 'light',
  
  // Auto-detect system theme preference
  autoDetectTheme: true,
  
  // Persist theme choice in localStorage
  persistTheme: true,
  
  // Custom breakpoints for responsive design
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Animation settings
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Typography scale
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeights: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2'
    }
  },

  // Spacing scale
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem'
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Shadow scale
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },

  // Custom themes - extend the default themes
  customThemes: {
    ocean: {
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
    },
    sunset: {
      '--primary-color': '#f97316',
      '--secondary-color': '#ea580c',
      '--background-color': '#fff7ed',
      '--surface-color': '#fed7aa',
      '--text-primary': '#9a3412',
      '--text-secondary': '#c2410c',
      '--border-color': '#fdba74',
      '--shadow-color': 'rgba(249, 115, 22, 0.1)',
      '--success-color': '#16a34a',
      '--warning-color': '#ca8a04',
      '--error-color': '#dc2626',
      '--info-color': '#0ea5e9'
    },
    forest: {
      '--primary-color': '#16a34a',
      '--secondary-color': '#15803d',
      '--background-color': '#f0fdf4',
      '--surface-color': '#dcfce7',
      '--text-primary': '#14532d',
      '--text-secondary': '#166534',
      '--border-color': '#86efac',
      '--shadow-color': 'rgba(22, 163, 74, 0.1)',
      '--success-color': '#16a34a',
      '--warning-color': '#ca8a04',
      '--error-color': '#dc2626',
      '--info-color': '#0ea5e9'
    }
  },

  // Utility class generation settings
  utilities: {
    // Generate responsive variants
    generateResponsive: true,
    
    // Generate hover variants
    generateHover: true,
    
    // Generate focus variants
    generateFocus: true,
    
    // Classes to generate
    generate: {
      spacing: true,
      colors: true,
      typography: true,
      flexbox: true,
      grid: true,
      positioning: true,
      sizing: true,
      borders: true,
      effects: true
    }
  },

  // Component presets
  components: {
    button: {
      base: {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      variants: {
        primary: {
          backgroundColor: 'var(--primary-color)',
          color: 'white'
        },
        secondary: {
          backgroundColor: 'var(--secondary-color)',
          color: 'white'
        },
        outline: {
          backgroundColor: 'transparent',
          color: 'var(--primary-color)',
          border: '1px solid var(--primary-color)'
        },
        ghost: {
          backgroundColor: 'transparent',
          color: 'var(--text-primary)',
          border: 'none'
        }
      },
      sizes: {
        sm: {
          padding: '0.25rem 0.75rem',
          fontSize: '0.875rem'
        },
        md: {
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        },
        lg: {
          padding: '0.75rem 1.5rem',
          fontSize: '1.125rem'
        }
      }
    },

    card: {
      base: {
        backgroundColor: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px var(--shadow-color)'
      },
      variants: {
        elevated: {
          boxShadow: '0 4px 6px var(--shadow-color)'
        },
        outlined: {
          boxShadow: 'none',
          border: '2px solid var(--border-color)'
        },
        filled: {
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          border: 'none'
        }
      }
    },

    input: {
      base: {
        padding: '0.5rem 0.75rem',
        border: '1px solid var(--border-color)',
        borderRadius: '0.375rem',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-primary)'
      },
      states: {
        focus: {
          borderColor: 'var(--primary-color)',
          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
          outline: 'none'
        },
        error: {
          borderColor: 'var(--error-color)',
          boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
        },
        disabled: {
          opacity: '0.6',
          cursor: 'not-allowed',
          backgroundColor: 'var(--surface-color)'
        }
      }
    }
  },

  // Performance settings
  performance: {
    // Debounce theme changes
    debounceThemeChange: 100,
    
    // Cache compiled styles
    cacheStyles: true,
    
    // Lazy load non-critical styles
    lazyLoadStyles: true
  }
};

// Helper function to merge custom config with defaults
export function createStyleConfig(customConfig = {}) {
  return {
    ...styleConfig,
    ...customConfig,
    themes: {
      ...styleConfig.customThemes,
      ...(customConfig.themes || {})
    },
    breakpoints: {
      ...styleConfig.breakpoints,
      ...(customConfig.breakpoints || {})
    }
  };
}

export default styleConfig;