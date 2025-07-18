interface LoginStatusNoticeProps {
  isLoggedIn: boolean;
}

export function LoginStatusNotice({ isLoggedIn }: LoginStatusNoticeProps) {
  if (isLoggedIn) {
    return (
      <div className="mb-12 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-green-300 font-bold text-lg">
            프리미엄 사용자
          </span>
        </div>
        <p className="text-green-200 text-lg">
          <strong className="text-white text-xl">
            시간당 약 800개 README
          </strong>
          까지 자유롭게 생성하세요! 🚀
          <br />
          <span className="text-sm text-green-300 opacity-75">
            (API 요청 5,000회 기준)
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="mb-12 p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl backdrop-blur-sm">
      <div className="flex items-center justify-center mb-3">
        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-amber-300 font-bold text-lg">
          무료 체험
        </span>
      </div>
      <p className="text-amber-200 text-lg mb-4">
        <strong className="text-white text-xl">
          시간당 약 10개의 README
        </strong>{" "}
        생성 제한이 있어요.
        <br />
        <span className="text-sm text-amber-300 opacity-75">
          (API 요청 60회 기준)
        </span>
      </p>
      <a
        href="/auth/login"
        className="inline-flex items-center text-amber-200 hover:text-white font-semibold text-lg transition-colors duration-200 group"
      >
        로그인하면{" "}
        <strong className="mx-2 text-yellow-300">
          80배 더 많은 생성
        </strong>
        이 가능해요!
        <svg
          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  );
}