import { GitHubUser } from "@/lib/types/github"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserStats } from "@/components/github/UserStats"

export function UserProfile({ user }: { user: GitHubUser }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
        <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
        <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 w-full text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{user.login}/repo</h1>
        <p className="text-gray-600 mb-4">{user.bio || "Descrição do repo"}</p>
        <UserStats user={user} />
      </div>
    </div>
  )
}