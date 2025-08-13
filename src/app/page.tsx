"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Github, AlertCircle } from "lucide-react" // Adicionei o AlertCircle
import Link from "next/link"
import axios from "axios"

const githubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL,
  headers: {
    Accept: `application/vnd.github.${process.env.NEXT_PUBLIC_GITHUB_API_VERSION}+json`,
  },
})

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await githubApi.get("/search/users", {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 px-4 sm:px-6 py-4 z-10 md:px-35 lg:px-90">
        <div className="max-w-6xl mx-auto flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Github className="w-6 h-6 text-gray-800" />
            </div>
            <span className="font-semibold text-lg text-gray-800">GitHub Explorer</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Explore repositórios <br />no GitHub.
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore perfis, repositórios e contribuições da comunidade open-source
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Digite um nome de usuário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 py-5 text-base"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={loading} 
            className="bg-gradient-to-b from-green-500 to-emerald-600 cursor-pointer hover:from-green-600 hover:to-emerald-700 text-white px-6 py-5 shadow-sm hover:shadow-md transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Buscando...
              </span>
            ) : "Pesquisar"}
          </Button>
        </div>

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
            <Card 
              key={user.login} 
              className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-gray-200"
            >
              <CardContent className="p-0">
                <Link 
                  href={`/user/${user.login}`} 
                  className="flex items-center gap-4 p-4 sm:p-6 group"
                >
                  <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white shadow-sm">
                    <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
                    <AvatarFallback className="bg-gray-100">
                      {user.login[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                      {user.login}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {user.bio || "Perfil no GitHub"}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-emerald-600">
                    <span>Ver perfil</span>
                    <Search className="w-4 h-4" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {users.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Comece sua busca</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Digite um nome de usuário do GitHub acima para descobrir repositórios interessantes
            </p>
          </div>
        )}
      </main>
    </div>
  )
}