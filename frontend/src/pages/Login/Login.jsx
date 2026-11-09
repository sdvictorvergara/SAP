import { useNavigate } from 'react-router-dom'
import loginLogo from '../../assets/login-logo.png'
import SocialFooter from '../../components/SocialFooter/SocialFooter.jsx'
import './Login.css'

// Login sin comprobación por ahora: entra directo en lo que se integra un back.
export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
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
          <input type="text" placeholder="Your User" autoComplete="username" />
        </label>

        <label className="login__input">
          <i className="bi bi-lock" aria-hidden="true" />
          <input type="password" placeholder="Your password" autoComplete="current-password" />
        </label>

        <button type="submit" className="login__submit">Log in</button>
        <a href="#" className="login__forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
      </form>

      <SocialFooter />
    </div>
  )
}
