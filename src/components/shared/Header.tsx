import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ArrowLeft } from "lucide-react"

interface HeaderProps {
  backButton?: boolean
  title?: string
}

export function Header({ backButton = false, title = "GitHub Explorer" }: HeaderProps) {
  return (
    <header className="bg-transparent px-4 sm:px-6 py-4">
      <div className="flex flex-col justify-around sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <Github className="w-6 h-6" />
          <span className="font-semibold text-lg">{title}</span>
        </div>
        
        {backButton && (
          <Link href="/" className="w-fit">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}