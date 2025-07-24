#!/bin/bash

# Project Structure Migration Script
# This script helps migrate the current project to the new structure

echo "🚀 Starting Project Structure Migration..."

# Create backup
echo "📦 Creating backup..."
mkdir -p backups
timestamp=$(date +%Y%m%d_%H%M%S)
cp -r . "backups/backup_$timestamp" 2>/dev/null || true

# Create new directory structure
echo "📁 Creating new directory structure..."

# Main directories
mkdir -p .github/workflows
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p docs/{api,guides,design,development}
mkdir -p public/{images,fonts}
mkdir -p src/components/{ai-models,prompt-crafter,goal-setter,library}
mkdir -p src/styles/{base,components,layouts,themes,utilities}
mkdir -p src/scripts/{core,ai,storage,utils}
mkdir -p src/templates/prompts
mkdir -p src/config
mkdir -p examples/{basic,advanced}
mkdir -p tests/{unit,integration}
mkdir -p build

# Move existing files
echo "📂 Moving files to new locations..."

# Move documentation files
mv design-improvement-plan.md docs/design/ 2>/dev/null || true
mv implementation-guide.md docs/guides/ 2>/dev/null || true
mv project-summary.md docs/ 2>/dev/null || true
mv prompt_engineering_workstation_build.md docs/development/ 2>/dev/null || true
mv docs/STYLE_COORDINATOR_GUIDE.md docs/guides/ 2>/dev/null || true

# Move example files
mv design-examples.html examples/basic/ 2>/dev/null || true
mv design-examples.css examples/basic/ 2>/dev/null || true
mv claude-best-practices.html examples/advanced/ 2>/dev/null || true
mv shrink-wrap-methodology.html examples/advanced/ 2>/dev/null || true
mv example/index.html examples/basic/simple-example.html 2>/dev/null || true

# Move source files
mv index.html src/ 2>/dev/null || true
mv script.js src/scripts/main.js 2>/dev/null || true
mv styles.css src/styles/main.css 2>/dev/null || true
mv src/tasker.js src/scripts/modules/ 2>/dev/null || true

# Move existing src/styles files
mv src/styles/StyleCoordinator.js src/scripts/modules/ 2>/dev/null || true
mv src/styles/base.css src/styles/base/ 2>/dev/null || true
mv src/styles/config.js src/config/ 2>/dev/null || true

# Create essential files
echo "📝 Creating essential project files..."

# Create package.json
cat > package.json << 'EOF'
{
  "name": "prompt-engineering-workstation",
  "version": "1.0.0",
  "description": "Professional AI prompt engineering workstation",
  "main": "src/index.html",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "test": "jest"
  },
  "keywords": [
    "prompt-engineering",
    "ai",
    "workstation",
    "claude",
    "openai"
  ],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "vite": "^5.0.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0",
    "jest": "^29.7.0",
    "@testing-library/jest-dom": "^6.2.0"
  },
  "dependencies": {
    "marked": "^11.1.0"
  }
}
EOF

# Create vite.config.js
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
});
EOF

# Create .eslintrc.json
cat > .eslintrc.json << 'EOF'
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
EOF

# Create .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
EOF

# Create jsconfig.json
cat > jsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@scripts/*": ["scripts/*"],
      "@styles/*": ["styles/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create .env.example
cat > .env.example << 'EOF'
# AI API Keys (Keep these secret!)
CLAUDE_API_KEY=your_claude_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Application Settings
APP_ENV=development
APP_PORT=3000
EOF

# Create CONTRIBUTING.md
cat > CONTRIBUTING.md << 'EOF'
# Contributing to Prompt Engineering Workstation

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue that pull request!

## Code Style

- Use ESLint and Prettier configurations
- Follow the existing code style
- Comment your code where necessary

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
EOF

# Clean up empty directories
echo "🧹 Cleaning up..."
rmdir example 2>/dev/null || true
rmdir src/styles 2>/dev/null || true

echo "✅ Migration complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review the new structure"
echo "2. Run: npm install"
echo "3. Update any hardcoded file paths in your HTML/JS files"
echo "4. Test the application"
echo "5. Commit the changes"
echo ""
echo "💡 Your original files are backed up in: backups/backup_$timestamp"