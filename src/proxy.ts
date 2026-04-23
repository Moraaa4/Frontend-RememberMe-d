import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Las rutas de autenticación son públicas
  if (pathname.startsWith('/api/auth/') || pathname === '/login' || pathname === '/register') return;

  const token = request.cookies.get('rm_token')?.value;

  // Rutas /api/* requieren token, retornar 401 si no hay
  if (pathname.startsWith('/api/')) {
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    return;
  }

  // Rutas de páginas requieren token, redirigir a /login si no hay
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/patient/:path*', '/doctor/:path*'],
};
