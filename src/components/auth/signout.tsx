"use client";
import { Button, Spinner } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Signout() {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col justify-start self-start p-10 h-screen w-screen bg-background">
      {status === "loading" ? (
        <div>
          <Spinner
            className="p-10"
            size="lg"
            classNames={{ label: "text-foreground mt-4" }}
            variant="dots"
          />
        </div>
      ) : (
        <div className="p-10 text-3xl">
          <h1>Hello {session?.user?.name}!</h1>
          <Image
            src={session?.user?.image ?? "/placeholder.jpg"}
            width={100}
            height={100}
            alt={session?.user?.name ?? "User image"}
          />
        </div>
      )}
      <Button
        className="w-2"
        onPress={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
