# Enhanced Cursor Background Agent Prompt: Vibe Coder's Prompt Engineering Workstation

## Task Overview
Build a simple, intuitive prompt engineering workstation that guides developers through the actual process of crafting prompts for coding tasks. Think like a prompt engineer who codes by vibes - focus on the flow, the feel, and the iterative process of getting AI to write better code. This should be a single-page vanilla JavaScript application optimized for iPad use.

## Core Workflow-Driven Interface

### 1. The Coding Journey Interface
Create a simple, guided workflow with these main areas:
- **🎯 Goal Setter** - "What are you trying to build?" (simple input)
- **🧠 Prompt Crafter** - The main workspace for writing and refining prompts
- **⚡ Quick Test** - One-click testing area to see how prompts feel
- **📚 Vibe Library** - Collection of prompts that "just work"
- **🔄 Iteration Log** - Track what worked and what didn't

### 2. 🧠 Prompt Crafter (The Main Vibe Space)
- **Clean Text Area** - Simple, distraction-free writing space (textarea with good styling)
- **Prompt Recipe Buttons** - One-click insertion of common patterns:
  - "You are a [ROLE]..." starter
  - "Here's the context: [CONTEXT]" 
  - "Step by step:" for complex tasks
  - "Examples:" for few-shot prompting
- **Live Character Count** - Simple counter, no overwhelming metrics
- **Feeling Tracker** - Rate how you feel about the current prompt (1-5 vibes)
- **Quick Save** - Auto-save as you type, manual save for good versions

### 3. 📚 Vibe Library (Prompts That Just Work)
- **Simple Cards** - Each prompt as a card with title and preview
- **Copy & Tweak** - One-click copy to crafter with easy modification
- **Vibe Tags** - Simple tags like "debugging", "refactoring", "new feature"
- **Success Stories** - Notes on when/why each prompt worked well
- **Quick Search** - Simple text search, no complex filters

### 4. ⚡ Quick Test (Feel the Prompt)
- **Mock Response Area** - Simulate what AI might respond with
- **Prompt Preview** - See your prompt formatted nicely
- **Context Injection** - Quick way to add sample code/context for testing
- **Vibe Check** - Does this prompt feel right? Quick yes/no

### 5. 🔄 Iteration Log (Learn From the Journey)
- **Simple Timeline** - What you tried, what worked, what didn't  
- **Before/After Comparisons** - See how prompts evolved
- **Lessons Learned** - Quick notes on insights
- **Pattern Recognition** - Notice what makes prompts work for you

### 6. 🎯 Goal Setter (Start With Intent)
- **Project Context** - What are you building? (simple text input)
- **Current Challenge** - What specific problem needs solving?
- **Desired Outcome** - What should the AI help you achieve?
- **Constraint Notes** - Any limitations or requirements

## Technical Implementation (Vanilla JS + iPad Optimized)

### Core Tech Stack
- **Pure HTML5, CSS3, and Vanilla JavaScript** - No frameworks, keep it simple
- **CSS Grid and Flexbox** for responsive iPad layouts
- **Touch-friendly interface** - Large touch targets, swipe gestures
- **Existing internal CSS** - Leverage what's already available
- **localStorage** for persistence - Simple key-value storage

### iPad-First Design
- **Large touch targets** (minimum 44px)
- **Swipe navigation** between sections
- **Virtual keyboard friendly** - inputs don't get covered
- **Portrait/landscape adaptive** layouts
- **No hover states** - everything should work with touch
- **Pull-to-refresh** for data sync

### Simple Data Structure
```javascript
{
  currentPrompt: "string",
  vibeLibrary: [{id, title, prompt, tags, vibeRating, notes}],
  iterationLog: [{timestamp, prompt, outcome, lessons}],
  projectContext: "string",
  settings: {theme: "light|dark"}
}
```

### User Experience Focus
- **One-hand operation** - Everything reachable with thumb
- **Immediate feedback** - Visual responses to all interactions  
- **Gentle guidance** - Subtle hints, not overwhelming
- **Smooth animations** - CSS transitions for polish
- **Offline-first** - Works without internet

## Starter Vibe Prompts to Include

