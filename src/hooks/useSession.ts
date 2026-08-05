import { useQuery } from '@tanstack/react-query';
import { api, ApiError } from '../lib/api';
import type { SessionUser } from '../types/api';

export function useSession() {
  return useQuery<SessionUser | null>({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        return await api.get<SessionUser>('/session/me');
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          return null; // not logged in — not an error state, just "no session"
        }
        throw err;
      }
    },
  });
}