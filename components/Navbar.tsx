import Link from "next/link";
import { Bot } from "lucide-react";
import SearchBox from "./SearchBox";
import NavLinks from "./NavLinks";
import type { SiteConfig } from "@/types/config";

const DEFAULT_CONFIG = {
  name: "AI提效工坊",
  logoText: "AI提效工坊",
  badge: "内部 · 研发版",
};

export default function Navbar({ config }: { config?: SiteConfig | null }) {
  const logoText = config?.logoText ?? DEFAULT_CONFIG.logoText;
  const badge = config?.badge ?? DEFAULT_CONFIG.badge;

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 py-4 border-b border-black/5 bg-[#f5f7fb] backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primaryPurple flex items-center justify-center text-white">
          <Bot className="w-5 h-5" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {logoText}
        </span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 ml-1">
          {badge}
        </span>
      </Link>
      <NavLinks />
      <div className="flex items-center">
        <SearchBox />
      </div>
    </nav>
  );
}
