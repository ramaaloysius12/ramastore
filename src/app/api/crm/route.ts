import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET: Ambil semua data CRM
export async function GET() {
  try {
    const contacts = await prisma.crmContact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengambil data CRM" }, { status: 500 });
  }
}

// POST: Tambah data relasi baru
export async function POST(req: Request) {
  try {
    const { companyName, address, email, officePhone } = await req.json();
    const newContact = await prisma.crmContact.create({
      data: { companyName, address, email, officePhone },
    });
    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menyimpan data CRM" }, { status: 500 });
  }
}

// PUT: Update / Edit data relasi
export async function PUT(req: Request) {
  try {
    const { id, companyName, address, email, officePhone } = await req.json();
    const updatedContact = await prisma.crmContact.update({
      where: { id },
      data: { companyName, address, email, officePhone },
    });
    return NextResponse.json({ success: true, data: updatedContact });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengupdate data CRM" }, { status: 500 });
  }
}

// DELETE: Hapus data relasi
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID tidak valid" }, { status: 400 });

    await prisma.crmContact.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Data CRM dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menghapus data CRM" }, { status: 500 });
  }
}
