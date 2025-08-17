"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/shared/Header"
import { LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { ErrorDisplay } from "@/components/shared/ErrorDisplay"
import { UserProfile } from "@/components/github/UserProfile"
import { RepoCard } from "@/components/github/RepoCard"
import { githubApi } from "@/lib/githubApi"
import type { GitHubUser, GitHubRepo } from "@/lib/types"
import axios from "axios"

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
    return <LoadingSpinner message="Carregando perfil do usuário..." />
  }

  if (error || !user) {
    return <ErrorDisplay message={error || "Usuário não encontrado"} showBackButton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed">
      <Header showBackButton />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <UserProfile user={user} />

        {/* Repositories */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Repositórios</h2>
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        {repos.length === 0 && (
          <div className="text-center text-gray-500 mt-6 sm:mt-8">
            <p>Nenhum repositório encontrado para este usuário.</p>
          </div>
        )}
      </main>
    </div>
  )
}
