import { Link } from 'react-router-dom'

export default function Help() {
  return (
    <main className="page">
      <h1>Ayuda</h1>
      <p><b>Registro:</b> Para registrar una cuenta nueva necesitara contactar con el administrador del sistema.</p>
      <p><b>Acceso:</b> inicia sesión con tu usuario (o correo) y contraseña para entrar a la zona privada.</p>
      <p><b>Servidores:</b> consulta, añade, edita o elimina tus servidores y enciéndelos o apágalos.</p>
      <p><b>Servicios:</b> revisa el estado de los servicios de cada servidor.</p>
      <p><b>Cerrar sesión:</b> pulsa el icono de usuario de la cabecera.</p>
      <Link to="/" className="login__link">← Volver</Link>
    </main>
  )
}
