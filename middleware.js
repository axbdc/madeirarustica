import { NextResponse } from 'next/server';

const PROTECTED = ['/'];
const LOGIN_PATH = '/login.html';
const COOKIE_NAME = 'mr_auth';
const COOKIE_VALUE = 'madeira2026secure';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Deixa passar ficheiros estáticos e a página de login
  if (
    pathname.startsWith('/login.html') ||
    pathname.startsWith('/_next') ||
    pathname.match(/\.(png|jpg|jpeg|ico|svg|webmanifest|css|js|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Verifica o cookie
  const auth = request.cookies.get(COOKIE_NAME);
  if (auth && auth.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  // Redireciona para o login
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};