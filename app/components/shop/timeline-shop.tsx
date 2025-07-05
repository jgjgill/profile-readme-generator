import { useState, useMemo } from "react";
import CopyButton from "~/components/copy-button";
import { useDebounce } from "~/lib/hooks/useDebounce";
import type { TimelineItem } from "~/components/svg/timeline/types";

interface TimelineShopProps {
  origin: string;
}

export function TimelineShop({ origin }: TimelineShopProps) {
  const [title, setTitle] = useState("My Journey");
  const [items, setItems] = useState<TimelineItem[]>([
    {
      period: "2023.03",
      content: "취업",
      direction: "left",
      color: "blue",
    },
    {
      period: "2024.06",
      content: "프로젝트 시작",
      direction: "right",
      color: "green",
    },
  ]);

  // Debounced values for API optimization
  const debouncedTitle = useDebounce(title, 500);
  const debouncedItems = useDebounce(items, 500);

  const generateUrl = useMemo(() => {
    const itemsParam = debouncedItems
      .map(
        (item) =>
          `${item.period},${item.content},${item.direction},${item.color}`
      )
      .join(";");
    return `/api/timeline?title=${encodeURIComponent(
      debouncedTitle
    )}&items=${encodeURIComponent(itemsParam)}`;
  }, [debouncedTitle, debouncedItems]);

  const generateMarkdown = useMemo(() => {
    const url = `${origin}${generateUrl}`;
    return `![${debouncedTitle}](${url})`;
  }, [origin, generateUrl, debouncedTitle]);

  const addItem = () => {
    setItems([
      ...items,
      {
        period: "2024.12",
        content: "새로운 마일스톤",
        direction: items.length % 2 === 0 ? "left" : "right",
        color: "blue",
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: keyof TimelineItem,
    value: string
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* 타임라인 설정 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          타임라인 컴포넌트 생성
        </h2>

        {/* 제목 설정 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            타임라인 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="예: My Journey, 개발자로서의 여정"
          />
        </div>

        {/* 타임라인 아이템들 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              타임라인 항목
            </h3>
            <button
              onClick={addItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              + 항목 추가
            </button>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    시기
                  </label>
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) =>
                      updateItem(index, "period", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2024.06"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    내용
                  </label>
                  <input
                    type="text"
                    value={item.content}
                    onChange={(e) =>
                      updateItem(index, "content", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React 학습 시작"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    방향
                  </label>
                  <select
                    value={item.direction}
                    onChange={(e) =>
                      updateItem(index, "direction", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="left">왼쪽</option>
                    <option value="right">오른쪽</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    색상
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={item.color}
                      onChange={(e) =>
                        updateItem(index, "color", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="blue">파란색</option>
                      <option value="green">초록색</option>
                      <option value="purple">보라색</option>
                      <option value="orange">주향색</option>
                    </select>
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(index)}
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
      </div>

      {/* 미리보기 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          미리보기
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          {origin && (
            <img
              src={`${origin}${generateUrl}`}
              alt={debouncedTitle}
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
              sectionName="component-markdown"
              label="복사"
              size="sm"
              variant="primary"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          위 마크다운 코드를 복사해서 GitHub README.md 파일에
          붙여넣으세요.
        </p>
      </div>
    </div>
  );
}