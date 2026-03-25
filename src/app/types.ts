export interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number | null;
  html_url: string;
}
