import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import Link from "next/link"
import type { GitHubUser } from "@/lib/types"

interface UserCardProps {
  user: GitHubUser
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-gray-200">
      <CardContent className="p-0">
        <Link href={`/user/${user.login}`} className="flex items-center gap-4 p-4 sm:p-6 group">
          <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-white shadow-sm">
            <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
            <AvatarFallback className="bg-gray-100">{user.login[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
              {user.login}
            </h3>
            <p className="text-sm text-gray-500 mt-1 truncate">{user.bio || "Perfil no GitHub"}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-emerald-600">
            <span>Ver perfil</span>
            <Search className="w-4 h-4" />
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
