/**
 * ProjectManager - Handles project creation, loading, saving, and management
 * Manages project lifecycle and metadata
 */
class ProjectManager {
  constructor(config = {}) {
    this.config = config;
    this.projects = new Map();
    this.activeProject = null;
  }

  /**
   * Create a new project
   */
  async createProject(projectConfig) {
    const project = {
      id: this.generateProjectId(),
      name: projectConfig.name,
      description: projectConfig.description || '',
      clientInfo: projectConfig.clientInfo || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      settings: {
        outputDirectory: `./output/${projectConfig.name.replace(/\s+/g, '-').toLowerCase()}`,
        ...projectConfig.settings
      },
      assets: {
        logo: projectConfig.assets?.logo,
        images: projectConfig.assets?.images || [],
        documents: projectConfig.assets?.documents || []
      },
      workflows: [],
      specifications: {},
      styleGuide: null,
      version: '1.0.0'
    };

    this.projects.set(project.id, project);
    await this.saveProject(project);
    
    return project;
  }

  /**
   * Load existing project
   */
  async loadProject(projectId) {
    if (this.projects.has(projectId)) {
      return this.projects.get(projectId);
    }

    // In production, would load from file system or database
    try {
      const project = await this.loadProjectFromStorage(projectId);
      this.projects.set(projectId, project);
      return project;
    } catch (error) {
      throw new Error(`Failed to load project ${projectId}: ${error.message}`);
    }
  }

  /**
   * Save project to storage
   */
  async saveProject(project) {
    project.updatedAt = new Date().toISOString();
    
    // In production, would save to file system or database
    if (typeof require !== 'undefined') {
      const fs = require('fs').promises;
      const path = require('path');
      
      const projectsDir = path.join(this.config.outputDirectory || './output', 'projects');
      await this.ensureDirectory(projectsDir);
      
      const filePath = path.join(projectsDir, `${project.id}.json`);
      await fs.writeFile(filePath, JSON.stringify(project, null, 2));
    }
    
    console.log(`💾 Saved project: ${project.name}`);
    return project;
  }

  /**
   * Update project
   */
  async updateProject(projectId, updates) {
    const project = await this.loadProject(projectId);
    
    Object.assign(project, updates, {
      updatedAt: new Date().toISOString()
    });

    await this.saveProject(project);
    return project;
  }

  /**
   * Delete project
   */
  async deleteProject(projectId) {
    const project = await this.loadProject(projectId);
    
    // Mark as deleted instead of hard delete
    project.status = 'deleted';
    project.deletedAt = new Date().toISOString();
    
    await this.saveProject(project);
    console.log(`🗑️ Deleted project: ${project.name}`);
    
    return project;
  }

