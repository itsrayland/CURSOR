import { PromptTemplate } from './types';

export const defaultPromptTemplates: PromptTemplate[] = [
  {
    id: 'claude-design-spec',
    name: 'Claude Design Spec Generator',
    model: 'claude',
    category: 'design',
    template: `You are Claude, an AI design partner.
Context: Building "{clientName}" {projectType}.
Task: Generate a component spec including:
• Color palette (hex codes)
• Font stacks (CSS)
• Responsive grid layout
{additionalRequirements}
Output format: JSON:
{
  "palette": [{
    "name": "primary",
    "hex": "#...",
    "usage": "..."
  }],
  "fonts": {
    "heading": "...",
    "body": "..."
  },
  "layout": {
    "grid": "...",
    "breakpoints": {}
  }
}`,
    parameters: [
      {
        name: 'clientName',
        type: 'text',
        required: true,
        description: 'Name of the client or project',
        defaultValue: 'Darzabi'
      },
      {
        name: 'projectType',
        type: 'select',
        required: true,
        options: ['email-marketing dashboard', 'e-commerce site', 'SaaS platform', 'portfolio site', 'mobile app'],
        description: 'Type of project',
        defaultValue: 'email-marketing dashboard'
      },
      {
        name: 'additionalRequirements',
        type: 'text',
        required: false,
        description: 'Any additional requirements or constraints',
        defaultValue: ''
      }
    ],
    description: 'Generate comprehensive design specifications using Claude',
    tags: ['design', 'spec', 'ui'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'openai-technical-spec',
    name: 'OpenAI Technical Spec Writer',
    model: 'openai',
    category: 'code',
    template: `System: You are a technical specification writer.
User: Produce a Markdown doc for "{projectName}" defining:
1. UI components ({componentTypes})
2. {cssFramework} classes
3. Example {framework} snippets
Include ARIA roles for accessibility.
{customInstructions}

Output should include:
- Component hierarchy
- Props/state definitions
- Event handlers
- Accessibility considerations
- Performance optimizations`,
    parameters: [
      {
        name: 'projectName',
        type: 'text',
        required: true,
        description: 'Name of the project',
        defaultValue: 'My Project'
      },
      {
        name: 'componentTypes',
        type: 'text',
        required: true,
        description: 'Types of components to define',
        defaultValue: 'cards, buttons, inputs, modals'
      },
      {
        name: 'cssFramework',
        type: 'select',
        required: true,
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Custom CSS'],
        description: 'CSS framework to use',
        defaultValue: 'Tailwind CSS'
      },
      {
        name: 'framework',
        type: 'select',
        required: true,
        options: ['React', 'Vue', 'Angular', 'Svelte', 'Web Components'],
        description: 'JavaScript framework',
        defaultValue: 'React'
      },
      {
        name: 'customInstructions',
        type: 'text',
        required: false,
        description: 'Additional custom instructions',
        defaultValue: ''
      }
    ],
    description: 'Generate detailed technical specifications and code examples',
    tags: ['code', 'technical', 'components'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'ulm-media-analysis',
    name: 'ULM Media Analysis & Moodboard',
    model: 'ulm',
    category: 'design',
    template: `Analyze the uploaded image "{imageName}" and:
1. Extract the top {colorCount} dominant colors
2. Suggest {moodboardCount} moodboard background styles
3. Generate CSS variables for the extracted colors
4. Recommend complementary colors
5. Identify visual themes and patterns

Consider:
- {brandGuidelines}
- Target audience: {targetAudience}
- Usage context: {usageContext}

Output format:
{
  "dominantColors": [],
  "cssVariables": {},
  "moodboards": [],
  "themes": [],
  "recommendations": []
}`,
    parameters: [
      {
        name: 'imageName',
        type: 'text',
        required: true,
        description: 'Name or description of the image',
        defaultValue: 'product-photo.jpg'
      },
      {
        name: 'colorCount',
        type: 'number',
        required: true,
        description: 'Number of colors to extract',
        defaultValue: 5
      },
      {
        name: 'moodboardCount',
        type: 'number',
        required: true,
        description: 'Number of moodboard suggestions',
        defaultValue: 3
      },
      {
        name: 'brandGuidelines',
        type: 'text',
        required: false,
        description: 'Existing brand guidelines to consider',
        defaultValue: ''
      },
      {
        name: 'targetAudience',
        type: 'text',
        required: false,
        description: 'Target audience description',
        defaultValue: ''
      },
      {
        name: 'usageContext',
        type: 'select',
        required: true,
        options: ['web', 'mobile', 'print', 'social media', 'presentation'],
        description: 'Where the design will be used',
        defaultValue: 'web'
      }
    ],
    description: 'Analyze images and generate design assets using ULM',
    tags: ['media', 'colors', 'moodboard'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'claude-requirements-gathering',
    name: 'Claude Requirements Gatherer',
    model: 'claude',
    category: 'planning',
    template: `You are an AI product consultant helping to gather requirements for {projectType}.

Client: {clientName}
Industry: {industry}
Current Stage: {projectStage}

Please help me understand:
1. Key objectives and success metrics
2. User personas and their needs
3. Technical constraints and preferences
4. Timeline and budget considerations
5. Integration requirements
6. Compliance/regulatory needs

{specificQuestions}

Format your response as a structured requirements document.`,
    parameters: [
      {
        name: 'projectType',
        type: 'text',
        required: true,
        description: 'Type of project',
        defaultValue: 'web application'
      },
      {
        name: 'clientName',
        type: 'text',
        required: true,
        description: 'Client or company name',
        defaultValue: ''
      },
      {
        name: 'industry',
        type: 'text',
        required: true,
        description: 'Industry or sector',
        defaultValue: ''
      },
      {
        name: 'projectStage',
        type: 'select',
        required: true,
        options: ['ideation', 'planning', 'design', 'development', 'launch'],
        description: 'Current project stage',
        defaultValue: 'planning'
      },
      {
        name: 'specificQuestions',
        type: 'text',
        required: false,
        description: 'Specific questions to address',
        defaultValue: ''
      }
    ],
    description: 'Gather comprehensive project requirements',
    tags: ['planning', 'requirements', 'discovery'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'openai-accessibility-audit',
    name: 'OpenAI Accessibility Audit',
    model: 'openai',
    category: 'code',
    template: `System: You are an accessibility expert specializing in WCAG compliance.

Audit the following {componentType} for accessibility:
{codeSnippet}

Check for:
1. WCAG {wcagLevel} compliance
2. Keyboard navigation support
3. Screen reader compatibility
4. Color contrast ratios
5. Focus management
6. ARIA labels and roles
7. Error handling and messaging

Provide:
- Issues found (with severity)
- Specific fixes with code examples
- Best practices recommendations
- Testing suggestions`,
    parameters: [
      {
        name: 'componentType',
        type: 'text',
        required: true,
        description: 'Type of component being audited',
        defaultValue: 'form'
      },
      {
        name: 'codeSnippet',
        type: 'text',
        required: true,
        description: 'Code to audit',
        defaultValue: ''
      },
      {
        name: 'wcagLevel',
        type: 'select',
        required: true,
        options: ['2.1 AA', '2.1 AAA', '3.0'],
        description: 'WCAG compliance level',
        defaultValue: '2.1 AA'
      }
    ],
    description: 'Audit components for accessibility compliance',
    tags: ['accessibility', 'audit', 'wcag'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'ulm-style-extraction',
    name: 'ULM Style Token Extractor',
    model: 'ulm',
    category: 'design',
    template: `Analyze the design system from {sourceUrl} and extract:

1. Color Tokens:
   - Primary, secondary, accent colors
   - Semantic colors (success, warning, error)
   - Neutral palette
   
2. Typography:
   - Font families
   - Size scale
   - Weight variations
   - Line heights
   
3. Spacing:
   - Base unit
   - Scale multipliers
   - Component gaps
   
4. Effects:
   - Shadows
   - Border radii
   - Transitions

Export as CSS custom properties following naming convention: --{prefix}-{category}-{variant}`,
    parameters: [
      {
        name: 'sourceUrl',
        type: 'text',
        required: true,
        description: 'URL or description of design source',
        defaultValue: ''
      },
      {
        name: 'prefix',
        type: 'text',
        required: true,
        description: 'CSS variable prefix',
        defaultValue: 'ds'
      }
    ],
    description: 'Extract design tokens from existing designs',
    tags: ['tokens', 'design-system', 'css'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];