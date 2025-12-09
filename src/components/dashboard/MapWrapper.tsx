"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./events-map"), {
  ssr: false,
});

export default function MapWrapper(props: any) {
  return <LeafletMap {...props} />;
}