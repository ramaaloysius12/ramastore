import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.clientData.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    // 👇 Ini akan memunculkan error aslinya di terminal Acode
    console.error("🔴 ERROR GET CLIENT:", error); 
    return NextResponse.json({ success: false, error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, address, order, price } = body;

    const newClient = await prisma.clientData.create({
      data: {
        companyName,
        address,
        order,
        price: parseFloat(price),
      },
    });

    return NextResponse.json({ success: true, data: newClient }, { status: 201 });
  } catch (error) {
    // 👇 Ini akan memunculkan error aslinya di terminal Acode
    console.error("🔴 ERROR POST CLIENT:", error);
    return NextResponse.json({ success: false, error: "Gagal menyimpan data" }, { status: 500 });
  }
}
