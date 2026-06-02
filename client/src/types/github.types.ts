export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;

  owner: {
    login: string;
  };
}

export interface GitHubResponse {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export interface GitHubRepoDetails {
  open_issues_count: number;
  forks_count: number;
  default_branch: string;
  visibility: string;
  created_at: string;
}