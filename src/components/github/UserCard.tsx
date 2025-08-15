import { GitHubUser } from "@/lib/types/github"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Search } from "lucide-react"

export function UserCard({ user }: { user: GitHubUser }) {
  return (
    <Link 
      href={`/user/${user.login}`} 
      className="flex items-center gap-4 p-4 sm:p-6 group"
    >
      <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white shadow-sm">
        <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
        <AvatarFallback className="bg-gray-100">
          {user.login[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
          {user.login}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {user.bio || "Perfil no GitHub"}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm text-emerald-600">
        <span>Ver perfil</span>
        <Search className="w-4 h-4" />
      </div>
    </Link>
  )
}