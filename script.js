// === VIBE CODER'S PROMPT ENGINEERING WORKSTATION ===
// Simple, intuitive, and focused on the actual workflow

class PromptWorkstation {
    constructor() {
        this.currentPrompt = '';
        this.currentVibeRating = 0;
        this.data = this.loadData();
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTheme();
        this.setupGoalSetter();
        this.setupPromptCrafter();
        this.setupModels();
        this.setupLibrary();
        this.setupStyleGuide();
        this.setupMedia();
        this.setupTest();
        this.setupSpecs();
        this.setupLog();
        this.setupExport();
        this.loadStarterTemplates();
        this.loadProfessionalTemplates();
        this.loadSavedPrompts();
        this.loadLogEntries();
        this.loadVersionHistory();
    }

    // === DATA MANAGEMENT ===
    loadData() {
        const defaultData = {
            currentPrompt: '',
            vibeLibrary: [],
            iterationLog: [],
            projectContext: '',
            currentChallenge: '',
            desiredOutcome: '',
            constraints: '',
            settings: { theme: 'light' }
        };

        try {
            const saved = localStorage.getItem('promptWorkstation');
            return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
        } catch (error) {
            console.warn('Failed to load data:', error);
            return defaultData;
        }
    }

    saveData() {
        try {
            localStorage.setItem('promptWorkstation', JSON.stringify(this.data));
        } catch (error) {
            console.warn('Failed to save data:', error);
        }
    }

    // === NAVIGATION ===
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.content-section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetSection = button.dataset.section;
                
                // Update nav buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update sections
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(`${targetSection}-section`).classList.add('active');
                
