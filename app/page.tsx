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
  getOpenClawShowcaseConfig,
} from "@/lib/config";
import { getAdminToken, verifyAdmin } from "@/lib/auth";
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
    openClawShowcaseConfig,
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
    getOpenClawShowcaseConfig(),
  ]);

  const typeCounts = ["tips", "models", "tools", "editors", "team", "dingtalk", "problems"].map((type) => ({
    type,
    count: allContent.filter((c) => c.type === type).length,
  }));
  const totalViews = allContent.reduce((s, c) => s + (c.viewCount ?? 0), 0);
  const totalLikes = allContent.reduce((s, c) => s + (c.likeCount ?? 0), 0);
  const totalArticles = typeCounts.reduce((s, t) => s + t.count, 0);
  const contributorCount = new Set(
    allContent.map((c) => c.author).filter((a): a is string => Boolean(a))
  ).size;

  const tipsWithDingtalk = [...tips, ...dingtalk, ...team].sort((a, b) => {
    const likeA = a.likeCount ?? 0;
    const likeB = b.likeCount ?? 0;
    if (likeB !== likeA) return likeB - likeA;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const token = await getAdminToken();
  const isLoggedIn = verifyAdmin(token);

  return (
    <HomeContent
      allContent={allContent}
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
      openClawShowcaseConfig={openClawShowcaseConfig}
      isLoggedIn={isLoggedIn}
    />
  );
}
