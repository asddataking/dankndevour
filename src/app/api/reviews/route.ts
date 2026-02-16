import { getReviewsList } from "@/lib/reviews";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await getReviewsList();
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
