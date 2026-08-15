const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include', // sends the session cookie cross-origin
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // A 401 on /session/me just means "not logged in" — useSession() already
  // handles that itself and shouldn't get redirected mid-check. A 401 on
  // anything else means a session that *was* valid has expired mid-use —
  // send the user back to login instead of showing them a raw error.
  if (res.status === 401 && path !== '/session/me') {
    window.location.href = '/login';
    // Never resolves — the navigation above is already underway, and
    // callers shouldn't also try to handle this as a normal error.
    return new Promise<T>(() => {});
  }

  if (res.status === 204) {
    // DELETE endpoints return no body
    return undefined as T;
  }

  const body: ApiResponse<T> = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, body.message || 'Request failed');
  }

  return body.data;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};