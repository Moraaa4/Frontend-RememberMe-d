import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('rm_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    const data = await apiFetch('/api/links/unlink', { 
      method: 'DELETE',
      token 
    });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al desvincular médico' }, { status: 500 });
  }
}
