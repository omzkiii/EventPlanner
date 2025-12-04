import "@/assets/extras.css";
import Auths from "@/components/auth/auths";
import { Suspense } from "react";

export default function FormPage() {
  // Page for validation logic

  return (
    <div className="flex justify-start self-start p-10 h-screen w-screen bg-background">
      <div className="flex-col 
      lg:flex-row flex w-full gap-8">
        <div className="bg-black rounded-md flex-1"></div>
        <div className="
        w-full sm:h-6/12 sm:px-[10vw]
        lg:h-auto lg:px-0 lg:w-3/12 
        flex-col flex gap-3">
          <div id="logo" className="size-9 bg-accent rounded-md"></div>
          <h1 className="font-sans text-4xl text-foreground font-extrabold">
            Let's Get Started
          </h1>
          <p className="font-mono text-1xl text-muted italic">
            Grab high-class graphics and boost <br /> your design flow
          </p>
          <Auths />
        </div>
      </div>
    </div>
  );
}
