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
import { useState } from "react";
import "@/assets/extras.css";

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

      await update();
      router.refresh();

      router.push("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Network error while updating username");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button
            id="Usr-Btn"
            onClick={() => {
              updateUsername(username);
            }}
            disabled={!!isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Let's Go!"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
