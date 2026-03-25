import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./App.css";

// Imports DevLink
import { DevLinkProvider } from "../devlink/DevLinkProvider";
import { BottomRecherche } from "../devlink/BottomRecherche";

// Fix pour les icônes Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// =============================================
// ⚙️  CONFIG — À modifier avec tes vraies valeurs
// =============================================
const WEBFLOW_TOKEN = "e4c4ba4010c49adfc7c8f7a6bc4c5ced8cb0ab0e3c08cb48c2188cbfbaf0c01f";         // Webflow API token (lecture seule)
const COLLECTION_ID = "69b2cbb34aaf5a91fcfe720b"; // ID de ta collection CMS
const CORS_PROXY    = "https://corsproxy.io/?"; // Proxy CORS (dev uniquement)

// =============================================
// COMPOSANT : Recentre la carte sur les nouvelles coords
// =============================================
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 14, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

// =============================================
// COMPOSANT PRINCIPAL
// =============================================
function App() {
  const [activeCoords, setActiveCoords]   = useState([43.3595, 5.3524]); // Marseille par défaut
  const [magasinsCMS, setMagasinsCMS]     = useState([]);
  const [query, setQuery]                 = useState("");
  const [suggestions, setSuggestions]     = useState([]);
  const [showSugg, setShowSugg]           = useState(false);
  const [loadingCMS, setLoadingCMS]       = useState(true);
  const [errorCMS, setErrorCMS]           = useState(null);

  // -----------------------------------------------
  // 1. RÉCUPÉRATION DU CMS WEBFLOW (avec pagination)
  // -----------------------------------------------
  useEffect(() => {
    const fetchAllItems = async () => {
      setLoadingCMS(true);
      setErrorCMS(null);

      try {
        let allItems = [];
        let offset   = 0;
        const limit  = 100;

        while (true) {
          const url      = `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=${limit}&offset=${offset}`;
          const proxyUrl = CORS_PROXY + encodeURIComponent(url);

          const response = await fetch(proxyUrl, {
            headers: {
              'accept':        'application/json',
              'authorization': `Bearer ${WEBFLOW_TOKEN}`
            }
          });

          if (!response.ok) {
            throw new Error(`Erreur API Webflow : ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          const items = data.items || [];
          allItems = [...allItems, ...items];

          // Arrêt si on a tout récupéré
          const total = data.pagination?.total ?? allItems.length;
          if (allItems.length >= total || items.length === 0) break;

          offset += limit;
        }

        // ⚠️ Adapte les slugs de champs à ta collection Webflow
        const clean = allItems
          .map(item => ({
            id:          item.id,
            name:        item.fieldData?.name        ?? "Sans nom",
            type:        'cms',
            lat:         parseFloat(item.fieldData?.latitude),
            lng:         parseFloat(item.fieldData?.longitude),
            adresse:     item.fieldData?.adresse     ?? "",
            description: item.fieldData?.description ?? "",    // ← AJOUT
            image:       item.fieldData?.image?.url  ?? null   // ← AJOUT
          }))
          // Filtre les items sans coordonnées valides
          .filter(m => !isNaN(m.lat) && !isNaN(m.lng));

        setMagasinsCMS(clean);
      } catch (err) {
        console.error("Erreur CMS:", err);
        setErrorCMS("Impossible de charger les magasins. Vérifie ton token et l'ID de collection.");
      } finally {
        setLoadingCMS(false);
      }
    };

    fetchAllItems();
  }, []);

  // -----------------------------------------------
  // 2. RECHERCHE MIXTE (CMS + Nominatim OSM)
  // -----------------------------------------------
  const handleSearch = useCallback(async (value) => {
    if (value.length < 2) {
      setSuggestions(magasinsCMS.slice(0, 10)); // Affiche les 10 premiers magasins par défaut
      return;
    }

    // Filtre local sur le CMS
    const filteredCMS = magasinsCMS.filter(m =>
      m.name.toLowerCase().includes(value.toLowerCase()) ||
      m.adresse.toLowerCase().includes(value.toLowerCase())
    );

    // Recherche géographique via Nominatim
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=4&addressdetails=1`,
        { headers: { 'Accept-Language': 'fr' } }
      );
      const geoData = await res.json();

      const geoResults = geoData.map(g => ({
        id:   `geo-${g.place_id}`,
        name: g.display_name,
        type: 'geo',
        lat:  parseFloat(g.lat),
        lng:  parseFloat(g.lon)
      }));

      setSuggestions([...filteredCMS, ...geoResults]);
    } catch (e) {
      console.error("Erreur Nominatim:", e);
      setSuggestions(filteredCMS);
    }
  }, [magasinsCMS]);

  // Debounce sur la recherche (500ms)
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 500);
    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  // -----------------------------------------------
  // 3. SÉLECTION D'UNE SUGGESTION
  // -----------------------------------------------
  const handleSelect = (s) => {
    setActiveCoords([s.lat, s.lng]);
    setQuery(s.name);
    setShowSugg(false);
  };

  // -----------------------------------------------
  // 4. RENDU
  // -----------------------------------------------
  return (
    <DevLinkProvider>
      <div className="App">
        <div className="container-large">

          {/* BARRE DE RECHERCHE */}
          <div className="search-wrapper">
            <BottomRecherche
              rechercheInput={{
                value:       query,
                onChange:    (e) => setQuery(e.target.value),
                onFocus:     () => setShowSugg(true),
                onBlur:      () => setTimeout(() => setShowSugg(false), 300),
                placeholder: "Rechercher un magasin ou une adresse..."
              }}
            />

            {/* MESSAGE D'ERREUR CMS */}
            {errorCMS && (
              <div className="cms-error">{errorCMS}</div>
            )}

            {/* LISTE DES SUGGESTIONS */}
            {showSugg && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((s) => (
                  <li key={s.id} onClick={() => handleSelect(s)} className="suggestion-item">
                    <span className={`badge ${s.type}`}>
                      {s.type === 'cms' ? '📍 MAGASIN' : '🌍 ADRESSE'}
                    </span>
                    <div className="suggestion-text">{s.name}</div>
                    {s.adresse && s.type === 'cms' && (
                      <div className="suggestion-adresse">{s.adresse}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* AUCUN RÉSULTAT */}
            {showSugg && query.length >= 2 && suggestions.length === 0 && !loadingCMS && (
              <div className="no-results">Aucun résultat pour « {query} »</div>
            )}
          </div>

          {/* CARTE */}
          <div className="map-container">
            {loadingCMS && (
              <div className="map-loading">Chargement des magasins...</div>
            )}

            <MapContainer
              center={activeCoords}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {/* Recentrage dynamique */}
              <RecenterMap coords={activeCoords} />

              {/* Marqueurs des magasins CMS */}
              {magasinsCMS.map(m => (
                <Marker key={m.id} position={[m.lat, m.lng]}>
                  <Popup minWidth={220} maxWidth={260}>
                    {/* IMAGE ← AJOUT */}
                    {m.image && (
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }}
                      />
                    )}
                    {/* NOM */}
                    <strong>{m.name}</strong>
                    {/* ADRESSE */}
                    {m.adresse && <><br />{m.adresse}</>}
                    {/* DESCRIPTION ← AJOUT */}
                    {m.description && (
                      <p style={{ margin: '6px 0 0', fontSize: '12px', lineHeight: '1.4' }}>
                        {m.description}
                      </p>
                    )}
                  </Popup>
                </Marker>
              ))}

              {/* Marqueur du lieu recherché (si ce n'est pas un magasin CMS) */}
              {query && !magasinsCMS.find(m => m.name === query) && (
                <Marker position={activeCoords}>
                  <Popup>
                    Lieu sélectionné :<br /><strong>{query}</strong>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

        </div>
      </div>
    </DevLinkProvider>
  );
}

export default App;