"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import type { ContentItem } from "@/types/content";

const ENTRY_LIMITS_TIPS = 2;

interface LiveTipCardsProps {
  initialTipCards: ContentItem[];
}

export default function LiveTipCards({ initialTipCards }: LiveTipCardsProps) {
  const pathname = usePathname();
  const [tipCards, setTipCards] = useState<ContentItem[]>(initialTipCards);

  const fetchTips = () => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        const tips = d.tipsWithDingtalk ?? [];
        setTipCards(tips.slice(0, ENTRY_LIMITS_TIPS));
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (pathname !== "/") return;
    fetchTips();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchTips();
    };
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) fetchTips();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          热门研发技巧
        </h2>
        <Link href="/dev" className="text-primary text-sm font-medium">
          进入研发AI →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tipCards.map((item) => (
          <ArticleCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
