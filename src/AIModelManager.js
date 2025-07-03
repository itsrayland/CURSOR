/**
 * AIModelManager - Handles integrations with multiple AI models
 * Provides unified interface for Claude, OpenAI, ULM, and other AI services
 */
class AIModelManager {
  constructor(config = {}) {
    this.config = config;
    this.models = {};
    
    // Initialize model interfaces
    this.claude = new ClaudeInterface(config);
    this.openai = new OpenAIInterface(config);
    this.ulm = new ULMInterface(config);
    
    this.models = {
      claude: this.claude,
      openai: this.openai,
      ulm: this.ulm
    };
  }

  /**
   * Validate all API connections
   */
  async validateConnections() {
    const results = {};
    
    for (const [name, model] of Object.entries(this.models)) {
      try {
        await model.validate();
        results[name] = { status: 'connected', error: null };
        console.log(`✅ ${name} API connected successfully`);
      } catch (error) {
        results[name] = { status: 'error', error: error.message };
        console.warn(`⚠️ ${name} API connection failed:`, error.message);
      }
    }
    
    return results;
  }

  /**
   * Get model by name
   */
  getModel(modelName) {
    return this.models[modelName];
  }

  /**
   * Execute prompt on specific model
   */
  async executePrompt(modelName, prompt, options = {}) {
    const model = this.getModel(modelName);
    if (!model) {
      throw new Error(`Model not found: ${modelName}`);
    }
    
    return await model.execute(prompt, options);
  }

  /**
   * Execute prompt on multiple models
   */
  async executePromptMultiple(modelNames, prompt, options = {}) {
    const results = {};
    const promises = modelNames.map(async (modelName) => {
      try {
        const result = await this.executePrompt(modelName, prompt, options);
        results[modelName] = { success: true, result };
      } catch (error) {
        results[modelName] = { success: false, error: error.message };
      }
    });
    
    await Promise.all(promises);
    return results;
  }
}

/**
 * Claude Interface - Handles Claude AI interactions
 */
class ClaudeInterface {
  constructor(config) {
    this.apiKey = config.apiKeys?.claude;
    this.baseUrl = 'https://api.anthropic.com/v1';
    this.model = 'claude-3-sonnet-20240229';
  }

  /**
   * Validate API connection
   */
  async validate() {
    if (!this.apiKey) {
      throw new Error('Claude API key not configured');
    }
    
    // Test with a simple request
    const response = await this.makeRequest('/messages', {
      model: this.model,
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hello' }]
    });
    
    return response;
  }

  /**
   * Execute prompt
   */
  async execute(prompt, options = {}) {
    const requestBody = {
      model: options.model || this.model,
      max_tokens: options.maxTokens || 4000,
      messages: [{ role: 'user', content: prompt }],
      temperature: options.temperature || 0.7,
      ...options.additionalParams
    };

    const response = await this.makeRequest('/messages', requestBody);
    return response.content[0].text;
  }

