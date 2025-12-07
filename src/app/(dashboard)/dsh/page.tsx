import Signout from "@/components/auth/signout";
import React from "react";
import Events from "./events";

export default function View() {
  return (
    <>
      <h1>Home</h1>
      <Signout />
      <Events />
    </>
  );
}
