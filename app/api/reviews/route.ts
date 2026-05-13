import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("ukyp_user");
    if (!cookie) {
      return NextResponse.json({ error: "Giriş etmeli" }, { status: 401 });
    }

    const sessionUser = JSON.parse(cookie.value) as { id: string };
    const { professionalId, rating, comment } = await req.json();

    if (!professionalId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Nädogry maglumat" }, { status: 400 });
    }

    const existing = await prisma.review.findUnique({
      where: { professionalId_authorId: { professionalId, authorId: sessionUser.id } },
    });

    if (existing) {
      return NextResponse.json({ error: "Siz eýýäm syn ýazdyňyz" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: { professionalId, authorId: sessionUser.id, rating, comment: comment || null },
      include: { author: { select: { name: true } } },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server ýalňyşlygy" }, { status: 500 });
  }
}
