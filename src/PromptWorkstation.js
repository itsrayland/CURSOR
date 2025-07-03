/**
 * PromptWorkstation - Main orchestrator for AI-driven design and spec workflows
 * Integrates Claude, OpenAI, ULM, and other AI models for comprehensive design automation
 */
class PromptWorkstation {
  constructor(config = {}) {
    this.config = {
      apiKeys: {
        claude: process.env.CLAUDE_API_KEY || config.claudeApiKey,
        openai: process.env.OPENAI_API_KEY || config.openaiApiKey,
        ulm: process.env.ULM_API_KEY || config.ulmApiKey
      },
      outputDirectory: config.outputDirectory || './output',
      templatesDirectory: config.templatesDirectory || './templates',
      assetsDirectory: config.assetsDirectory || './assets',
      ...config
    };

    this.promptTemplateManager = new PromptTemplateManager(this.config);
    this.aiModelManager = new AIModelManager(this.config);
    this.styleGuideGenerator = new StyleGuideGenerator(this.config);
    this.mediaWorkflowManager = new MediaWorkflowManager(this.config);
    this.specGenerator = new SpecGenerator(this.config);
    this.projectManager = new ProjectManager(this.config);
    
    this.currentProject = null;
    this.workflowHistory = [];
    
    this.init();
  }

  /**
   * Initialize the workstation
   */
  async init() {
    console.log('🚀 Initializing Prompt Engineering Workstation...');
    
    try {
      await this.promptTemplateManager.loadTemplates();
      await this.aiModelManager.validateConnections();
      await this.ensureDirectories();
      
      console.log('✅ Workstation initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize workstation:', error);
      throw error;
    }
  }

  /**
   * Create a new project
   */
  async createProject(projectConfig) {
    const project = await this.projectManager.createProject(projectConfig);
    this.currentProject = project;
    
    console.log(`📁 Created project: ${project.name}`);
    return project;
  }

  /**
   * Load an existing project
   */
  async loadProject(projectId) {
    const project = await this.projectManager.loadProject(projectId);
    this.currentProject = project;
    
    console.log(`📂 Loaded project: ${project.name}`);
    return project;
  }

  /**
   * Execute end-to-end workflow
   */
  async executeWorkflow(workflowType, input) {
    if (!this.currentProject) {
      throw new Error('No active project. Create or load a project first.');
    }

    const workflow = {
      id: this.generateId(),
      type: workflowType,
      projectId: this.currentProject.id,
      input,
      startTime: new Date(),
      steps: []
    };

    console.log(`🔄 Executing ${workflowType} workflow...`);

    try {
      switch (workflowType) {
        case 'full-design-spec':
          return await this.executeFullDesignSpecWorkflow(workflow);
        case 'style-guide-generation':
          return await this.executeStyleGuideWorkflow(workflow);
        case 'media-analysis':
          return await this.executeMediaAnalysisWorkflow(workflow);
        case 'prompt-template-creation':
          return await this.executePromptTemplateWorkflow(workflow);
        default:
          throw new Error(`Unknown workflow type: ${workflowType}`);
      }
    } catch (error) {
      workflow.error = error.message;
      workflow.endTime = new Date();
      this.workflowHistory.push(workflow);
      throw error;
    }
  }

