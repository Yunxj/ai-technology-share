import { getAllContent, getContent } from "@/lib/data";
import {
  getSiteConfig,
  getHomeConfig,
  getRoleEntryConfig,
  getKbEntryConfig,
  getDesignFidelityConfig,
  getRoadmapConfig,
  getAiQaConfig,
  getContributorsConfig,
  getRdDynamicsConfig,
} from "@/lib/config";
import HomeContent from "@/components/HomeContent";

export default async function HomePage() {
  const [
    allContent,
    tips,
    dingtalk,
    team,
    editors,
    siteConfig,
    homeConfig,
    roleEntryConfig,
    kbEntryConfig,
    designFidelityConfig,
    roadmapConfig,
    aiQaConfig,
    contributorsConfig,
    rdDynamicsConfig,
  ] = await Promise.all([
    getAllContent(),
    getContent("tips"),
    getContent("dingtalk"),
    getContent("team"),
    getContent("editors"),
    getSiteConfig(),
    getHomeConfig(),
    getRoleEntryConfig(),
    getKbEntryConfig(),
    getDesignFidelityConfig(),
    getRoadmapConfig(),
    getAiQaConfig(),
    getContributorsConfig(),
    getRdDynamicsConfig(),
  ]);

  const typeCounts = ["tips", "models", "tools", "editors", "team", "dingtalk"].map((type) => ({
    type,
    count: allContent.filter((c) => c.type === type).length,
  }));
  const totalViews = allContent.reduce((s, c) => s + (c.viewCount ?? 0), 0);
  const totalLikes = allContent.reduce((s, c) => s + (c.likeCount ?? 0), 0);
  const totalArticles = typeCounts.reduce((s, t) => s + t.count, 0);
  const contributorCount = new Set(
    allContent.map((c) => c.author).filter((a): a is string => Boolean(a))
  ).size;

  const tipsWithDingtalk = [...tips, ...dingtalk].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <HomeContent
      team={team}
      editors={editors}
      tipsWithDingtalk={tipsWithDingtalk}
      typeCounts={typeCounts}
      totalViews={totalViews}
      totalLikes={totalLikes}
      totalArticles={totalArticles}
      contributorCount={contributorCount}
      siteConfig={siteConfig}
      homeConfig={homeConfig}
      roleEntryConfig={roleEntryConfig}
      kbEntryConfig={kbEntryConfig}
      designFidelityConfig={designFidelityConfig}
      roadmapConfig={roadmapConfig}
      aiQaConfig={aiQaConfig}
      contributorsConfig={contributorsConfig}
      rdDynamicsConfig={rdDynamicsConfig}
    />
  );
}
