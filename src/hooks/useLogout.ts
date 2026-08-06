import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        redirect: 'manual',
      });
    },
    onSuccess: () => {
      queryClient.clear(); // wipe all cached query data before navigating
      window.location.href = '/';
    },
  });
}