import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Cari admin di database Supabase
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ success: false, error: "Email tidak ditemukan!" }, { status: 401 });
    }

    // 2. Cocokkan password yang diketik dengan yang di database
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Password salah!" }, { status: 401 });
    }

    // 3. Jika berhasil, berikan "Kunci Masuk" (Cookie)
    const response = NextResponse.json({ success: true, message: "Login berhasil!" });
    
    // Set cookie agar sistem ingat bahwa Admin sedang login (berlaku 1 hari)
    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
