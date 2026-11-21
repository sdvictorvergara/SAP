import { Link } from 'react-router-dom'
import ServerCard from '../../components/ServerCard/ServerCard.jsx'
import './Servers.css'

export default function Servers({ servers, setServers, status, reload }) {
  let info = `${servers.length} ${servers.length === 1 ? 'servidor' : 'servidores'}`
  if (status === 'loading') info = 'Cargando servidores…'
  else if (servers.length === 0) info = 'No hay servidores todavía. Pulsa «Añadir» para crear uno.'

  return (
    <main className="page servers-page">
      {status === 'error' ? (
        <p className="servers-info servers-error" role="alert">
          No se pudieron cargar los servidores. Comprueba tu conexión.{' '}
          <button className="btn" onClick={reload}>Reintentar</button>
        </p>
      ) : (
        <p className="servers-info" role="status">{info}</p>
      )}

      {servers.map((server) => (
        <ServerCard key={server.id} server={server} setServers={setServers} />
      ))}

      <Link to="/servers/new" className="fab" title="Añadir servidor">
        <i className="bi bi-plus-lg" />
        <span>Añadir</span>
      </Link>
    </main>
  )
}
