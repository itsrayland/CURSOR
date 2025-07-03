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
        this.setupLibrary();
        this.setupTest();
        this.setupLog();
        this.setupExport();
        this.loadStarterTemplates();
        this.loadSavedPrompts();
        this.loadLogEntries();
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