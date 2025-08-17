"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Header } from "@/components/shared/Header"
import { SearchSection } from "@/components/github/SearchSection"
import { UserCard } from "@/components/github/UserCard"
import { EmptyState } from "@/components/github/EmptyState"
import { githubApi } from "@/lib/githubApi"
import type { GitHubUser, SearchResult } from "@/lib/types"

export default function HomePage() {
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (searchTerm: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await githubApi.get<SearchResult>("/search/users", {
        params: {
          q: searchTerm,
          per_page: 10,
        },
      })
      setUsers(response.data.items || [])
    } catch (err) {
      console.error("Erro ao buscar usuários:", err)
      setError("Ocorreu um erro ao buscar usuários. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed from-gray-50 to-gray-100">
      <Header />

      <main>
        <SearchSection onSearch={handleSearch} loading={loading} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Resultados */}
          <div className="space-y-3">
            {users.map((user) => (
              <UserCard key={user.login} user={user} />
            ))}
          </div>

          {users.length === 0 && !loading && !error && <EmptyState />}
        </div>
      </main>
    </div>
  )
}
