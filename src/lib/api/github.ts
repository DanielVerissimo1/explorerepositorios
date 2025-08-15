import axios from "axios"

export const githubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL || "https://api.github.com",
  headers: {
    Accept: `application/vnd.github.${process.env.NEXT_PUBLIC_GITHUB_API_VERSION || "v3"}+json`,
  },
})

export async function fetchUserData(username: string) {
  const [userResponse, reposResponse] = await Promise.all([
    githubApi.get(`/users/${username}`),
    githubApi.get(`/users/${username}/repos`, {
      params: {
        sort: "updated",
        per_page: process.env.NEXT_PUBLIC_DEFAULT_PER_PAGE || 10,
      },
    }),
  ])
  return {
    user: userResponse.data,
    repos: reposResponse.data,
  }
}

export async function searchUsers(searchTerm: string) {
  const response = await githubApi.get("/search/users", {
    params: {
      q: searchTerm,
      per_page: 10,
    },
  })
  return response.data.items || []
}