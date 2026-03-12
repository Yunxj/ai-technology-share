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
  const team = allContent.filter((c) => c.type === "team");
  const tipsWithDingtalk = [...tips, ...dingtalk, ...team].sort((a, b) => {
    const likeA = a.likeCount ?? 0;
    const likeB = b.likeCount ?? 0;
    if (likeB !== likeA) return likeB - likeA;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return Response.json({
    totalViews,
    totalLikes,
    totalArticles,
    contributorCount,
    typeCounts,
    tipsWithDingtalk,
  });
}
