"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icônes Leaflet cassées avec Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Composant interne pour déplacer la vue quand activeCoords change
function FlyToCoords({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 13, { animate: true, duration: 1.2 });
  }, [coords, map]);
  return null;
}

interface Store {
  id?: string;
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
}

interface MapComponentProps {
  stores: Store[];
  activeCoords: [number, number];
}

export default function MapComponent({ stores, activeCoords }: MapComponentProps) {
  return (
    <MapContainer
      center={activeCoords}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Déplace la carte quand la recherche change */}
      <FlyToCoords coords={activeCoords} />

      {/* Marqueurs des magasins depuis le CMS Webflow */}
      {stores.map((store, index) =>
        store.lat && store.lng ? (
          <Marker key={store.id ?? index} position={[store.lat, store.lng]}>
            <Popup>
              <strong>{store.name ?? "Magasin"}</strong>
              {store.address && <><br />{store.address}</>}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}