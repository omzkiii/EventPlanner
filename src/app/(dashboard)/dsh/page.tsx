import Signout from "@/components/auth/signout";
import React from "react";
import Events from "@/components/dashboard/events";
import {useSession} from "next-auth/react";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Map from "@/components/dashboard/events-map";

export default async function View() {
  const session = await getServerSession(authOption);

  return (
    <div className="flex h-screen ">
      <div id="sidebarL" className="flex flex-col w-2/12 p-2 gap-2 ">
        <Signout session={session}/>
        <Events session={session} />
      </div>
      <div className="flex-1 bg-amber-200">
        <Map height="100%" width="100%"/>
      </div>
      <div className="bg-blue-600 flex flex-col w-4/12">
      </div>
    </div>
  );
}
