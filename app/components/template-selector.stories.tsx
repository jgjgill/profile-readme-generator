import type { Meta, StoryObj } from "@storybook/react-vite";
import TemplateSelector from "./template-selector";
import { mockGitHubData } from "~/lib/mock-data";
import { mockTechExpertData } from "~/lib/mock-tech-expert-data";

const meta: Meta<typeof TemplateSelector> = {
  title: "Components/TemplateSelector",
  component: TemplateSelector,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "템플릿 선택 UI 컴포넌트입니다. 사용자가 3가지 README 템플릿 중 하나를 선택하거나 비교할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TemplateSelector>;

export const Default: Story = {
  name: "기본 템플릿 선택",
  args: {
    githubData: mockGitHubData,
    techExpertData: mockTechExpertData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 상태의 템플릿 선택기입니다. 사용자는 3가지 템플릿 중 하나를 선택할 수 있습니다.",
      },
    },
  },
};

export const ComparisonMode: Story = {
  name: "템플릿 비교 모드",
  args: {
    githubData: mockGitHubData,
    techExpertData: mockTechExpertData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "모든 템플릿을 한 번에 비교할 수 있는 모드입니다. '모든 템플릿 비교하기' 버튼을 클릭하면 이 화면이 표시됩니다.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Storybook play function to automatically show comparison mode
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for component to mount
    
    const buttons = canvasElement.querySelectorAll("button");
    const compareButton = Array.from(buttons).find((button) =>
      button.textContent?.includes("모든 템플릿 비교하기")
    ) as HTMLButtonElement;

    if (compareButton) {
      compareButton.click();
    }
  },
};
