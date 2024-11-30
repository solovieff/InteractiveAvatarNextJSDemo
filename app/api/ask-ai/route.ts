import { NextRequest, NextResponse } from "next/server";

let KIBERNIKTO_SERVER_URL = process.env.NEXT_PUBLIC_KIBERNIKTO_API_URL
  ? process.env.NEXT_PUBLIC_KIBERNIKTO_API_URL
  : "http://localhost:8000";

//NOT WORKING YET
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(KIBERNIKTO_SERVER_URL + "/", {
      method: "POST",
      headers: {
        "x-api-key": "SMD",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return new Response(data.data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving access token:", error);

    return new Response("Failed to retrieve access token", {
      status: 500,
    });
  }
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Добавь это
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
