import Link from "next/link";
import type { SiteConfig } from "@/types/config";

const DEFAULT_FOOTER = {
  copyright: "© 2025 软件研发公司 · 内部AI场景技术分享站 · 一期研发提效版",
  links: [
    { label: "关于", href: "/about" },
    { label: "知识库", href: "/kb" },
    { label: "管理后台", href: "/admin" },
  ],
  extra: "数据由管理后台录入维护，支持会议分享、钉钉文档、AI编辑器技巧等持续更新",
};

export default function Footer({ config }: { config?: SiteConfig | null }) {
  const footer = config?.footer ?? DEFAULT_FOOTER;
  const links = footer.links ?? DEFAULT_FOOTER.links;

  return (
    <footer className="text-center py-8 mt-8 border-t border-slate-200 text-slate-500 text-sm">
      <p>
        {footer.copyright}
        <span className="mx-3">|</span>
        让AI落地每个岗位
      </p>
      <p className="mt-2">📢 测试/产品/UI 内容二期启动，欢迎贡献案例</p>
      {footer.extra && (
        <p className="mt-1.5 text-xs">{footer.extra}</p>
      )}
      <p className="mt-3 flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-slate-500 hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </p>
    </footer>
  );
}
