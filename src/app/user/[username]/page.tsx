"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, GitFork, AlertCircle, Github } from "lucide-react"
import Link from "next/link"
import axios, { AxiosInstance } from "axios"

const githubApi: AxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
})

interface GitHubUser {
  login: string
  avatar_url: string
  name?: string
  bio?: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  description?: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  language?: string
  html_url: string
}

export default function UserPage() {
  const params = useParams()
  const username = params.username as string

  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        const [userResponse, reposResponse] = await Promise.all([
          githubApi.get(`/users/${username}`),
          githubApi.get(`/users/${username}/repos`, {
            params: {
              sort: "updated",
              per_page: 10,
            },
          }),
        ])

        setUser(userResponse.data)
        setRepos(reposResponse.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.status === 404 ? "Usuário não encontrado" : "Erro ao carregar dados")
        } else {
          setError("Erro desconhecido ao carregar dados")
        }
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchUserData()
    }
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error || "Usuário não encontrado"}</p>
          <Link href="/">
            <Button className="mt-4">Voltar</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed">
      {/* Header */}
      <header className="bg-transparent px-4 sm:px-6 py-4">
        <div className="flex flex-col justify-around sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Github className="w-6 h-6" />
            <span className="font-semibold text-lg">Github Explorer</span>
          </div>
          <Link href="/" className="w-fit">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* User Profile */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
            <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 w-full text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{user.login}/repo</h1>
            <p className="text-gray-600 mb-4">{user.bio || "Descrição do repo"}</p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 text-center">
              <div className="min-w-[80px]">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{user.public_repos}</div>
                <div className="text-sm text-gray-500">Repositórios</div>
              </div>
              <div className="min-w-[80px]">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{user.followers}</div>
                <div className="text-sm text-gray-500">Seguidores</div>
              </div>
              <div className="min-w-[80px]">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{user.following}</div>
                <div className="text-sm text-gray-500">Seguindo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Repositories */}
        <div className="space-y-3 sm:space-y-4">
          {repos.map((repo) => (
            <Card key={repo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1 w-full">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors break-all"
                      >
                        {repo.name}
                      </a>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                      {repo.description || "Sem descrição disponível"}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
                        {repo.forks_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {repo.open_issues_count}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {repos.length === 0 && (
          <div className="text-center text-gray-500 mt-6 sm:mt-8">
            <p>Nenhum repositório encontrado para este usuário.</p>
          </div>
        )}
      </div>
    </div>
  )
}