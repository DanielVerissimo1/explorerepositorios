import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ErrorDisplayProps {
  error: string
  backLink?: string
  className?: string
}

export function ErrorDisplay({ 
  error, 
  backLink = "/", 
  className = "" 
}: ErrorDisplayProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-red-600 mb-4 text-center">{error}</p>
      <Link href={backLink}>
        <Button variant="outline">Voltar</Button>
      </Link>
    </div>
  )
}