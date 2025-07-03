/**
 * Prompt Engineering Workstation Server
 * Express.js server with API endpoints for the workstation
 */

const express = require('express');
const path = require('path');
const multer = require('multer');
const PromptWorkstation = require('./src/PromptWorkstation');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Global workstation instance
let workstation = null;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Initialize workstation
async function initWorkstation() {
  if (!workstation) {
    console.log('🚀 Initializing Prompt Engineering Workstation...');
    
    workstation = new PromptWorkstation({
      outputDirectory: './output',
      templatesDirectory: './templates',
      assetsDirectory: './assets',
      claudeApiKey: process.env.CLAUDE_API_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
      ulmApiKey: process.env.ULM_API_KEY
    });
    
    try {
      await workstation.init();
      console.log('✅ Workstation initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize workstation:', error);
      throw error;
    }
  }
  return workstation;
}

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    workstationReady: !!workstation
  });
});

// Initialize endpoint
app.post('/api/init', asyncHandler(async (req, res) => {
  try {
    const ws = await initWorkstation();
    res.json({
      success: true,
      message: 'Workstation initialized successfully',
      availableTemplates: ws.getAvailableTemplates().length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}));

// Project endpoints
app.get('/api/projects', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const filter = {
    status: req.query.status,
    clientName: req.query.client
  };
  
  const projects = await ws.projectManager.listProjects(filter);
  res.json({ success: true, projects });
}));

app.post('/api/projects', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const projectConfig = req.body;
  
  const project = await ws.createProject(projectConfig);
  res.json({ success: true, project });
}));

app.get('/api/projects/:id', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const project = await ws.loadProject(req.params.id);
  res.json({ success: true, project });
}));

app.put('/api/projects/:id', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const updates = req.body;
  
  const project = await ws.projectManager.updateProject(req.params.id, updates);
  res.json({ success: true, project });
}));

app.delete('/api/projects/:id', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const project = await ws.projectManager.deleteProject(req.params.id);
  res.json({ success: true, message: 'Project deleted successfully' });
}));

// Workflow endpoints
app.post('/api/projects/:id/workflows', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const { workflowType, input } = req.body;
  
  await ws.loadProject(req.params.id);
  
  const workflow = await ws.executeWorkflow(workflowType, input);
  res.json({ success: true, workflow });
}));

app.get('/api/projects/:id/workflows', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const workflows = ws.getWorkflowHistory(req.params.id);
  res.json({ success: true, workflows });
}));

app.get('/api/workflows/history', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const workflows = ws.getWorkflowHistory();
  res.json({ success: true, workflows });
}));

// Template endpoints
app.get('/api/templates', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const templates = ws.getAvailableTemplates();
  
  let filteredTemplates = templates;
  if (req.query.model) {
    filteredTemplates = templates.filter(t => t.model === req.query.model);
  }
  if (req.query.category) {
    filteredTemplates = filteredTemplates.filter(t => t.category === req.query.category);
  }
  
  res.json({ success: true, templates: filteredTemplates });
}));

app.post('/api/templates', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const templateConfig = req.body;
  
  const template = await ws.promptTemplateManager.createTemplate('custom', templateConfig);
  res.json({ success: true, template });
}));

// Specification endpoints
app.post('/api/projects/:id/specs/generate', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const { format = 'markdown' } = req.body;
  
  const project = await ws.loadProject(req.params.id);
  
  // Mock data for generation
  const data = {
    requirements: { businessObjectives: [], userPersonas: [] },
    technicalSpec: { architecture: {}, components: [] },
    styleGuide: { colorSystem: {}, typography: {} }
  };
  
  const spec = await ws.specGenerator.generate(data, project, format);
  res.json({ success: true, spec });
}));

app.post('/api/projects/:id/specs/validate', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const results = await ws.validateSpecs(req.params.id);
  res.json({ success: true, validation: results });
}));

// Media upload and analysis endpoints
app.post('/api/projects/:id/media/upload', upload.array('files'), asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const files = req.files;
  
  if (!files || files.length === 0) {
    return res.status(400).json({ success: false, error: 'No files uploaded' });
  }
  
  // Convert buffer files to file-like objects
  const processedFiles = files.map(file => ({
    name: file.originalname,
    size: file.size,
    type: file.mimetype,
    buffer: file.buffer
  }));
  
  const results = await ws.mediaWorkflowManager.processUploadedFiles(processedFiles, req.params.id);
  res.json({ success: true, results });
}));

app.post('/api/projects/:id/media/analyze', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const { files, analysisType = 'comprehensive' } = req.body;
  
  const analysis = await ws.mediaWorkflowManager.analyzeMedia(files, analysisType);
  res.json({ success: true, analysis });
}));

// Export endpoints
app.get('/api/projects/:id/export', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const exportData = await ws.exportProject(req.params.id);
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="${exportData.fileName}"`);
  res.json(exportData.data);
}));

// Metrics endpoints
app.get('/api/projects/:id/metrics', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  const metrics = ws.getProjectMetrics(req.params.id);
  res.json({ success: true, metrics });
}));

app.get('/api/metrics/overview', asyncHandler(async (req, res) => {
  const ws = await initWorkstation();
  
  // Calculate overall metrics
  const projects = await ws.projectManager.listProjects();
  const workflows = ws.getWorkflowHistory();
  
  const overview = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalWorkflows: workflows.length,
    successfulWorkflows: workflows.filter(w => !w.error).length,
    avgProjectDuration: 0, // Would calculate from actual data
    topWorkflowTypes: [] // Would calculate from actual data
  };
  
  res.json({ success: true, overview });
}));

// Static file serving
app.use(express.static('.'));

// Serve main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  
  res.status(500).json({
    success: false,
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
async function startServer() {
  try {
    // Initialize workstation on startup
    await initWorkstation();
    
    app.listen(PORT, HOST, () => {
      console.log(`🌐 Prompt Engineering Workstation Server`);
      console.log(`   URL: http://${HOST}:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`   API Base: http://${HOST}:${PORT}/api`);
      console.log(`   Ready to serve! 🚀`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Start the server
if (require.main === module) {
  startServer();
}

module.exports = app;