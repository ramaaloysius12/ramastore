import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Pastikan data selalu baru, tidak di-cache oleh Next.js
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Menghitung total baris dari masing-masing tabel
    const clientCount = await prisma.clientData.count();
    const newsCount = await prisma.news.count();
    const crmCount = await prisma.crmContact.count();
    const inboxCount = await prisma.contactLead.count(); // Form kontak yang sebelumnya

    return NextResponse.json({
      success: true,
      data: {
        client: clientCount,
        news: newsCount,
        crm: crmCount,
        inbox: inboxCount,
      }
    });
  } catch (error) {
    console.error("🔴 ERROR HITUNG STATS:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat statistik" }, { status: 500 });
  }
}
