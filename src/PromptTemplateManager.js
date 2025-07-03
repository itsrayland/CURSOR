/**
 * PromptTemplateManager - Manages reusable prompt templates for different AI models
 * Implements prompt engineering best practices and parameterization
 */
class PromptTemplateManager {
  constructor(config = {}) {
    this.config = config;
    this.templates = new Map();
    this.templateCategories = {
      'claude': ['requirements-gathering', 'conversational-design', 'draft-specs'],
      'openai': ['technical-specs', 'code-generation', 'jsx-components'],
      'ulm': ['image-analysis', 'color-extraction', 'moodboard-generation'],
      'general': ['self-review', 'validation', 'iteration']
    };
    
    this.initializeBuiltInTemplates();
  }

  /**
   * Initialize built-in templates
   */
  initializeBuiltInTemplates() {
    // Claude Templates
    this.addTemplate('claude-requirements-gathering', {
      name: 'Claude Requirements Gathering',
      model: 'claude',
      category: 'requirements-gathering',
      description: 'Structured requirements gathering for design projects',
      template: `You are Claude, an AI design partner specializing in requirements gathering and user experience design.

Context: Building "${clientName}" ${projectType} for ${targetAudience}.

Task: Conduct a comprehensive requirements gathering session including:
• Business objectives and success metrics
• Target user personas and use cases  
• Functional requirements and user flows
• Technical constraints and integrations
• Brand guidelines and design preferences
• Content strategy and information architecture

Output format: Structured JSON:
{
  "businessObjectives": [...],
  "userPersonas": [...],
  "functionalRequirements": [...],
  "technicalConstraints": [...],
  "brandGuidelines": {...},
  "contentStrategy": {...}
}

Guidelines:
- Ask clarifying questions if information is unclear
- Prioritize accessibility and inclusive design
- Consider mobile-first responsive design
- Include performance and scalability considerations

If output is incomplete, refine detail level and ask follow-up questions.`,
      parameters: ['clientName', 'projectType', 'targetAudience'],
      examples: [
        {
          clientName: 'Darzabi',
          projectType: 'email marketing dashboard', 
          targetAudience: 'small business owners'
        }
      ]
    });

    this.addTemplate('claude-conversational-design', {
      name: 'Claude Conversational Design Review',
      model: 'claude',
      category: 'conversational-design',
      description: 'Interactive design review and iteration',
      template: `You are Claude, an expert UX/UI designer conducting a design review session.

Context: Reviewing ${designType} for ${projectName}.

Current Design: ${currentDesign}

Task: Provide comprehensive design feedback covering:
• Visual hierarchy and information architecture
• User flow optimization and interaction design
• Accessibility compliance (WCAG 2.1 AA)
• Mobile responsiveness and cross-platform consistency
• Brand alignment and visual consistency
• Performance implications of design decisions

Review Process:
1. Analyze the current design against best practices
2. Identify specific improvement opportunities
3. Suggest alternative approaches with rationale
4. Prioritize recommendations by impact and effort

Output: Detailed review with actionable recommendations in markdown format.

Self-Review: Before finalizing, critique your own recommendations for feasibility and user impact.`,
      parameters: ['designType', 'projectName', 'currentDesign']
    });

    // OpenAI Templates
    this.addTemplate('openai-technical-specs', {
      name: 'OpenAI Technical Specification Generator',
      model: 'openai',
      category: 'technical-specs',
      description: 'Generate detailed technical specifications from requirements',
      template: `System: You are a technical specification writer specializing in frontend architecture and design systems.

Task: Produce a comprehensive technical specification document including:

1. Component Architecture
   • Atomic design system breakdown (atoms, molecules, organisms)
   • Component props and state management
   • Reusability patterns and composition

2. Styling Framework
   • CSS-in-JS or stylesheet approach
   • Design token structure
   • Responsive breakpoint system
   • Color palette with semantic naming

3. Code Implementation
   • React/Vue/Angular component examples
   • TypeScript interfaces and types
   • CSS/Tailwind utility classes
   • State management patterns

4. Accessibility Features
   • ARIA roles and attributes
   • Keyboard navigation support
   • Screen reader compatibility
   • Color contrast compliance

Requirements: ${requirements}
Constraints: ${constraints}

Output Format: Markdown document with code examples and implementation details.

Include practical JSX/TSX snippets that can be immediately implemented.`,
      parameters: ['requirements', 'constraints']
    });

    this.addTemplate('openai-component-generation', {
      name: 'OpenAI React Component Generator',
      model: 'openai',
      category: 'code-generation',
      description: 'Generate production-ready React components',
      template: `System: You are a senior React developer creating production-ready components.

Task: Generate a complete React component for: ${componentType}

Requirements:
• TypeScript interfaces for all props
• Proper error handling and loading states
• Accessibility attributes (ARIA roles, labels)
• Responsive design with CSS modules or styled-components
• Unit test structure (Jest/React Testing Library)
• Storybook story for documentation

Component Specifications:
${componentSpecs}

Styling Approach: ${stylingApproach}
State Management: ${stateManagement}

Output Structure:
1. Component file (.tsx)
2. Types file (.types.ts)
3. Styles file (.module.css or styled-components)
4. Test file (.test.tsx)
5. Story file (.stories.tsx)

Ensure code follows React best practices and is immediately runnable.`,
      parameters: ['componentType', 'componentSpecs', 'stylingApproach', 'stateManagement']
    });

    // ULM Templates
    this.addTemplate('ulm-image-analysis', {
      name: 'ULM Image Analysis and Color Extraction',
      model: 'ulm',
      category: 'image-analysis',
      description: 'Analyze images and extract design elements',
      template: `Analyze the provided image and extract design elements for ${projectContext}.

Analysis Tasks:
1. Color Palette Extraction
   • Identify dominant colors (hex codes)
   • Suggest complementary colors
   • Define semantic color roles (primary, secondary, accent, neutral)

2. Visual Style Analysis
   • Typography characteristics (if visible)
   • Layout patterns and grid structure
   • Visual weight and hierarchy
   • Mood and aesthetic direction

3. Design Token Generation
   • CSS custom properties for colors
   • Spacing and sizing recommendations
   • Border radius and shadow styles

4. Asset Recommendations
   • Suggested icon style and weight
   • Image treatment approaches
   • Background pattern ideas

Output Format:
{
  "colorPalette": {
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode",
    "neutral": ["#hex1", "#hex2", "#hex3"]
  },
  "designTokens": {
    "colors": {...},
    "spacing": {...},
    "typography": {...}
  },
  "recommendations": {
    "iconography": "...",
    "imagery": "...",
    "patterns": "..."
  }
}

Generate CSS variables for immediate implementation.`,
      parameters: ['projectContext']
    });

    this.addTemplate('ulm-moodboard-generation', {
      name: 'ULM Moodboard and Asset Generation',
      model: 'ulm',
      category: 'moodboard-generation',
      description: 'Generate moodboards and visual assets',
      template: `Create a comprehensive moodboard for ${projectName} with ${designDirection} aesthetic.

Brand Context: ${brandContext}
Target Audience: ${targetAudience}
Industry: ${industry}

Generation Tasks:
1. Mood and Atmosphere
   • Visual style direction
   • Color harmony and palette
   • Texture and pattern suggestions

2. Asset Creation
   • Background variations (3-5 options)
   • Pattern elements for UI decoration
   • Icon style recommendations

3. Typography Pairing
   • Heading font suggestions
   • Body text recommendations
   • Font pairing rationales

4. Layout Inspiration
   • Grid system suggestions
   • Component layout patterns
   • Spacing rhythm recommendations

Asset Naming Convention: ${projectName}_asset_purpose_YYYYMMDD.jpg

Output: Visual moodboard with accompanying specification document detailing implementation guidelines.`,
      parameters: ['projectName', 'designDirection', 'brandContext', 'targetAudience', 'industry']
    });

    // General Templates
    this.addTemplate('self-review-validation', {
      name: 'Self-Review and Validation',
      model: 'general',
      category: 'validation',
      description: 'Self-critique and validation prompts',
      template: `Self-Review Checklist for ${outputType}:

Completeness Review:
• Are all required sections included?
• Is the information sufficient for implementation?
• Are examples and code snippets practical and runnable?

Quality Assessment:
• Does the output meet professional standards?
• Are best practices properly implemented?
• Is the technical accuracy verified?

Accessibility Check:
• WCAG 2.1 AA compliance addressed?
• Keyboard navigation considerations included?
• Screen reader compatibility verified?

Implementation Feasibility:
• Can this be implemented immediately?
• Are dependencies and requirements clear?
• Is the scope appropriate for the project?

Self-Critique Questions:
1. What aspects could be improved or expanded?
2. Are there any potential edge cases missed?
3. Does this align with modern development practices?
4. Is the documentation clear for handoff to developers?

Rate the output quality (1-10) and provide specific improvement recommendations.

If quality is below 8/10, revise and improve before finalizing.`,
      parameters: ['outputType']
    });
  }

