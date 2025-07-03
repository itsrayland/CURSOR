# 🤖 Prompt Engineering Workstation

A unified prompt-engineering workstation for AI-driven design, spec drafting, and media workflows. This comprehensive prototype integrates Claude, OpenAI, ULM, and other AI models to automate the creation of pixel-perfect UI specifications, style guides, and technical documentation.

## ✨ Features

### 🎯 Core Capabilities
- **AI-Driven Design Automation** - Generate complete design specifications using Claude, OpenAI, and ULM
- **Multi-Model Integration** - Seamlessly work with different AI models for specialized tasks
- **End-to-End Workflows** - From requirements gathering to final specifications
- **Style Guide Generation** - Comprehensive design systems with tokens, components, and guidelines
- **Media Analysis** - Extract colors, patterns, and design elements from images
- **Template Management** - Reusable prompt templates with parameterization
- **Technical Spec Generation** - Markdown, JSON, HTML, and PDF outputs
- **Project Management** - Full lifecycle project tracking and organization

### 🎨 Design System Features
- **Color Systems** - Automated palette generation with accessibility compliance
- **Typography Scales** - Responsive font systems with proper hierarchy
- **Component Documentation** - Detailed specs for buttons, forms, layouts
- **Design Tokens** - CSS, SCSS, and JavaScript format generation
- **Accessibility Guidelines** - WCAG 2.1 AA compliance checking
- **Code Examples** - React/TypeScript component implementations

### 🔄 Workflow Types
1. **Full Design Specification** - Complete end-to-end design process
2. **Style Guide Generation** - Focused design system creation
3. **Media Analysis** - Image processing and design element extraction
4. **Template Creation** - Custom prompt template development

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- API keys for AI services (optional for demo)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd prompt-engineering-workstation

# Install dependencies
npm install

# Set up environment variables (optional)
export CLAUDE_API_KEY="your-claude-api-key"
export OPENAI_API_KEY="your-openai-api-key"
export ULM_API_KEY="your-ulm-api-key"
```

### Running the Application

#### Web Interface
```bash
# Start the web server
npm start
# or
node server.js

# Open browser to http://localhost:3000
```

#### Command Line Interface
```bash
# Make CLI executable
chmod +x cli.js

# Create a new project
./cli.js create-project -n "My Dashboard" -c "Acme Corp" -a "developers"

# Run a workflow
./cli.js run-workflow -p proj_123 -w full-design-spec

# Generate specifications
./cli.js generate-spec -p proj_123 -f markdown -o ./specs.md

# Start web interface
./cli.js serve -p 8080
```

## 📋 Usage Examples

### 1. Creating a Project

**Web Interface:**
1. Click "New Project" in the sidebar
2. Fill in project details (name, client, audience, type)
3. Click "Create Project"

**CLI:**
```bash
./cli.js create-project \
  -n "Darzabi Email Dashboard" \
  -d "Email marketing dashboard for small businesses" \
  -c "Darzabi Inc." \
  -a "small business owners" \
  -t "dashboard"
```

### 2. Running Design Workflows

**Full Design Specification:**
```bash
./cli.js run-workflow -p proj_abc123 -w full-design-spec
```

**Style Guide Generation:**
```bash
./cli.js run-workflow -p proj_abc123 -w style-guide-generation
```

### 3. Template Management

**List Available Templates:**
```bash
./cli.js list-templates -m claude
```

**View Templates in Web Interface:**
- Navigate to "Templates" tab
- Filter by AI model (Claude, OpenAI, ULM)
- View parameters and examples

### 4. Media Analysis

**Upload and Analyze Images:**
1. Create a project
2. Go to Workflows → Media Analysis
3. Upload images for color extraction and style analysis

## 🏗️ Architecture

### Core Components

```
src/
├── PromptWorkstation.js      # Main orchestrator
├── PromptTemplateManager.js  # Template management
├── AIModelManager.js         # AI model integrations
├── StyleGuideGenerator.js    # Design system generation
├── MediaWorkflowManager.js   # Image analysis workflows
├── SpecGenerator.js          # Technical specification output
├── ProjectManager.js         # Project lifecycle management
└── web/
    ├── PromptWorkstationUI.js # Web interface
    └── styles.css            # Modern UI styling
