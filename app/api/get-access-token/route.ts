import { NextResponse } from "next/server";

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

export async function POST() {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from .env");
    }

    const res = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
        },
      },
    );
    const data = await res.json();

    return new Response(data.data.token, {
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
