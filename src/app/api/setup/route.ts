import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "ramaaloysius12@gmail.com";
    const plainPassword = "ramahaxor55";

    // Cek apakah admin sudah ada agar tidak ganda
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return NextResponse.json({ message: "Akun Admin sudah terdaftar sebelumnya!" });
    }

    // Enkripsi password dan simpan ke database
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newAdmin = await prisma.admin.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "✅ Akun Admin berhasil didaftarkan secara permanen!", 
      email: newAdmin.email 
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mendaftarkan admin." }, { status: 500 });
  }
}
