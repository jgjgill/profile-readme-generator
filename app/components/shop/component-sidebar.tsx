import { COMPONENT_CATEGORIES } from "~/lib/constants/component-categories";

type ComponentType = "timeline" | "wave-banner" | "neon-sign" | "typing-animation";

interface ComponentSidebarProps {
  activeComponent: ComponentType;
  onComponentChange: (component: ComponentType) => void;
}

export function ComponentSidebar({
  activeComponent,
  onComponentChange,
}: ComponentSidebarProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
      <h2 className="text-xl font-bold text-white mb-6">
        사용 가능한 컴포넌트
      </h2>
      <div className="space-y-3">
        {COMPONENT_CATEGORIES.map((component) => (
          <button
            key={component.id}
            onClick={() =>
              component.status === "available" &&
              onComponentChange(component.id as ComponentType)
            }
            disabled={component.status === "coming-soon"}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
              activeComponent === component.id
                ? "border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25"
                : component.status === "available"
                ? "border-white/20 hover:border-white/30 hover:bg-white/10"
                : "border-white/10 bg-white/5 cursor-not-allowed opacity-60"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{component.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-semibold ${
                      component.status === "available"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {component.name}
                  </h3>
                  {component.status === "coming-soon" && (
                    <span className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded-lg shrink-0">
                      준비중
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm mt-2 leading-relaxed ${
                    component.status === "available"
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {component.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}