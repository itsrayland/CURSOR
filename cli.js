#!/usr/bin/env node

/**
 * Prompt Engineering Workstation CLI
 * Command-line interface for managing projects and executing workflows
 */

const { program } = require('commander');
const PromptWorkstation = require('./src/PromptWorkstation');
const path = require('path');
const fs = require('fs').promises;

// Initialize CLI
program
  .name('prompt-workstation')
  .description('Prompt Engineering Workstation - AI-driven design and spec automation')
  .version('1.0.0');

// Global workstation instance
let workstation = null;

/**
 * Initialize workstation
 */
async function initWorkstation(options = {}) {
  if (!workstation) {
    workstation = new PromptWorkstation({
      outputDirectory: options.output || './output',
      templatesDirectory: options.templates || './templates',
      assetsDirectory: options.assets || './assets',
      claudeApiKey: process.env.CLAUDE_API_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
      ulmApiKey: process.env.ULM_API_KEY
    });
    
    await workstation.init();
  }
  return workstation;
}

// Project Commands
program
  .command('create-project')
  .description('Create a new project')
  .requiredOption('-n, --name <name>', 'Project name')
  .option('-d, --description <description>', 'Project description')
  .option('-c, --client <client>', 'Client name')
  .option('-a, --audience <audience>', 'Target audience')
  .option('-t, --type <type>', 'Project type', 'web-app')
  .action(async (options) => {
    try {
      console.log('🚀 Creating new project...');
      
      const ws = await initWorkstation();
      const project = await ws.createProject({
        name: options.name,
        description: options.description,
        clientInfo: {
          name: options.client,
          targetAudience: options.audience
        },
        type: options.type
      });
      
      console.log(`✅ Project created successfully!`);
      console.log(`   ID: ${project.id}`);
      console.log(`   Name: ${project.name}`);
      console.log(`   Output: ${project.settings.outputDirectory}`);
      
    } catch (error) {
      console.error('❌ Failed to create project:', error.message);
      process.exit(1);
    }
  });

program
  .command('list-projects')
  .description('List all projects')
  .option('-s, --status <status>', 'Filter by status')
  .action(async (options) => {
    try {
      const ws = await initWorkstation();
      const projects = await ws.projectManager.listProjects(options);
      
      if (projects.length === 0) {
        console.log('📁 No projects found.');
        return;
      }
      
      console.log(`📁 Found ${projects.length} projects:\n`);
      projects.forEach(project => {
        console.log(`   ${project.id} - ${project.name}`);
        console.log(`   Status: ${project.status} | Workflows: ${project.workflowCount}`);
        console.log(`   Created: ${new Date(project.createdAt).toLocaleDateString()}\n`);
      });
      
    } catch (error) {
      console.error('❌ Failed to list projects:', error.message);
    }
  });

// Workflow Commands
program
  .command('run-workflow')
  .description('Execute a workflow for a project')
  .requiredOption('-p, --project <projectId>', 'Project ID')
  .requiredOption('-w, --workflow <type>', 'Workflow type (full-design-spec, style-guide-generation, media-analysis)')
  .option('-i, --input <file>', 'Input configuration file (JSON)')
  .action(async (options) => {
    try {
      console.log(`🔄 Starting ${options.workflow} workflow...`);
      
      const ws = await initWorkstation();
      await ws.loadProject(options.project);
      
      let input = {
        projectDescription: 'CLI workflow execution',
        clientInfo: {},
        constraints: {}
      };
      
      // Load input from file if provided
      if (options.input) {
        const inputData = await fs.readFile(options.input, 'utf8');
        input = { ...input, ...JSON.parse(inputData) };
      }
      
      const workflow = await ws.executeWorkflow(options.workflow, input);
      
      console.log('✅ Workflow completed successfully!');
      console.log(`   Duration: ${workflow.endTime ? new Date(workflow.endTime) - new Date(workflow.startTime) : 'N/A'}ms`);
      console.log(`   Steps: ${workflow.steps.length}`);
      
    } catch (error) {
      console.error('❌ Workflow failed:', error.message);
      process.exit(1);
    }
  });

// Template Commands
program
  .command('list-templates')
  .description('List available prompt templates')
  .option('-m, --model <model>', 'Filter by AI model')
  .action(async (options) => {
    try {
      const ws = await initWorkstation();
      const templates = ws.getAvailableTemplates();
      
      let filteredTemplates = templates;
      if (options.model) {
        filteredTemplates = templates.filter(t => t.model === options.model);
      }
      
      if (filteredTemplates.length === 0) {
        console.log('📝 No templates found.');
        return;
      }
      
      console.log(`📝 Found ${filteredTemplates.length} templates:\n`);
      filteredTemplates.forEach(template => {
        console.log(`   ${template.id} - ${template.name}`);
        console.log(`   Model: ${template.model} | Category: ${template.category}`);
        console.log(`   Parameters: ${template.parametersCount} | Examples: ${template.hasExamples ? 'Yes' : 'No'}\n`);
      });
      
    } catch (error) {
      console.error('❌ Failed to list templates:', error.message);
    }
  });

