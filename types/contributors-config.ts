export interface Contributor {
  name: string;
  articles: number;
  likes: number;
}

export interface ContributorsConfig {
  title: string;
  contributors: Contributor[];
}
