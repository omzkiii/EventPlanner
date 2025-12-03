"use client";
import { Button } from "@heroui/react";
import { SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";

export default function Auths() {
  return (
    <div id="oAuth" className="flex flex-col pt-5 gap-3">
      <Button
        className="w-full"
        onClick={() => {
          signIn("google", {
            callbackUrl: "/",
          });
        }}
      >
        <SiGoogle className="w-5 h-5 text-secondary" />
        Connect with Google
      </Button>
      <Button className="w-full">
        <SiFacebook className="w-5 h-5 text-secondary" />
        Connect with Facebook
      </Button>
    </div>
  );
}
