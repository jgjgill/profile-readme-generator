import { Link } from "react-router";

export function CompletionHeader() {
  return (
    <div className="mb-8 text-center">
      <Link
        to="/"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-200 group"
      >
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        새로운 README 생성하기
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
        README 생성 완료! 🎉
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
      <p className="text-xl text-gray-300 leading-relaxed">
        원하는 템플릿을 선택해서 GitHub 프로필에 사용하세요
      </p>
    </div>
  );
}