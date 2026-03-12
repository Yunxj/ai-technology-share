"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
  contentId: string | null;
}

export default function ViewTracker({ contentId }: ViewTrackerProps) {
  useEffect(() => {
    if (!contentId) return;
    fetch(`/api/content/${contentId}/view`, { method: "POST" }).catch(() => {});
  }, [contentId]);

  return null;
}
