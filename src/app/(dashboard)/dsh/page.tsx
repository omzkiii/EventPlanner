import Signout from "@/components/auth/signout";
import React from "react";
import Events from "@/components/dashboard/events";
import {useSession} from "next-auth/react";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import MapWrapper from "@/components/dashboard/MapWrapper";



export default async function View() {
  const session = await getServerSession(authOption);

  return (
    <div className="flex h-screen ">
      <div id="sidebarL" className="flex flex-col w-2/12 p-2 gap-2">
        <Signout session={session}/>
        <Events session={session} />
      </div>
      <div className="flex-1 bg-amber-200">
        <MapWrapper height="100%" width="100%"/>
      </div>
      <div id="sidebarR" className="hidden md:flex p-7 gap-3 flex-col w-4/12 relative">   
        <div id="event-img" className="bg-red-500 rounded-2xl w-full h-5/12">  
          
        </div>
        <div className="p-8 bg-blue-500 rounded-xl flex-1">
          a
        </div>
      </div>
    </div>
  );
}
