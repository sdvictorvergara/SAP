import { Link } from 'react-router-dom'
import userIcon from '../../assets/user-icon.png'
import './Header.css'

export default function Header({ onMenu }) {
  return (
    <header className="header">
      <button className="header__menu" onClick={onMenu} aria-label="Abrir menú">
        <i className="bi bi-list" />
      </button>

      {/* Buscador solo visual por ahora */}
      <input type="search" placeholder="Search" className="header__search" aria-label="Buscar" />

      {/* Log Out */}
      <Link to="/login" aria-label="Cerrar sesión" title="Cerrar sesión">
        <img src={userIcon} alt="" className="header__account" />
      </Link>
    </header>
  )
}
