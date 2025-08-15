import { GitHubUser } from "@/lib/types/github"

export function UserStats({ user }: { user: GitHubUser }) {
  return (
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
  )
}