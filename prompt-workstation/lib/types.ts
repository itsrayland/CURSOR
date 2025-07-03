export interface PromptTemplate {
  id: string;
  name: string;
  model: 'claude' | 'openai' | 'ulm';
  category: 'planning' | 'prototyping' | 'design' | 'code';
  template: string;
  parameters: Parameter[];
  description: string;
  examples?: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Parameter {
  name: string;
  type: 'text' | 'select' | 'color' | 'number' | 'boolean';
  required: boolean;
  defaultValue?: any;
  options?: string[];
  description: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'prompt' | 'review' | 'generate' | 'validate';
  templateId?: string;
  config: Record<string, any>;
  nextSteps: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  startStepId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StyleGuide {
  id: string;
  projectName: string;
  colors: ColorToken[];
  typography: TypographyScale;
  spacing: SpacingSystem;
  components: ComponentSpec[];
  assets: Asset[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorToken {
  name: string;
  value: string;
  usage: string;
  category: 'primary' | 'accent' | 'neutral' | 'semantic';
}

export interface TypographyScale {
  fontFamilies: {
    heading: string;
    body: string;
    mono: string;
  };
  sizes: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
    h5: TextStyle;
    h6: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
}

export interface TextStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
}

export interface SpacingSystem {
  base: number;
  scale: number[];
}

export interface ComponentSpec {
  id: string;
  name: string;
  type: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  variants: ComponentVariant[];
  accessibility: AccessibilitySpec;
}

export interface ComponentVariant {
  name: string;
  props: Record<string, any>;
  description: string;
}

export interface AccessibilitySpec {
  ariaRoles: string[];
  keyboardNav: boolean;
  screenReaderText?: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'icon' | 'font';
  url: string;
  altText?: string;
  metadata: Record<string, any>;
}

export interface ProjectContext {
  id: string;
  name: string;
  client: string;
  description: string;
  styleGuideId?: string;
  workflows: string[];
  prompts: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedSpec {
  id: string;
  projectId: string;
  type: 'component' | 'layout' | 'full-spec';
  content: string;
  format: 'markdown' | 'json' | 'jsx';
  metadata: Record<string, any>;
  createdAt: Date;
}