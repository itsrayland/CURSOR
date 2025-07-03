/**
 * PromptWorkstationUI - Modern web interface for the Prompt Engineering Workstation
 * Provides interactive dashboard, project management, and workflow execution
 */
class PromptWorkstationUI {
  constructor(containerId = 'workstation-container') {
    this.container = document.getElementById(containerId);
    this.workstation = null;
    this.currentProject = null;
    this.activeView = 'dashboard';
    
    this.init();
  }

  /**
   * Initialize the UI
   */
  async init() {
    if (!this.container) {
      console.error('Container element not found');
      return;
    }

    this.render();
    this.attachEventListeners();
    
    // Initialize workstation
    try {
      this.workstation = new PromptWorkstation({
        outputDirectory: './output',
        templatesDirectory: './templates'
      });
      await this.workstation.init();
      this.updateConnectionStatus('connected');
    } catch (error) {
      this.updateConnectionStatus('error', error.message);
    }
  }

  /**
   * Main render method
   */
  render() {
    this.container.innerHTML = `
      <div class="workstation-ui">
        ${this.renderHeader()}
        <div class="workstation-main">
          ${this.renderSidebar()}
          <div class="workstation-content">
            ${this.renderContent()}
          </div>
        </div>
        ${this.renderModals()}
      </div>
    `;
  }

  /**
   * Render header with navigation and status
   */
  renderHeader() {
    return `
      <header class="workstation-header">
        <div class="header-brand">
          <h1>🤖 Prompt Engineering Workstation</h1>
          <span class="version">v1.0.0</span>
        </div>
        <nav class="header-nav">
          <button class="nav-btn ${this.activeView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
            📊 Dashboard
          </button>
          <button class="nav-btn ${this.activeView === 'projects' ? 'active' : ''}" data-view="projects">
            📁 Projects
          </button>
          <button class="nav-btn ${this.activeView === 'templates' ? 'active' : ''}" data-view="templates">
            📝 Templates
          </button>
          <button class="nav-btn ${this.activeView === 'workflows' ? 'active' : ''}" data-view="workflows">
            🔄 Workflows
          </button>
        </nav>
        <div class="header-status">
          <div class="connection-status" id="connection-status">
            <span class="status-indicator"></span>
            <span class="status-text">Connecting...</span>
          </div>
        </div>
      </header>
    `;
  }

  /**
   * Render sidebar with tools and quick actions
   */
  renderSidebar() {
    return `
      <aside class="workstation-sidebar">
        <div class="sidebar-section">
          <h3>Quick Actions</h3>
          <button class="action-btn primary" onclick="workstationUI.showCreateProjectModal()">
            ➕ New Project
          </button>
          <button class="action-btn secondary" onclick="workstationUI.showImportModal()">
            📥 Import Project
          </button>
        </div>
        
        <div class="sidebar-section">
          <h3>AI Models</h3>
          <div class="model-status">
            <div class="model-item">
              <span class="model-name">Claude</span>
              <span class="model-status-indicator" id="claude-status">🔴</span>
            </div>
            <div class="model-item">
              <span class="model-name">OpenAI</span>
              <span class="model-status-indicator" id="openai-status">🔴</span>
            </div>
            <div class="model-item">
              <span class="model-name">ULM</span>
              <span class="model-status-indicator" id="ulm-status">🔴</span>
            </div>
          </div>
        </div>

        ${this.currentProject ? this.renderProjectSidebar() : ''}
      </aside>
    `;
  }