  /**
   * Gather requirements using Claude
   */
  async gatherRequirements(projectDescription, clientInfo) {
    const prompt = `As an expert UX researcher and business analyst, analyze this project and generate comprehensive requirements:

Project: ${projectDescription}
Client: ${JSON.stringify(clientInfo, null, 2)}

Please provide a detailed requirements analysis in JSON format including:
- Business objectives and success metrics
- Target user personas with demographics and goals
- Functional requirements organized by priority
- Technical constraints and integrations needed
- Brand guidelines and design preferences
- Content strategy and information architecture
- Accessibility requirements (WCAG 2.1 AA)
- Performance expectations
- Mobile and responsive considerations

Structure your response as valid JSON that can be parsed and used programmatically.`;

    const response = await this.execute(prompt, { temperature: 0.3 });
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // If JSON parsing fails, return structured object
      return {
        rawResponse: response,
        parsed: false,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Conduct design review
   */
  async reviewDesign(designSpec, feedback) {
    const prompt = `As a senior UX/UI designer, review this design specification:

Design Spec: ${JSON.stringify(designSpec, null, 2)}
Additional Context: ${feedback}

Provide a comprehensive design review covering:
1. User Experience Analysis
2. Visual Design Assessment
3. Accessibility Compliance
4. Technical Implementation Feasibility
5. Brand Consistency
6. Mobile/Responsive Considerations
7. Performance Implications

For each area, provide:
- Current assessment (Good/Needs Improvement/Critical Issue)
- Specific recommendations
- Priority level (High/Medium/Low)
- Implementation effort estimate

Format your response in clear markdown with actionable recommendations.`;

    return await this.execute(prompt, { temperature: 0.4 });
  }

  /**
   * Make HTTP request to Claude API
   */
  async makeRequest(endpoint, body) {
    if (typeof fetch === 'undefined') {
      // Node.js environment
      const axios = require('axios');
      
      const response = await axios.post(`${this.baseUrl}${endpoint}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        }
      });
      
      return response.data;
    } else {
      // Browser environment
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    }
  }
}

/**
 * OpenAI Interface - Handles OpenAI interactions
 */
class OpenAIInterface {
  constructor(config) {
    this.apiKey = config.apiKeys?.openai;
    this.baseUrl = 'https://api.openai.com/v1';
    this.model = 'gpt-4o';
  }

  /**
   * Validate API connection
   */
  async validate() {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
    const response = await this.makeRequest('/chat/completions', {
      model: this.model,
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 10
    });
    
    return response;
  }

  /**
   * Execute prompt
   */
  async execute(prompt, options = {}) {
    const requestBody = {
      model: options.model || this.model,
      messages: [
        {
          role: 'system',
          content: options.systemPrompt || 'You are a helpful assistant specializing in technical specifications and code generation.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: options.maxTokens || 4000,
      temperature: options.temperature || 0.7,
      ...options.additionalParams
    };

    const response = await this.makeRequest('/chat/completions', requestBody);
    return response.choices[0].message.content;
  }

  /**
   * Generate technical specification
   */
  async generateTechnicalSpec(requirements, constraints) {
    const prompt = `Generate a comprehensive technical specification document based on these requirements:

Requirements: ${JSON.stringify(requirements, null, 2)}
Constraints: ${JSON.stringify(constraints, null, 2)}

Create a detailed technical specification including:

1. **System Architecture**
   - Frontend framework recommendation
   - State management approach
   - API integration patterns
   - Build and deployment strategy

2. **Component Library**
   - Atomic design system structure
   - Component specifications with props
   - TypeScript interfaces
   - Styling approach (CSS modules, styled-components, etc.)

3. **Design System**
   - Color palette with semantic tokens
   - Typography scale and font selections  
   - Spacing and layout grid system
   - Border radius, shadows, and effects

4. **Responsive Design**
   - Breakpoint definitions
   - Mobile-first approach
   - Touch targets and interactions
   - Performance considerations

5. **Accessibility**
   - WCAG 2.1 AA compliance checklist
   - ARIA roles and attributes
   - Keyboard navigation patterns
   - Screen reader support

6. **Implementation Examples**
   - React/TypeScript component samples
   - CSS/SCSS code snippets
   - Test structure recommendations

Format as a comprehensive markdown document with practical code examples.`;

    const response = await this.execute(prompt, {
      systemPrompt: 'You are a senior frontend architect and technical specification writer.',
      temperature: 0.3
    });

    return {
      content: response,
      generatedAt: new Date().toISOString(),
      model: this.model
    };
  }

  /**
   * Generate React components
   */  
  async generateComponents(componentSpecs, options = {}) {
    const prompt = `Generate production-ready React components based on these specifications:

${JSON.stringify(componentSpecs, null, 2)}

Requirements:
- TypeScript with strict typing
- Proper error boundaries and loading states
- Accessibility attributes (ARIA roles, labels)
- CSS modules or styled-components for styling
- Jest/React Testing Library tests
- Storybook stories for documentation

Provide complete, runnable code for each component including:
1. Main component file (.tsx)
2. TypeScript interfaces (.types.ts)
3. Styles (.module.css or styled-components)
4. Unit tests (.test.tsx)
5. Storybook story (.stories.tsx)

Follow React best practices and ensure immediate usability.`;

    return await this.execute(prompt, {
      systemPrompt: 'You are a senior React developer creating production-ready components.',
      temperature: 0.2
    });
  }

  /**
   * Make HTTP request to OpenAI API
   */
  async makeRequest(endpoint, body) {
    if (typeof fetch === 'undefined') {
      // Node.js environment
      const axios = require('axios');
      
      const response = await axios.post(`${this.baseUrl}${endpoint}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });
      
      return response.data;
    } else {
      // Browser environment
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    }
  }
}

/**
 * ULM Interface - Handles Unified Language+Vision Model interactions
 */
class ULMInterface {
  constructor(config) {
    this.apiKey = config.apiKeys?.ulm;
    this.baseUrl = config.ulmBaseUrl || 'https://api.ulm.example.com/v1';
  }

