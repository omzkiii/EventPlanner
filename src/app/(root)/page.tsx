// app/page.tsx (server)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/route";
import Signout from "@/components/auth/signout";

export default async function RootPage() {
  const session = await getServerSession(authOption);

  return <div>Loading...</div>;

}
