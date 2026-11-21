import { useState } from 'react'
import { Link } from 'react-router-dom'
import userIcon from '../../assets/user-icon.png'
import './Header.css'

export default function Header({ onMenu }) {
  const [dark, setDark] = useState(document.documentElement.dataset.theme !== 'light')

  const toggleTheme = () => {
    const theme = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
    setDark(!dark)
  }

  return (
    <header className="header">
      <button className="header__menu" onClick={onMenu} aria-label="Abrir menú">
        <i className="bi bi-list" />
      </button>

      {/* Buscador solo visual por ahora */}
      <input type="search" placeholder="Search" className="header__search" aria-label="Buscar" />

      <button className="header__theme" onClick={toggleTheme} aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}>
        <i className={`bi ${dark ? 'bi-sun' : 'bi-moon'}`} />
      </button>

      {/* Log Out */}
      <Link to="/login" onClick={() => localStorage.removeItem("user")} aria-label="Cerrar sesión" title="Cerrar sesión">
        <img src={userIcon} alt="" className="header__account" />
      </Link>
    </header>
  )
}
