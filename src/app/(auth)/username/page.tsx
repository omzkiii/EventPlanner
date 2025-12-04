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
import { Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Username() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { data: session, update } = useSession();

  const updateUsername = async (username: string) => {
    if (!session?.user?.email) return;

    await fetch("/api/auth/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    await update();
    router.push("/");
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
                autoComplete="username"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => {
              updateUsername(username);
            }}
            className="w-full"
          >
            Let's Go!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
