import type { ProcessedGitHubData } from "~/lib/types/github";
import TemplateSelector from "~/components/template-selector";

interface TemplateContentProps {
  githubData: ProcessedGitHubData;
}

export function TemplateContent({ githubData }: TemplateContentProps) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
        <TemplateSelector
          githubData={githubData}
        />
      </div>
    </div>
  );
}