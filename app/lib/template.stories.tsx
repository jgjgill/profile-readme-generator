import type { Meta, StoryObj } from "@storybook/react-vite";
import ReadmeOutput from "~/components/readme-output";
import {
  generateReadmeTemplate,
  generateImpactTemplate,
  generateTechExpertTemplate,
} from "./template";
import { mockGitHubData } from "./mock-data";
import { mockTechExpertData } from "./mock-tech-expert-data";

const meta: Meta<typeof ReadmeOutput> = {
  title: "Templates/Templates",
  component: ReadmeOutput,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "기본 README 템플릿들을 보여줍니다. 일반적인 개발자 프로필과 임팩트 중심 프로필 두 가지 스타일을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReadmeOutput>;

export const StandardTemplate: Story = {
  name: "기본 템플릿",
  args: {
    template: generateReadmeTemplate(mockGitHubData),
  },
  parameters: {
    docs: {
      description: {
        story:
          "가장 기본적인 README 템플릿입니다. 자기소개, 기술 스택, 프로젝트, 연락처 등의 표준적인 구성을 제공합니다.",
      },
    },
  },
};

export const ImpactTemplate: Story = {
  name: "임팩트 중심 템플릿",
  args: {
    template: generateImpactTemplate(mockGitHubData),
  },
  parameters: {
    docs: {
      description: {
        story:
          "성과와 임팩트를 강조하는 템플릿입니다. 수치화된 지표와 프로젝트의 실질적인 영향력을 부각시킵니다.",
      },
    },
  },
};

export const TechExpertTemplate: Story = {
  name: "기술 전문가형 템플릿",
  args: {
    template: generateTechExpertTemplate(mockTechExpertData),
  },
  parameters: {
    docs: {
      description: {
        story:
          "기술적 전문성을 강조하는 템플릿입니다. 언어별 숙련도, 코드 품질 지표, 기여 패턴 분석 등 개발자의 기술적 깊이를 보여줍니다.",
      },
    },
  },
};

// 비교용 스토리 - 두 템플릿을 나란히 보여줌
export const TemplateComparison: Story = {
  name: "템플릿 비교",
  render: () => {
    const standardTemplate = generateReadmeTemplate(mockGitHubData);
    const impactTemplate = generateImpactTemplate(mockGitHubData);
    const techExpertTemplate = generateTechExpertTemplate(mockTechExpertData);

    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            기본 템플릿
          </h3>
          <div className="scale-75 origin-top-left transform">
            <ReadmeOutput template={standardTemplate} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            임팩트 중심 템플릿
          </h3>
          <div className="scale-75 origin-top-left transform">
            <ReadmeOutput template={impactTemplate} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            기술 전문가형 템플릿
          </h3>
          <div className="scale-75 origin-top-left transform">
            <ReadmeOutput template={techExpertTemplate} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "두 가지 기본 템플릿을 나란히 비교해볼 수 있습니다.",
      },
    },
  },
};
