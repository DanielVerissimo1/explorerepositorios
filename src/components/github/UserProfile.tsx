import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { GitHubUser } from "@/lib/types"

interface UserProfileProps {
  user: GitHubUser
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
        <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
        <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 w-full text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{user.login}</h1>
        <p className="text-gray-600 mb-4">{user.bio || "Sem descrição disponível"}</p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 text-center">
          <div className="min-w-[80px]">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{user.public_repos}</div>
            <div className="text-sm text-gray-500">Repositórios</div>
          </div>
          <div className="min-w-[80px]">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{user.followers}</div>
            <div className="text-sm text-gray-500">Seguidores</div>
          </div>
          <div className="min-w-[80px]">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{user.following}</div>
            <div className="text-sm text-gray-500">Seguindo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
