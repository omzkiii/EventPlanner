import React from "react";
import SignupForm from "@/components/auth/signup/signupForm";
import "@/assets/extras.css";
import { Button } from "@heroui/react";
import { SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons";

export default function FormPage() {
  // Page for validation logic

  return (
    <div className="flex justify-start self-start p-10 h-screen w-screen bg-background">
      <div className="flex w-full gap-8">
        <div className="bg-black rounded-md flex-1"></div>
        <div className="w-3/12 flex-col flex gap-3">
          <div id="logo" className="size-9 bg-accent rounded-md"></div>
          <h1 className="font-sans text-4xl text-foreground">
            Login to Events
          </h1>
          <p className="font-mono text-1xl text-muted italic">
            Grab high-class graphics and boost <br /> your design flow
          </p>

          <SignupForm />

          <div id="oAuth" className="flex flex-col pt-5 gap-3">
            <Button className="w-full">
              <SiGoogle className="w-5 h-5 text-secondary" />
              Connect with Google
            </Button>
            <Button className="w-full">
              <SiFacebook className="w-5 h-5 text-secondary" />
              Connect with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
