# AI Prompt-Engineering Workstation

A unified workstation for AI-driven design, spec drafting, and media workflows. This prototype provides a comprehensive interface for managing prompt templates, creating style guides, and generating technical specifications.

## Features

### 🎯 Prompt Templates
- Pre-configured templates for Claude, OpenAI, and ULM models
- Parameterized prompts with dynamic value substitution
- Categories: Planning, Prototyping, Design, and Code
- Search and filter capabilities
- Real-time prompt compilation

### 🎨 Style Guide Designer
- Visual color token management
- Typography scale configuration
- Spacing system with visual preview
- Export to CSS custom properties
- Live preview of design tokens

### 🔄 Workflows (Planned)
- Chain multiple prompts together
- Create end-to-end design workflows
- Requirements → Design → Code pipelines

### 📄 Generated Specifications (Planned)
- Store and manage generated specs
- Export in multiple formats (Markdown, JSON, JSX)
- Version history tracking

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository (if applicable)
git clone <repository-url>

# Navigate to project directory
cd prompt-workstation

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Working with Prompt Templates

1. **Browse Templates**: Navigate to the "Prompt Templates" tab to see all available templates
2. **Filter & Search**: Use the search bar and filters to find specific templates
3. **Configure Parameters**: Click on a template to view and configure its parameters
4. **Copy Prompt**: Click the "Copy" button to copy the compiled prompt to your clipboard

### Creating Style Guides

1. **Navigate to Style Guide**: Click the "Style Guide" tab
2. **Configure Colors**: Add, edit, or remove color tokens
3. **Set Typography**: Configure font families and text styles
4. **Define Spacing**: Set base unit and spacing scale
4. **Export CSS**: Click "Export CSS" to download your design tokens

## Default Prompt Templates

### Claude Templates
- **Design Spec Generator**: Generate comprehensive UI/UX specifications
- **Requirements Gatherer**: Structured requirements documentation

### OpenAI Templates
- **Technical Spec Writer**: Detailed technical documentation with code examples
- **Accessibility Audit**: WCAG compliance checking

### ULM Templates
- **Media Analysis & Moodboard**: Extract colors and generate design inspiration
- **Style Token Extractor**: Extract design tokens from existing designs

## Architecture

```
prompt-workstation/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── Layout.tsx        # Main layout with navigation
│   ├── PromptTemplates.tsx # Prompt template management
│   └── StyleGuide.tsx    # Style guide designer
├── lib/                   # Core libraries
│   ├── types.ts          # TypeScript type definitions
│   ├── store.ts          # Zustand state management
│   └── default-templates.ts # Default prompt templates
└── public/               # Static assets
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: React Icons
- **UI Components**: Custom React components

## Extending the Application

### Adding New Prompt Templates

1. Edit `lib/default-templates.ts`
2. Add a new template object following the `PromptTemplate` interface
3. Include necessary parameters and metadata

### Creating New Workflows

Workflows can be created by:
1. Defining workflow steps in the store
2. Linking prompt templates together
3. Configuring step transitions and validations

## Best Practices

1. **Prompt Engineering**
   - Be explicit and structured
   - Use parameterization for reusability
   - Include self-review hooks
   - Test prompts across different contexts

2. **Style Guide Design**
   - Follow design system principles
   - Use semantic naming for tokens
   - Maintain consistency across projects
   - Document usage guidelines

## Roadmap

- [ ] Workflow visual editor
- [ ] API integration for AI models
- [ ] Real-time collaboration features
- [ ] Version control for prompts and specs
- [ ] Export to Figma/Sketch plugins
- [ ] CI/CD integration
- [ ] Metrics and analytics dashboard

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
