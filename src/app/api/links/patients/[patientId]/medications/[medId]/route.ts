import { type NextRequest, NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api-client';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ patientId: string; medId: string }> }
) {
  const { patientId, medId } = await params;
  const token = request.cookies.get('rm_token')?.value;
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  
  try {
    await apiFetch<null>(`/api/links/patients/${patientId}/medications/${medId}`, {
      method: 'DELETE',
      token,
    });
    return NextResponse.json({ ok: true }, { status: 204 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error al eliminar medicamento' }, { status: 500 });
  }
}
