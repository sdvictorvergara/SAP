import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="page">
      <h1>Error 404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="login__link">← Volver al inicio</Link>
    </main>
  )
}
