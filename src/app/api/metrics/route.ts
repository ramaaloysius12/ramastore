import { NextResponse } from 'next/server';
import client from 'prom-client';

// Mengaktifkan koleksi metrik default (CPU, RAM, Event Loop Node.js)
const register = new client.Registry();
client.collectDefaultMetrics({ register });

export async function GET() {
  const metrics = await register.metrics();
  return new NextResponse(metrics, {
    headers: {
      'Content-Type': register.contentType,
    },
  });
}
