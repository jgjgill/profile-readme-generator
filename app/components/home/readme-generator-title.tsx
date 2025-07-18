export function ReadmeGeneratorTitle() {
  return (
    <div className="text-center mb-12">
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
          GitHub 프로필 README 생성기
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
        GitHub 사용자명을 입력하면 누구나 주목할 만한
        <br />
        <span className="text-blue-300 font-semibold">README 템플릿</span>을
        자동으로 생성합니다
      </p>
    </div>
  );
}