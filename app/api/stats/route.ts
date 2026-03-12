import { getAllContent } from "@/lib/data";

export async function GET() {
  const allContent = await getAllContent();
  const typeCounts = ["tips", "models", "tools", "editors", "team", "dingtalk", "problems"].map(
    (type) => ({
      type,
      count: allContent.filter((c) => c.type === type).length,
    })
  );
  const totalViews = allContent.reduce((s, c) => s + (c.viewCount ?? 0), 0);
  const totalLikes = allContent.reduce((s, c) => s + (c.likeCount ?? 0), 0);
  const totalArticles = typeCounts.reduce((s, t) => s + t.count, 0);
  const contributorCount = new Set(
    allContent.map((c) => c.author).filter((a): a is string => Boolean(a))
  ).size;

  const tips = allContent.filter((c) => c.type === "tips");
  const dingtalk = allContent.filter((c) => c.type === "dingtalk");
  const tipsWithDingtalk = [...tips, ...dingtalk].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return Response.json({
    totalViews,
    totalLikes,
    totalArticles,
    contributorCount,
    typeCounts,
    tipsWithDingtalk,
  });
}
