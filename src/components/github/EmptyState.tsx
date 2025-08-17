import { Search } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Comece sua busca</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Digite um nome de usuário do GitHub acima para descobrir repositórios interessantes
      </p>
    </div>
  )
}
