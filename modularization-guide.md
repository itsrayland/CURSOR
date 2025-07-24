# JavaScript Modularization Guide

## Breaking Down script.js into Modules

Your current `script.js` file is 1,479 lines - let's break it into manageable modules:

## Proposed Module Structure

```
src/scripts/
├── main.js                    # Entry point, initialization
├── core/
│   ├── app.js                # Main application controller
│   ├── state.js              # State management
│   └── events.js             # Event handling system
├── components/
│   ├── goalSetter.js         # Goal setter functionality
│   ├── aiModels.js           # AI model selection/config
│   ├── promptCrafter.js      # Prompt crafting interface
│   ├── library.js            # Template library
│   ├── styleGuide.js         # Style guide generator
│   └── vibeRating.js         # Vibe rating system
├── ai/
│   ├── claude.js             # Claude integration
│   ├── openai.js             # OpenAI integration
│   ├── ulm.js                # ULM integration
│   └── workflowBuilder.js    # AI workflow orchestration
├── storage/
│   ├── localStorage.js       # Local storage wrapper
│   ├── sessionManager.js     # Session management
│   └── dataSync.js           # Data synchronization
├── utils/
│   ├── dom.js                # DOM manipulation helpers
│   ├── format.js             # Text formatting utilities
│   ├── validation.js         # Input validation
│   └── constants.js          # App-wide constants
└── templates/
    ├── promptTemplates.js    # Prompt template definitions
    └── uiTemplates.js        # UI template strings
```

## Module Examples

### 1. **main.js** - Application Entry Point
```javascript
// main.js
import { App } from './core/app.js';
import { initializeEventListeners } from './core/events.js';
import { loadSavedState } from './storage/localStorage.js';
import './styles/main.css';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  
  // Load saved state
  loadSavedState();
  
  // Initialize event listeners
  initializeEventListeners();
  
  // Start the app
  app.init();
});
```

### 2. **core/state.js** - Centralized State Management
```javascript
// core/state.js
export class AppState {
  constructor() {
    this.state = {
      currentProject: null,
      selectedModel: 'claude',
      prompts: [],
      workflows: [],
      vibeRatings: {}
    };
    
    this.listeners = new Set();
  }
  
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }
  
  getState() {
    return { ...this.state };
  }
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const appState = new AppState();
```

### 3. **components/promptCrafter.js** - Prompt Crafting Module
```javascript
// components/promptCrafter.js
import { appState } from '../core/state.js';
import { saveToLocalStorage } from '../storage/localStorage.js';
import { validatePrompt } from '../utils/validation.js';
import { PROMPT_TEMPLATES } from '../templates/promptTemplates.js';

export class PromptCrafter {
  constructor(container) {
    this.container = container;
    this.textarea = container.querySelector('#prompt-input');
    this.charCount = container.querySelector('#char-count');
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadTemplates();
  }
  
  setupEventListeners() {
    this.textarea.addEventListener('input', () => {
      this.updateCharCount();
      this.autoSave();
    });
  }
  
  updateCharCount() {
    const count = this.textarea.value.length;
    this.charCount.textContent = `${count} characters`;
  }
  
  autoSave() {
    const prompt = this.textarea.value;
    appState.setState({ currentPrompt: prompt });
    saveToLocalStorage('currentPrompt', prompt);
  }
  
  insertTemplate(templateId) {
    const template = PROMPT_TEMPLATES[templateId];
    if (template) {
      this.textarea.value += template.content;
      this.updateCharCount();
    }
  }
}
```

### 4. **utils/dom.js** - DOM Utilities
```javascript
// utils/dom.js
export const $ = (selector, parent = document) => 
  parent.querySelector(selector);

export const $$ = (selector, parent = document) => 
  Array.from(parent.querySelectorAll(selector));

export const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
};

export const show = (element) => element.style.display = 'block';
export const hide = (element) => element.style.display = 'none';
export const toggle = (element) => {
  element.style.display = 
    element.style.display === 'none' ? 'block' : 'none';
};
```

## Migration Steps

### Step 1: Create Module Files
1. Create all the directory structure
2. Create empty module files with basic exports

### Step 2: Extract Functionality
1. Identify related functions in script.js
2. Group them by feature/responsibility
3. Move to appropriate modules

### Step 3: Convert to ES6 Modules
1. Add `import` statements for dependencies
2. Add `export` statements for public APIs
3. Update function declarations to use modern syntax

### Step 4: Update HTML
```html
<!-- Change from -->
<script src="script.js"></script>

<!-- To -->
<script type="module" src="scripts/main.js"></script>
```

### Step 5: Add Module Loading
```javascript
// For dynamic imports
const loadAIModule = async (modelType) => {
  const module = await import(`./ai/${modelType}.js`);
  return module.default;
};
```

## Benefits of Modularization

1. **Maintainability** - Easier to find and fix code
2. **Reusability** - Modules can be reused across projects
3. **Testing** - Individual modules can be unit tested
4. **Performance** - Load only what you need
5. **Collaboration** - Teams can work on different modules
6. **Type Safety** - Better IDE support and type inference

## Common Patterns

### Singleton Pattern
```javascript
// storage/localStorage.js
class LocalStorageManager {
  constructor() {
    if (LocalStorageManager.instance) {
      return LocalStorageManager.instance;
    }
    LocalStorageManager.instance = this;
  }
}

export default new LocalStorageManager();
```

### Factory Pattern
```javascript
// ai/modelFactory.js
export const createAIModel = (type) => {
  switch(type) {
    case 'claude': return new ClaudeModel();
    case 'openai': return new OpenAIModel();
    case 'ulm': return new ULMModel();
    default: throw new Error(`Unknown model type: ${type}`);
  }
};
```

### Observer Pattern
```javascript
// core/events.js
export class EventBus {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
```

## Testing Structure

```
tests/
├── unit/
│   ├── components/
│   │   ├── promptCrafter.test.js
│   │   └── aiModels.test.js
│   └── utils/
│       ├── validation.test.js
│       └── format.test.js
└── integration/
    ├── workflow.test.js
    └── storage.test.js
```

This modular structure will make your codebase much more maintainable and scalable!