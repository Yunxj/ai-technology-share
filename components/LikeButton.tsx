"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp } from "lucide-react";

const LIKED_KEY_PREFIX = "liked-";

interface LikeButtonProps {
  contentId: string;
  initialCount?: number;
  className?: string;
}

export default function LikeButton({
  contentId,
  initialCount = 0,
  className = "",
}: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(`${LIKED_KEY_PREFIX}${contentId}`)) {
      setLiked(true);
    }
  }, [contentId]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked || loading) return;

    const key = `${LIKED_KEY_PREFIX}${contentId}`;
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      setLiked(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/content/${contentId}/like`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setCount(data.likeCount ?? count + 1);
        setLiked(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(key, "true");
        }
      } else if (res.status === 429) {
        alert("操作过于频繁，请稍后再试");
      } else {
        alert(data?.error || "点赞失败，请稍后重试");
      }
    } catch {
      alert("网络错误，请检查连接后重试");
    } finally {
      setLoading(false);
    }
  };

  const isLiked =
    liked ||
    (typeof window !== "undefined" &&
      !!localStorage.getItem(`${LIKED_KEY_PREFIX}${contentId}`));

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLiked || loading}
      className={`inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:opacity-70 ${className}`}
      aria-label="点赞"
    >
      <ThumbsUp
        className={`w-4 h-4 ${isLiked ? "text-red-500 fill-red-500" : "text-slate-500"}`}
      />
      <span className={isLiked ? "text-red-500" : ""}>{count}</span>
    </button>
  );
}
