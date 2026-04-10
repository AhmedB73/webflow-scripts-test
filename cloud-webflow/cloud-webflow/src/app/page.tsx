"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation"; // Pour lire l'URL
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

export default function Home() {
  const [magasinsCMS, setMagasinsCMS] = useState<any[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // 1. On récupère les paramètres de l'URL
  const searchParams = useSearchParams();
  
  // 2. On extrait toutes les valeurs de "marque" dans l'URL
  // Exemple: ?marque=Carrefour&marque=Intermarche -> ["Carrefour", "Intermarche"]
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

  // 3. LOGIQUE DE FILTRAGE : On filtre les magasins du CMS en fonction de l'URL
  const magasinsAfffiches = useMemo(() => {
    // Si aucune marque n'est dans l'URL, on affiche tout par défaut
    if (marquesSelectionnees.length === 0) {
      return magasinsCMS;
    }

    // Sinon, on garde seulement les magasins dont le "name" (ou un champ catégorie) 
    // correspond à ce qui est dans l'URL
    return magasinsCMS.filter((magasin) => {
      // On vérifie si le nom du magasin contient l'une des marques sélectionnées
      return marquesSelectionnees.some(marque => 
        magasin.name?.toLowerCase().includes(marque.toLowerCase())
      );
    });
  }, [magasinsCMS, marquesSelectionnees]);

  return (
    <main style={{ background: "#000000", minHeight: "100vh", color: "white" }}>
      <Navbar />
      
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* BARRE DE FILTRE WEBFLOW */}
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
                    // Optionnel: on peut fermer le menu ici
                    setIsFilterMenuOpen(false);
                } 
            }}
            // Note: Ton slot est vide car les cases sont gérées par ton formulaire Webflow natif
            menuOptionsSlot={<div />} 
          />
        </div>

        {/* AFFICHAGE DU RÉSUMÉ DU FILTRE */}
        {marquesSelectionnees.length > 0 && (
          <div style={{ marginBottom: "10px", color: "#b084f5" }}>
            Filtre actif : <strong>{marquesSelectionnees.join(", ")}</strong> 
            ({magasinsAfffiches.length} magasins trouvés)
          </div>
        )}

        {/* LA CARTE AVEC LES MAGASINS FILTRÉS */}
        <div style={{ height: "600px", borderRadius: "12px", overflow: "hidden", border: "1px solid #333", position: "relative", zIndex: 1 }}>
          <MapComponent 
            stores={magasinsAfffiches} 
            activeCoords={[43.3595, 5.3524]} 
          />
        </div>

      </div>
    </main>
  );
}