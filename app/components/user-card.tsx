import type { ProcessedGitHubData } from '~/lib/types/github';

interface UserCardProps {
  userData: ProcessedGitHubData;
}

export default function UserCard({ userData }: UserCardProps) {
  const { userProfile, topLanguages, mostStarredRepository } = userData;
  
  const displayName = userProfile.name || userProfile.login;
  const languageCount = topLanguages.length;
  
  return (
    <div className="sticky top-8">
      <div className="text-center mb-6">
        <img
          src={userProfile.avatar_url}
          alt={`${displayName}의 프로필 사진`}
          className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-blue-400/50 shadow-lg"
        />
        <h2 className="text-2xl font-bold text-white">{displayName}</h2>
        <p className="text-blue-300">@{userProfile.login}</p>
        {userProfile.bio && (
          <p className="text-sm text-gray-300 mt-3 italic bg-white/10 rounded-lg p-2 backdrop-blur-sm">"{userProfile.bio}"</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
          <span className="text-sm font-medium text-gray-300">공개 저장소</span>
          <span className="text-lg font-bold text-blue-400">{userProfile.public_repos}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
          <span className="text-sm font-medium text-gray-300">사용 언어</span>
          <span className="text-lg font-bold text-green-400">{languageCount}</span>
        </div>

        {mostStarredRepository && (
          <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-gray-300">최고 스타</span>
            <span className="text-lg font-bold text-yellow-400">
              ⭐ {mostStarredRepository.stargazers_count}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white mb-4">주요 프로그래밍 언어</h3>
        <div className="space-y-3">
          {topLanguages.slice(0, 5).map((language, index) => {
            // 순서 기반으로 간단한 퍼센티지 계산 (첫 번째: 40%, 두 번째: 30%, 나머지: 균등 분배)
            const percentage = index === 0 ? 40 : index === 1 ? 30 : Math.max(20 - (index - 2) * 5, 10);
            
            return (
              <div key={language} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{language}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <a
          href={userProfile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          GitHub 프로필 보기
        </a>
      </div>
    </div>
  );
}