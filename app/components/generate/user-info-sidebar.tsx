import type { ProcessedGitHubData } from "~/lib/types/github";
import UserCard from "~/components/user-card";

interface UserInfoSidebarProps {
  userData: ProcessedGitHubData;
}

export function UserInfoSidebar({ userData }: UserInfoSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <UserCard userData={userData} />
      </div>
    </div>
  );
}