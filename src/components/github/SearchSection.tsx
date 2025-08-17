"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchSectionProps {
  onSearch: (term: string) => void
  loading: boolean
}

export function SearchSection({ onSearch, loading }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Explore repositórios <br />
          no GitHub.
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Explore perfis, repositórios e contribuições da comunidade open-source
        </p>
      </div>

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
          disabled={loading || !searchTerm.trim()}
          className="bg-gradient-to-b from-green-500 to-emerald-600 cursor-pointer hover:from-green-600 hover:to-emerald-700 text-white px-6 py-5 shadow-sm hover:shadow-md transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Buscando...
            </span>
          ) : (
            "Pesquisar"
          )}
        </Button>
      </div>
    </div>
  )
}
