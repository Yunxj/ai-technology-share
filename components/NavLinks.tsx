"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页", exact: true },
  { href: "/dev", label: "研发AI", exact: true },
  { href: "/frontend", label: "前端团队", exact: true },
  { href: "/kb", label: "知识库", exact: true },
  { href: "/about", label: "关于", exact: true },
];

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex items-center gap-6 font-medium text-slate-600">
      {links.map(({ href, label, exact }) => {
        const active = isActive(href, exact);
        const baseClass = `pb-1 border-b-2 transition-colors ${
          active
            ? "text-primary font-semibold border-primary"
            : "border-transparent hover:text-primary hover:border-slate-200"
        }`;
        return (
          <Link key={href} href={href} className={baseClass}>
            {label}
          </Link>
        );
      })}
      <span className="text-slate-400 text-sm pb-1">更多岗位 (二期)</span>
    </div>
  );
}
