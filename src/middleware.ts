import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Mengecek apakah ada cookie sesi login. 
  // (Biasanya bernama 'token', 'session', atau 'next-auth.session-token')
  const isAuth = 
    request.cookies.has('token') || 
    request.cookies.has('session') ||
    request.cookies.has('next-auth.session-token');

  // Jika pengunjung mencoba mengakses halaman /dashboard atau sub-halamannya
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    
    // Jika tidak punya akses (belum login atau sudah log out)
    if (!isAuth) {
      // Tendang (alihkan) paksa kembali ke halaman utama "/"
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Jika sudah login, izinkan lewat
  return NextResponse.next();
}

// Menentukan rute mana saja yang harus dijaga ketat oleh satpam (middleware) ini
export const config = {
  matcher: ['/dashboard/:path*'],
};
