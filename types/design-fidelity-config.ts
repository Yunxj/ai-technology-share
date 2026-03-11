export interface McpStep {
  order: number;
  name: string;
  description: string;
}

export interface TokenCategory {
  name: string;
  rule: string;
  items: string[];
}

export interface PcPlatform {
  title: string;
  badge?: string;
  points: string[];
}

export interface DesignFidelityConfig {
  title: string;
  subtitle?: string;
  painPoints: string[];
  ctaHref: string;
  ctaText: string;
  pcPlatform: PcPlatform;
  miniprogramPlatform: {
    title: string;
    badge: string;
    description: string;
  };
  mcpSteps: McpStep[];
  tokenCategories: TokenCategory[];
  constraints: string[];
}
