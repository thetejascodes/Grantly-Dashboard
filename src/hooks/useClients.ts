import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ClientRecord } from '../types/api';

export function useClients() {
  return useQuery<ClientRecord[]>({
    queryKey: ['clients'],
    queryFn: () => api.get<ClientRecord[]>('/clients'),
  });
}