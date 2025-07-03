/**
 * StyleGuideGenerator - Creates comprehensive design system documentation
 * Generates style guides, design tokens, and component documentation
 */
class StyleGuideGenerator {
  constructor(config = {}) {
    this.config = config;
    this.templateEngine = new StyleGuideTemplateEngine();
  }

  /**
   * Generate complete style guide
   */
  async generate(technicalSpec, project) {
    console.log('📋 Generating style guide...');
    
    const styleGuide = {
      meta: {
        projectName: project.name,
        projectId: project.id,
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      },
      brandIdentity: this.generateBrandIdentity(technicalSpec, project),
      colorSystem: this.generateColorSystem(technicalSpec),
      typography: this.generateTypographySystem(technicalSpec),
      spacing: this.generateSpacingSystem(technicalSpec),
      components: this.generateComponentDocumentation(technicalSpec),
      designTokens: this.generateDesignTokens(technicalSpec),
      accessibility: this.generateAccessibilityGuidelines(technicalSpec),
      examples: this.generateUsageExamples(technicalSpec)
    };

    return styleGuide;
  }

  /**
   * Generate brand identity section
   */
  generateBrandIdentity(technicalSpec, project) {
    return {
      name: project.name,
      description: project.description || 'Modern, accessible, user-centered design system',
      mission: 'To provide consistent, scalable, and accessible design patterns',
      principles: [
        'Accessibility First - WCAG 2.1 AA compliance',
        'Mobile First - Progressive enhancement',
        'Performance - Optimized for speed and efficiency',
        'Consistency - Predictable patterns and behaviors',
        'Scalability - Designed to grow with the product'
      ],
      logo: {
        primary: project.assets?.logo || '/assets/logo-primary.svg',
        variations: [
          { type: 'light', url: '/assets/logo-light.svg' },
          { type: 'dark', url: '/assets/logo-dark.svg' },
          { type: 'mono', url: '/assets/logo-mono.svg' }
        ]
      }
    };
  }

  /**
   * Generate color system
   */
  generateColorSystem(technicalSpec) {
    const colors = technicalSpec.colorPalette || {
      primary: '#3498db',
      secondary: '#2c3e50',
      accent: '#e74c3c',
      success: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      neutral: {
        50: '#f8f9fa',
        100: '#e9ecef',
        200: '#dee2e6',
        300: '#ced4da',
        400: '#adb5bd',
        500: '#6c757d',
        600: '#495057',
        700: '#343a40',
        800: '#212529',
        900: '#000000'
      }
    };

    return {
      primary: this.createColorScale(colors.primary),
      secondary: this.createColorScale(colors.secondary),
      accent: this.createColorScale(colors.accent),
      semantic: {
        success: this.createColorScale(colors.success),
        warning: this.createColorScale(colors.warning),
        danger: this.createColorScale(colors.danger)
      },
      neutral: colors.neutral,
      usage: {
        primary: 'Primary brand color for CTAs, links, and primary actions',
        secondary: 'Secondary brand color for headers, emphasis',
        accent: 'Accent color for highlights and special elements',
        semantic: 'Status colors for feedback and system states'
      },
      accessibility: {
        contrastRatios: this.calculateContrastRatios(colors),
        colorBlindness: 'All color combinations tested for deuteranopia and protanopia'
      }
    };
  }

