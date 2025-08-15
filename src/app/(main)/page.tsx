import { Metadata } from "next"
import { Header } from "@/components/shared/Header"
import { Card } from "@/components/ui/card"
import { UserCard } from "@/components/github/UserCard"
import { SearchBar } from "@/components/github/SearchBar"
import { searchUsers } from "@/lib/api/github"
import { Search } from "lucide-react" // Adicionei esta importação
import { GitHubUser } from "@/lib/types/github" // Adicionei esta importação

export const metadata: Metadata = {
  title: "GitHub Explorer - Encontre repositórios e desenvolvedores",
  description: "Explore perfis, repositórios e contribuições da comunidade open-source no GitHub",
  openGraph: {
    title: "GitHub Explorer",
    description: "Explore perfis e repositórios no GitHub",
    images: [
      {
        url: "/github-explorer-og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const searchTerm = searchParams?.q as string | undefined
  const users = searchTerm ? await searchUsers(searchTerm) : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Explore repositórios <br />no GitHub.
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore perfis, repositórios e contribuições da comunidade open-source
          </p>
        </div>

        <SearchBar initialValue={searchTerm} />

        <div className="space-y-3">
          {users.map((user: GitHubUser) => ( // Adicionei a tipagem GitHubUser aqui
            <Card key={user.login} className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-gray-200">
              <UserCard user={user} />
            </Card>
          ))}
        </div>

        {users.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Não encontramos usuários com o termo "{searchTerm}"
            </p>
          </div>
        )}

        {users.length === 0 && !searchTerm && (
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