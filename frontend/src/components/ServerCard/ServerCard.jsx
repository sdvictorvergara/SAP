import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConfirmModal } from '../Modal/Modal.jsx'
import { useToast } from '../Toast/Toast.jsx'
import { deleteServer, setServerStatus } from '../../api.js'
import './ServerCard.css'

export default function ServerCard({ server, setServers }) {
  const navigate = useNavigate()
  const toast = useToast()
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const online = server.status === 'online'

  const setStatus = async (status) => {
    try {
      const updated = await setServerStatus(server.id, status)
      setServers((list) => list.map((s) => (s.id === server.id ? updated : s)))
      toast(status === 'online' ? 'Servidor encendido' : 'Servidor apagado')
    } catch (err) {
      toast(err.message)
    }
  }

  const handleConfirm = async () => {
    if (confirm === 'shutdown') await setStatus('offline')
    else {
      try {
        await deleteServer(server.id)
        setServers((list) => list.filter((s) => s.id !== server.id))
        toast('Servidor eliminado')
      } catch (err) {
        toast(err.message)
      }
    }
    setConfirm(null)
  }

  return (
    <article className="server-card">
      <Link to={`/servers/${server.id}`} className="server-card__info" title="Ver más información" aria-label="Ver más información">
        <i className="bi bi-info-circle" />
      </Link>

      <i className="bi bi-hdd-stack server-card__icon" aria-hidden="true" />

      <div className="server-card__body">
        <h3 className="server-card__name">{server.name}</h3>
        <p>ipv4: {server.ipv4}</p>
        <p>ipv6: {server.ipv6}</p>
      </div>

      <div className="server-card__actions">
        <button
          className={`server-card__power ${online ? 'server-card__power--stop' : 'server-card__power--start'}`}
          onClick={() => (online ? setConfirm('shutdown') : setStatus('online'))}
        >
          {online ? 'Shut Down' : 'Start'}
        </button>
        <button className="server-card__dots" onClick={() => setMenuOpen((o) => !o)} aria-label="Más opciones">
          <i className="bi bi-three-dots-vertical" />
        </button>

        {/* Fondo invisible oara cuando se pulse fuera*/}
        {menuOpen && <div className="server-card__backdrop" onClick={() => setMenuOpen(false)} />}

        {menuOpen && (
          <ul className="server-card__menu">
            <li>
              <button onClick={() => navigate(`/servers/${server.id}`)}>
                <i className="bi bi-info-circle" /> Ver más información
              </button>
            </li>
            <li>
              <button onClick={() => navigate(`/servers/${server.id}?edit=1`)}>
                <i className="bi bi-pencil-square" /> Editar
              </button>
            </li>
            <li>
              <button
                className="server-card__menu-danger"
                onClick={() => {
                  setMenuOpen(false)
                  setConfirm('delete')
                }}>
                  <i className="bi bi-trash3" /> Eliminar
              </button>
            </li>
          </ul>
        )}
      </div>

      {confirm && (
        <ConfirmModal
          message={
            confirm === 'shutdown'
              ? '¿Seguro que quiere apagar el servidor?'
              : '¿Seguro que quiere eliminar el servidor?'
          }
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </article>
  )
}