                // Special handling for test section
                if (targetSection === 'test') {
                    this.updatePromptPreview();
                }
            });
        });
    }

    // === THEME MANAGEMENT ===
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = this.data.settings.theme;
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
        
        themeToggle.addEventListener('click', () => {
            const newTheme = this.data.settings.theme === 'light' ? 'dark' : 'light';
            this.data.settings.theme = newTheme;
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
            this.saveData();
        });
    }

    // === GOAL SETTER ===
    setupGoalSetter() {
        const inputs = {
            projectContext: document.getElementById('projectContext'),
            currentChallenge: document.getElementById('currentChallenge'),
            desiredOutcome: document.getElementById('desiredOutcome'),
            constraints: document.getElementById('constraints')
        };

        // Load saved values
        Object.keys(inputs).forEach(key => {
            inputs[key].value = this.data[key] || '';
        });

        // Auto-save on input
        Object.keys(inputs).forEach(key => {
            inputs[key].addEventListener('input', () => {
                this.data[key] = inputs[key].value;
                this.saveData();
            });
        });

        // Set Goal button
        document.getElementById('setGoalBtn').addEventListener('click', () => {
            this.showSection('crafter');
            this.showToast('Goal set! Ready to craft your prompt 🎯');
        });
    }

    // === PROMPT CRAFTER ===
    setupPromptCrafter() {
        const mainPrompt = document.getElementById('mainPrompt');
        const charCount = document.getElementById('charCount');
        const stars = document.querySelectorAll('.star');
        const clearBtn = document.getElementById('clearPrompt');
        const saveBtn = document.getElementById('savePrompt');

        // Load current prompt
        mainPrompt.value = this.data.currentPrompt || '';
        this.currentPrompt = mainPrompt.value;
        this.updateCharCount();

        // Character counter
        mainPrompt.addEventListener('input', () => {
            this.currentPrompt = mainPrompt.value;
            this.data.currentPrompt = this.currentPrompt;
            this.updateCharCount();
            this.autoSave();
        });

        // Recipe buttons
        const recipeButtons = document.querySelectorAll('.recipe-btn');
        recipeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const recipe = button.dataset.recipe;
                const insertion = this.getRecipeText(recipe);
                this.insertAtCursor(mainPrompt, insertion);
            });
        });

        // Vibe rating
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                this.setVibeRating(rating);
            });
        });

        // Clear button
        clearBtn.addEventListener('click', () => {
            if (confirm('Clear the current prompt?')) {
                mainPrompt.value = '';
                this.currentPrompt = '';
                this.data.currentPrompt = '';
                this.updateCharCount();
                this.saveData();
            }
        });

        // Save button
        saveBtn.addEventListener('click', () => {
            this.saveCurrentPrompt();
        });
    }

    updateCharCount() {
        const count = this.currentPrompt.length;
        document.getElementById('charCount').textContent = count;
    }

    getRecipeText(recipe) {
        const recipes = {
            role: '\n\nYou are a [ROLE] with expertise in [EXPERTISE_AREA].\n\n',
            context: '\n\nHere\'s the context:\n[CONTEXT]\n\n',
            steps: '\n\nPlease approach this step by step:\n1. \n2. \n3. \n\n',
            examples: '\n\nHere are some examples:\n\nExample 1:\n[EXAMPLE_1]\n\nExample 2:\n[EXAMPLE_2]\n\n'
        };
        return recipes[recipe] || '';
    }

    insertAtCursor(textarea, text) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        
        textarea.value = before + text + after;
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
        
        this.currentPrompt = textarea.value;
        this.data.currentPrompt = this.currentPrompt;
        this.updateCharCount();
        this.autoSave();
    }

    setVibeRating(rating) {
        this.currentVibeRating = rating;
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    saveCurrentPrompt() {
        if (!this.currentPrompt.trim()) {
            this.showToast('Write something first! ✍️');
            return;
        }

        const title = prompt('Give this prompt a name:');
        if (!title) return;

        const prompt = {
            id: Date.now(),
            title: title,
            prompt: this.currentPrompt,
            vibeRating: this.currentVibeRating,
            tags: ['custom'],
            createdAt: new Date().toISOString(),
            notes: ''
        };

        this.data.vibeLibrary.push(prompt);
        this.saveData();
        this.loadSavedPrompts();
        this.showToast('Prompt saved! 💾');
    }

    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveData();
        }, 1000);
    }

    // === AI MODELS MANAGEMENT ===
    setupModels() {
        // Model enable/disable toggles
        const claudeEnabled = document.getElementById('claudeEnabled');
        const openaiEnabled = document.getElementById('openaiEnabled');
        const ulmEnabled = document.getElementById('ulmEnabled');

        claudeEnabled.addEventListener('change', () => {
            this.data.models = this.data.models || {};
            this.data.models.claude = claudeEnabled.checked;
            this.saveData();
        });

        openaiEnabled.addEventListener('change', () => {
            this.data.models = this.data.models || {};
            this.data.models.openai = openaiEnabled.checked;
            this.saveData();
        });

        ulmEnabled.addEventListener('change', () => {
            this.data.models = this.data.models || {};
            this.data.models.ulm = ulmEnabled.checked;
            this.saveData();
        });

        // Workflow builder
        const saveWorkflow = document.getElementById('saveWorkflow');
        saveWorkflow.addEventListener('click', () => {
            const workflow = {
                step1: document.getElementById('step1Model').value,
                step2: document.getElementById('step2Model').value,
                step3: document.getElementById('step3Model').value
            };
            this.data.aiWorkflow = workflow;
            this.saveData();
            this.showToast('AI Workflow saved! 🤖');
        });

        // Load saved model settings
        if (this.data.models) {
            claudeEnabled.checked = this.data.models.claude !== false;
            openaiEnabled.checked = this.data.models.openai !== false;
            ulmEnabled.checked = this.data.models.ulm !== false;
        }

        // Load saved workflow
        if (this.data.aiWorkflow) {
            document.getElementById('step1Model').value = this.data.aiWorkflow.step1 || 'claude';
            document.getElementById('step2Model').value = this.data.aiWorkflow.step2 || 'openai';
            document.getElementById('step3Model').value = this.data.aiWorkflow.step3 || 'ulm';
        }
    }

    // === LIBRARY MANAGEMENT ===
    setupLibrary() {
        const searchInput = document.getElementById('librarySearch');
        
        searchInput.addEventListener('input', () => {
            this.filterLibrary(searchInput.value);
        });
    }

    loadStarterTemplates() {
        const templates = [
            {
                id: 'debug-mess',
                title: 'Debug This Mess 🐛',
                prompt: `I'm stuck on this code and it's not working as expected.

Here's what I'm trying to do: [GOAL]
Here's the code: [CODE]
Here's what's happening: [ISSUE]

Please help me figure out what's wrong and suggest a fix. Explain it like you're pair programming with me.`,
                tags: ['debugging', 'help'],
                description: 'When your code isn\'t working and you need help figuring out why'
            },
            {
                id: 'build-feature',
                title: 'Build This Feature ⚡',
                prompt: `I need to build [FEATURE_NAME] for my project.

Context: [PROJECT_DESCRIPTION]
Requirements: [WHAT_IT_NEEDS_TO_DO]
Tech stack: [TECHNOLOGIES]

Walk me through how to implement this step by step. Give me working code I can copy and paste.`,
                tags: ['building', 'feature'],
                description: 'When you need to build something new from scratch'
            },
            {
                id: 'refactor-clean',
                title: 'Refactor & Clean Up 🧹',
                prompt: `This code works but it's messy and I want to make it better.

Current code: [CODE_BLOCK]
What bothers me: [ISSUES]
Goal: [DESIRED_OUTCOME]

Help me refactor this to be cleaner, more readable, and follow best practices. Show me before/after.`,
                tags: ['refactoring', 'cleanup'],
                description: 'When your code works but needs to be cleaner'
            },
            {
                id: 'learn-concept',
                title: 'Learn This Concept 🎓',
                prompt: `I'm trying to understand [CONCEPT/TECHNOLOGY] and how to use it in my project.

My current level: [BEGINNER/INTERMEDIATE/ADVANCED]
What I want to build: [PROJECT_CONTEXT]
Specific questions: [QUESTIONS]

Explain this to me with practical examples I can actually use.`,
                tags: ['learning', 'concept'],
                description: 'When you need to understand something new'
            },
            {
                id: 'fix-approach',
                title: 'Fix My Approach 🎯',
                prompt: `I'm building [WHAT] but I think I'm approaching it wrong.

What I'm doing now: [CURRENT_APPROACH]
Problems I'm running into: [ISSUES]
What success looks like: [GOAL]

Suggest a better way to approach this problem. Be honest if I need to start over.`,
                tags: ['approach', 'strategy'],
                description: 'When you think you might be solving the problem the wrong way'
            }
        ];

        const container = document.getElementById('starterTemplates');
        container.innerHTML = templates.map(template => 
            this.createTemplateCard(template)
        ).join('');

        // Add click handlers
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.template-card');
            if (card) {
                const templateId = card.dataset.templateId;
                const template = templates.find(t => t.id === templateId);
                this.useTemplate(template);
            }
        });
    }

    loadProfessionalTemplates() {
        const professionalTemplates = [
            {
                id: 'claude-ui-spec',
                title: 'Claude UI Specification 📋',
                prompt: `You are Claude, an AI design partner specializing in UI specifications.

Context: Building "${this.data.projectName || '[PROJECT_NAME]'}" interface.

Task: Generate a comprehensive UI specification including:
• Component hierarchy and structure
• Color palette with hex codes
• Typography scale and font stacks
• Responsive grid layout rules
• Interaction states and animations

Output format: Structured Markdown with:
1. Component Library
2. Design Tokens
3. Layout Guidelines
4. Accessibility Notes

Include specific CSS classes and ensure WCAG 2.1 AA compliance.`,
                tags: ['claude', 'ui-spec', 'professional'],
                description: 'Generate comprehensive UI specifications using Claude'
            },
            {
                id: 'openai-technical-spec',
                title: 'OpenAI Technical Specification 🔧',
                prompt: `System: You are a technical specification writer for software interfaces.

User: Produce a detailed technical specification for [COMPONENT_NAME] including:

1. **Component Architecture:**
   - Props interface (TypeScript)
   - State management approach
   - Event handling patterns

2. **Implementation Details:**
   - React JSX code examples
   - Tailwind CSS classes
   - Responsive behavior rules

3. **Accessibility Requirements:**
   - ARIA roles and properties
   - Keyboard navigation support
   - Screen reader compatibility

4. **Testing Specifications:**
   - Unit test scenarios
   - Integration test requirements
   - Visual regression test cases

Format as structured Markdown with code blocks for implementation examples.`,
                tags: ['openai', 'technical', 'react'],
                description: 'Generate detailed technical specifications with OpenAI'
            },
            {
                id: 'ulm-design-analysis',
                title: 'ULM Design Analysis 🎨',
                prompt: `Analyze the provided design assets and generate:

1. **Color Palette Extraction:**
   - Primary, secondary, and accent colors
   - Color harmony analysis
   - Usage recommendations

2. **Visual Style Assessment:**
   - Typography characteristics
   - Spacing patterns
   - Visual hierarchy principles

3. **Brand Alignment:**
   - Style consistency evaluation
   - Brand guideline adherence
   - Improvement suggestions

4. **Asset Generation:**
   - CSS custom properties for colors
   - Suggested moodboard themes
   - Icon style recommendations

Output: JSON format with extracted design tokens and implementation guidelines.`,
                tags: ['ulm', 'design', 'analysis'],
                description: 'Analyze designs and extract actionable design tokens'
            },
            {
                id: 'style-guide-generator',
                title: 'Complete Style Guide Generator 📚',
                prompt: `Generate a comprehensive style guide for [PROJECT_NAME]:

**Brand Identity:**
- Color palette (primary, secondary, neutrals)
- Typography scale (headings, body, captions)
- Logo usage guidelines
- Brand personality traits

**UI Components:**
- Button variants and states
- Form elements styling
- Card layouts and shadows
- Navigation patterns

**Layout System:**
- Grid structure and breakpoints
- Spacing scale and rhythm
- Content hierarchy rules
- Responsive design principles

**Code Implementation:**
- CSS custom properties
- Utility class naming convention
- Component architecture patterns
- Accessibility standards

Output as a complete style guide document with visual examples and code snippets.`,
                tags: ['style-guide', 'branding', 'comprehensive'],
                description: 'Generate complete brand and UI style guides'
            },
            {
                id: 'accessibility-audit',
                title: 'Accessibility Specification 🔍',
                prompt: `Create a comprehensive accessibility specification for [INTERFACE_NAME]:

**WCAG 2.1 AA Compliance:**
- Color contrast requirements (4.5:1 for normal text)
- Focus indicators and keyboard navigation
- Screen reader compatibility
- Alternative text standards

**Implementation Guidelines:**
- ARIA roles and properties
- Semantic HTML structure
- Skip navigation links
- Error handling and validation

**Testing Checklist:**
- Automated testing tools integration
- Manual testing procedures
- User testing with assistive technologies
- Compliance verification steps

**Documentation Requirements:**
- Accessibility statement
- User guide for assistive technologies
- Developer implementation notes
- Ongoing maintenance procedures

Format as actionable specification with testing criteria and implementation examples.`,
                tags: ['accessibility', 'wcag', 'compliance'],
                description: 'Comprehensive accessibility specifications and guidelines'
            },
            {
                id: 'api-documentation',
                title: 'API Integration Specification 🔗',
                prompt: `Document API integration requirements for [PROJECT_NAME]:

**Endpoint Specifications:**
- Base URLs and versioning
- Authentication methods
- Request/response schemas
- Error handling patterns

**Data Models:**
- Entity relationships
- Validation rules
- Data transformation requirements
- Caching strategies

**Integration Patterns:**
- Loading states and indicators
- Error boundary implementation
- Offline functionality
- Real-time updates

**Security Considerations:**
- CORS configuration
- Rate limiting
- Data sanitization
- Privacy compliance

Provide implementation examples in TypeScript/React with comprehensive error handling.`,
                tags: ['api', 'integration', 'documentation'],
                description: 'Complete API integration documentation and specifications'
            }
        ];

        const container = document.getElementById('professionalTemplates');
        container.innerHTML = professionalTemplates.map(template => 
            this.createTemplateCard(template)
        ).join('');

        // Add click handlers
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.template-card');
            if (card) {
                const templateId = card.dataset.templateId;
                const template = professionalTemplates.find(t => t.id === templateId);
                this.useTemplate(template);
            }
        });
    }

    loadSavedPrompts() {
        const container = document.getElementById('savedPrompts');
        
        if (this.data.vibeLibrary.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No saved prompts yet. Create some in the Crafter! 🚀</p>';
            return;
        }

        container.innerHTML = this.data.vibeLibrary.map(prompt => 
            this.createPromptCard(prompt)
        ).join('');

        // Add click handlers
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.prompt-card');
            if (card) {
                const promptId = parseInt(card.dataset.promptId);
                const prompt = this.data.vibeLibrary.find(p => p.id === promptId);
                this.usePrompt(prompt);
            }
        });
    }

    createTemplateCard(template) {
        return `
            <div class="template-card" data-template-id="${template.id}">
                <h4>${template.title}</h4>
                <p>${template.description}</p>
                <div class="template-tags">
                    ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }

    createPromptCard(prompt) {
        const preview = prompt.prompt.substring(0, 100) + (prompt.prompt.length > 100 ? '...' : '');
        const stars = '⭐'.repeat(prompt.vibeRating);
        
        return `
            <div class="prompt-card" data-prompt-id="${prompt.id}">
                <h4>${prompt.title} ${stars}</h4>
                <p>${preview}</p>
                <div class="prompt-tags">
                    ${prompt.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }

    useTemplate(template) {
        document.getElementById('mainPrompt').value = template.prompt;
        this.currentPrompt = template.prompt;
        this.data.currentPrompt = this.currentPrompt;
        this.updateCharCount();
        this.saveData();
        this.showSection('crafter');
        this.showToast(`Template loaded: ${template.title} 📋`);
    }

    usePrompt(prompt) {
        document.getElementById('mainPrompt').value = prompt.prompt;
        this.currentPrompt = prompt.prompt;
        this.data.currentPrompt = this.currentPrompt;
        this.setVibeRating(prompt.vibeRating);
        this.updateCharCount();
        this.saveData();
        this.showSection('crafter');
        this.showToast(`Prompt loaded: ${prompt.title} 📋`);
    }

    filterLibrary(searchTerm) {
        const cards = document.querySelectorAll('.template-card, .prompt-card');
        const term = searchTerm.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const visible = title.includes(term) || description.includes(term);
            card.style.display = visible ? 'block' : 'none';
        });
    }

    // === TEST FUNCTIONALITY ===
    setupTest() {
        const vibeGood = document.getElementById('vibeGood');
        const vibeBad = document.getElementById('vibeBad');
        const testContext = document.getElementById('testContext');
        
        vibeGood.addEventListener('click', () => {
            this.logVibeCheck(true);
            this.showToast('Great! This prompt feels right 👍');
        });
        
        vibeBad.addEventListener('click', () => {
            this.logVibeCheck(false);
            this.showSection('crafter');
            this.showToast('Back to crafting - you\'ve got this! 💪');
        });

        testContext.addEventListener('input', () => {
            this.updatePromptPreview();
        });
    }

    updatePromptPreview() {
        const preview = document.getElementById('promptPreview');
        const currentPrompt = document.getElementById('mainPrompt').value;
        
        if (currentPrompt.trim()) {
            preview.textContent = currentPrompt;
        } else {
            preview.textContent = 'Your current prompt will appear here...';
        }
    }

    logVibeCheck(isGood) {
        const entry = {
            timestamp: Date.now(),
            prompt: this.currentPrompt.substring(0, 200) + '...',
            outcome: isGood ? 'good' : 'needs-work',
            lessons: isGood ? 'This prompt felt right!' : 'This prompt needs more work'
        };
        
        this.data.iterationLog.unshift(entry);
        this.saveData();
    }

    // === ITERATION LOG ===
    setupLog() {
        const addButton = document.getElementById('addLogEntry');
        const logInput = document.getElementById('logEntry');
        
        addButton.addEventListener('click', () => {
            const content = logInput.value.trim();
            if (!content) {
                this.showToast('Write something first! ✍️');
                return;
            }
            
            this.addLogEntry(content);
            logInput.value = '';
        });
    }

    addLogEntry(content) {
        const entry = {
            timestamp: Date.now(),
            content: content,
            type: 'manual'
        };
        
        this.data.iterationLog.unshift(entry);
        this.saveData();
        this.loadLogEntries();
        this.showToast('Entry added! 📝');
    }

    loadLogEntries() {
        const container = document.getElementById('logTimeline');
        
        if (this.data.iterationLog.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No entries yet. Start logging your journey! 🚀</p>';
            return;
        }

        container.innerHTML = this.data.iterationLog.map(entry => 
            this.createLogEntry(entry)
        ).join('');
    }

    createLogEntry(entry) {
        const date = new Date(entry.timestamp).toLocaleString();
        const icon = entry.outcome === 'good' ? '👍' : entry.outcome === 'needs-work' ? '👎' : '📝';
        
        return `
            <div class="log-entry">
                <div class="log-entry-meta">
                    <span>${icon} ${date}</span>
                </div>
                <div class="log-entry-content">
                    ${entry.content || entry.lessons}
                </div>
            </div>
        `;
    }

    // === STYLE GUIDE FUNCTIONALITY ===
    setupStyleGuide() {
        // Color inputs synchronization
        const primaryColor = document.getElementById('primaryColor');
        const primaryHex = document.getElementById('primaryHex');
        const secondaryColor = document.getElementById('secondaryColor');
        const secondaryHex = document.getElementById('secondaryHex');
        const accentColor = document.getElementById('accentColor');
        const accentHex = document.getElementById('accentHex');

        // Sync color picker with hex input
        primaryColor.addEventListener('input', () => {
            primaryHex.value = primaryColor.value;
            this.updateStylePreview();
        });

        primaryHex.addEventListener('input', () => {
            primaryColor.value = primaryHex.value;
            this.updateStylePreview();
        });

        secondaryColor.addEventListener('input', () => {
            secondaryHex.value = secondaryColor.value;
            this.updateStylePreview();
        });

        secondaryHex.addEventListener('input', () => {
            secondaryColor.value = secondaryHex.value;
            this.updateStylePreview();
        });

        accentColor.addEventListener('input', () => {
            accentHex.value = accentColor.value;
            this.updateStylePreview();
        });

        accentHex.addEventListener('input', () => {
            accentColor.value = accentHex.value;
            this.updateStylePreview();
        });

        // Project name and brand keywords
        const projectName = document.getElementById('projectName');
        const brandKeywords = document.getElementById('brandKeywords');

        projectName.addEventListener('input', () => {
            this.data.projectName = projectName.value;
            this.saveData();
        });

        brandKeywords.addEventListener('input', () => {
            this.data.brandKeywords = brandKeywords.value;
            this.saveData();
        });

        // Generate palette button
        const generatePalette = document.getElementById('generatePalette');
        generatePalette.addEventListener('click', () => {
            this.generateAIPalette();
        });

        // Style guide generation
        const generateStyleGuide = document.getElementById('generateStyleGuide');
        generateStyleGuide.addEventListener('click', () => {
            this.generateCompleteStyleGuide();
        });

        // Export CSS variables
        const exportCSS = document.getElementById('exportCSS');
        exportCSS.addEventListener('click', () => {
            this.exportCSSVariables();
        });

        // Load saved values
        if (this.data.projectName) {
            projectName.value = this.data.projectName;
        }
        if (this.data.brandKeywords) {
            brandKeywords.value = this.data.brandKeywords;
        }

        this.updateStylePreview();
    }

    updateStylePreview() {
        const preview = document.getElementById('stylePreview');
        const primaryColor = document.getElementById('primaryColor').value;
        const secondaryColor = document.getElementById('secondaryColor').value;
        const accentColor = document.getElementById('accentColor').value;
        const headingFont = document.getElementById('headingFont').value;
        const bodyFont = document.getElementById('bodyFont').value;

        preview.innerHTML = `
            <div style="
                font-family: ${headingFont === 'custom' ? 'Inter' : headingFont}, sans-serif;
                color: ${primaryColor};
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 16px;
            ">
                ${this.data.projectName || 'Your Project'} Design System
            </div>
            <div style="
                font-family: ${bodyFont === 'system' ? 'system-ui' : bodyFont}, sans-serif;
                color: #666;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 16px;
            ">
                This is how your body text will look with the selected typography and colors.
            </div>
            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                <div style="
                    background-color: ${primaryColor};
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: 600;
                ">Primary Button</div>
                <div style="
                    background-color: ${secondaryColor};
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: 600;
                ">Secondary Button</div>
                <div style="
                    border: 2px solid ${accentColor};
                    color: ${accentColor};
                    background-color: transparent;
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-weight: 600;
                ">Accent Button</div>
            </div>
            <div style="
                background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
                height: 80px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
            ">
                Brand Gradient Preview
            </div>
        `;
    }

    generateAIPalette() {
        const keywords = this.data.brandKeywords || 'modern, clean, professional';
        const mockPalettes = [
            { primary: '#2563eb', secondary: '#7c3aed', accent: '#059669' },
            { primary: '#dc2626', secondary: '#ea580c', accent: '#ca8a04' },
            { primary: '#0891b2', secondary: '#0d9488', accent: '#7c2d12' },
            { primary: '#7c3aed', secondary: '#c026d3', accent: '#059669' }
        ];

        const selectedPalette = mockPalettes[Math.floor(Math.random() * mockPalettes.length)];
        
        document.getElementById('primaryColor').value = selectedPalette.primary;
        document.getElementById('primaryHex').value = selectedPalette.primary;
        document.getElementById('secondaryColor').value = selectedPalette.secondary;
        document.getElementById('secondaryHex').value = selectedPalette.secondary;
        document.getElementById('accentColor').value = selectedPalette.accent;
        document.getElementById('accentHex').value = selectedPalette.accent;

        this.updateStylePreview();
        this.showToast('AI Palette generated! 🎨');
    }

    generateCompleteStyleGuide() {
        const styleGuide = this.createStyleGuideData();
        const specContent = `# ${styleGuide.projectName} Style Guide

## Brand Identity
**Project:** ${styleGuide.projectName}
**Keywords:** ${styleGuide.brandKeywords}

## Color Palette
- **Primary:** ${styleGuide.colors.primary}
- **Secondary:** ${styleGuide.colors.secondary}
- **Accent:** ${styleGuide.colors.accent}

## Typography
- **Headings:** ${styleGuide.typography.heading}
- **Body:** ${styleGuide.typography.body}

## CSS Variables
\`\`\`css
:root {
  --color-primary: ${styleGuide.colors.primary};
  --color-secondary: ${styleGuide.colors.secondary};
  --color-accent: ${styleGuide.colors.accent};
  --font-heading: ${styleGuide.typography.heading}, sans-serif;
  --font-body: ${styleGuide.typography.body}, sans-serif;
}
\`\`\`

## Component Examples
### Buttons
\`\`\`css
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
}
\`\`\`

Generated on ${new Date().toLocaleDateString()}`;

        // Show in specs section
        this.showSection('specs');
        document.getElementById('specResult').textContent = specContent;
        this.showToast('Style Guide generated! 📋');
    }

    exportCSSVariables() {
        const styleGuide = this.createStyleGuideData();
        const cssContent = `:root {
  /* Colors */
  --color-primary: ${styleGuide.colors.primary};
  --color-secondary: ${styleGuide.colors.secondary};
  --color-accent: ${styleGuide.colors.accent};
  
  /* Typography */
  --font-heading: ${styleGuide.typography.heading}, sans-serif;
  --font-body: ${styleGuide.typography.body}, sans-serif;
  
  /* Generated on ${new Date().toLocaleDateString()} */
}`;

        const blob = new Blob([cssContent], { type: 'text/css' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${styleGuide.projectName.toLowerCase().replace(/\s+/g, '-')}-variables.css`;
        link.click();

        this.showToast('CSS Variables exported! 💾');
    }

    createStyleGuideData() {
        return {
            projectName: this.data.projectName || 'Untitled Project',
            brandKeywords: this.data.brandKeywords || 'modern, clean, professional',
            colors: {
                primary: document.getElementById('primaryColor').value,
                secondary: document.getElementById('secondaryColor').value,
                accent: document.getElementById('accentColor').value
            },
            typography: {
                heading: document.getElementById('headingFont').value,
                body: document.getElementById('bodyFont').value
            }
        };
    }

    // === MEDIA WORKFLOW FUNCTIONALITY ===
    setupMedia() {
        const imageUpload = document.getElementById('imageUpload');
        const imageInput = document.getElementById('imageInput');
        const clientName = document.getElementById('clientName');
        const assetPurpose = document.getElementById('assetPurpose');

        // Upload area click
        imageUpload.addEventListener('click', () => {
            imageInput.click();
        });

        // File input handling
        imageInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                this.processUploadedImages(files);
            }
        });

        // Drag and drop
        imageUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUpload.style.borderColor = 'var(--accent-primary)';
        });

        imageUpload.addEventListener('dragleave', () => {
            imageUpload.style.borderColor = 'var(--border)';
        });

        imageUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUpload.style.borderColor = 'var(--border)';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.processUploadedImages(files);
            }
        });

        // Asset naming
        clientName.addEventListener('input', () => {
            this.updateFilenamePreview();
        });

        assetPurpose.addEventListener('input', () => {
            this.updateFilenamePreview();
        });

        this.updateFilenamePreview();
    }

    processUploadedImages(files) {
        this.showToast('Processing images with AI... 🤖');
        
        // Mock AI processing - in real implementation, this would call ULM API
        setTimeout(() => {
            this.mockImageAnalysis();
            this.showToast('Image analysis complete! 📸');
        }, 2000);
    }

    mockImageAnalysis() {
        // Mock extracted colors
        const mockColors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c'];
        const extractedColors = document.getElementById('extractedColors');
        
        extractedColors.innerHTML = mockColors.map(color => 
            `<div class="color-swatch" style="background-color: ${color}" data-hex="${color}" title="${color}"></div>`
        ).join('');

        // Mock CSS variables
        const cssVariables = document.getElementById('cssVariables');
        cssVariables.value = `:root {
  --color-extracted-1: ${mockColors[0]};
  --color-extracted-2: ${mockColors[1]};
  --color-extracted-3: ${mockColors[2]};
  --color-extracted-4: ${mockColors[3]};
  --color-extracted-5: ${mockColors[4]};
}`;

        // Mock moodboard suggestions
        const moodboardSuggestions = document.getElementById('moodboardSuggestions');
        moodboardSuggestions.innerHTML = Array(6).fill(0).map((_, i) => 
            `<div class="moodboard-item" style="background: linear-gradient(135deg, ${mockColors[i % mockColors.length]}, ${mockColors[(i + 1) % mockColors.length]})"></div>`
        ).join('');
    }

    updateFilenamePreview() {
        const client = document.getElementById('clientName').value || 'client';
        const purpose = document.getElementById('assetPurpose').value || 'asset';
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        
        const filename = `${client}_${purpose}_${date}.jpg`;
        document.getElementById('filenamePreview').textContent = filename;
    }

    // === TECHNICAL SPECS FUNCTIONALITY ===
    setupSpecs() {
        // Spec type selection
        const specTypeButtons = document.querySelectorAll('.spec-type-btn');
        specTypeButtons.forEach(button => {
            button.addEventListener('click', () => {
                specTypeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Generate specification
        const generateSpec = document.getElementById('generateSpec');
        generateSpec.addEventListener('click', () => {
            this.generateTechnicalSpec();
        });

        // Validate specification
        const validateSpec = document.getElementById('validateSpec');
        validateSpec.addEventListener('click', () => {
            this.validateSpecification();
        });

        // Copy, download, share actions
        document.getElementById('copySpec').addEventListener('click', () => {
            this.copySpecToClipboard();
        });

        document.getElementById('downloadSpec').addEventListener('click', () => {
            this.downloadSpecification();
        });

        document.getElementById('shareSpec').addEventListener('click', () => {
            this.shareSpecification();
        });

        // Version control
        document.getElementById('saveVersion').addEventListener('click', () => {
            this.saveSpecVersion();
        });

        document.getElementById('compareVersions').addEventListener('click', () => {
            this.compareSpecVersions();
        });
    }

    generateTechnicalSpec() {
        const specType = document.querySelector('.spec-type-btn.active').dataset.type;
        const context = document.getElementById('specContext').value;
        const outputFormat = document.getElementById('outputFormat').value;
        
        const includeAria = document.getElementById('includeAria').checked;
        const includeTailwind = document.getElementById('includeTailwind').checked;
        const includeTokens = document.getElementById('includeTokens').checked;
        const includeExamples = document.getElementById('includeExamples').checked;

        // Generate spec based on type
        let specContent = this.createSpecificationContent(specType, context, outputFormat, {
            includeAria,
            includeTailwind,
            includeTokens,
            includeExamples
        });

        document.getElementById('specResult').textContent = specContent;
        this.showToast('Specification generated! 📋');
    }

    createSpecificationContent(type, context, format, options) {
        const timestamp = new Date().toLocaleDateString();
        
        switch (type) {
            case 'ui-components':
                return `# UI Components Specification

## Context
${context || 'Component specifications for the interface'}

## Component Library

### Button Component
${options.includeExamples ? '```jsx\ninterface ButtonProps {\n  variant: "primary" | "secondary" | "outline";\n  size: "sm" | "md" | "lg";\n  disabled?: boolean;\n  onClick: () => void;\n}\n```' : ''}

${options.includeTailwind ? '**Tailwind Classes:**\n- Primary: \`bg-blue-600 hover:bg-blue-700 text-white\`\n- Secondary: \`bg-gray-600 hover:bg-gray-700 text-white\`' : ''}

${options.includeAria ? '**Accessibility:**\n- role="button"\n- aria-disabled when disabled\n- Keyboard navigation support' : ''}

${options.includeTokens ? '**Design Tokens:**\n- Primary color: var(--color-primary)\n- Border radius: var(--radius-md)' : ''}

Generated on ${timestamp}`;

            case 'style-guide':
                return this.generateCompleteStyleGuide();

            case 'api-spec':
                return `# API Specification

## Endpoints
${context}

## Authentication
Bearer token required for all endpoints.

## Response Format
All responses follow the JSON:API specification.

Generated on ${timestamp}`;

            default:
                return `# ${type.replace('-', ' ').toUpperCase()} Specification

${context}

Generated on ${timestamp}`;
        }
    }

    validateSpecification() {
        const checkItems = document.querySelectorAll('.check-item');
        
        // Mock validation process
        checkItems.forEach((item, index) => {
            setTimeout(() => {
                const icon = item.querySelector('.check-icon');
                const isValid = Math.random() > 0.3; // 70% success rate
                
                if (isValid) {
                    icon.textContent = '✅';
                    item.classList.add('complete');
                } else {
                    icon.textContent = '❌';
                    item.classList.add('error');
                }
            }, (index + 1) * 500);
        });

        this.showToast('Running validation checks... ✅');
    }

    copySpecToClipboard() {
        const specContent = document.getElementById('specResult').textContent;
        navigator.clipboard.writeText(specContent).then(() => {
            this.showToast('Specification copied to clipboard! 📋');
        });
    }

    downloadSpecification() {
        const specContent = document.getElementById('specResult').textContent;
        const outputFormat = document.getElementById('outputFormat').value;
        const extension = outputFormat === 'json' ? 'json' : 'md';
        
        const blob = new Blob([specContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `specification-${Date.now()}.${extension}`;
        link.click();

        this.showToast('Specification downloaded! 📥');
    }

    shareSpecification() {
        // Mock sharing functionality
        const shareUrl = `https://specs.example.com/${Date.now()}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            this.showToast('Share URL copied to clipboard! 🔗');
        });
    }

    saveSpecVersion() {
        const specContent = document.getElementById('specResult').textContent;
        const currentVersion = document.getElementById('currentVersion').textContent;
        
        // Increment version
        const versionNum = parseInt(currentVersion.replace('v', '').split('.')[2]) + 1;
        const newVersion = `v1.0.${versionNum}`;
        
        document.getElementById('currentVersion').textContent = newVersion;
        
        // Save to version history
        this.data.specVersions = this.data.specVersions || [];
        this.data.specVersions.unshift({
            version: newVersion,
            content: specContent,
            timestamp: Date.now(),
            changes: 'Updated specification'
        });

        this.saveData();
        this.loadVersionHistory();
        this.showToast(`Version ${newVersion} saved! 💾`);
    }

    loadVersionHistory() {
        const versionHistory = document.getElementById('versionHistory');
        
        if (!this.data.specVersions || this.data.specVersions.length === 0) {
            versionHistory.innerHTML = '<p class="text-muted">No version history yet.</p>';
            return;
        }

        versionHistory.innerHTML = this.data.specVersions.map(version => `
            <div class="version-item">
                <div>
                    <strong>${version.version}</strong>
                    <span class="text-muted"> - ${new Date(version.timestamp).toLocaleDateString()}</span>
                </div>
                <div class="text-muted">${version.changes}</div>
            </div>
        `).join('');
    }

    compareSpecVersions() {
        this.showToast('Version comparison feature coming soon! 🔍');
    }

    // === EXPORT FUNCTIONALITY ===
    setupExport() {
        const exportBtn = document.getElementById('exportBtn');
        
        exportBtn.addEventListener('click', () => {
            this.exportData();
        });
    }

    exportData() {
        const exportData = {
            currentPrompt: this.currentPrompt,
            vibeLibrary: this.data.vibeLibrary,
            iterationLog: this.data.iterationLog,
            projectName: this.data.projectName,
            brandKeywords: this.data.brandKeywords,
            models: this.data.models,
            aiWorkflow: this.data.aiWorkflow,
            specVersions: this.data.specVersions,
            exportedAt: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `prompt-workstation-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showToast('Data exported! 📤');
    }

    // === UTILITY METHODS ===
    showSection(sectionName) {
        const button = document.querySelector(`[data-section="${sectionName}"]`);
        if (button) button.click();
    }

    showToast(message) {
        // Simple toast implementation
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: 600;
            box-shadow: 0 4px 12px var(--shadow);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// === INITIALIZE THE APP ===
document.addEventListener('DOMContentLoaded', () => {
    window.promptWorkstation = new PromptWorkstation();
    console.log('🚀 Vibe Coder\'s Prompt Engineering Workstation loaded!');
});

// === PWA FEATURES (OPTIONAL) ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can add service worker registration here for offline functionality
    });
}

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + S to save current prompt
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (window.promptWorkstation && window.promptWorkstation.currentPrompt.trim()) {
            window.promptWorkstation.saveCurrentPrompt();
        }
    }
    
    // Cmd/Ctrl + E to export
    if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        if (window.promptWorkstation) {
            window.promptWorkstation.exportData();
        }
    }
});