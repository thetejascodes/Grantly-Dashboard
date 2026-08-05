import { createFileRoute } from '@tanstack/react-router'
import { LoginButtons } from '../components/auth/LoginButtons'
import { useSession } from '../hooks/useSession'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { data: user, isLoading, isError } = useSession()

  return (
    <div>
      <h1>Grantly</h1>
      <p>Sign in to manage your OAuth applications</p>
      <LoginButtons />

      {/* Temporary debug output — remove once confirmed working */}
      <pre style={{ marginTop: '2rem', background: '#eee', padding: '1rem' }}>
        isLoading: {String(isLoading)}
        {'\n'}isError: {String(isError)}
        {'\n'}user: {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}