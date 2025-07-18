export function FeatureCards() {
  const features = [
    {
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      ),
      gradient: "from-yellow-400 to-orange-500",
      title: "즉시 생성",
      description: "5초 이내에 완성된 README 템플릿을 받아보세요"
    },
    {
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
      gradient: "from-blue-400 to-purple-500",
      title: "역량 파악",
      description: "3초 내에 핵심 역량을 파악할 수 있는 구성"
    },
    {
      icon: (
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      gradient: "from-green-400 to-blue-500",
      title: "바로 사용",
      description: "복사해서 GitHub 프로필에 바로 적용 가능"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        >
          <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {feature.icon}
          </div>
          <h3 className="font-bold text-white text-xl mb-3">{feature.title}</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}