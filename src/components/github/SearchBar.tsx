"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar({ initialValue = "" }: { initialValue?: string }) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const router = useRouter()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
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
        className="bg-gradient-to-b from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-5 shadow-sm hover:shadow-md transition-all"
      >
        Pesquisar
      </Button>
    </div>
  )
}