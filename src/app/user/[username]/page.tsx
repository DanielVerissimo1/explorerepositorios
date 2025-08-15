import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/shared/Header"
import { UserProfile } from "@/components/github/UserProfile"
import { RepoCard } from "@/components/github/RepoCard"
import { fetchUserData } from "@/lib/api/github"
import { GitHubUser, GitHubRepo } from "@/lib/types/github"

type Props = {
  params: { username: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username
  
  try {
    const { user } = await fetchUserData(username)
    
    return {
      title: `${user.login} - GitHub Explorer`,
      description: user.bio || `Repositórios do usuário ${user.login} no GitHub`,
      openGraph: {
        title: `${user.login} - GitHub Explorer`,
        description: user.bio || `Repositórios do ${user.login} no GitHub`,
        images: [
          {
            url: user.avatar_url,
            width: 200,
            height: 200,
            alt: `Avatar de ${user.login}`,
          },
        ],
      },
    }
  } catch (error) {
    return {
      title: "Usuário não encontrado - GitHub Explorer",
      description: "O usuário solicitado não foi encontrado no GitHub",
    }
  }
}

export default async function UserPage({ params }: { params: { username: string } }) {
  let user: GitHubUser | null = null
  let repos: GitHubRepo[] = []
  
  try {
    const data = await fetchUserData(params.username)
    user = data.user
    repos = data.repos
  } catch (error) {
    notFound()
  }

  // Se user for null, não renderizamos o UserProfile
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed">
        <Header backButton />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center text-gray-500 mt-6 sm:mt-8">
            <p>Usuário não encontrado.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 bg-[url('/Github.png')] bg-top bg-no-repeat bg-fixed">
      <Header backButton />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <UserProfile user={user} />

        <div className="space-y-3 sm:space-y-4">
          {repos.map((repo) => (
            <Card key={repo.id} className="hover:shadow-md transition-shadow">
              <RepoCard repo={repo} />
            </Card>
          ))}
        </div>

        {repos.length === 0 && (
          <div className="text-center text-gray-500 mt-6 sm:mt-8">
            <p>Nenhum repositório encontrado para este usuário.</p>
          </div>
        )}
      </div>
    </div>
  )
}