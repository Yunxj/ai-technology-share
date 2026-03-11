export interface SiteConfig {
  name: string;
  logoText: string;
  badge: string;
  socialLinks?: {
    bilibili?: string;
    wechat?: string;
    wechatQr?: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
    extra?: string;
  };
}

export interface HomeConfig {
  mainTitleHighlight: string;
  mainTitleSuffix: string;
  subtitle: string;
  slogan: string;
}

export interface RoleEntryConfig {
  roles: {
    id: string;
    label: string;
    href: string;
    enabled: boolean;
    badge: string;
  }[];
}

export interface KbEntryConfig {
  title: string;
  description: string;
  linkText: string;
}

export interface HotTagsConfig {
  tags: string[];
}

export interface NewFeaturesConfig {
  items: { title: string; description?: string; date?: string }[];
}

export interface AboutConfig {
  title: string;
  paragraphs: string[];
}

export type ConfigKey =
  | "site"
  | "home"
  | "role-entry"
  | "kb-entry"
  | "hot-tags"
  | "new-features"
  | "about";
