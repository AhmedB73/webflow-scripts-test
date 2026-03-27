"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Ta carte Webflow
import { Card as StoreCard } from "@/devlink";

// Fix des icônes Leaflet
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

function FlyToCoords({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map && coords) {
      // On attend que Leaflet soit prêt pour éviter le bug "Set map center"
      map.whenReady(() => {
        map.flyTo(coords, 13, { animate: true, duration: 1.2 });
      });
    }
  }, [coords, map]);
  return null;
}

interface Store {
  id?: string;
  name?: string;
  lat?: number;
  lng?: number;
  adresse?: string;
  image?: string;
}

interface MapComponentProps {
  stores: Store[];
  activeCoords: [number, number];
}

export default function MapComponent({ stores = [], activeCoords }: MapComponentProps) {
  return (
    <>
      <style jsx global>{`
        .leaflet-popup-content-wrapper { padding: 0 !important; background: transparent !important; box-shadow: none !important; }
        .leaflet-popup-content { margin: 0 !important; width: auto !important; }
        .leaflet-popup-tip-container { display: none; }
      `}</style>

      <MapContainer center={activeCoords} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <FlyToCoords coords={activeCoords} />

        {stores.map((store, index) => (
          store.lat && store.lng ? (
            <Marker key={store.id ?? index} position={[store.lat, store.lng]}>
              <Popup minWidth={280}>
                {/* TON COMPOSANT WEBFLOW EN ROUGE */}
                <StoreCard
                  imageImageImage={store.image || "https://via.placeholder.com/300x150"}
                  text1={store.name}
                  text2={store.adresse}
                />
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </>
  );
}