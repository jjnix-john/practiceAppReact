import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from './auth'
import './App.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (auth.isLoggedIn()) {
      navigate(from, { replace: true })
    }
  }, [from, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter a username and password.')
      return
    }

    // Simple demo auth: any non-empty credentials work.
    auth.login(username.trim())
    navigate(from, { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome back</h2>
        <p>Sign in to access the playground.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="button primary">
            Sign in
          </button>
        </form>
        <p className="login-hint">
          Tip: Any username/password will work for this demo.
        </p>
      </div>
    </div>
  )
}
