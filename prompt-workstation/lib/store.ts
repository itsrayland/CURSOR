import { create } from 'zustand';
import { PromptTemplate, Workflow, StyleGuide, ProjectContext, GeneratedSpec } from './types';

interface WorkstationStore {
  // Current project context
  currentProject: ProjectContext | null;
  setCurrentProject: (project: ProjectContext) => void;

  // Prompt templates
  promptTemplates: PromptTemplate[];
  addPromptTemplate: (template: PromptTemplate) => void;
  updatePromptTemplate: (id: string, template: Partial<PromptTemplate>) => void;
  deletePromptTemplate: (id: string) => void;

  // Workflows
  workflows: Workflow[];
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, workflow: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;

  // Style guides
  styleGuides: StyleGuide[];
  addStyleGuide: (guide: StyleGuide) => void;
  updateStyleGuide: (id: string, guide: Partial<StyleGuide>) => void;
  deleteStyleGuide: (id: string) => void;

  // Generated specs
  generatedSpecs: GeneratedSpec[];
  addGeneratedSpec: (spec: GeneratedSpec) => void;

  // UI state
  activeTab: 'prompts' | 'workflows' | 'style-guide' | 'specs';
  setActiveTab: (tab: 'prompts' | 'workflows' | 'style-guide' | 'specs') => void;
  
  selectedPromptId: string | null;
  setSelectedPromptId: (id: string | null) => void;
  
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useWorkstationStore = create<WorkstationStore>((set) => ({
  // Current project
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),

  // Prompt templates
  promptTemplates: [],
  addPromptTemplate: (template) =>
    set((state) => ({ promptTemplates: [...state.promptTemplates, template] })),
  updatePromptTemplate: (id, template) =>
    set((state) => ({
      promptTemplates: state.promptTemplates.map((t) =>
        t.id === id ? { ...t, ...template } : t
      ),
    })),
  deletePromptTemplate: (id) =>
    set((state) => ({
      promptTemplates: state.promptTemplates.filter((t) => t.id !== id),
    })),

  // Workflows
  workflows: [],
  addWorkflow: (workflow) =>
    set((state) => ({ workflows: [...state.workflows, workflow] })),
  updateWorkflow: (id, workflow) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === id ? { ...w, ...workflow } : w
      ),
    })),
  deleteWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((w) => w.id !== id),
    })),

  // Style guides
  styleGuides: [],
  addStyleGuide: (guide) =>
    set((state) => ({ styleGuides: [...state.styleGuides, guide] })),
  updateStyleGuide: (id, guide) =>
    set((state) => ({
      styleGuides: state.styleGuides.map((g) =>
        g.id === id ? { ...g, ...guide } : g
      ),
    })),
  deleteStyleGuide: (id) =>
    set((state) => ({
      styleGuides: state.styleGuides.filter((g) => g.id !== id),
    })),

  // Generated specs
  generatedSpecs: [],
  addGeneratedSpec: (spec) =>
    set((state) => ({ generatedSpecs: [...state.generatedSpecs, spec] })),

  // UI state
  activeTab: 'prompts',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  selectedPromptId: null,
  setSelectedPromptId: (id) => set({ selectedPromptId: id }),
  
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
}));