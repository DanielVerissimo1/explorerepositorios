export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
  public_repos: number
  followers: number
  following: number
}

export interface GitHubRepo {
  id: number
  name: string
  description?: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  language?: string
  html_url: string
}