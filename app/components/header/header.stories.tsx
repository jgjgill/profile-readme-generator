import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "애플리케이션의 메인 헤더 컴포넌트입니다. 로고, 네비게이션, 사용자 메뉴를 포함하며 반응형 디자인을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "select" },
      options: ["home", "shop"],
      description: "현재 활성화된 페이지",
    },
    isLoggedIn: {
      control: { type: "boolean" },
      description: "로그인 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const mockUser = {
  id: 12345,
  login: "jgjgill",
  name: "김개발",
  avatar_url: "https://avatars.githubusercontent.com/u/84524514?v=4",
};

export const HomePage: Story = {
  name: "홈페이지 (로그아웃 상태)",
  args: {
    currentPage: "home",
    isLoggedIn: false,
    userInfo: null,
  },
};

export const HomePageLoggedIn: Story = {
  name: "홈페이지 (로그인 상태)",
  args: {
    currentPage: "home",
    isLoggedIn: true,
    userInfo: mockUser,
  },
};

export const ShopPage: Story = {
  name: "상점 페이지 (로그아웃 상태)",
  args: {
    currentPage: "shop",
    isLoggedIn: false,
    userInfo: null,
  },
};

export const ShopPageLoggedIn: Story = {
  name: "상점 페이지 (로그인 상태)",
  args: {
    currentPage: "shop",
    isLoggedIn: true,
    userInfo: mockUser,
  },
};

export const LongUserName: Story = {
  name: "긴 사용자명",
  args: {
    currentPage: "home",
    isLoggedIn: true,
    userInfo: {
      ...mockUser,
      name: "아주아주아주긴개발자이름",
      login: "very-very-long-username-example",
    },
  },
};

export const NoDisplayName: Story = {
  name: "표시명이 없는 사용자",
  args: {
    currentPage: "shop",
    isLoggedIn: true,
    userInfo: {
      ...mockUser,
      name: null,
    },
  },
};

export const ResponsiveTest: Story = {
  name: "반응형 테스트",
  args: {
    currentPage: "home",
    isLoggedIn: true,
    userInfo: mockUser,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1200px",
            height: "800px",
          },
        },
      },
      defaultViewport: "mobile",
    },
    docs: {
      description: {
        story:
          "모바일에서는 햄버거 메뉴가 표시되고, 데스크톱에서는 전체 네비게이션이 표시됩니다.",
      },
    },
  },
};