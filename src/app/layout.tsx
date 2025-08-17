import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "GitHub Explorer - Explore repositórios e perfis",
  description:
    "Descubra e explore perfis, repositórios e contribuições da comunidade open-source do GitHub de forma simples e intuitiva.",
  keywords: ["GitHub", "repositórios", "open source", "desenvolvedor", "código", "perfil"],
  authors: [{ name: "GitHub Explorer" }],
  creator: "GitHub Explorer",
  publisher: "GitHub Explorer",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://explorerepositorios.vercel.app",
    title: "GitHub Explorer - Explore repositórios e perfis",
    description: "Descubra e explore perfis, repositórios e contribuições da comunidade open-source do GitHub.",
    siteName: "GitHub Explorer",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Explorer - Explore repositórios e perfis",
    description: "Descubra e explore perfis, repositórios e contribuições da comunidade open-source do GitHub.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
