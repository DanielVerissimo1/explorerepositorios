import type { Metadata, Viewport } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Página não encontrada - GitHub Explorer",
  description: "A página que você está procurando não foi encontrada.",
  robots: "noindex, nofollow",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-emerald-500">404</h1>
        <h2 className="text-3xl font-semibold">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-md">A página que você está procurando não existe ou foi movida.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
