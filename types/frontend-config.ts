export interface PromotionConfig {
  painPoints: string;
  case: string;
  installCommand: string;
  installNote: string;
}

export interface WorkflowStep {
  step: number;
  name: string;
  role: string;
  aiRole: string;
  humanRole: string;
  output: string;
}

export interface FrameworkChapter {
  id: string;
  title: string;
  summary: string;
}

export interface ToolRelationship {
  label: string;
  trigger: string;
  mode: string;
}

export interface SkillItem {
  id: string;
  project: string;
  content: string;
}

export interface RuleItem {
  id: string;
  globs: string;
  content: string;
}

export interface PromptItem {
  id: string;
  name: string;
  step: string;
  usage: string;
}

export interface RequirementTemplate {
  id: string;
  name: string;
  usage: string;
}

export interface ScriptUsageItem {
  label: string;
  command: string;
}

export interface ReadingPath {
  role: string;
  duration: string;
  docs: string[];
}

export interface TechStackProject {
  name: string;
  values: string[];
}

export interface FrontendConfig {
  version: string;
  projects: string[];
  promotion: PromotionConfig;
  workflowSteps: WorkflowStep[];
  frameworkChapters: FrameworkChapter[];
  tools: {
    relationship: {
      skills: ToolRelationship;
      rules: ToolRelationship;
      prompts: ToolRelationship;
    };
    skills: SkillItem[];
    rules: RuleItem[];
    prompts: PromptItem[];
  };
  templates: {
    requirementTemplates: RequirementTemplate[];
    componentMapping: string;
  };
  scriptUsage: ScriptUsageItem[];
  readingPaths: ReadingPath[];
  techStackTable: {
    dimensions: string[];
    projects: TechStackProject[];
  };
}
