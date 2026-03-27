"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Navbar, MapRecherche } from "@/devlink";

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "600px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
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
    // LA SOLUTION EST ICI : On ajoute /appa devant le chemin de l'API
    const apiUrl = typeof window !== "undefined" 
      ? `${window.location.origin}/appa/api/webflow-cms` 
      : "/appa/api/webflow-cms";

    fetch(apiUrl)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("L'API n'a pas renvoyé du JSON (probablement une erreur 404)");
        }
        return res.json();
      })
      .then((data: any) => {
        const stores = Array.isArray(data) ? data : [];
        setMagasinsCMS(stores);
      })
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  const handleSearch = useCallback(async (value: string) => {
    if (value.length < 2) { setSuggestions([]); return; }
    const filteredCMS = magasinsCMS.filter((m: any) =>
      m.name?.toLowerCase().includes(value.toLowerCase())
    );
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=4`);
      const geoData = (await res.json()) as any[];
      const geoResults = geoData.map((g) => ({
        id: `geo-${g.place_id}`, name: g.display_name, type: "geo", lat: parseFloat(g.lat), lng: parseFloat(g.lon),
      }));
      setSuggestions([...filteredCMS, ...geoResults]);
    } catch (e) { setSuggestions(filteredCMS); }
  }, [magasinsCMS]);

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 500);
    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  return (
    <main style={{ background: "#000000", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <MapRecherche
            slot={
              <div style={{ display: "flex", alignItems: "center", width: "100%", border: "1px solid white", borderRadius: "8px", background: "#000" }}>
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSugg(true); }}
                  onFocus={() => setShowSugg(true)}
                  placeholder="Trouver un magasin ou une ville..."
                  style={{ flex: 1, padding: "12px 14px", border: "none", outline: "none", fontSize: "16px", background: "transparent", color: "white" }}
                />
              </div>
            }
          />
        </div>

        <div style={{ height: "600px", borderRadius: "12px", overflow: "hidden", border: "1px solid #333", position: "relative", zIndex: 1 }}>
          <MapComponent stores={magasinsCMS} activeCoords={activeCoords} />
        </div>
      </div>
    </main>
  );
}