# Enhanced Cursor Background Agent Prompt: Prompt Engineering Workstation

## Task Overview
Build a complete, professional prompt engineering workstation interface that serves as a comprehensive workspace for creating, managing, testing, and optimizing AI prompts. This should be a single-page application with modern UX/UI that leverages existing internal CSS styling.

## Core Requirements

### 1. Main Interface Structure
Create a responsive, tabbed interface with the following sections:
- **Prompt Builder** - Main workspace for creating and editing prompts
- **Template Library** - Storage and management of prompt templates
- **Testing Lab** - Environment for testing prompts with different scenarios
- **Analytics Dashboard** - Performance metrics and optimization insights
- **Settings & Config** - User preferences and system configuration

### 2. Prompt Builder Features
- **Rich Text Editor** with syntax highlighting for prompt structure
- **Variable Insertion System** - Easy insertion of placeholders like `{user_input}`, `{context}`, `{role}`
- **Prompt Structure Templates** - Pre-built frameworks (instruction, few-shot, chain-of-thought, etc.)
- **Real-time Character/Token Counter** - Track prompt length and estimated costs
- **Version History** - Track changes and iterations of prompts
- **Import/Export Functions** - JSON, YAML, plain text formats
- **Collaborative Notes Section** - Comments and documentation

### 3. Template Library System
- **Categorized Template Storage** - Organize by use case (coding, writing, analysis, etc.)
- **Search and Filter Functionality** - Quick template discovery
- **Template Preview Cards** - Visual representation with descriptions
- **Custom Template Creation** - Save current prompts as reusable templates
- **Template Rating System** - Community-style rating for effectiveness
- **Tag-based Organization** - Multiple tags per template for better categorization

### 4. Testing Lab Environment
- **Multiple Test Scenarios** - Run the same prompt with different inputs
- **A/B Testing Interface** - Compare different prompt versions side-by-side
- **Response Quality Metrics** - Rate outputs on relevance, accuracy, creativity
- **Test History Tracking** - Log all test runs with timestamps and results
- **Batch Testing** - Run multiple test cases automatically
- **Mock AI Response Generator** - Simulate responses for development/testing

### 5. Analytics & Optimization
- **Performance Dashboard** - Success rates, average response quality, usage patterns
- **Prompt Effectiveness Metrics** - Track which prompts perform best
- **Token Usage Analytics** - Cost tracking and optimization suggestions
- **Response Time Tracking** - Monitor performance bottlenecks
- **Usage Heatmaps** - Visual representation of most-used features
- **Optimization Recommendations** - AI-powered suggestions for prompt improvements

### 6. Advanced Features
- **Prompt Chaining Interface** - Visual workflow builder for multi-step prompts
- **Context Management** - Organize and inject relevant context automatically
- **Role-based Prompt Templates** - Different personas and expert roles
- **Integration Hooks** - API endpoints for external tool integration
- **Backup & Sync** - Cloud storage integration for data persistence
- **Export to Various Formats** - API calls, documentation, training data

## Technical Implementation Details

### Frontend Architecture
- Use **HTML5, CSS3, and Vanilla JavaScript** or preferred framework
- Implement **CSS Grid and Flexbox** for responsive layouts
- Utilize **existing internal CSS classes and design system**
- Ensure **mobile-responsive design** with breakpoints
- Add **keyboard shortcuts** for power users
- Implement **dark/light theme toggle**

### Data Storage
- **LocalStorage** for client-side persistence
- **IndexedDB** for larger datasets (templates, history)
- **JSON Schema** for data structure validation
- **Export/Import** functionality for data portability

### User Experience
- **Intuitive Navigation** - Clear visual hierarchy and information architecture
- **Progressive Disclosure** - Show advanced features only when needed
- **Contextual Help** - Tooltips, guided tours, inline documentation
- **Keyboard Accessibility** - Full keyboard navigation support
- **Loading States** - Smooth transitions and progress indicators
- **Error Handling** - Clear error messages with recovery suggestions

## Example Templates to Include

### 1. Code Review Assistant
```
You are an expert code reviewer with 10+ years of experience. 

**Context**: {code_snippet}
**Language**: {programming_language}
**Focus Areas**: {review_focus}

Please provide a thorough code review covering:
1. Code quality and best practices
2. Potential bugs or security issues
3. Performance optimizations
4. Readability and maintainability suggestions

Format your response with clear sections and actionable recommendations.
```

### 2. Technical Documentation Writer
```
You are a technical writer specializing in clear, comprehensive documentation.

**Topic**: {documentation_topic}
**Audience**: {target_audience}
**Complexity Level**: {complexity_level}

Create detailed documentation that includes:
- Overview and purpose
- Step-by-step instructions
- Code examples (if applicable)
- Troubleshooting section
- Additional resources

Use clear headings, bullet points, and maintain a professional yet approachable tone.
```

### 3. Creative Problem Solver
```
You are a creative problem-solving consultant with expertise in design thinking.

**Challenge**: {problem_description}
**Constraints**: {limitations}
**Success Criteria**: {desired_outcomes}

Apply creative problem-solving methodologies:
1. Reframe the problem from multiple perspectives
2. Generate diverse solution approaches
3. Evaluate feasibility and impact
4. Recommend the top 3 solutions with implementation steps

Think outside the box while maintaining practical viability.
```

## Implementation Steps

### Phase 1: Core Structure (Priority 1)
1. Set up the main HTML structure with tabbed navigation
2. Implement the Prompt Builder with basic text editing
3. Create the Template Library with CRUD operations
4. Add basic styling using internal CSS classes

### Phase 2: Enhanced Features (Priority 2)
1. Add the Testing Lab with scenario management
2. Implement version history and change tracking
3. Create the Analytics Dashboard with basic metrics
4. Add import/export functionality

### Phase 3: Advanced Features (Priority 3)
1. Implement prompt chaining interface
2. Add advanced analytics and optimization features
3. Create integration hooks and API endpoints
4. Enhance with AI-powered suggestions

### Phase 4: Polish & Optimization (Priority 4)
1. Optimize performance and add loading states
2. Enhance accessibility features
3. Add comprehensive help documentation
4. Implement advanced keyboard shortcuts

## Success Criteria
- **Intuitive Interface**: New users can create their first prompt within 2 minutes
- **Comprehensive Functionality**: Covers the full prompt engineering lifecycle
- **Performance**: Fast loading and responsive interactions
- **Data Integrity**: Reliable save/load operations with error recovery
- **Scalability**: Can handle hundreds of templates and prompt variations
- **Professional Quality**: Production-ready interface suitable for enterprise use

## Additional Considerations
- Ensure all data is stored locally for privacy
- Make the interface highly customizable for different workflows
- Include comprehensive keyboard shortcuts for efficiency
- Design for both individual use and team collaboration
- Consider future integration with AI APIs for live testing
- Plan for eventual features like prompt marketplace and sharing

Build this as a complete, production-ready application that serves as the definitive tool for prompt engineering workflows. Focus on creating an interface that is both powerful for experts and approachable for beginners.