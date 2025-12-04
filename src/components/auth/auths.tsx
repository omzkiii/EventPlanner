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

  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui";

import { JSX, useState } from "react";
import {Eye, EyeClosed, Loader2} from "lucide-react";

function GuestDialog(): JSX.Element | null {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" id="Login" className="w-full justify-center font-extrabold text-sans"> SIGN IN WITH GUEST ACCOUNT </Button>
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
                    <EyeClosed className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit"> Log-in </Button>
          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>
  );
}

export default function Auths() {
  const [isLoading, setIsLoading] = useState<"google" | "facebook" | null>(null);

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
        <Button
          className="w-full"
          disabled={!!isLoading}
          onClick={() => handleLogin("google")}
        > 
          { isLoading === "google" ? (
              <Loader2 className="animate-spin h-5 w-5" />
          ): (
            <> 
              <SiGoogle className="w-5 h-5 text-secondary" />
              Connect with Google
            </>
          )}
          
          
        </Button>
        <Button 
          className="w-full"
          disabled={!!isLoading}
          onClick={() => handleLogin("facebook")}
        >
          { isLoading === "facebook" ? (
              <Loader2 className="animate-spin h-5 w-5" />
          ): (
            <> 
              <SiFacebook className="w-5 h-5 text-secondary" />
              Connect with Facebook
            </>
          )}
          
        </Button>
      </div>
    
    </>


    
  );
}
