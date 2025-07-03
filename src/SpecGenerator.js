/**
 * SpecGenerator - Generates technical specifications, markdown documents, and JSON outputs
 * Handles validation and formatting of generated specifications
 */
class SpecGenerator {
  constructor(config = {}) {
    this.config = config;
    this.outputFormats = ['markdown', 'json', 'html', 'pdf'];
    this.validationRules = [];
    this.initializeValidationRules();
  }

  /**
   * Generate all output formats for a project
   */
  async generateAll(data, project) {
    console.log('📄 Generating technical specifications...');
    
    const outputs = {
      projectId: project.id,
      projectName: project.name,
      generatedAt: new Date().toISOString(),
      files: {}
    };

    // Generate different output formats
    for (const format of this.outputFormats) {
      try {
        outputs.files[format] = await this.generate(data, project, format);
      } catch (error) {
        console.warn(`Failed to generate ${format} output:`, error.message);
        outputs.files[format] = { error: error.message };
      }
    }

    // Create summary document
    outputs.summary = this.createSummaryDocument(data, project);
    
    return outputs;
  }

  /**
   * Generate specification in specific format
   */
  async generate(data, project, format = 'markdown') {
    const spec = this.compileSpecification(data, project);
    
    switch (format) {
      case 'markdown':
        return this.generateMarkdown(spec);
      case 'json':
        return this.generateJSON(spec);
      case 'html':
        return this.generateHTML(spec);
      case 'pdf':
        return this.generatePDF(spec);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  /**
   * Compile complete specification from data
   */
  compileSpecification(data, project) {
    const { requirements, technicalSpec, styleGuide } = data;
    
    return {
      meta: {
        projectName: project.name,
        projectId: project.id,
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        generatedBy: 'Prompt Engineering Workstation'
      },
      projectOverview: {
        description: project.description,
        objectives: requirements?.businessObjectives || [],
        targetAudience: requirements?.userPersonas || [],
        scope: requirements?.functionalRequirements || []
      },
      technicalRequirements: {
        architecture: technicalSpec?.architecture || {},
        technologies: technicalSpec?.technologies || [],
        integrations: technicalSpec?.integrations || [],
        performance: technicalSpec?.performance || {}
      },
      designSystem: {
        colorPalette: styleGuide?.colorSystem || {},
        typography: styleGuide?.typography || {},
        spacing: styleGuide?.spacing || {},
        components: styleGuide?.components || {}
      },
      implementation: {
        components: technicalSpec?.components || [],
        codeExamples: technicalSpec?.codeExamples || {},
        testingStrategy: technicalSpec?.testingStrategy || {}
      },
      accessibility: {
        guidelines: styleGuide?.accessibility || {},
        compliance: 'WCAG 2.1 AA',
        testing: []
      },
      deliverables: this.generateDeliverables(data, project)
    };
  }

  /**
   * Generate markdown specification
   */
  generateMarkdown(spec) {
    const md = `# ${spec.meta.projectName} - Technical Specification

## Overview

**Project:** ${spec.meta.projectName}  
**Version:** ${spec.meta.version}  
**Generated:** ${new Date(spec.meta.generatedAt).toLocaleDateString()}

${spec.projectOverview.description || 'Project description not provided.'}

## Business Objectives

${spec.projectOverview.objectives.map(obj => `- ${obj}`).join('\n') || 'No objectives specified.'}

## Technical Architecture

### Frontend Framework
- React 18+ with TypeScript
- Next.js for SSR/SSG capabilities
- Tailwind CSS for styling

### State Management  
- Zustand for global state
- React Query for server state
- Local state with useState/useReducer

### Build & Deployment
- Vite for development and building
- Vercel/Netlify for deployment
- GitHub Actions for CI/CD

## Design System

### Color Palette

${this.generateColorPaletteMarkdown(spec.designSystem.colorPalette)}

### Typography

${this.generateTypographyMarkdown(spec.designSystem.typography)}

### Spacing System

${this.generateSpacingMarkdown(spec.designSystem.spacing)}

## Component Specifications

${this.generateComponentsMarkdown(spec.designSystem.components)}

## Implementation Guidelines

### Code Standards
- TypeScript strict mode
- ESLint + Prettier for code formatting
- Husky for git hooks
- Jest + React Testing Library for testing

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility

### Performance Targets
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.5s

## Deliverables

${spec.deliverables.map(d => `- ${d.name}: ${d.description}`).join('\n')}

---

*Generated by Prompt Engineering Workstation v${spec.meta.version}*`;

    return {
      content: md,
      fileName: `${spec.meta.projectName.replace(/\s+/g, '-').toLowerCase()}-spec.md`,
      format: 'markdown',
      size: md.length
    };
  }

  /**
   * Generate JSON specification
   */
  generateJSON(spec) {
    const json = JSON.stringify(spec, null, 2);
    
    return {
      content: json,
      fileName: `${spec.meta.projectName.replace(/\s+/g, '-').toLowerCase()}-spec.json`,
      format: 'json',
      size: json.length,
      data: spec
    };
  }

  /**
   * Generate HTML specification
   */
  generateHTML(spec) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${spec.meta.projectName} - Technical Specification</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; margin: 2rem; }
    .header { background: #f8f9fa; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; }
    .section { margin-bottom: 2rem; }
    .color-swatch { display: inline-block; width: 32px; height: 32px; border-radius: 4px; margin-right: 8px; }
    code { background: #f1f3f4; padding: 2px 4px; border-radius: 3px; }
    pre { background: #f8f9fa; padding: 1rem; border-radius: 8px; overflow-x: auto; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${spec.meta.projectName} - Technical Specification</h1>
    <p><strong>Version:</strong> ${spec.meta.version} | <strong>Generated:</strong> ${new Date(spec.meta.generatedAt).toLocaleDateString()}</p>
  </div>
  <div class="section">
    <h2>Project Overview</h2>
    <p>${spec.projectOverview.description || 'Project description not provided.'}</p>
  </div>
  <div class="section">
    <h2>Design System</h2>
    ${this.generateColorPaletteHTML(spec.designSystem.colorPalette)}
  </div>
  <div class="section">
    <h2>Technical Implementation</h2>
    <pre><code>${JSON.stringify(spec.technicalRequirements, null, 2)}</code></pre>
  </div>
</body>
</html>`;

    return {
      content: html,
      fileName: `${spec.meta.projectName.replace(/\s+/g, '-').toLowerCase()}-spec.html`,
      format: 'html',
      size: html.length
    };
  }

  /**
   * Generate PDF specification (placeholder)
   */
  generatePDF(spec) {
    // In production, would use a PDF generation library
    return {
      content: 'PDF generation would be implemented with a library like Puppeteer or jsPDF',
      fileName: `${spec.meta.projectName.replace(/\s+/g, '-').toLowerCase()}-spec.pdf`,
      format: 'pdf',
      size: 0,
      placeholder: true
    };
  }

  /**
   * Validate generated specification
   */
  async validate(specPath) {
    console.log('🔍 Validating specification...');
    
    const validationResults = {
      isValid: true,
      errors: [],
      warnings: [],
      score: 0,
      checkedAt: new Date().toISOString()
    };

    try {
      // Load specification (mock implementation)
      const spec = { meta: {}, designSystem: {}, technicalRequirements: {} };
      
      // Run validation rules
      for (const rule of this.validationRules) {
        const result = await rule.validate(spec);
        
        if (result.errors.length > 0) {
          validationResults.errors.push(...result.errors);
          validationResults.isValid = false;
        }
        
        if (result.warnings.length > 0) {
          validationResults.warnings.push(...result.warnings);
        }
        
        validationResults.score += result.score;
      }
      
      // Calculate final score
      validationResults.score = Math.round(validationResults.score / this.validationRules.length);
      
    } catch (error) {
      validationResults.isValid = false;
      validationResults.errors.push(`Validation failed: ${error.message}`);
    }

    return validationResults;
  }

  /**
   * Initialize validation rules
   */
  initializeValidationRules() {
    this.validationRules = [
      {
        name: 'Completeness Check',
        validate: async (spec) => ({
          errors: spec.meta ? [] : ['Missing meta information'],
          warnings: [],
          score: spec.meta ? 100 : 0
        })
      },
      {
        name: 'Accessibility Compliance',
        validate: async (spec) => ({
          errors: [],
          warnings: spec.accessibility ? [] : ['Accessibility guidelines not specified'],
          score: spec.accessibility ? 100 : 50
        })
      },
      {
        name: 'Design System Validation',
        validate: async (spec) => ({
          errors: [],
          warnings: spec.designSystem?.colorPalette ? [] : ['Color palette not defined'],
          score: spec.designSystem?.colorPalette ? 100 : 60
        })
      }
    ];
  }

  /**
   * Create summary document
   */
  createSummaryDocument(data, project) {
    return {
      projectName: project.name,
      generatedFiles: Object.keys(data).length,
      totalSize: 0, // Would calculate actual sizes
      keyComponents: [
        'Color System',
        'Typography Scale', 
        'Spacing System',
        'Component Library',
        'Accessibility Guidelines'
      ],
      nextSteps: [
        'Review specifications with stakeholders',
        'Begin component development',
        'Set up testing framework',
        'Implement accessibility testing'
      ]
    };
  }

  /**
   * Generate deliverables list
   */
  generateDeliverables(data, project) {
    return [
      {
        name: 'Technical Specification',
        description: 'Complete technical specification document',
        format: 'Markdown + JSON'
      },
      {
        name: 'Design System',
        description: 'Comprehensive design system documentation',
        format: 'HTML + CSS'
      },
      {
        name: 'Component Library',
        description: 'React component implementations',
        format: 'TypeScript + Storybook'
      },
      {
        name: 'Testing Suite',
        description: 'Unit and integration tests',
        format: 'Jest + Testing Library'
      }
    ];
  }

  /**
   * Helper methods for generating specific sections
   */
  generateColorPaletteMarkdown(colorSystem) {
    if (!colorSystem.primary) return 'Color palette not defined.';
    
    return `**Primary Colors:**
- Primary: ${colorSystem.primary.500 || colorSystem.primary}
- Secondary: ${colorSystem.secondary?.500 || colorSystem.secondary || 'Not defined'}
- Accent: ${colorSystem.accent?.500 || colorSystem.accent || 'Not defined'}`;
  }

  generateTypographyMarkdown(typography) {
    if (!typography.typeScale) return 'Typography system not defined.';
    
    return Object.entries(typography.typeScale)
      .map(([key, value]) => `- **${key}**: ${value.fontSize}, ${value.fontWeight}`)
      .join('\n');
  }

  generateSpacingMarkdown(spacing) {
    if (!spacing.scale) return 'Spacing system not defined.';
    
    return Object.entries(spacing.scale)
      .map(([key, value]) => `- **${key}**: ${value}`)
      .join('\n');
  }

  generateComponentsMarkdown(components) {
    if (!components || Object.keys(components).length === 0) {
      return 'Component specifications not defined.';
    }
    
    return Object.entries(components)
      .map(([category, categoryComponents]) => {
        const componentList = Object.entries(categoryComponents)
          .map(([name, comp]) => `  - **${name}**: ${comp.description || 'No description'}`)
          .join('\n');
        return `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n${componentList}`;
      })
      .join('\n\n');
  }

  generateColorPaletteHTML(colorSystem) {
    if (!colorSystem.primary) return '<p>Color palette not defined.</p>';
    
    const colors = [
      { name: 'Primary', value: colorSystem.primary.500 || colorSystem.primary },
      { name: 'Secondary', value: colorSystem.secondary?.500 || colorSystem.secondary },
      { name: 'Accent', value: colorSystem.accent?.500 || colorSystem.accent }
    ].filter(c => c.value);

    return `<h3>Color Palette</h3>
${colors.map(color => 
  `<div><span class="color-swatch" style="background-color: ${color.value}"></span><strong>${color.name}:</strong> ${color.value}</div>`
).join('')}`;
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpecGenerator;
} else if (typeof window !== 'undefined') {
  window.SpecGenerator = SpecGenerator;
}