### 1. Debug This Mess 🐛
```
I'm stuck on this code and it's not working as expected.

Here's what I'm trying to do: [GOAL]
Here's the code: [CODE]
Here's what's happening: [ISSUE]

Please help me figure out what's wrong and suggest a fix. Explain it like you're pair programming with me.
```

### 2. Build This Feature ⚡
``` 
I need to build [FEATURE_NAME] for my project.

Context: [PROJECT_DESCRIPTION]
Requirements: [WHAT_IT_NEEDS_TO_DO]
Tech stack: [TECHNOLOGIES]

Walk me through how to implement this step by step. Give me working code I can copy and paste.
```

### 3. Refactor & Clean Up 🧹
```
This code works but it's messy and I want to make it better.

Current code: [CODE_BLOCK]
What bothers me: [ISSUES]
Goal: [DESIRED_OUTCOME]

Help me refactor this to be cleaner, more readable, and follow best practices. Show me before/after.
```

### 4. Learn This Concept 🎓
```
I'm trying to understand [CONCEPT/TECHNOLOGY] and how to use it in my project.

My current level: [BEGINNER/INTERMEDIATE/ADVANCED]
What I want to build: [PROJECT_CONTEXT]
Specific questions: [QUESTIONS]

Explain this to me with practical examples I can actually use.
```

### 5. Fix My Approach 🎯
```
I'm building [WHAT] but I think I'm approaching it wrong.

What I'm doing now: [CURRENT_APPROACH]
Problems I'm running into: [ISSUES]
What success looks like: [GOAL]

Suggest a better way to approach this problem. Be honest if I need to start over.
```

## Build It Step by Step (Vibe-Driven Approach)

### Start Simple - Get Something Working
1. **Basic HTML Structure** - Single page, simple layout
2. **Goal Setter Section** - Just a text input asking "What are you building?"
3. **Main Prompt Area** - Large textarea for writing prompts
4. **Save Button** - Store to localStorage, that's it
5. **Test with real prompts** - Make sure the basic flow feels good

### Add the Essentials - Make It Useful  
1. **Vibe Library** - Simple cards showing saved prompts
2. **Copy to Edit** - Click a card to copy prompt to main area
3. **Basic Prompt Recipes** - Buttons to insert common patterns
4. **Character counter** - Simple count display
5. **Test the workflow** - Can you actually use this to craft prompts?

### Polish the Feel - Make It Nice
1. **iPad touch optimization** - Bigger buttons, better spacing
2. **Smooth animations** - CSS transitions for interactions  
3. **Iteration log** - Track what you tried and what worked
4. **Quick Test area** - Preview how prompts will look
5. **Test on actual iPad** - Make sure it feels right

### Make It Yours - Customize and Perfect
1. **Vibe rating system** - Rate prompts 1-5 on how they feel
2. **Simple search** - Find prompts in your library
3. **Export/share** - Copy prompts to clipboard
4. **Lessons learned** - Note insights from each iteration
5. **Use it for real projects** - Dogfood your own tool

## Vibe Check - How You Know It's Working

- **Feels Natural**: You reach for this tool when you need to craft a prompt
- **Flows Smoothly**: Going from idea → prompt → test → refine feels effortless 
- **Actually Gets Used**: You find yourself using it for real projects, not just demos
- **Sparks Joy**: The interface doesn't get in your way, it helps you think
- **Works on iPad**: Feels native, not like a desktop app squeezed onto mobile
- **Saves Time**: You're crafting better prompts faster than before

## The Vibe Coder Mindset

Remember you're building for developers who:
- **Code by feel** - They know when something "clicks"
- **Iterate quickly** - Try something, see if it works, adjust
- **Value simplicity** - Fancy features are useless if the basics don't work
- **Work hands-on** - They want to touch and tweak, not analyze dashboards
- **Learn by doing** - Examples and templates beat documentation
- **Trust their gut** - If it feels right, it probably is

## Final Thoughts

Build something you'd actually want to use when you're stuck at 2am trying to get an AI to understand what you want. Make it feel like a trusty sidekick, not a complex enterprise tool. 

The best prompt engineering happens when the tool gets out of your way and lets you focus on the craft of writing prompts that just work.

Keep it simple. Make it useful. Trust the vibe.