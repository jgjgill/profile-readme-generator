export interface ReadmeTemplate {
  content: string;
  sections: Record<string, string>;
}

export type TemplateType = 'basic' | 'impact' | 'tech-expert' | 'project-leader' | 'creator' | 'oss-contributor' | 'entry-level';

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  targetAudience: string;
  features: string[];
}