```

### AI Model Integration

**Claude Integration:**
- Requirements gathering and analysis
- Conversational design review
- Business objective extraction

**OpenAI Integration:**
- Technical specification generation
- React component code generation
- Detailed implementation guidelines

**ULM (Unified Language+Vision) Integration:**
- Image analysis and color extraction
- Moodboard generation
- Visual style analysis

### Prompt Engineering Best Practices

1. **Structured Layering**: Context → Task → Constraints → Output Format
2. **Parameterization**: Reusable templates with variable substitution
3. **Self-Review Hooks**: Built-in validation and improvement prompts
4. **Model-Specific Optimization**: Tailored prompts for each AI model
5. **Iteration Support**: Feedback loops and refinement capabilities

## 🎨 Built-in Templates

### Claude Templates
- **Requirements Gathering** - Structured business analysis
- **Conversational Design Review** - Interactive design feedback
- **Draft Specifications** - Initial spec creation

### OpenAI Templates
- **Technical Specifications** - Detailed implementation docs
- **Component Generation** - React/TypeScript components
- **Code Examples** - Practical implementation samples

### ULM Templates
- **Image Analysis** - Color and style extraction
- **Moodboard Generation** - Visual asset creation
- **Design Token Generation** - CSS variable creation

## 📁 Project Structure

```
prompt-engineering-workstation/
├── src/                      # Core application code
│   ├── web/                  # Web interface components
│   └── styles/               # Existing styling system
├── templates/                # Prompt templates (JSON)
├── output/                   # Generated specifications
├── assets/                   # Media assets and uploads
├── docs/                     # Documentation
├── index.html               # Main web interface
├── server.js                # Express.js server
├── cli.js                   # Command-line interface
└── package.json             # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables
```bash
# AI Model API Keys
CLAUDE_API_KEY=your-claude-key
OPENAI_API_KEY=your-openai-key
ULM_API_KEY=your-ulm-key

# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development
```

### Configuration File (`.workstation-config.json`)
```json
{
  "outputDirectory": "./output",
  "templatesDirectory": "./templates",
  "assetsDirectory": "./assets",
  "defaultModel": "claude",
  "autoSave": true
}
```

## 📚 API Documentation

### REST Endpoints

#### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Workflows
- `POST /api/projects/:id/workflows` - Execute workflow
- `GET /api/projects/:id/workflows` - Get workflow history

#### Templates
- `GET /api/templates` - List available templates
- `POST /api/templates` - Create custom template

#### Specifications
- `POST /api/projects/:id/specs/generate` - Generate specification
- `POST /api/projects/:id/specs/validate` - Validate specification

#### Media
- `POST /api/projects/:id/media/upload` - Upload media files
- `POST /api/projects/:id/media/analyze` - Analyze media

## 🧪 Development

### Running in Development Mode
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Adding New Templates
1. Create template JSON file in `templates/` directory
2. Follow the template schema:
```json
{
  "name": "Template Name",
  "model": "claude|openai|ulm",
  "category": "category-name",
  "description": "Template description",
  "template": "Your prompt template with ${parameters}",
  "parameters": ["parameter1", "parameter2"],
  "examples": [{"parameter1": "value1", "parameter2": "value2"}]
}
```

### Extending AI Model Support
1. Create new interface in `AIModelManager.js`
2. Implement required methods: `validate()`, `execute()`
3. Add model to configuration and templates

## 🚀 Deployment

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start server.js --name prompt-workstation
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Add tests for new functionality
- Update documentation for API changes
- Ensure all linting passes

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Core architecture and AI model integration
- ✅ Basic prompt template system
- ✅ Web interface and CLI
- ✅ Style guide generation

### Phase 2 (Next)
- [ ] Advanced media processing with real computer vision
- [ ] Integration with design tools (Figma, Sketch)
- [ ] Collaborative features and team workspaces
- [ ] Advanced template marketplace

### Phase 3 (Future)
- [ ] Real-time collaboration
- [ ] CI/CD integration for automated spec validation
- [ ] Plugin system for custom workflows
- [ ] Enterprise SSO and permissions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and AI model APIs
- Inspired by design system best practices and prompt engineering principles
- Integrates with existing task management and styling systems

---

**Created by the Prompt Engineering Team**  
*Automating design workflows with AI-driven intelligence* 🤖✨ 