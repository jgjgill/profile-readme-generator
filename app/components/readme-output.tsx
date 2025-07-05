import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { ReadmeTemplate } from "~/lib/types/template";
import CopyButton from "./copy-button";

interface ReadmeOutputProps {
  template: ReadmeTemplate;
}

export default function ReadmeOutput({ template }: ReadmeOutputProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // 템플릿별 섹션 라벨 정의
  const getSectionLabel = (sectionKey: string): string => {
    const commonLabels: Record<string, string> = {
      header: "헤더 섹션",
      contact: "연락처 섹션",
    };

    // 기본 템플릿 섹션
    const standardLabels: Record<string, string> = {
      ...commonLabels,
      about: "자기소개 섹션",
      stats: "GitHub 통계 섹션",
      techStack: "기술 스택 섹션", 
      highlight: "하이라이트 프로젝트 섹션",
      projects: "프로젝트 섹션",
    };

    // 임팩트 템플릿 섹션
    const impactLabels: Record<string, string> = {
      ...commonLabels,
      metrics: "핵심 성과 지표",
      impactProjects: "임팩트 프로젝트",
      achievements: "주요 성취",
      githubStats: "GitHub 활동 통계",
    };

    // 기술 전문가형 템플릿 섹션
    const techExpertLabels: Record<string, string> = {
      ...commonLabels,
      problemCases: "문제 해결 사례",
      techToolbox: "기술 도구상자",
      leadershipExperience: "기술 리더십 경험",
      knowledgeSharing: "지식 공유 활동",
    };

    // 섹션 키를 기준으로 템플릿 타입 추정
    if (impactLabels[sectionKey]) {
      return impactLabels[sectionKey];
    }
    if (techExpertLabels[sectionKey]) {
      return techExpertLabels[sectionKey];
    }
    if (standardLabels[sectionKey]) {
      return standardLabels[sectionKey];
    }

    // 대문자로 시작하는 기본 라벨
    return sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) + " 섹션";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">생성된 README</h2>
            <p className="text-gray-600">
              아래 내용을 GitHub 프로필에 복사해서 사용하세요
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  !isPreviewMode
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                마크다운
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  isPreviewMode
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                미리보기
              </button>
            </div>

            <CopyButton 
              text={template.content} 
              sectionName="full" 
              label="전체 복사"
              size="sm" 
              className="flex-shrink-0 min-w-0 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {!isPreviewMode ? (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <span className="text-sm font-medium text-gray-300">
                  README.md
                </span>
                <CopyButton 
                  text={template.content} 
                  sectionName="markdown-header" 
                  label="복사"
                  size="sm"
                  variant="secondary"
                />
              </div>
              <pre className="p-4 text-sm text-gray-100 overflow-x-auto whitespace-pre-wrap">
                <code>{template.content}</code>
              </pre>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                섹션별 복사
              </h3>
              <p className="text-gray-600 mb-4">
                필요한 섹션만 따로 복사할 수 있습니다:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                {Object.entries(template.sections).map(([key, content]) => {
                  if (!content || content.trim() === "") return null;
                  
                  const label = getSectionLabel(key);
                  
                  return (
                    <CopyButton
                      key={key}
                      text={content}
                      sectionName={key}
                      label={`${label} 복사`}
                      variant="secondary"
                      size="sm"
                      className="justify-start text-left"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className="bg-white border border-gray-200 rounded-lg p-6 github-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-1 border-b border-gray-200">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-gray-900 mt-5 mb-2">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={`${className} text-sm`}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="inline-block max-w-full h-auto rounded"
                    />
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-700">
                      {children}
                    </em>
                  ),
                }}
              >
                {template.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-600">
            💡 <strong>팁:</strong> GitHub 프로필에 특별한 저장소를 만들어
            README를 추가하세요.
            <br />
            저장소 이름을 자신의 GitHub 사용자명과 동일하게 만들면 됩니다.
          </div>
          <div className="flex-shrink-0">
            <CopyButton
              text={template.content}
              sectionName="footer"
              label="전체 복사"
              size="sm"
              className="w-full sm:w-auto text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
