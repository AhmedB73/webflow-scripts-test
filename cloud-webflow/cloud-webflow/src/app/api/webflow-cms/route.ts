import { NextResponse } from "next/server";
export async function GET() {
  try {
    const WEBFLOW_TOKEN = "2194c25a0475be234140db779b516216df929727e10dc719c95ddd0548a1c78d";
    const COLLECTION_ID = "69c4fc1f8fc03926502d71ae";
    const res = await fetch(
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items`,
      {
        headers: {
          Authorization: `Bearer ${WEBFLOW_TOKEN}`,
          "accept-version": "1.0.0",
        },
      }
    );
    const data = await res.json();
    const items = data.items ?? [];
    const stores = items.map((item: any) => ({
      id: item.id,
      name: item.fieldData?.name ?? "Magasin",
      lat: parseFloat(item.fieldData?.latitude ?? "0"),
      lng: parseFloat(item.fieldData?.longitude ?? "0"),
      address: item.fieldData?.adresse ?? "",
      description: item.fieldData?.description ?? "",
      img: item.fieldData?.img?.url ?? "",
    }));
    return NextResponse.json(stores);
  } catch (err) {
    console.error("Webflow API error:", err);
    return NextResponse.json([]);
  }
}
