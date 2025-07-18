interface BackgroundAnimationProps {
  variant?: "default" | "generate" | "error";
}

export function BackgroundAnimation({ variant = "default" }: BackgroundAnimationProps) {
  const variants = {
    default: {
      circles: [
        "absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
        "absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000",
        "absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"
      ]
    },
    generate: {
      circles: [
        "absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse",
        "absolute top-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000",
        "absolute bottom-20 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"
      ]
    },
    error: {
      circles: [
        "absolute top-1/4 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse",
        "absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"
      ]
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {variants[variant].circles.map((className, index) => (
        <div key={index} className={className}></div>
      ))}
    </div>
  );
}