  /**
   * Validate API connection
   */
  async validate() {
    if (!this.apiKey) {
      throw new Error('ULM API key not configured');
    }
    
    // Mock validation for demo purposes
    console.log('ULM validation would occur here');
    return { status: 'ok' };
  }

  /**
   * Execute prompt
   */
  async execute(prompt, options = {}) {
    // Mock implementation for demo
    return {
      content: `ULM response to: ${prompt.substring(0, 100)}...`,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyze image and generate design elements
   */
  async analyzeAndGenerate(mediaAssets, colorPalette) {
    const prompt = `Analyze these media assets and generate design elements:

Assets: ${mediaAssets.map(asset => asset.name || asset.url).join(', ')}
Existing Color Palette: ${JSON.stringify(colorPalette, null, 2)}

Provide:
1. Color analysis and extraction
2. Typography recommendations based on visual style
3. Layout pattern suggestions
4. Icon style recommendations
5. Image treatment approaches
6. CSS design tokens

Return structured JSON with practical implementation details.`;

    // Mock implementation - in real scenario would process actual images
    return {
      colorAnalysis: {
        dominantColors: ['#2c3e50', '#3498db', '#e74c3c'],
        complementaryColors: ['#f39c12', '#2ecc71'],
        colorHarmony: 'triadic'
      },
      designTokens: {
        '--color-primary': '#3498db',
        '--color-secondary': '#2c3e50',
        '--color-accent': '#e74c3c',
        '--spacing-unit': '8px',
        '--border-radius': '4px'
      },
      recommendations: {
        iconography: 'outlined style with 2px stroke weight',
        typography: 'sans-serif, medium weight headers',
        imagery: 'high contrast with consistent aspect ratios'
      },
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Generate moodboard assets
   */
  async generateMoodboard(projectContext, designDirection) {
    const prompt = `Generate moodboard assets for:
    
Project: ${projectContext}
Direction: ${designDirection}

Create visual elements including:
- Background textures and patterns
- Color palette variations
- Typography specimens
- Layout grid examples
- UI element samples`;

    // Mock implementation
    return {
      assets: [
        { type: 'background', url: '/generated/bg1.jpg', description: 'Subtle geometric pattern' },
        { type: 'pattern', url: '/generated/pattern1.svg', description: 'Brand accent pattern' },
        { type: 'typography', specimen: 'Aa Bb Cc', font: 'Inter, system-ui' }
      ],
      generatedAt: new Date().toISOString()
    };
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AIModelManager, ClaudeInterface, OpenAIInterface, ULMInterface };
} else if (typeof window !== 'undefined') {
  window.AIModelManager = AIModelManager;
  window.ClaudeInterface = ClaudeInterface;
  window.OpenAIInterface = OpenAIInterface;
  window.ULMInterface = ULMInterface;
}