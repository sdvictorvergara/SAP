import { Link } from 'react-router-dom'
import ServerCard from '../../components/ServerCard/ServerCard.jsx'
import './Servers.css'

export default function Servers({ servers, setServers }) {
  return (
    <main className="page servers-page">
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
