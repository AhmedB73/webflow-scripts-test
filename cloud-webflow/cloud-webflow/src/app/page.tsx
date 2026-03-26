"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Navbar, MapRecherche } from "@/devlink";

const Map = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "500px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      Chargement de la carte...
    </div>
  ),
});

export default function Home() {
  const [magasinsCMS, setMagasinsCMS] = useState<any[]>([]);
  const [activeCoords, setActiveCoords] = useState<[number, number]>([43.3595, 5.3524]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSugg, setShowSugg] = useState(false);

  useEffect(() => {
    fetch("/api/webflow-cms")
      .then((res) => res.json())
      .then((data: any) => {
        const stores = Array.isArray(data) ? data : [];
        setMagasinsCMS(stores);
      })
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  const handleSearch = useCallback(
    async (value: string) => {
      if (value.length < 2) { setSuggestions([]); return; }
      const filteredCMS = magasinsCMS.filter((m: any) =>
        m.name?.toLowerCase().includes(value.toLowerCase())
      );
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=4`);
        const geoData = (await res.json()) as any[];
        const geoResults = geoData.map((g) => ({
          id: `geo-${g.place_id}`,
          name: g.display_name,
          type: "geo",
          lat: parseFloat(g.lat),
          lng: parseFloat(g.lon),
        }));
        setSuggestions([...filteredCMS, ...geoResults]);
      } catch (e) { setSuggestions(filteredCMS); }
    },
    [magasinsCMS]
  );

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 500);
    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  return (
    <main style={{ background: "#000000", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Conteneur Recherche */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          
          <MapRecherche
            slot={
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                width: "100%", 
                border: "1px solid white", // LE CONTOUR BLANC ICI !!!
                borderRadius: "8px",
                background: "#000000"
              }}>
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSugg(true); }}
                  onFocus={() => setShowSugg(true)}
                  placeholder="Trouver un magasin ou une ville..."
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    background: "transparent",
                    color: "white", 
                  }}
                />
                <button
                  onClick={() => handleSearch(query)}
                  style={{ padding: "10px", background: "none", border: "none", cursor: "pointer" }}
                >
                  <img
                    src="https://cdn.prod.website-files.com/69c4fbdddbeddb6a9803391e/69c4fbeec4cd900022857e9d_Ico%CC%82ne%20Recherche%20(1).png"
                    alt="Rechercher"
                    style={{ width: "20px", height: "20px", filter: "invert(1)" }} 
                  />
                </button>
              </div>
            }
          />

          {/* Suggestions en ABSOLUTE */}
          {showSugg && suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "105%",
                left: 0,
                right: 0,
                background: "#111",
                border: "1px solid #444",
                listStyle: "none",
                padding: 0,
                margin: 0,
                borderRadius: "8px",
                zIndex: 2000,
              }}
            >
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  onClick={() => {
                    setActiveCoords([s.lat, s.lng]);
                    setQuery(s.name);
                    setShowSugg(false);
                  }}
                  style={{ padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #222", color: "white" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {s.type === "cms" ? "📍 " : "🌍 "}{s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Carte */}
        <div style={{ height: "600px", borderRadius: "12px", overflow: "hidden", border: "1px solid #333", position: "relative", zIndex: 1 }}>
          <Map {...({ stores: magasinsCMS, activeCoords } as any)} />
        </div>
      </div>
    </main>
  );
}