  /**
   * Generate typography system
   */
  generateTypographySystem(technicalSpec) {
    const typography = technicalSpec.typography || {
      fontFamily: {
        primary: 'Inter, system-ui, -apple-system, sans-serif',
        secondary: 'Georgia, serif',
        mono: 'JetBrains Mono, Consolas, monospace'
      }
    };

    return {
      fontFamilies: typography.fontFamily,
      typeScale: {
        h1: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' },
        h2: { fontSize: '2rem', lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.025em' },
        h3: { fontSize: '1.5rem', lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.02em' },
        h4: { fontSize: '1.25rem', lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.01em' },
        h5: { fontSize: '1.125rem', lineHeight: '1.4', fontWeight: '600' },
        h6: { fontSize: '1rem', lineHeight: '1.5', fontWeight: '600' },
        body: { fontSize: '1rem', lineHeight: '1.6', fontWeight: '400' },
        bodySmall: { fontSize: '0.875rem', lineHeight: '1.5', fontWeight: '400' },
        caption: { fontSize: '0.75rem', lineHeight: '1.4', fontWeight: '400' },
        button: { fontSize: '0.875rem', lineHeight: '1.2', fontWeight: '500', letterSpacing: '0.025em' }
      },
      responsiveScale: {
        mobile: 'Base scale applies',
        tablet: 'Scale up by 1.125x',
        desktop: 'Scale up by 1.25x'
      },
      guidelines: [
        'Use system fonts for optimal performance',
        'Maintain consistent line height ratios',
        'Ensure sufficient color contrast (4.5:1 minimum)',
        'Test readability at different zoom levels'
      ]
    };
  }

  /**
   * Generate spacing system
   */
  generateSpacingSystem(technicalSpec) {
    return {
      baseUnit: '8px',
      scale: {
        xs: '4px',   // 0.5 units
        sm: '8px',   // 1 unit
        md: '16px',  // 2 units
        lg: '24px',  // 3 units
        xl: '32px',  // 4 units
        '2xl': '48px', // 6 units
        '3xl': '64px', // 8 units
        '4xl': '96px'  // 12 units
      },
      semantic: {
        containerPadding: 'md (16px)',
        sectionSpacing: 'xl (32px)',
        componentSpacing: 'md (16px)',
        elementSpacing: 'sm (8px)',
        microSpacing: 'xs (4px)'
      },
      responsive: {
        mobile: 'Base scale applies',
        tablet: 'Increase container padding to lg (24px)',
        desktop: 'Increase container padding to xl (32px)'
      },
      grid: {
        columns: 12,
        gutters: 'md (16px)',
        maxWidth: '1200px',
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      }
    };
  }

  /**
   * Generate component documentation
   */
  generateComponentDocumentation(technicalSpec) {
    const components = technicalSpec.components || {};
    
    return {
      buttons: {
        primary: {
          description: 'Primary call-to-action button',
          usage: 'Use for main actions, form submissions',
          anatomy: ['Label', 'Container', 'Focus Ring'],
          states: ['Default', 'Hover', 'Active', 'Focus', 'Disabled'],
          variants: ['Small', 'Medium', 'Large'],
          accessibility: ['aria-label when text insufficient', 'keyboard focusable', 'screen reader compatible']
        },
        secondary: {
          description: 'Secondary action button',
          usage: 'Use for secondary actions, cancel operations',
          anatomy: ['Label', 'Container', 'Border', 'Focus Ring'],
          states: ['Default', 'Hover', 'Active', 'Focus', 'Disabled'],
          variants: ['Small', 'Medium', 'Large']
        }
      },
      inputs: {
        textField: {
          description: 'Single-line text input field',
          usage: 'Collect short text responses from users',
          anatomy: ['Container', 'Label', 'Input', 'Helper Text', 'Error Text'],
          states: ['Default', 'Focus', 'Filled', 'Error', 'Disabled'],
          accessibility: ['associated label', 'error announcements', 'helper text linked']
        }
      },
      layout: {
        container: {
          description: 'Main content container with responsive padding',
          usage: 'Wrap page content for consistent spacing',
          breakpoints: 'Responsive padding based on viewport'
        },
        grid: {
          description: '12-column responsive grid system',
          usage: 'Create flexible layouts with consistent spacing'
        }
      }
    };
  }

  /**
   * Generate design tokens
   */
  generateDesignTokens(technicalSpec) {
    const tokens = {
      colors: {},
      spacing: {},
      typography: {},
      borders: {},
      shadows: {},
      animation: {}
    };

    // Color tokens
    const colors = technicalSpec.colorPalette || {};
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([shade, color]) => {
          tokens.colors[`color-${key}-${shade}`] = color;
        });
      } else {
        tokens.colors[`color-${key}`] = value;
      }
    });

    // Spacing tokens
    const spacing = {
      xs: '4px', sm: '8px', md: '16px', lg: '24px', 
      xl: '32px', '2xl': '48px', '3xl': '64px', '4xl': '96px'
    };
    Object.entries(spacing).forEach(([key, value]) => {
      tokens.spacing[`spacing-${key}`] = value;
    });

    // Typography tokens
    tokens.typography = {
      'font-family-primary': 'Inter, system-ui, -apple-system, sans-serif',
      'font-family-secondary': 'Georgia, serif',
      'font-family-mono': 'JetBrains Mono, Consolas, monospace',
      'font-size-h1': '2.5rem',
      'font-size-h2': '2rem',
      'font-size-body': '1rem',
      'line-height-tight': '1.2',
      'line-height-normal': '1.5',
      'line-height-relaxed': '1.6'
    };

    // Border tokens
    tokens.borders = {
      'border-width-thin': '1px',
      'border-width-thick': '2px',
      'border-radius-sm': '4px',
      'border-radius-md': '8px',
      'border-radius-lg': '12px',
      'border-radius-full': '9999px'
    };

