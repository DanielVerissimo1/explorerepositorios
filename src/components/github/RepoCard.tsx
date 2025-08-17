import { Card, CardContent } from "@/components/ui/card"
import { Star, GitFork, AlertCircle } from "lucide-react"
import type { GitHubRepo } from "@/lib/types"

interface RepoCardProps {
  repo: GitHubRepo
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
          <div className="flex-1 w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors break-all"
              >
                {repo.name}
              </a>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
              {repo.description || "Sem descrição disponível"}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
                {repo.forks_count}
              </span>
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {repo.open_issues_count}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
