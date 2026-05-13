import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const q = searchParams.get("q");
    const sort = searchParams.get("sort") ?? "rating";

    const professionals = await prisma.professional.findMany({
      where: {
        ...(category ? { category: category as never } : {}),
        ...(city ? { city: city as never } : {}),
        ...(q ? {
          OR: [
            { user: { name: { contains: q, mode: "insensitive" } } },
            { bio: { contains: q, mode: "insensitive" } },
          ]
        } : {}),
      },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const withRating = professionals.map((p: typeof professionals[number]) => {
      const avg = p.reviews.length
        ? p.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / p.reviews.length
        : null;
      const { reviews, ...rest } = p;
      void reviews;
      return { ...rest, avgRating: avg };
    });

    type WithRating = (typeof withRating)[number];

    const sorted = sort === "rating"
      ? withRating.sort((a: WithRating, b: WithRating) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
      : sort === "reviews"
      ? withRating.sort((a: WithRating, b: WithRating) => (b._count?.reviews ?? 0) - (a._count?.reviews ?? 0))
      : withRating;

    sorted.sort((a: WithRating, b: WithRating) => Number(b.isBoosted) - Number(a.isBoosted));

    return NextResponse.json(sorted);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 200 });
  }
}
