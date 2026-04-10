"use client";
import { useState, useEffect, useMemo, Suspense } from "react"; // Ajout de Suspense
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar, BarRechercheFilter } from "@/devlink";

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "600px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      Chargement de la carte...
    </div>
  ),
});

// --- 1. COMPOSANT INTERNE (Logique de filtrage) ---
function MapContent() {
  const [magasinsCMS, setMagasinsCMS] = useState<any[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const searchParams = useSearchParams();
  
  const marquesSelectionnees = useMemo(() => {
    return searchParams.getAll("marque");
  }, [searchParams]);

  useEffect(() => {
    const isLocal = typeof window !== "undefined" && 
      (window.location.hostname === "localhost" || window.location.hostname.includes("192.168."));
      
    const apiUrl = isLocal ? "/api/webflow-cms" : "/appa/api/webflow-cms";

    fetch(apiUrl)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError(`L'API a échoué.`);
        }
        return res.json();
      })
      .then((data: any) => {
        setMagasinsCMS(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  const magasinsAfffiches = useMemo(() => {
    if (marquesSelectionnees.length === 0) {
      return magasinsCMS;
    }
    return magasinsCMS.filter((magasin) => {
      return marquesSelectionnees.some(marque => 
        magasin.name?.toLowerCase().includes(marque.toLowerCase())
      );
    });
  }, [magasinsCMS, marquesSelectionnees]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ position: "relative", marginBottom: "20px", zIndex: 60 }}>
        <BarRechercheFilter 
          isMenuOpen={isFilterMenuOpen} 
          onToggleMenu={{ 
              onClick: (e: any) => { 
                  e?.preventDefault(); 
                  setIsFilterMenuOpen(!isFilterMenuOpen); 
              } 
          }}
          onSearchClick={{ 
              onClick: (e: any) => { 
                  e?.preventDefault(); 
                  setIsFilterMenuOpen(false);
              } 
          }}
          menuOptionsSlot={<div />} 
        />
      </div>

      {marquesSelectionnees.length > 0 && (
        <div style={{ marginBottom: "10px", color: "#b084f5" }}>
          Filtre actif : <strong>{marquesSelectionnees.join(", ")}</strong> 
          ({magasinsAfffiches.length} magasins trouvés)
        </div>
      )}

      <div style={{ height: "600px", borderRadius: "12px", overflow: "hidden", border: "1px solid #333", position: "relative", zIndex: 1 }}>
        <MapComponent 
          stores={magasinsAfffiches} 
          activeCoords={[43.3595, 5.3524]} 
        />
      </div>
    </div>
  );
}

// --- 2. COMPOSANT PRINCIPAL (Celui qui est exporté) ---
export default function Home() {
  return (
    <main style={{ background: "#000000", minHeight: "100vh", color: "white" }}>
      <Navbar />
      {/* Suspense est OBLIGATOIRE ici pour que le build Webflow Cloud réussisse */}
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>Chargement des filtres...</div>}>
        <MapContent />
      </Suspense>
    </main>
  );
}