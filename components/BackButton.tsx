"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  fallbackHref = "/kb",
  className,
}: {
  fallbackHref?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={fallbackHref}
      onClick={handleClick}
      className={
        className ??
        "inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
      }
    >
      <ArrowLeft className="w-4 h-4" />
      返回上一页
    </Link>
  );
}
