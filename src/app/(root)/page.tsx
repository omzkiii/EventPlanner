// app/page.tsx (server)
import { redirect } from "next/navigation";

export default function RootPage() {
  // Option A: always redirect to /login
  redirect("/login");

  // unreachable, but TS wants a return
  return null;
}
