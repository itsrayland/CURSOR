#!/usr/bin/env node

/**
 * Prompt Engineering Workstation Demo
 * Demonstrates the full capabilities of the workstation with example workflows
 */

const PromptWorkstation = require('./src/PromptWorkstation');

async function runDemo() {
  console.log('🎬 Prompt Engineering Workstation Demo');
  console.log('=====================================\n');

  try {
    // Initialize the workstation
    console.log('🚀 Step 1: Initializing Workstation...');
    const workstation = new PromptWorkstation({
      outputDirectory: './demo-output',
      templatesDirectory: './templates',
      assetsDirectory: './assets'
    });
    await workstation.init();
    console.log('✅ Workstation initialized successfully!\n');

    // Create a demo project
    console.log('📁 Step 2: Creating Demo Project...');
    const project = await workstation.createProject({
      name: 'Darzabi Email Dashboard',
      description: 'Modern email marketing dashboard for small businesses',
      clientInfo: {
        name: 'Darzabi Inc.',
        targetAudience: 'Small business owners and marketing teams',
        industry: 'SaaS'
      },
      type: 'dashboard'
    });
    console.log(`✅ Project created: ${project.name} (ID: ${project.id})\n`);

    // Show available templates
    console.log('📝 Step 3: Showing Available Templates...');
    const templates = workstation.getAvailableTemplates();
    console.log(`Found ${templates.length} templates:`);
    templates.slice(0, 3).forEach(template => {
      console.log(`   • ${template.name} (${template.model}) - ${template.description}`);
    });
    console.log('   ... and more\n');

    // Demonstrate template rendering
    console.log('🎯 Step 4: Rendering Claude Template...');
    const claudeTemplate = workstation.promptTemplateManager.getTemplate('claude-requirements-gathering');
    if (claudeTemplate) {
      const rendered = workstation.promptTemplateManager.renderTemplate('claude-requirements-gathering', {
        clientName: 'Darzabi Inc.',
        projectType: 'email marketing dashboard',
        targetAudience: 'small business owners'
      });
      console.log(`✅ Template rendered successfully`);
      console.log(`   Model: ${rendered.metadata.model}`);
      console.log(`   Parameters used: ${Object.keys(rendered.metadata.parameters).join(', ')}\n`);
    }

    // Execute a workflow (mock)
    console.log('🔄 Step 5: Executing Design Workflow...');
    const workflowInput = {
      projectDescription: project.description,
      clientInfo: project.clientInfo,
      constraints: {
        targetDevices: ['desktop', 'mobile'],
        accessibility: 'WCAG 2.1 AA',
        performance: 'optimized'
      }
    };

    console.log('   • Starting requirements gathering...');
    console.log('   • Generating technical specifications...');
    console.log('   • Creating style guide...');
    console.log('   • Generating design tokens...');
    console.log('   • Validating accessibility compliance...');
    
    const workflow = await workstation.executeWorkflow('full-design-spec', workflowInput);
    console.log(`✅ Workflow completed in ${workflow.steps.length} steps\n`);

    // Generate style guide
    console.log('🎨 Step 6: Generating Style Guide...');
    const technicalSpec = {
      colorPalette: {
        primary: '#3498db',
        secondary: '#2c3e50',
        accent: '#e74c3c',
        success: '#2ecc71',
        warning: '#f39c12'
      },
      typography: {
        fontFamily: {
          primary: 'Inter, system-ui, sans-serif',
          secondary: 'Georgia, serif'
        }
      }
    };

    const styleGuide = await workstation.styleGuideGenerator.generate(technicalSpec, project);
    console.log('✅ Style guide generated successfully');
    console.log(`   Brand: ${styleGuide.brandIdentity.name}`);
    console.log(`   Color tokens: ${Object.keys(styleGuide.designTokens.tokens.colors).length}`);
    console.log(`   Components documented: ${Object.keys(styleGuide.components).length}\n`);

    // Demonstrate media analysis (mock)
    console.log('🖼️ Step 7: Analyzing Media Assets...');
    const mockFiles = [
      { name: 'logo.png', size: 15420, type: 'image/png' },
      { name: 'hero-bg.jpg', size: 342156, type: 'image/jpeg' }
    ];

    const mediaAnalysis = await workstation.mediaWorkflowManager.analyzeMedia(mockFiles, 'comprehensive');
    console.log('✅ Media analysis completed');
    console.log(`   Files analyzed: ${mediaAnalysis.files.length}`);
    console.log(`   Dominant colors extracted: ${mediaAnalysis.aggregatedResults?.aggregatedColorPalette?.length || 0}`);
    console.log(`   Design recommendations: ${mediaAnalysis.aggregatedResults?.commonRecommendations?.length || 0}\n`);

    // Generate specifications
    console.log('📄 Step 8: Generating Technical Specifications...');
    const specData = {
      requirements: {
        businessObjectives: ['Increase user engagement', 'Streamline email workflows'],
        userPersonas: ['Marketing Manager', 'Small Business Owner']
      },
      technicalSpec: technicalSpec,
      styleGuide: styleGuide
    };

    const outputs = await workstation.specGenerator.generateAll(specData, project);
    console.log('✅ Specifications generated in multiple formats');
    Object.keys(outputs.files).forEach(format => {
      if (outputs.files[format].fileName) {
        console.log(`   • ${format.toUpperCase()}: ${outputs.files[format].fileName}`);
      }
    });
    console.log('');

    // Show project metrics
    console.log('📊 Step 9: Project Metrics...');
    const metrics = workstation.getProjectMetrics(project.id);
    if (metrics) {
      console.log(`   Total workflows: ${metrics.totalWorkflows}`);
      console.log(`   Success rate: ${metrics.successRate}%`);
      console.log(`   Average duration: ${metrics.avgDurationMinutes.toFixed(1)} minutes\n`);
    }

    // Validation example
    console.log('🔍 Step 10: Validating Specifications...');
    const validation = await workstation.validateSpecs(project.id);
    console.log(`✅ Validation completed`);
    console.log(`   Valid: ${validation.isValid ? '✅' : '❌'}`);
    console.log(`   Score: ${validation.score}/100`);
    console.log(`   Issues found: ${validation.errors.length + validation.warnings.length}\n`);

    // Export project
    console.log('📦 Step 11: Exporting Project...');
    const exportData = await workstation.exportProject(project.id);
    console.log(`✅ Project exported successfully`);
    console.log(`   File: ${exportData.fileName}`);
    console.log(`   Size: ${Math.round(exportData.size / 1024)} KB\n`);

    // Summary
    console.log('🎉 Demo Complete! Summary:');
    console.log('=============================');
    console.log(`   Project Created: ${project.name}`);
    console.log(`   Templates Available: ${templates.length}`);
    console.log(`   Workflows Executed: ${workstation.getWorkflowHistory().length}`);
    console.log(`   Specifications Generated: ${Object.keys(outputs.files).length} formats`);
    console.log(`   Style Guide Components: ${Object.keys(styleGuide.components).length}`);
    console.log(`   Design Tokens: ${Object.keys(styleGuide.designTokens.tokens.colors).length} colors`);
    console.log('');

    console.log('🚀 Next Steps:');
    console.log('   1. Start the web interface: node server.js');
    console.log('   2. Open browser to: http://localhost:3000');
    console.log('   3. Explore the CLI: ./cli.js examples');
    console.log('   4. Add real API keys for full AI integration');
    console.log('');

    console.log('💡 Key Features Demonstrated:');
    console.log('   ✅ Project Management & Lifecycle');
    console.log('   ✅ Multi-Model AI Integration (Claude, OpenAI, ULM)');
    console.log('   ✅ Prompt Template System with Parameterization');
    console.log('   ✅ End-to-End Design Workflows');
    console.log('   ✅ Style Guide & Design Token Generation');
    console.log('   ✅ Media Analysis & Color Extraction');
    console.log('   ✅ Technical Specification Generation (Multiple Formats)');
    console.log('   ✅ Validation & Quality Assurance');
    console.log('   ✅ Project Export & Import');
    console.log('   ✅ Metrics & Analytics');
    console.log('');

    console.log('🎯 Prompt Engineering Best Practices Applied:');
    console.log('   • Structured Layering (Context → Task → Constraints → Output)');
    console.log('   • Parameterization & Reusability');
    console.log('   • Self-Review & Validation Hooks');
    console.log('   • Model-Specific Optimization');
    console.log('   • Iteration & Feedback Support');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the demo
if (require.main === module) {
  runDemo().catch(console.error);
}

module.exports = { runDemo };