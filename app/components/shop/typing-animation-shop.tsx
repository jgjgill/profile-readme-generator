import { useState, useMemo } from "react";
import CopyButton from "~/components/copy-button";
import { useDebounce } from "~/lib/hooks/useDebounce";

interface TypingText {
  id: string;
  text: string;
  delay: number;
}

interface TypingAnimationShopProps {
  origin: string;
}

export function TypingAnimationShop({ origin }: TypingAnimationShopProps) {
  const [prefix, setPrefix] = useState("Hi, I'm");
  const [typingTexts, setTypingTexts] = useState<TypingText[]>([
    { id: "1", text: "Frontend Developer", delay: 1000 },
    { id: "2", text: "React Enthusiast", delay: 1500 },
    { id: "3", text: "TypeScript Lover", delay: 2000 },
  ]);
  const [speed, setSpeed] = useState(100);
  const [theme, setTheme] = useState("default");

  // Debounced values for API optimization
  const debouncedPrefix = useDebounce(prefix, 500);
  const debouncedTypingTexts = useDebounce(typingTexts, 500);
  const debouncedSpeed = useDebounce(speed, 500);
  const debouncedTheme = useDebounce(theme, 500);

  const generateUrl = useMemo(() => {
    const textsParam = debouncedTypingTexts
      .map((item) => `${item.text},${item.delay}`)
      .join(";");

    const params = new URLSearchParams({
      prefix: debouncedPrefix,
      texts: textsParam,
      speed: debouncedSpeed.toString(),
      theme: debouncedTheme,
    });

    return `/api/typing-animation?${params.toString()}`;
  }, [
    debouncedPrefix,
    debouncedTypingTexts,
    debouncedSpeed,
    debouncedTheme,
  ]);

  const generateMarkdown = useMemo(() => {
    const url = `${origin}${generateUrl}`;
    return `![Typing Animation](${url})`;
  }, [origin, generateUrl]);

  const addTypingText = () => {
    const newId = (
      Math.max(...typingTexts.map((t) => parseInt(t.id))) + 1
    ).toString();
    setTypingTexts([
      ...typingTexts,
      {
        id: newId,
        text: "새로운 텍스트",
        delay: 1000,
      },
    ]);
  };

  const updateTypingText = (
    id: string,
    field: keyof Omit<TypingText, "id">,
    value: string | number
  ) => {
    setTypingTexts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeTypingText = (id: string) => {
    setTypingTexts((prev) => prev.filter((item) => item.id !== id));
  };

  const themeOptions = [
    { value: "default", label: "기본", description: "클린한 검은색 텍스트" },
    {
      value: "gradient",
      label: "그라디언트",
      description: "무지개색 그라디언트",
    },
    { value: "terminal", label: "터미널", description: "초록색 터미널 스타일" },
    { value: "neon", label: "네온", description: "빛나는 네온 효과" },
  ];


  return (
    <div className="space-y-6">
      {/* 타이핑 애니메이션 설정 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          타이핑 애니메이션 생성
        </h2>

        {/* 기본 설정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고정 텍스트 (앞부분)
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Hi, I'm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              타이핑 속도 (ms)
            </label>
            <input
              type="range"
              min="50"
              max="300"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {speed}ms (빠름 ← → 느림)
            </div>
          </div>
        </div>

        {/* 테마 설정 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            테마
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {themeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
        </div>

        {/* 타이핑 텍스트 목록 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              타이핑될 텍스트 목록
            </h3>
            <button
              onClick={addTypingText}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              + 텍스트 추가
            </button>
          </div>

          {typingTexts.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    텍스트 #{index + 1}
                  </label>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) =>
                      updateTypingText(item.id, "text", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="타이핑될 텍스트를 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    지연시간 (ms)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="500"
                      max="5000"
                      step="100"
                      value={item.delay}
                      onChange={(e) =>
                        updateTypingText(
                          item.id,
                          "delay",
                          parseInt(e.target.value)
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {typingTexts.length > 1 && (
                      <button
                        onClick={() => removeTypingText(item.id)}
                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                        title="삭제"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • 지연시간은 각 텍스트가 완전히 타이핑된 후 다음 텍스트까지의
              대기시간입니다
            </li>
            <li>
              • 타이핑 속도는 글자 하나당 걸리는 시간입니다 (50ms = 빠름, 300ms
              = 느림)
            </li>
          </ul>
        </div>
      </div>

      {/* 미리보기 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">미리보기</h3>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          {origin && (
            <img
              src={`${origin}${generateUrl}`}
              alt="Typing Animation Preview"
              className="mx-auto max-w-full h-auto"
            />
          )}
        </div>
      </div>

      {/* 마크다운 코드 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          README에 추가하기
        </h3>
        <div className="relative">
          <textarea
            readOnly
            value={generateMarkdown}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            rows={3}
          />
          <div className="absolute top-2 right-2">
            <CopyButton
              text={generateMarkdown || ""}
              sectionName="typing-animation-markdown"
              label="복사"
              size="sm"
              variant="primary"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          위 마크다운 코드를 복사해서 GitHub README.md 파일에 붙여넣으세요.
        </p>
      </div>
    </div>
  );
}
