"use client";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

export default function Signout() {
  return (
    <div className="flex justify-start self-start p-10 h-screen w-screen bg-background">
      <Button
        onPress={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