  /**
   * Execute full design specification workflow
   */
  async executeFullDesignSpecWorkflow(workflow) {
    const { input } = workflow;
    
    // Step 1: Claude requirements gathering
    workflow.steps.push({ step: 'requirements-gathering', status: 'started' });
    const requirements = await this.aiModelManager.claude.gatherRequirements(
      input.projectDescription,
      input.clientInfo
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = requirements;

    // Step 2: OpenAI technical spec generation
    workflow.steps.push({ step: 'spec-generation', status: 'started' });
    const technicalSpec = await this.aiModelManager.openai.generateTechnicalSpec(
      requirements,
      input.constraints
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = technicalSpec;

    // Step 3: ULM media generation (if applicable)
    if (input.mediaAssets) {
      workflow.steps.push({ step: 'media-generation', status: 'started' });
      const mediaAnalysis = await this.aiModelManager.ulm.analyzeAndGenerate(
        input.mediaAssets,
        technicalSpec.colorPalette
      );
      workflow.steps[workflow.steps.length - 1].status = 'completed';
      workflow.steps[workflow.steps.length - 1].output = mediaAnalysis;
      technicalSpec.mediaAnalysis = mediaAnalysis;
    }

    // Step 4: Style guide generation
    workflow.steps.push({ step: 'style-guide-generation', status: 'started' });
    const styleGuide = await this.styleGuideGenerator.generate(
      technicalSpec,
      this.currentProject
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = styleGuide;

    // Step 5: Output generation
    workflow.steps.push({ step: 'output-generation', status: 'started' });
    const outputs = await this.specGenerator.generateAll(
      {
        requirements,
        technicalSpec,
        styleGuide
      },
      this.currentProject
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = outputs;

    workflow.endTime = new Date();
    workflow.result = outputs;
    this.workflowHistory.push(workflow);

    console.log('✅ Full design spec workflow completed');
    return workflow;
  }

  /**
   * Execute style guide workflow
   */
  async executeStyleGuideWorkflow(workflow) {
    const { input } = workflow;
    
    workflow.steps.push({ step: 'style-guide-generation', status: 'started' });
    const styleGuide = await this.styleGuideGenerator.generate(
      input.designSpec,
      this.currentProject
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = styleGuide;

    workflow.endTime = new Date();
    workflow.result = styleGuide;
    this.workflowHistory.push(workflow);

    return workflow;
  }

  /**
   * Execute media analysis workflow
   */
  async executeMediaAnalysisWorkflow(workflow) {
    const { input } = workflow;
    
    workflow.steps.push({ step: 'media-analysis', status: 'started' });
    const analysis = await this.mediaWorkflowManager.analyzeMedia(
      input.mediaFiles,
      input.analysisType
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = analysis;

    workflow.endTime = new Date();
    workflow.result = analysis;
    this.workflowHistory.push(workflow);

    return workflow;
  }

  /**
   * Execute prompt template creation workflow
   */
  async executePromptTemplateWorkflow(workflow) {
    const { input } = workflow;
    
    workflow.steps.push({ step: 'template-creation', status: 'started' });
    const template = await this.promptTemplateManager.createTemplate(
      input.templateType,
      input.templateConfig
    );
    workflow.steps[workflow.steps.length - 1].status = 'completed';
    workflow.steps[workflow.steps.length - 1].output = template;

    workflow.endTime = new Date();
    workflow.result = template;
    this.workflowHistory.push(workflow);

    return workflow;
  }

  /**
   * Get workflow history
   */
  getWorkflowHistory(projectId = null) {
    if (projectId) {
      return this.workflowHistory.filter(w => w.projectId === projectId);
    }
    return this.workflowHistory;
  }

  /**
   * Get available templates
   */
  getAvailableTemplates() {
    return this.promptTemplateManager.getAvailableTemplates();
  }

  /**
   * Get project metrics
   */
  getProjectMetrics(projectId = null) {
    const targetProjectId = projectId || this.currentProject?.id;
    if (!targetProjectId) return null;

    const workflows = this.getWorkflowHistory(targetProjectId);
    const totalWorkflows = workflows.length;
    const successfulWorkflows = workflows.filter(w => !w.error).length;
    const avgDuration = workflows.reduce((acc, w) => {
      if (w.endTime && w.startTime) {
        return acc + (new Date(w.endTime) - new Date(w.startTime));
      }
      return acc;
    }, 0) / workflows.length;

    return {
      totalWorkflows,
      successfulWorkflows,
      successRate: totalWorkflows > 0 ? (successfulWorkflows / totalWorkflows) * 100 : 0,
      avgDurationMs: avgDuration,
      avgDurationMinutes: avgDuration / (1000 * 60)
    };
  }

  /**
   * Validate and self-audit specs
   */
  async validateSpecs(specPath) {
    return await this.specGenerator.validate(specPath);
  }

  /**
   * Export project data
   */
  async exportProject(projectId = null) {
    const targetProjectId = projectId || this.currentProject?.id;
    return await this.projectManager.exportProject(targetProjectId);
  }

  /**
   * Ensure required directories exist
   */
  async ensureDirectories() {
    const fs = require('fs').promises;
    const dirs = [
      this.config.outputDirectory,
      this.config.templatesDirectory,
      this.config.assetsDirectory
    ];

    for (const dir of dirs) {
      try {
        await fs.access(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
      }
    }
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptWorkstation;
} else if (typeof window !== 'undefined') {
  window.PromptWorkstation = PromptWorkstation;
}