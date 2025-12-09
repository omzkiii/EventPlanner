// app/username/page.tsx  (this is a SERVER component)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import UsernameClient from "@/components/auth/username";

export default async function UsernamePage() {
  const session = await getServerSession(authOption);

  // 1. Not logged in → no right to see /username
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // 2. Already has username → go to dashboard
  if (session.user?.username) {
    redirect("/dsh");
  }

  // 3. Logged in, no username → show the form
  return <UsernameClient />;
}
