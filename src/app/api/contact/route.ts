import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// ==========================================
// GET: Mengambil semua pesan untuk Inbox Admin
// ==========================================
export async function GET() {
  try {
    const leads = await prisma.contactLead.findMany({
      orderBy: { createdAt: "desc" }, // Urutkan dari yang terbaru
    });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error("🔴 ERROR GET INBOX:", error);
    return NextResponse.json({ success: false, error: "Gagal mengambil pesan" }, { status: 500 });
  }
}

// ==========================================
// POST: Menyimpan pesan dari Landing Page (Kode Asli Anda)
// ==========================================
export async function POST(req: Request) {
  try {
    // Menangkap data yang dikirim dari form landing page
    const body = await req.json();
    const { name, email, service, message } = body;

    // Menyimpan data tersebut ke tabel ContactLead di Supabase
    const newContact = await prisma.contactLead.create({
      data: {
        name,
        email,
        service,
        message,
      },
    });

    console.log("Berhasil disimpan ke database:", newContact);

    // Mengirim respon sukses kembali ke website
    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
    
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan pesan ke database." }, 
      { status: 500 }
    );
  }
}

// ==========================================
// DELETE: Menghapus pesan di Inbox Dashboard
// ==========================================
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID kosong" }, { status: 400 });
    
    await prisma.contactLead.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Pesan dihapus" });
  } catch (error) {
    console.error("🔴 ERROR DELETE INBOX:", error);
    return NextResponse.json({ success: false, error: "Gagal menghapus pesan" }, { status: 500 });
  }
}
