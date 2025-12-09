"use client";
import { SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import {
  Button,
  Label,
  Input,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

import React, { JSX, useEffect, useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import UniBtn from "../shared/UniBtn";

function GuestDialog(): JSX.Element | null {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // no reload page

    const form = e.currentTarget;
    const username = (form.username as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      console.log("Login Error", res.error);
      alert("Invalid Details");
      return;
    }

    router.refresh();
  }

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            id="Login"
            className="w-full justify-center font-extrabold text-sans"
          >
            {" "}
            SIGN IN WITH GUEST ACCOUNT{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-sans font-extrabold">
              Sign in with Email
            </DialogTitle>
            <DialogDescription className="text-mono">
              Don't have an account? Lets get stared with your new email!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue="my-user"
                type="text"
                autoComplete="username"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={showPassword ? "password" : "••••••••"}
                  autoComplete="current-password"
                />

                {/* The Toggle Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full w-9 p-0 hover:bg-transparent cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeClosed
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button id="Close-Btn" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button id="Log-Btn" type="submit">
              {" "}
              Log-in{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default function Auths() {
  const [isLoading, setIsLoading] = useState<"google" | "facebook" | null>(
    null,
  );

  const handleLogin = async (provider: "google" | "facebook") => {
    setIsLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      setIsLoading(null);
    }
  };

  return (
    <>
      <GuestDialog />

      <div id="oAuth" className="flex flex-col pt-5 mt-5 gap-3">
        <UniBtn
            Text="Connect with Google"
            Icon={SiGoogle}
            onClick={async () => {
              await handleLogin("google");
            }}
          />

          <UniBtn
            Text="Connect with Facebook"
            Icon={SiFacebook}
            onClick={async () => {
              await handleLogin("facebook");
            }}
          />
      </div>
    </>
  );
}