  /**
   * Add a new template
   */
  addTemplate(key, template) {
    if (!template.name || !template.template) {
      throw new Error('Template must have name and template content');
    }

    template.id = key;
    template.createdAt = new Date().toISOString();
    template.parameters = template.parameters || [];
    
    this.templates.set(key, template);
    console.log(`📝 Added template: ${template.name}`);
  }

  /**
   * Get template by key
   */
  getTemplate(key) {
    return this.templates.get(key);
  }

  /**
   * Get templates by model
   */
  getTemplatesByModel(model) {
    return Array.from(this.templates.values()).filter(t => t.model === model);
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category) {
    return Array.from(this.templates.values()).filter(t => t.category === category);
  }

  /**
   * Render template with parameters
   */
  renderTemplate(templateKey, parameters = {}) {
    const template = this.getTemplate(templateKey);
    if (!template) {
      throw new Error(`Template not found: ${templateKey}`);
    }

    let rendered = template.template;
    
    // Replace parameters
    for (const [key, value] of Object.entries(parameters)) {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      rendered = rendered.replace(regex, value);
    }

    // Check for missing parameters
    const missingParams = template.parameters.filter(param => 
      !parameters.hasOwnProperty(param)
    );

    if (missingParams.length > 0) {
      console.warn(`Missing parameters for template ${templateKey}:`, missingParams);
    }

    return {
      content: rendered,
      metadata: {
        templateId: template.id,
        templateName: template.name,
        model: template.model,
        category: template.category,
        parameters: parameters,
        missingParameters: missingParams,
        renderedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Create custom template
   */
  async createTemplate(templateType, config) {
    const template = {
      name: config.name,
      model: config.model,
      category: config.category,
      description: config.description,
      template: config.template,
      parameters: config.parameters || [],
      examples: config.examples || [],
      createdAt: new Date().toISOString(),
      custom: true
    };

    const key = `custom-${Date.now()}`;
    this.addTemplate(key, template);
    
    return { key, template };
  }

  /**
   * Load templates from file system
   */
  async loadTemplates() {
    if (typeof require === 'undefined') return; // Browser environment
    
    const fs = require('fs').promises;
    const path = require('path');
    const templatesDir = this.config.templatesDirectory;

    try {
      const files = await fs.readdir(templatesDir);
      const templateFiles = files.filter(f => f.endsWith('.json'));

      for (const file of templateFiles) {
        try {
          const content = await fs.readFile(path.join(templatesDir, file), 'utf8');
          const template = JSON.parse(content);
          const key = path.basename(file, '.json');
          this.addTemplate(key, template);
        } catch (error) {
          console.warn(`Failed to load template ${file}:`, error.message);
        }
      }
    } catch (error) {
      console.log('Templates directory not found, using built-in templates only');
    }
  }

  /**
   * Save template to file system
   */
  async saveTemplate(key, template) {
    if (typeof require === 'undefined') return; // Browser environment
    
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(this.config.templatesDirectory, `${key}.json`);

    await fs.writeFile(filePath, JSON.stringify(template, null, 2));
    console.log(`💾 Saved template: ${key}`);
  }

  /**
   * Get available templates summary
   */
  getAvailableTemplates() {
    return Array.from(this.templates.values()).map(t => ({
      id: t.id,
      name: t.name,
      model: t.model,
      category: t.category,
      description: t.description,
      parametersCount: t.parameters?.length || 0,
      hasExamples: (t.examples?.length || 0) > 0,
      custom: t.custom || false
    }));
  }

  /**
   * Validate template structure
   */
  validateTemplate(template) {
    const required = ['name', 'template'];
    const missing = required.filter(field => !template[field]);
    
    if (missing.length > 0) {
      throw new Error(`Template missing required fields: ${missing.join(', ')}`);
    }

    return true;
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptTemplateManager;
} else if (typeof window !== 'undefined') {
  window.PromptTemplateManager = PromptTemplateManager;
}