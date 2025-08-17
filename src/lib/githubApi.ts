import axios from "axios"

export const githubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL || "https://api.github.com",
  headers: {
    Accept: `application/vnd.github.${process.env.NEXT_PUBLIC_GITHUB_API_VERSION || "v3"}+json`,
  },
})
