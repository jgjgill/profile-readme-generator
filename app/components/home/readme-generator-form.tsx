import { useState } from "react";
import { useNavigate } from "react-router";

export function ReadmeGeneratorForm() {
  const [githubUsername, setGitHubUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!githubUsername.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      navigate(`/generate/${githubUsername.trim()}`);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGitHubUsername(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mb-16">
      <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={githubUsername}
            onChange={handleUsernameChange}
            placeholder="GitHub 사용자명 입력"
            className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white/20 text-lg text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200"
            disabled={isLoading}
            required
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"></div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !githubUsername.trim()}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>생성 중...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>README 생성</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
    </form>
  );
}