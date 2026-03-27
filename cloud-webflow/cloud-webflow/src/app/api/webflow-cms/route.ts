import { NextResponse } from "next/server";

export async function GET() {
  const WEBFLOW_TOKEN = "2194c25a0475be234140db779b516216df929727e10dc719c95ddd0548a1c78d";
  const COLLECTION_ID = "69c4fc1f8fc03926502d71ae";

  try {
    const res = await fetch(`https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`, {
      headers: { 
        'Authorization': `Bearer ${WEBFLOW_TOKEN}`, 
        'Accept': 'application/json' 
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error("Erreur Webflow API");

    const data: any = await res.json();
    const items = data.items ?? [];
    
    const clean = items
      .map((item: any) => ({
        id: item.id,
        name: item.fieldData?.name ?? "Sans nom",
        type: 'cms',
        lat: parseFloat(item.fieldData?.latitude),
        lng: parseFloat(item.fieldData?.longitude),
        adresse: item.fieldData?.adresse ?? "",
        description: item.fieldData?.description ?? "",
        image: item.fieldData?.img?.url ?? null, 
        slug: item.fieldData?.slug
      }))
      .filter((m: any) => !isNaN(m.lat) && !isNaN(m.lng));

    return NextResponse.json(clean);
  } catch (error) {
    return NextResponse.json({ error: "Erreur CMS" }, { status: 500 });
  }
}
