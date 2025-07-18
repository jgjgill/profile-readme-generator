import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { BackgroundAnimation } from "~/components/shared/background-animation";

export function GenerateErrorBoundary() {
  const error = useRouteError();

  let errorMessage = "GitHub 데이터를 불러오는 중 문제가 발생했습니다.";
  let errorIcon = "⚠️";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorMessage = error.data;
        errorIcon = "🔍";
        break;
      case 429:
        errorMessage = error.data;
        errorIcon = "⏱️";
        break;
      case 500:
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        errorIcon = "🔧";
        break;
      default:
        errorMessage = error.data || "알 수 없는 오류가 발생했습니다.";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <BackgroundAnimation variant="error" />
      
      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl relative z-10">
        <div className="text-6xl mb-6">{errorIcon}</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-300 mb-8 leading-relaxed">{errorMessage}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          다시 시도하기
        </Link>
      </div>
    </div>
  );
}