import type React from "react"
import type { Metadata } from "next"

interface UserLayoutProps {
  children: React.ReactNode
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params

  return {
    title: `${username} - Perfil GitHub | GitHub Explorer`,
    description: `Explore o perfil do GitHub de ${username}, seus repositórios e contribuições para a comunidade open-source.`,
    openGraph: {
      title: `${username} - Perfil GitHub | GitHub Explorer`,
      description: `Explore o perfil do GitHub de ${username}, seus repositórios e contribuições para a comunidade open-source.`,
      url: `https://github-explorer.vercel.app/user/${username}`,
    },
    twitter: {
      title: `${username} - Perfil GitHub | GitHub Explorer`,
      description: `Explore o perfil do GitHub de ${username}, seus repositórios e contribuições para a comunidade open-source.`,
    },
  }
}

export default async function UserLayout({ children, params }: UserLayoutProps) {
  await params 
  return children
}