  /**
   * List all projects
   */
  async listProjects(filter = {}) {
    const allProjects = Array.from(this.projects.values());
    
    let filteredProjects = allProjects.filter(p => p.status !== 'deleted');
    
    if (filter.status) {
      filteredProjects = filteredProjects.filter(p => p.status === filter.status);
    }
    
    if (filter.clientName) {
      filteredProjects = filteredProjects.filter(p => 
        p.clientInfo?.name?.toLowerCase().includes(filter.clientName.toLowerCase())
      );
    }
    
    return filteredProjects.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      clientName: p.clientInfo?.name,
      workflowCount: p.workflows?.length || 0
    }));
  }

  /**
   * Export project data
   */
  async exportProject(projectId) {
    const project = await this.loadProject(projectId);
    
    const exportData = {
      project: project,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      metadata: {
        totalAssets: project.assets?.images?.length || 0,
        totalWorkflows: project.workflows?.length || 0,
        hasStyleGuide: !!project.styleGuide,
        hasSpecifications: Object.keys(project.specifications || {}).length > 0
      }
    };

    const fileName = `${project.name.replace(/\s+/g, '-').toLowerCase()}-export-${new Date().toISOString().split('T')[0]}.json`;
    
    if (typeof require !== 'undefined') {
      const fs = require('fs').promises;
      const path = require('path');
      
      const exportPath = path.join(project.settings.outputDirectory, fileName);
      await fs.writeFile(exportPath, JSON.stringify(exportData, null, 2));
      
      console.log(`📦 Exported project to: ${exportPath}`);
    }

    return {
      data: exportData,
      fileName: fileName,
      size: JSON.stringify(exportData).length
    };
  }

  /**
   * Import project data
   */
  async importProject(importData) {
    if (!importData.project) {
      throw new Error('Invalid import data: missing project information');
    }

    const existingProject = this.projects.get(importData.project.id);
    if (existingProject) {
      throw new Error(`Project with ID ${importData.project.id} already exists`);
    }

    const project = {
      ...importData.project,
      importedAt: new Date().toISOString(),
      status: 'imported'
    };

    this.projects.set(project.id, project);
    await this.saveProject(project);
    
    console.log(`📥 Imported project: ${project.name}`);
    return project;
  }

  /**
   * Add workflow to project
   */
  async addWorkflow(projectId, workflow) {
    const project = await this.loadProject(projectId);
    
    if (!project.workflows) {
      project.workflows = [];
    }
    
    project.workflows.push({
      ...workflow,
      addedAt: new Date().toISOString()
    });
    
    await this.saveProject(project);
    return project;
  }

  /**
   * Update project specifications
   */
  async updateSpecifications(projectId, specifications) {
    const project = await this.loadProject(projectId);
    
    project.specifications = {
      ...project.specifications,
      ...specifications,
      updatedAt: new Date().toISOString()
    };
    
    await this.saveProject(project);
    return project;
  }

  /**
   * Update project style guide
   */
  async updateStyleGuide(projectId, styleGuide) {
    const project = await this.loadProject(projectId);
    
    project.styleGuide = {
      ...styleGuide,
      updatedAt: new Date().toISOString()
    };
    
    await this.saveProject(project);
    return project;
  }

  /**
   * Add assets to project
   */
  async addAssets(projectId, assets) {
    const project = await this.loadProject(projectId);
    
    if (assets.images) {
      project.assets.images.push(...assets.images);
    }
    
    if (assets.documents) {
      project.assets.documents.push(...assets.documents);
    }
    
    if (assets.logo) {
      project.assets.logo = assets.logo;
    }
    
    await this.saveProject(project);
    return project;
  }

  /**
   * Get project statistics
   */
  async getProjectStats(projectId) {
    const project = await this.loadProject(projectId);
    
    return {
      projectId: project.id,
      projectName: project.name,
      created: project.createdAt,
      lastUpdated: project.updatedAt,
      status: project.status,
      assets: {
        images: project.assets?.images?.length || 0,
        documents: project.assets?.documents?.length || 0,
        hasLogo: !!project.assets?.logo
      },
      workflows: {
        total: project.workflows?.length || 0,
        completed: project.workflows?.filter(w => w.status === 'completed').length || 0,
        failed: project.workflows?.filter(w => w.error).length || 0
      },
      specifications: {
        hasSpecs: Object.keys(project.specifications || {}).length > 0,
        hasStyleGuide: !!project.styleGuide,
        specCount: Object.keys(project.specifications || {}).length
      }
    };
  }

  /**
   * Clone project
   */
  async cloneProject(projectId, newName) {
    const originalProject = await this.loadProject(projectId);
    
    const clonedProject = {
      ...originalProject,
      id: this.generateProjectId(),
      name: newName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      clonedFrom: projectId,
      workflows: [], // Don't clone workflows
      status: 'active'
    };

    this.projects.set(clonedProject.id, clonedProject);
    await this.saveProject(clonedProject);
    
    console.log(`📋 Cloned project: ${originalProject.name} → ${newName}`);
    return clonedProject;
  }

  /**
   * Archive project
   */
  async archiveProject(projectId) {
    const project = await this.loadProject(projectId);
    
    project.status = 'archived';
    project.archivedAt = new Date().toISOString();
    
    await this.saveProject(project);
    console.log(`📦 Archived project: ${project.name}`);
    
    return project;
  }

  /**
   * Generate unique project ID
   */
  generateProjectId() {
    return `proj_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Load project from storage (mock implementation)
   */
  async loadProjectFromStorage(projectId) {
    if (typeof require !== 'undefined') {
      const fs = require('fs').promises;
      const path = require('path');
      
      const projectsDir = path.join(this.config.outputDirectory || './output', 'projects');
      const filePath = path.join(projectsDir, `${projectId}.json`);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);
      } catch (error) {
        throw new Error(`Project file not found: ${projectId}`);
      }
    }
    
    // Mock project for browser environment
    throw new Error(`Project not found: ${projectId}`);
  }

  /**
   * Ensure directory exists
   */
  async ensureDirectory(dirPath) {
    if (typeof require !== 'undefined') {
      const fs = require('fs').promises;
      
      try {
        await fs.access(dirPath);
      } catch {
        await fs.mkdir(dirPath, { recursive: true });
      }
    }
  }

  /**
   * Search projects
   */
  async searchProjects(query) {
    const allProjects = Array.from(this.projects.values());
    const searchTerm = query.toLowerCase();
    
    return allProjects.filter(project => 
      project.status !== 'deleted' && (
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.clientInfo?.name?.toLowerCase().includes(searchTerm)
      )
    );
  }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectManager;
} else if (typeof window !== 'undefined') {
  window.ProjectManager = ProjectManager;
}