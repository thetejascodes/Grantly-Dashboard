import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { CreatedClientResponse } from '../types/api';

interface CreateClientInput {
  name: string;
  redirectUris: string[];
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateClientInput) =>
      api.post<CreatedClientResponse>('/clients', input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}