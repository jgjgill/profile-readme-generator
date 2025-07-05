import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getSession, destroySession } from "~/lib/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">로그아웃 중...</p>
      </div>
    </div>
  );
}