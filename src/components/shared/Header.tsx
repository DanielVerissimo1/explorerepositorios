import { Github } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <header className="sticky top-0 px-4 sm:px-6 py-4 z-10 md:px-35 lg:px-90">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Github className="w-6 h-6 text-gray-800" />
          </div>
          <span className="font-semibold text-lg text-gray-800">GitHub Explorer</span>
        </Link>

        {showBackButton && (
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
            ← Voltar para busca
          </Link>
        )}
      </div>
    </header>
  )
}
