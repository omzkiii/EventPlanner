"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import * as L from "leaflet";


import { MapContainer, Marker, Popup, TileLayer, useMap, CircleMarker } from "react-leaflet";
import { useEffect, useMemo } from "react";
import { SVGOverlay } from "leaflet";


// some Place Holder
const myEvents: EventItem[] = [
  {
    id: "mnl-1",
    title: "Rizal Park Concert",
    lat: 14.5828,
    lng: 120.9781, // Rizal Park / Luneta
  },
  {
    id: "mnl-2",
    title: "Intramuros Heritage Walk",
    lat: 14.5921,
    lng: 120.9738, // Intramuros
  },
  {
    id: "mnl-3",
    title: "Binondo Food Crawl",
    lat: 14.5961,
    lng: 120.9710, // Binondo / Chinatown
  },
];


type MapProps = {
  height: string | number;
  width: string | number;
  events?: EventItem[];
}

type EventItem = { 
  id: string; 
  title: string; 
  lat: number; 
  lng: number 
};




function EventMarker({ ev, zoom = 14 }: { ev: EventItem; zoom?: number }) {
  const map = useMap();


  // This needs to be called by event listeners 
  const handleClick = (e: L.LeafletMouseEvent) => {
    map.setView([ev.lat, ev.lng], zoom, { animate: true });
    console.log("Marker clicked:", ev);
  };

  return (
    <CircleMarker
      center={[ev.lat, ev.lng]}
      radius={8}
      pathOptions={{ color: "#e11d48", fillColor: "#ef4444", fillOpacity: 0.95 }}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        <div className="min-w-[150px]">

          {/** Some Image Desc / Image  */}
          {/** This button should open api or something */}
          <button
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Popup button:", ev);
            }}
          >
            Open
          </button>
        </div>
      </Popup>
    </CircleMarker>
  );
}




export default function Map({height, width, events = []} : MapProps) {

  const position: [number, number] = [14.6091, 121.0223];

  const phBounds = useMemo<L.LatLngBoundsExpression>(
    () => [
      [4.0, 116.0],
      [21.5, 127.0],
    ],
    []
  );

  return (
      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: height, width: width}}
        maxBounds={phBounds}
        maxBoundsViscosity={1.0}  
        
        minZoom={7}
        maxZoom={20}
        zoomControl={false}
        zoomAnimation={true}
        

        fadeAnimation={false}
        attributionControl={false}
        wheelDebounceTime={40}
        wheelPxPerZoomLevel={80}
      >
        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          {...{
              attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }}
          updateWhenZooming={true}
          updateWhenIdle={true}
          keepBuffer={3}
          detectRetina={false}
        />

        {/* Render markers if events exist */}
        {myEvents.map((ev) => (
          <EventMarker key={ev.id} ev={ev} zoom={17} />
        ))}

        
      </MapContainer>
  );
}
