import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('rm_token')?.value;
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  
  try {
    const data = await apiFetch<unknown>('/api/intake-logs/stats', { token });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al obtener estadísticas de tomas' }, { status: 500 });
  }
}
