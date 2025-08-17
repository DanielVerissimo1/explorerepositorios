import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ErrorDisplayProps {
  message: string
  showBackButton?: boolean
}

export function ErrorDisplay({ message, showBackButton = false }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{message}</p>
        {showBackButton && (
          <Link href="/">
            <Button>Voltar para busca</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
