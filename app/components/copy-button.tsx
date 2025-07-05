import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  sectionName?: string;
  size?: "sm" | "lg";
  variant?: "primary" | "secondary";
  showIcon?: boolean;
  className?: string;
}

export default function CopyButton({
  text,
  label = "복사하기",
  sectionName,
  size = "sm",
  variant = "primary",
  showIcon = true,
  className = "",
}: CopyButtonProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const uniqueId = sectionName || `copy-${Date.now()}`;
  const isCopied = copiedSection === uniqueId;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(uniqueId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error("복사 실패:", error);
      fallbackCopyToClipboard();
    }
  };

  const fallbackCopyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopiedSection(uniqueId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error("Fallback 복사 실패:", error);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  // 스타일 계산
  const baseClasses =
    "inline-flex items-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  const variantClasses = {
    primary: isCopied
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-blue-600 text-white hover:bg-blue-700",
    secondary: isCopied
      ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200",
  }[variant];

  const iconSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <button
      onClick={copyToClipboard}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      title={`${label} 클립보드에 복사`}
    >
      {showIcon && (
        <svg
          className={`${iconSize} mr-2`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isCopied ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          )}
        </svg>
      )}
      {isCopied ? "복사 완료!" : label}
    </button>
  );
}