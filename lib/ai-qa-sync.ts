/**
 * 外部 Q&A 平台同步模块
 * 用于从 Coze/豆包 等平台获取 answerCount、daysAgo 等统计
 */

export interface ExternalQaStats {
  answerCount: number;
  daysAgo: number;
}

export type SyncSource = "coze" | "doubao";

/**
 * 从外部平台获取问题统计
 * @param externalId 外部 API 问题/对话 ID
 * @param source 数据源：coze | doubao
 * @returns 统计结果，无法获取时返回 null
 */
export async function fetchExternalQaStats(
  externalId: string,
  source: SyncSource
): Promise<ExternalQaStats | null> {
  if (source === "coze") {
    return fetchCozeQaStats(externalId);
  }
  if (source === "doubao") {
    return fetchDoubaoQaStats(externalId);
  }
  return null;
}

/**
 * Coze 平台统计（占位实现）
 * TODO: 接入 Coze 开放 API，获取对话/问题统计
 */
async function fetchCozeQaStats(_externalId: string): Promise<ExternalQaStats | null> {
  // 需配置 COZE_API_KEY、COZE_BOT_ID 等
  // 参考：https://api.coze.cn 对话历史、统计接口
  return null;
}

/**
 * 豆包/火山引擎平台统计（占位实现）
 * TODO: 接入火山引擎知识库 API
 */
async function fetchDoubaoQaStats(_externalId: string): Promise<ExternalQaStats | null> {
  // 需配置 VOLC_ACCESS_KEY、VOLC_SECRET_KEY
  // 参考火山引擎文档
  return null;
}
