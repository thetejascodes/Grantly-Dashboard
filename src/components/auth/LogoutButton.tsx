import { useLogout } from '../../hooks/useLogout';

export function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <button onClick={() => logout()} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  );
}