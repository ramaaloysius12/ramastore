import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET: Ambil semua berita
export async function GET() {
  try {
    const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal memuat berita" }, { status: 500 });
  }
}

// POST: Tambah berita baru
export async function POST(req: Request) {
  try {
    const { title, content, imageUrl } = await req.json();
    const newNews = await prisma.news.create({
      data: { title, content, imageUrl },
    });
    return NextResponse.json({ success: true, data: newNews }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menyimpan berita" }, { status: 500 });
  }
}

// PUT: Edit berita
export async function PUT(req: Request) {
  try {
    const { id, title, content, imageUrl } = await req.json();
    const updatedNews = await prisma.news.update({
      where: { id },
      data: { title, content, imageUrl },
    });
    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengupdate berita" }, { status: 500 });
  }
}

// DELETE: Hapus berita
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID kosong" }, { status: 400 });
    
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Berita dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menghapus berita" }, { status: 500 });
  }
}
