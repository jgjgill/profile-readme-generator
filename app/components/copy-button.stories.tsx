import type { Meta, StoryObj } from "@storybook/react-vite";
import CopyButton from "./copy-button";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "다양한 텍스트를 클립보드에 복사할 수 있는 재사용 가능한 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    showIcon: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  name: "기본 버튼",
  args: {
    text: "안녕하세요! 👋 저는 김개발입니다",
    label: "복사하기",
    sectionName: "default",
  },
};

export const SectionCopy: Story = {
  name: "섹션별 복사",
  args: {
    text: `# 안녕하세요! 👋 저는 김개발입니다

> 풀스택 개발자로 새로운 기술을 배우고 적용하는 것을 좋아합니다.

[![GitHub followers](https://img.shields.io/github/followers/jgjgill?label=Follow&style=social)](https://github.com/jgjgill)`,
    label: "헤더 섹션 복사",
    sectionName: "header",
    variant: "secondary",
  },
};

export const LargeButton: Story = {
  name: "큰 크기 버튼",
  args: {
    text: "전체 README 내용을 여기에 복사합니다...",
    label: "전체 복사하기",
    sectionName: "full",
    size: "lg",
  },
};

export const WithoutIcon: Story = {
  name: "아이콘 없는 버튼",
  args: {
    text: "텍스트만 있는 버튼입니다",
    label: "복사",
    sectionName: "no-icon",
    showIcon: false,
  },
};

export const SecondaryVariant: Story = {
  name: "보조 스타일",
  args: {
    text: "보조 스타일의 복사 버튼입니다",
    label: "기술 스택 섹션 복사",
    sectionName: "tech-stack",
    variant: "secondary",
  },
};

export const InteractiveDemo: Story = {
  name: "인터랙티브 데모",
  render: () => {
    const sampleSections = [
      {
        key: "header",
        label: "헤더 섹션",
        content: `# 안녕하세요! 👋 저는 김개발입니다

> 풀스택 개발자로 새로운 기술을 배우고 적용하는 것을 좋아합니다.`,
      },
      {
        key: "tech-stack",
        label: "기술 스택 섹션",
        content: `## 💻 주요 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)`,
      },
      {
        key: "contact",
        label: "연락처 섹션",
        content: `## 📬 연락하기

- **GitHub**: [jgjgill](https://github.com/jgjgill)
- **Email**: \`이메일 주소를 입력하세요\`
- **LinkedIn**: \`LinkedIn 프로필 링크를 입력하세요\``,
      },
    ];

    return (
      <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          섹션별 복사 기능 테스트
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleSections.map((section) => (
            <div key={section.key} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">{section.label}</h4>
              <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded mb-3 overflow-hidden text-ellipsis whitespace-nowrap">
                {section.content.slice(0, 50)}...
              </pre>
              <CopyButton
                text={section.content}
                label={`${section.label} 복사`}
                sectionName={section.key}
                variant="secondary"
                className="w-full justify-center"
              />
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">전체 README 복사</h4>
          <CopyButton
            text={sampleSections.map(s => s.content).join('\n\n')}
            label="전체 README 복사하기"
            sectionName="full-readme"
            size="lg"
            className="w-full justify-center"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "실제 사용 시나리오를 테스트할 수 있는 인터랙티브 데모입니다. 각 버튼을 클릭해서 복사 기능을 확인해보세요.",
      },
    },
  },
};