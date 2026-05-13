import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const professional = await prisma.professional.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        portfolio: { orderBy: { createdAt: "desc" } },
        reviews: {
          include: { author: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!professional) {
      return NextResponse.json({ error: "Tapylmady" }, { status: 404 });
    }

    const avgRating = professional.reviews.length
      ? professional.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / professional.reviews.length
      : null;

    return NextResponse.json({ ...professional, avgRating });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server ýalňyşlygy" }, { status: 500 });
  }
}
