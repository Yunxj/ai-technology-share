import { promises as fs } from "fs";
import path from "path";
import type {
  SiteConfig,
  HomeConfig,
  RoleEntryConfig,
  KbEntryConfig,
  HotTagsConfig,
  NewFeaturesConfig,
  AboutConfig,
  ConfigKey,
} from "@/types/config";
import type { FrontendConfig } from "@/types/frontend-config";
import type { DesignFidelityConfig } from "@/types/design-fidelity-config";
import type { RoadmapConfig } from "@/types/roadmap-config";
import type { AiQaConfig } from "@/types/ai-qa-config";
import type { ContributorsConfig } from "@/types/contributors-config";
import type { RdDynamicsConfig } from "@/types/rd-dynamics-config";

const DATA_DIR = path.join(process.cwd(), "data");

const KEY_TO_FILE: Record<ConfigKey, string> = {
  site: "site-config.json",
  home: "home-config.json",
  "role-entry": "role-entry-config.json",
  "kb-entry": "kb-entry-config.json",
  "hot-tags": "hot-tags-config.json",
  "new-features": "new-features-config.json",
  about: "about-config.json",
};

const DEFAULTS: Record<ConfigKey, object> = {
  site: {
    name: "AI提效工坊",
    logoText: "AI提效工坊",
    badge: "内部 · 研发版",
    socialLinks: {},
    footer: {
      copyright: "© 2025 软件研发公司 · 内部AI场景技术分享站 · 一期研发提效版",
      links: [
        { label: "关于", href: "/about" },
        { label: "知识库", href: "/kb" },
        { label: "管理后台", href: "/admin" },
      ],
      extra: "数据由管理后台录入维护，支持会议分享、钉钉文档、AI编辑器技巧等持续更新",
    },
  },
  home: {
    mainTitleHighlight: "AI提效",
    mainTitleSuffix: "工坊",
    subtitle: "内部 AI 运用场景技术分享 — 研发技巧、知识库、团队建设",
    slogan: "效率翻倍",
  },
  "role-entry": {
    roles: [
      { id: "dev", label: "研发", href: "/dev", enabled: true, badge: "热门·提效" },
      { id: "test", label: "测试", href: "#", enabled: false, badge: "二期 筹备中" },
      { id: "product", label: "产品", href: "#", enabled: false, badge: "二期 筹备中" },
      { id: "ui", label: "UI设计", href: "#", enabled: false, badge: "二期 筹备中" },
    ],
  },
  "kb-entry": {
    title: "研发AI知识库",
    description: "研发技巧、大模型评测、工具推荐、钉钉文档 — 管理后台录入，支持持续更新",
    linkText: "进入知识库",
  },
  "hot-tags": {
    tags: ["#Cursor", "#AI编辑器", "#提示词", "#本地模型", "#单元测试", "#钉钉文档", "#会议分享", "#Qwen"],
  },
  "new-features": { items: [] },
  about: {
    title: "关于 AI 提效工坊",
    paragraphs: [
      "AI 提效工坊是公司内部 AI 运用场景技术分享网站，一期聚焦研发 AI 内容。",
      "我们提供知识库、全局搜索、钉钉文档跳转、管理后台和 AI 智能录入等功能，帮助研发同学更好地利用 AI 工具提升工作效率。",
      "欢迎分享你的 AI 技巧与工具，让 AI 落地每个岗位。",
    ],
  },
};

function getConfigPath(key: ConfigKey): string {
  return path.join(DATA_DIR, KEY_TO_FILE[key]);
}

export async function getConfig<T = object>(key: ConfigKey): Promise<T> {
  const filePath = getConfigPath(key);
  const defaultVal = DEFAULTS[key] as T;
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data) as T;
    return { ...defaultVal, ...parsed } as T;
  } catch {
    return defaultVal;
  }
}

export async function saveConfig<T = object>(key: ConfigKey, config: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    getConfigPath(key),
    JSON.stringify(config, null, 2),
    "utf-8"
  );
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return getConfig<SiteConfig>("site");
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  return saveConfig("site", config);
}

export async function getHomeConfig(): Promise<HomeConfig> {
  return getConfig<HomeConfig>("home");
}

export async function getRoleEntryConfig(): Promise<RoleEntryConfig> {
  return getConfig<RoleEntryConfig>("role-entry");
}

export async function getKbEntryConfig(): Promise<KbEntryConfig> {
  return getConfig<KbEntryConfig>("kb-entry");
}

export async function getHotTagsConfig(): Promise<HotTagsConfig> {
  return getConfig<HotTagsConfig>("hot-tags");
}

export async function getNewFeaturesConfig(): Promise<NewFeaturesConfig> {
  return getConfig<NewFeaturesConfig>("new-features");
}

export async function getAboutConfig(): Promise<AboutConfig> {
  return getConfig<AboutConfig>("about");
}

export function isValidConfigKey(key: string): key is ConfigKey {
  return key in KEY_TO_FILE;
}

export async function getFrontendConfig(): Promise<FrontendConfig> {
  const filePath = path.join(DATA_DIR, "frontend-config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as FrontendConfig;
}

export async function getDesignFidelityConfig(): Promise<DesignFidelityConfig> {
  const filePath = path.join(DATA_DIR, "design-fidelity-config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as DesignFidelityConfig;
}

export async function getRoadmapConfig(): Promise<RoadmapConfig> {
  const filePath = path.join(DATA_DIR, "roadmap-config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as RoadmapConfig;
}

export async function getAiQaConfig(): Promise<AiQaConfig> {
  const filePath = path.join(DATA_DIR, "ai-qa-config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as AiQaConfig;
}

export async function getContributorsConfig(): Promise<ContributorsConfig> {
  const filePath = path.join(DATA_DIR, "contributors-config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as ContributorsConfig;
}

export async function getRdDynamicsConfig(): Promise<RdDynamicsConfig> {
  const filePath = path.join(DATA_DIR, "rd-dynamics-config.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as RdDynamicsConfig;
}
