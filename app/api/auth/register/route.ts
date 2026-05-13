import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password, role, category, city, bio } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Ähli meýdanlary dolduryň" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Bu e-poçta eýýäm bar" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash,
        role: role === "PROFESSIONAL" ? "PROFESSIONAL" : "CLIENT",
        ...(role === "PROFESSIONAL" && category && city ? {
          professional: {
            create: {
              category,
              city,
              bio: bio || null,
            }
          }
        } : {})
      }
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server ýalňyşlygy" }, { status: 500 });
  }
}
