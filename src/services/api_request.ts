import { parseCookies } from 'nookies';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { useNotification } from '@/hooks/notification';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5123/api';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erro na requisição');
  }

  return res.json();
}

export async function serverApiFetch<T>(
  ctx: GetServerSidePropsContext,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = parseCookies(ctx)['token'];
  return apiFetch<T>(endpoint, options, token);
}

export async function apiPost<T>(
  route: string,
  body: any,
): Promise<T> {

  try {
    const response = await apiFetch<T>(route, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return response;
  } catch (error: any) {
    throw error;
  }
}


