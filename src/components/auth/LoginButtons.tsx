const API_URL = import.meta.env.VITE_API_URL;

export function LoginButtons() {
  return (
    <div>
      <a href={`${API_URL}/auth/external/google`}>Continue with Google</a>
      <a href={`${API_URL}/auth/external/github`}>Continue with GitHub</a>
    </div>
  );
}