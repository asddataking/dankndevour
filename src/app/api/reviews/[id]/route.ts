import { getReviewDetail } from "@/lib/reviews";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: videoId } = await params;
  if (!videoId) {
    return NextResponse.json({ error: "Missing video id" }, { status: 400 });
  }
  try {
    const detail = await getReviewDetail(videoId);
    if (!detail) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json(detail);
  } catch (err) {
    console.error("GET /api/reviews/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}
