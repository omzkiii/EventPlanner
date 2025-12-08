"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/assets/extras.css";
import UniBtn from "@/components/shared/UniBtn";

export default function Username() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, update } = useSession();

  const updateUsername = async (username: string) => {
    if (!session?.user?.email) return;

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Update failed:", data);
        alert(data.error || "Something went wrong updating username");
        setIsLoading(false);
        return;
      }

      update().catch(() => {});

      try { router.prefetch("/dsh"); } catch {}

      router.replace("/dsh");

    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Network error while updating username");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  //Catch
  useEffect(() => {
    if (session === undefined) return;
  
    if (session && session.user?.username) {
      router.replace("/dsh");
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-sans font-extrabold">
            Set up your Username
          </CardTitle>
          <CardDescription className="text-mono">
            Set your username and let's get started!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
        <UniBtn
            Text="Let's Go!"
            onClick={() => updateUsername(username)}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
