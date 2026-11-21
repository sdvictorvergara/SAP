import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api.js'
import loginLogo from '../../assets/login-logo.png'
import SocialFooter from '../../components/SocialFooter/SocialFooter.jsx'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const username = form.get('username').trim()
    const password = form.get('password')
    if (!username || !password) return setError('Introduce tu usuario y tu contraseña.')

    let res
    try {
      res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
    } catch {
      return setError('No se pudo conectar con el servidor. Inténtalo más tarde.')
    }
    if (!res.ok) return setError('Usuario o contraseña incorrectos.')
    localStorage.setItem('user', JSON.stringify(await res.json()))
    navigate('/')
  }

  return (
    <div className="login">
      <div className="login__brand">
        <img src={loginLogo} alt="Logo" />
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__input">
          <i className="bi bi-person" aria-hidden="true" />
          <input type="text" name="username" aria-label="Usuario" placeholder="Your User" autoComplete="username" />
        </label>

        <label className="login__input">
          <i className="bi bi-lock" aria-hidden="true" />
          <input type="password" name="password" aria-label="Contraseña" placeholder="Your password" autoComplete="current-password" />
        </label>

        {error && <p className="login__error" role="alert">{error}</p>}

        <button type="submit" className="login__submit">Log in</button>
        <a href="#" className="login__forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
      </form>

      <SocialFooter />
    </div>
  )
}
