export interface OpenClawDocLink {
  title: string;
  url: string;
}

export interface OpenClawShrimpGuideItem {
  title: string;
  url: string;
  description?: string;
}

export interface OpenClawRelatedMaterial {
  title: string;
  url: string;
  source?: string;
}

export interface OpenClawShowcaseConfig {
  title: string;
  subtitle?: string;
  author?: string;
  status: string;
  description?: string;
  primaryFeatures?: string[];
  advancedUsage?: string;
  skillsExample?: {
    label: string;
    description: string;
  };
  highlights?: string[];
  ctaHref: string;
  ctaText: string;
  currentFeatures?: string[];
  futurePlan?: string[];
  openClawDocs?: OpenClawDocLink[];
  shrimpGuide?: OpenClawShrimpGuideItem[];
  relatedMaterials?: OpenClawRelatedMaterial[];
}
