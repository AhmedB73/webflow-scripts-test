"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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
  description?: string;
  img?: string;
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
      <FlyToCoords coords={activeCoords} />
      {stores.map((store, index) =>
        store.lat && store.lng ? (
          <Marker key={store.id ?? index} position={[store.lat, store.lng]}>
            <Popup maxWidth={250}>
              {store.img && (
                <img
                  src={store.img}
                  alt={store.name}
                  style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }}
                />
              )}
              <strong style={{ fontSize: "15px" }}>{store.name}</strong>
              {store.address && <p style={{ margin: "4px 0", color: "#666", fontSize: "12px" }}>{store.address}</p>}
              {store.description && <p style={{ margin: "6px 0 0", fontSize: "13px", lineHeight: "1.4" }}>{store.description}</p>}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
