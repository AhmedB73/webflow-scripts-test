import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icônes Leaflet avec Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function CenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 13);
  }, [position]);
  return null;
}

const WEBFLOW_API_TOKEN = "TON_TOKEN_ICI";
const COLLECTION_ID = "TON_COLLECTION_ID_ICI";

export default function MapComponent() {
  const [userPosition, setUserPosition] = useState(null);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      () => setError("Géolocalisation refusée")
    );
  }, []);

  useEffect(() => {
    fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
        "accept-version": "1.0.0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const items = data.items.map((item) => ({
          id: item.id,
          name: item.fieldData.name,
          lat: parseFloat(item.fieldData.latitude),
          lng: parseFloat(item.fieldData.longitude),
          slug: item.fieldData.slug,
        }));
        setStores(items);
      })
      .catch(() => setError("Erreur chargement CMS"));
  }, []);

  const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <MapContainer
        center={userPosition || [48.8566, 2.3522]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        {userPosition && (
          <>
            <CenterMap position={userPosition} />
            <Marker position={userPosition} icon={userIcon}>
              <Popup>📍 Vous êtes ici</Popup>
            </Marker>
          </>
        )}
        {stores.map((store) => (
          <Marker key={store.id} position={[store.lat, store.lng]}>
            <Popup>
              <strong>{store.name}</strong>
              <br />
              <a href={`/grandes-surfaces/${store.slug}`} target="_blank" rel="noreferrer">
                Voir la fiche →
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
