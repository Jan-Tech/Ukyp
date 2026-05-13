import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "E-poçta we açar söz gerek" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "E-poçta ýa-da açar söz nädogry" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "E-poçta ýa-da açar söz nädogry" }, { status: 401 });
    }

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

    res.cookies.set("ukyp_user", JSON.stringify({ id: user.id, name: user.name, role: user.role }), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server ýalňyşlygy" }, { status: 500 });
  }
}
