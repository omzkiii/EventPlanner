"use client";
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
    <div>
      <label>username: </label>
      <input
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      ></input>
      <button onClick={() => updateUsername(username)}>Set Username</button>
    </div>
  );
}