  /**
   * Render project-specific sidebar
   */
  renderProjectSidebar() {
    return `
      <div class="sidebar-section">
        <h3>Current Project</h3>
        <div class="current-project">
          <h4>${this.currentProject.name}</h4>
          <p class="project-description">${this.currentProject.description || 'No description'}</p>
          <div class="project-actions">
            <button class="action-btn small" onclick="workstationUI.executeWorkflow('full-design-spec')">
              🚀 Full Spec
            </button>
            <button class="action-btn small" onclick="workstationUI.executeWorkflow('style-guide-generation')">
              🎨 Style Guide
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render main content area
   */
  renderContent() {
    switch (this.activeView) {
      case 'dashboard':
        return this.renderDashboard();
      case 'projects':
        return this.renderProjects();
      case 'templates':
        return this.renderTemplates();
      case 'workflows':
        return this.renderWorkflows();
      default:
        return this.renderDashboard();
    }
  }

  /**
   * Render dashboard view
   */
  renderDashboard() {
    return `
      <div class="dashboard">
        <div class="dashboard-header">
          <h2>Dashboard</h2>
          <p>Overview of your prompt engineering projects and workflows</p>
        </div>
        
        <div class="dashboard-stats">
          <div class="stat-card">
            <div class="stat-number" id="total-projects">0</div>
            <div class="stat-label">Projects</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="total-workflows">0</div>
            <div class="stat-label">Workflows</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="success-rate">0%</div>
            <div class="stat-label">Success Rate</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="avg-duration">0m</div>
            <div class="stat-label">Avg Duration</div>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="dashboard-card">
            <h3>Recent Projects</h3>
            <div id="recent-projects" class="project-list">
              <p class="empty-state">No projects yet. Create your first project to get started!</p>
            </div>
          </div>
          
          <div class="dashboard-card">
            <h3>Recent Workflows</h3>
            <div id="recent-workflows" class="workflow-list">
              <p class="empty-state">No workflows executed yet.</p>
            </div>
          </div>
        </div>

        <div class="getting-started">
          <h3>🚀 Getting Started</h3>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Create a Project</h4>
                <p>Start by creating a new project with your client information and requirements.</p>
                <button class="step-action" onclick="workstationUI.showCreateProjectModal()">Create Project</button>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Upload Assets</h4>
                <p>Upload images, logos, and design references for AI analysis.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Execute Workflow</h4>
                <p>Run end-to-end workflows to generate specs, style guides, and code.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render projects view
   */
  renderProjects() {
    return `
      <div class="projects-view">
        <div class="view-header">
          <h2>Projects</h2>
          <div class="view-actions">
            <button class="btn primary" onclick="workstationUI.showCreateProjectModal()">
              ➕ New Project
            </button>
            <button class="btn secondary" onclick="workstationUI.showImportModal()">
              📥 Import
            </button>
          </div>
        </div>

        <div class="projects-filter">
          <input type="text" placeholder="Search projects..." id="project-search" />
          <select id="project-filter">
            <option value="">All Projects</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div class="projects-grid" id="projects-grid">
          <p class="empty-state">No projects found. Create your first project!</p>
        </div>
      </div>
    `;
  }

  /**
   * Render templates view
   */
  renderTemplates() {
    return `
      <div class="templates-view">
        <div class="view-header">
          <h2>Prompt Templates</h2>
          <p>Manage and create reusable prompt templates for different AI models</p>
        </div>

        <div class="templates-tabs">
          <button class="tab-btn active" data-model="all">All Templates</button>
          <button class="tab-btn" data-model="claude">Claude</button>
          <button class="tab-btn" data-model="openai">OpenAI</button>
          <button class="tab-btn" data-model="ulm">ULM</button>
        </div>

        <div class="templates-grid" id="templates-grid">
          <p class="loading">Loading templates...</p>
        </div>
      </div>
    `;
  }

  /**
   * Render workflows view
   */
  renderWorkflows() {
    return `
      <div class="workflows-view">
        <div class="view-header">
          <h2>Workflows</h2>
          <p>Monitor and manage AI-driven design workflows</p>
        </div>

        <div class="workflow-types">
          <div class="workflow-card" onclick="workstationUI.executeWorkflow('full-design-spec')">
            <div class="workflow-icon">🎯</div>
            <h3>Full Design Specification</h3>
            <p>Complete end-to-end workflow from requirements to final specs</p>
            <button class="workflow-start">Start Workflow</button>
          </div>
          
          <div class="workflow-card" onclick="workstationUI.executeWorkflow('style-guide-generation')">
            <div class="workflow-icon">🎨</div>
            <h3>Style Guide Generation</h3>
            <p>Generate comprehensive design system and style guide</p>
            <button class="workflow-start">Start Workflow</button>
          </div>
          
          <div class="workflow-card" onclick="workstationUI.executeWorkflow('media-analysis')">
            <div class="workflow-icon">🖼️</div>
            <h3>Media Analysis</h3>
            <p>Analyze images and extract design elements and colors</p>
            <button class="workflow-start">Start Workflow</button>
          </div>
        </div>

        <div class="workflow-history">
          <h3>Recent Workflows</h3>
          <div id="workflow-history-list" class="workflow-list">
            <p class="empty-state">No workflows executed yet.</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render modals
   */
  renderModals() {
    return `
      <!-- Create Project Modal -->
      <div class="modal" id="create-project-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Create New Project</h3>
            <button class="modal-close" onclick="workstationUI.hideModal('create-project-modal')">&times;</button>
          </div>
          <form id="create-project-form" class="modal-body">
            <div class="form-group">
              <label for="project-name">Project Name *</label>
              <input type="text" id="project-name" required placeholder="e.g., Darzabi Email Dashboard" />
            </div>
            <div class="form-group">
              <label for="project-description">Description</label>
              <textarea id="project-description" placeholder="Brief description of the project"></textarea>
            </div>
            <div class="form-group">
              <label for="client-name">Client Name</label>
              <input type="text" id="client-name" placeholder="e.g., Darzabi Inc." />
            </div>
            <div class="form-group">
              <label for="target-audience">Target Audience</label>
              <input type="text" id="target-audience" placeholder="e.g., Small business owners" />
            </div>
            <div class="form-group">
              <label for="project-type">Project Type</label>
              <select id="project-type">
                <option value="web-app">Web Application</option>
                <option value="mobile-app">Mobile Application</option>
                <option value="dashboard">Dashboard</option>
                <option value="website">Website</option>
                <option value="design-system">Design System</option>
              </select>
            </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn secondary" onclick="workstationUI.hideModal('create-project-modal')">
              Cancel
            </button>
            <button type="submit" form="create-project-form" class="btn primary">
              Create Project
            </button>
          </div>
        </div>
      </div>

      <!-- Workflow Progress Modal -->
      <div class="modal" id="workflow-progress-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Workflow Progress</h3>
          </div>
          <div class="modal-body">
            <div class="workflow-progress">
              <div class="progress-steps" id="progress-steps"></div>
              <div class="progress-log" id="progress-log"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn secondary" onclick="workstationUI.hideModal('workflow-progress-modal')">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchView(e.target.dataset.view);
      });
    });

    // Create project form
    const createForm = document.getElementById('create-project-form');
    if (createForm) {
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.createProject();
      });
    }

    // Search and filters
    const projectSearch = document.getElementById('project-search');
    if (projectSearch) {
      projectSearch.addEventListener('input', (e) => {
        this.filterProjects(e.target.value);
      });
    }
  }

  /**
   * Switch active view
   */
  switchView(view) {
    this.activeView = view;
    this.render();
    this.loadViewData(view);
  }

  /**
   * Load data for specific view
   */
  async loadViewData(view) {
    switch (view) {
      case 'dashboard':
        await this.loadDashboardData();
        break;
      case 'projects':
        await this.loadProjectsData();
        break;
      case 'templates':
        await this.loadTemplatesData();
        break;
      case 'workflows':
        await this.loadWorkflowsData();
        break;
    }
  }

  /**
   * Load dashboard data
   */
  async loadDashboardData() {
    if (!this.workstation) return;
    
    // Mock data for demo
    document.getElementById('total-projects').textContent = '0';
    document.getElementById('total-workflows').textContent = '0';
    document.getElementById('success-rate').textContent = '0%';
    document.getElementById('avg-duration').textContent = '0m';
  }

  /**
   * Show create project modal
   */
  showCreateProjectModal() {
    this.showModal('create-project-modal');
  }

  /**
   * Create new project
   */
  async createProject() {
    const formData = new FormData(document.getElementById('create-project-form'));
    
    const projectConfig = {
      name: formData.get('project-name') || document.getElementById('project-name').value,
      description: document.getElementById('project-description').value,
      clientInfo: {
        name: document.getElementById('client-name').value,
        targetAudience: document.getElementById('target-audience').value
      },
      type: document.getElementById('project-type').value
    };

    try {
      if (this.workstation) {
        const project = await this.workstation.createProject(projectConfig);
        this.currentProject = project;
        this.hideModal('create-project-modal');
        this.showNotification('Project created successfully!', 'success');
        this.render(); // Re-render to show project in sidebar
      } else {
        throw new Error('Workstation not initialized');
      }
    } catch (error) {
      this.showNotification(`Failed to create project: ${error.message}`, 'error');
    }
  }

  /**
   * Execute workflow
   */
  async executeWorkflow(workflowType) {
    if (!this.currentProject) {
      this.showNotification('Please create or select a project first', 'warning');
      return;
    }

    this.showModal('workflow-progress-modal');
    this.updateWorkflowProgress('Starting workflow...', 0);

    try {
      const input = {
        projectDescription: this.currentProject.description,
        clientInfo: this.currentProject.clientInfo,
        constraints: {}
      };

      const workflow = await this.workstation.executeWorkflow(workflowType, input);
      this.updateWorkflowProgress('Workflow completed successfully!', 100);
      this.showNotification('Workflow completed successfully!', 'success');
    } catch (error) {
      this.updateWorkflowProgress(`Workflow failed: ${error.message}`, 0);
      this.showNotification(`Workflow failed: ${error.message}`, 'error');
    }
  }

  /**
   * Update workflow progress
   */
  updateWorkflowProgress(message, progress) {
    const progressLog = document.getElementById('progress-log');
    if (progressLog) {
      const timestamp = new Date().toLocaleTimeString();
      progressLog.innerHTML += `<div class="log-entry">[${timestamp}] ${message}</div>`;
      progressLog.scrollTop = progressLog.scrollHeight;
    }
  }

  /**
   * Update connection status
   */
  updateConnectionStatus(status, message = '') {
    const statusElement = document.getElementById('connection-status');
    if (!statusElement) return;

    const indicator = statusElement.querySelector('.status-indicator');
    const text = statusElement.querySelector('.status-text');

    switch (status) {
      case 'connected':
        indicator.style.backgroundColor = '#28a745';
        text.textContent = 'Connected';
        break;
      case 'error':
        indicator.style.backgroundColor = '#dc3545';
        text.textContent = `Error: ${message}`;
        break;
      case 'connecting':
        indicator.style.backgroundColor = '#ffc107';
        text.textContent = 'Connecting...';
        break;
    }
  }

  /**
   * Show modal
   */
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  /**
   * Hide modal
   */
  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }

  /**
   * Show import modal
   */
  showImportModal() {
    this.showNotification('Import functionality coming soon!', 'info');
  }

  /**
   * Load projects data
   */
  async loadProjectsData() {
    // Implementation would load actual project data
    console.log('Loading projects data...');
  }

  /**
   * Load templates data
   */
  async loadTemplatesData() {
    if (!this.workstation) return;
    
    const templates = this.workstation.getAvailableTemplates();
    const grid = document.getElementById('templates-grid');
    
    if (templates.length === 0) {
      grid.innerHTML = '<p class="empty-state">No templates available.</p>';
      return;
    }

    grid.innerHTML = templates.map(template => `
      <div class="template-card">
        <h4>${template.name}</h4>
        <p class="template-model">${template.model}</p>
        <p class="template-description">${template.description}</p>
        <div class="template-meta">
          <span class="param-count">${template.parametersCount} parameters</span>
          ${template.hasExamples ? '<span class="has-examples">📝 Examples</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * Load workflows data
   */
  async loadWorkflowsData() {
    // Implementation would load workflow history
    console.log('Loading workflows data...');
  }

  /**
   * Filter projects
   */
  filterProjects(searchTerm) {
    // Implementation would filter displayed projects
    console.log('Filtering projects:', searchTerm);
  }
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.workstationUI = new PromptWorkstationUI();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptWorkstationUI;
}