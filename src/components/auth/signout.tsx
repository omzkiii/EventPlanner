"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button, Spinner } from "@/components/ui";


export default function Signout() {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col justify-start self-start p-10 h-screen w-screen bg-background">
      {status === "loading" ? (
        <div>
          <div>loading...</div>
          <Spinner />
        </div>
      ) : (
        <div className="p-10 text-3xl">
          <h1>
            Hello {session?.user?.name} AKA {session?.user.username}!
          </h1>
          <Image
            src={session?.user?.image ?? "/placeholder.jpg"}
            width={100}
            height={100}
            alt={session?.user?.name ?? "User image"}
          />
        </div>
      )}
      <button
        className="w-2"
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