// Generate Commands
program
  .command('generate-spec')
  .description('Generate technical specification for a project')
  .requiredOption('-p, --project <projectId>', 'Project ID')
  .option('-f, --format <format>', 'Output format (markdown, json, html)', 'markdown')
  .option('-o, --output <file>', 'Output file path')
  .action(async (options) => {
    try {
      console.log('📄 Generating specification...');
      
      const ws = await initWorkstation();
      const project = await ws.loadProject(options.project);
      
      // Mock data for generation
      const data = {
        requirements: { businessObjectives: [], userPersonas: [] },
        technicalSpec: { architecture: {}, components: [] },
        styleGuide: { colorSystem: {}, typography: {} }
      };
      
      const output = await ws.specGenerator.generate(data, project, options.format);
      
      if (options.output) {
        await fs.writeFile(options.output, output.content);
        console.log(`✅ Specification saved to: ${options.output}`);
      } else {
        console.log(output.content);
      }
      
    } catch (error) {
      console.error('❌ Failed to generate specification:', error.message);
      process.exit(1);
    }
  });

// Validation Commands
program
  .command('validate')
  .description('Validate project specifications')
  .requiredOption('-p, --project <projectId>', 'Project ID')
  .action(async (options) => {
    try {
      console.log('🔍 Validating project specifications...');
      
      const ws = await initWorkstation();
      const results = await ws.validateSpecs(options.project);
      
      console.log(`\nValidation Results:`);
      console.log(`   Valid: ${results.isValid ? '✅' : '❌'}`);
      console.log(`   Score: ${results.score}/100`);
      console.log(`   Errors: ${results.errors.length}`);
      console.log(`   Warnings: ${results.warnings.length}\n`);
      
      if (results.errors.length > 0) {
        console.log('Errors:');
        results.errors.forEach(error => console.log(`   ❌ ${error}`));
      }
      
      if (results.warnings.length > 0) {
        console.log('Warnings:');
        results.warnings.forEach(warning => console.log(`   ⚠️ ${warning}`));
      }
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  });

// Export Commands  
program
  .command('export')
  .description('Export project data')
  .requiredOption('-p, --project <projectId>', 'Project ID')
  .option('-o, --output <file>', 'Output file path')
  .action(async (options) => {
    try {
      console.log('📦 Exporting project...');
      
      const ws = await initWorkstation();
      const exportData = await ws.exportProject(options.project);
      
      const outputPath = options.output || exportData.fileName;
      await fs.writeFile(outputPath, JSON.stringify(exportData.data, null, 2));
      
      console.log(`✅ Project exported to: ${outputPath}`);
      console.log(`   Size: ${exportData.size} bytes`);
      
    } catch (error) {
      console.error('❌ Export failed:', error.message);
      process.exit(1);
    }
  });

// Server Commands
program
  .command('serve')
  .description('Start the web interface server')
  .option('-p, --port <port>', 'Server port', '3000')
  .option('--host <host>', 'Server host', 'localhost')
  .action(async (options) => {
    try {
      console.log(`🌐 Starting server on http://${options.host}:${options.port}`);
      
      const express = require('express');
      const app = express();
      
      // Serve static files
      app.use(express.static('.'));
      
      // API endpoints
      app.use(express.json());
      
      // Health check
      app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
      });
      
      // Start server
      app.listen(options.port, options.host, () => {
        console.log(`✅ Server running at http://${options.host}:${options.port}`);
        console.log('   Open your browser to access the web interface');
      });
      
    } catch (error) {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    }
  });

// Configuration Commands
program
  .command('config')
  .description('Manage configuration')
  .option('--set <key=value>', 'Set configuration value')
  .option('--get <key>', 'Get configuration value')
  .option('--list', 'List all configuration')
  .action(async (options) => {
    const configPath = path.join(process.cwd(), '.workstation-config.json');
    
    try {
      let config = {};
      try {
        const configData = await fs.readFile(configPath, 'utf8');
        config = JSON.parse(configData);
      } catch (error) {
        // Config file doesn't exist yet
      }
      
      if (options.set) {
        const [key, value] = options.set.split('=');
        config[key] = value;
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));
        console.log(`✅ Set ${key} = ${value}`);
      }
      
      if (options.get) {
        const value = config[options.get];
        console.log(value || 'Not set');
      }
      
      if (options.list) {
        console.log('Configuration:');
        Object.entries(config).forEach(([key, value]) => {
          console.log(`   ${key}: ${value}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Configuration error:', error.message);
      process.exit(1);
    }
  });

// Help and examples
program
  .command('examples')
  .description('Show usage examples')
  .action(() => {
    console.log(`
🤖 Prompt Engineering Workstation - Examples

1. Create a new project:
   prompt-workstation create-project -n "My Dashboard" -c "Acme Corp" -a "developers"

2. Run a full design specification workflow:
   prompt-workstation run-workflow -p proj_123 -w full-design-spec

3. Generate technical specification:
   prompt-workstation generate-spec -p proj_123 -f markdown -o ./specs.md

4. Start web interface:
   prompt-workstation serve -p 8080

5. List available templates:
   prompt-workstation list-templates -m claude

6. Validate project specifications:
   prompt-workstation validate -p proj_123

7. Export project data:
   prompt-workstation export -p proj_123 -o ./backup.json

Environment Variables:
   CLAUDE_API_KEY     - Claude AI API key
   OPENAI_API_KEY     - OpenAI API key  
   ULM_API_KEY        - ULM API key
`);
  });

// Parse command line arguments
program.parse();

// If no command provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}