"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button, Spinner } from "@/components/ui";
import { useState } from "react";
import UniBtn from "../shared/UniBtn";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function Signout({session } : { session: Session | null }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      try { router.prefetch("/login"); } catch (e) { /* ignore */ }

      const result = await signOut({ redirect: false });

      router.replace("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!session) {
    return (
      <div className="p-2">
        <div>Not signed in</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start">
      <div className="text-base">
        <h1>
          Hello {session.user?.name} AKA {session.user?.username}!
        </h1>

        <Image
          src={session.user?.image ?? "/placeholder.jpg"}
          width={100}
          height={100}
          alt={session.user?.name ?? "User image"}
          priority
        />
      </div>

      <UniBtn
        Text={isSigningOut ? "Signing out..." : "Sign out"}
        onClick={handleSignOut}
      />

    </div>
  );
}