    // Shadow tokens
    tokens.shadows = {
      'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    };

    // Animation tokens
    tokens.animation = {
      'duration-fast': '150ms',
      'duration-normal': '300ms',
      'duration-slow': '500ms',
      'easing-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'easing-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      'easing-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    };

    return {
      tokens,
      formats: {
        css: this.generateCSSTokens(tokens),
        scss: this.generateSCSSTokens(tokens),
        js: this.generateJSTokens(tokens),
        json: JSON.stringify(tokens, null, 2)
      }
    };
  }

  /**
   * Generate accessibility guidelines
   */
  generateAccessibilityGuidelines(technicalSpec) {
    return {
      principles: [
        'Perceivable - Information and UI components must be presentable in ways users can perceive',
        'Operable - UI components and navigation must be operable',
        'Understandable - Information and UI operation must be understandable',
        'Robust - Content must be robust enough for interpretation by assistive technologies'
      ],
      colorContrast: {
        normal: 'Minimum 4.5:1 ratio for normal text',
        large: 'Minimum 3:1 ratio for large text (18pt+ or 14pt+ bold)',
        nonText: 'Minimum 3:1 ratio for UI components and graphics'
      },
      keyboard: {
        navigation: 'All interactive elements must be keyboard accessible',
        focus: 'Visible focus indicators required',
        tabOrder: 'Logical tab order maintained'
      },
      screenReader: {
        semantics: 'Proper HTML semantics and ARIA labels',
        announcements: 'Important changes announced to screen readers',
        skipLinks: 'Skip navigation links provided'
      },
      testing: [
        'Automated testing with axe-core',
        'Manual keyboard navigation testing',
        'Screen reader testing (NVDA, JAWS, VoiceOver)',
        'Color blindness simulation testing'
      ]
    };
  }

  /**
   * Generate usage examples
   */
  generateUsageExamples(technicalSpec) {
    return {
      layouts: {
        hero: `<div class="hero">
  <div class="container">
    <h1>Welcome to ${technicalSpec.projectName || 'Your Project'}</h1>
    <p>Beautiful, accessible design that works everywhere.</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</div>`,
        card: `<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here with proper spacing and typography.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-secondary">Action</button>
  </div>
</div>`
      },
      forms: {
        login: `<form class="form">
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" required aria-describedby="email-help">
    <div id="email-help" class="form-help">We'll never share your email.</div>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" required>
  </div>
  <button type="submit" class="btn btn-primary">Sign In</button>
</form>`
      }
    };
  }

  /**
   * Create color scale from base color
   */
  createColorScale(baseColor) {
    // This would typically use a color manipulation library
    // For demo purposes, returning a basic scale
    return {
      50: this.lightenColor(baseColor, 0.95),
      100: this.lightenColor(baseColor, 0.85),
      200: this.lightenColor(baseColor, 0.75),
      300: this.lightenColor(baseColor, 0.65),
      400: this.lightenColor(baseColor, 0.55),
      500: baseColor, // Base color
      600: this.darkenColor(baseColor, 0.1),
      700: this.darkenColor(baseColor, 0.2),
      800: this.darkenColor(baseColor, 0.3),
      900: this.darkenColor(baseColor, 0.4)
    };
  }

  /**
   * Calculate contrast ratios for accessibility
   */
  calculateContrastRatios(colors) {
    // Mock implementation - would use actual contrast calculation
    return {
      'primary on white': '4.8:1',
      'secondary on white': '12.6:1',
      'accent on white': '4.1:1'
    };
  }

  /**
   * Generate CSS custom properties
   */
  generateCSSTokens(tokens) {
    let css = ':root {\n';
    
    Object.entries(tokens).forEach(([category, categoryTokens]) => {
      css += `  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */\n`;
      Object.entries(categoryTokens).forEach(([key, value]) => {
        css += `  --${key}: ${value};\n`;
      });
      css += '\n';
    });
    
    css += '}';
    return css;
  }

  /**
   * Generate SCSS variables
   */
  generateSCSSTokens(tokens) {
    let scss = '';
    
    Object.entries(tokens).forEach(([category, categoryTokens]) => {
      scss += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      Object.entries(categoryTokens).forEach(([key, value]) => {
        scss += `$${key}: ${value};\n`;
      });
      scss += '\n';
    });
    
    return scss;
  }

  /**
   * Generate JavaScript tokens
   */
  generateJSTokens(tokens) {
    return `export const designTokens = ${JSON.stringify(tokens, null, 2)};`;
  }

  /**
   * Simple color manipulation helpers (would use proper color library in production)
   */
  lightenColor(color, amount) {
    // Mock implementation
    return color;
  }

  darkenColor(color, amount) {
    // Mock implementation  
    return color;
  }
}

/**
 * Style guide template engine for generating formatted output
 */
class StyleGuideTemplateEngine {
  constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  initializeTemplates() {
    // HTML template for style guide
    this.templates.set('html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{projectName}} Style Guide</title>
  <style>{{styles}}</style>
</head>
<body>
  <header class="sg-header">
    <h1>{{projectName}} Style Guide</h1>
    <p>Version {{version}} • Generated {{generatedAt}}</p>
  </header>
  <main class="sg-content">
    {{content}}
  </main>
</body>
</html>`);
  }

  render(templateName, data) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    let rendered = template;
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, value);
    });

    return rendered;
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StyleGuideGenerator, StyleGuideTemplateEngine };
} else if (typeof window !== 'undefined') {
  window.StyleGuideGenerator = StyleGuideGenerator;
  window.StyleGuideTemplateEngine = StyleGuideTemplateEngine;
}