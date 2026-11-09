import { useState } from 'react'
import { Modal } from '../Modal/Modal.jsx'
import StatusDot from '../StatusDot/StatusDot.jsx'
import services from '../../data/services.json'
import './ServiceGroup.css'

// Borde card para marcar los servicios y servidor que toca
export default function ServiceGroups({ servers }) {
  return servers.map((server) => {
    const items = services.filter((s) => s.serverId === server.id)
    return items.length > 0 ? <ServiceGroup key={server.id} server={server} items={items} /> : null
  })
}

function ServiceGroup({ server, items }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="service-group">
      <header className="service-group__header">
        <h3>{server.name}</h3>
        <span>ipv4: {server.ipv4}</span>
      </header>

      <div className="service-group__grid">
        {items.map((service) => (
          <button key={service.id} className="service-tile" onClick={() => setSelected(service)} title={service.name}>
            <i className="bi bi-globe service-tile__icon" aria-hidden="true" />
            <StatusDot online={service.status === 'online'} className="service-tile__dot" />
          </button>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="service-detail">
            <div className="service-tile service-tile--static">
              <i className="bi bi-globe service-tile__icon" aria-hidden="true" />
              <StatusDot online={selected.status === 'online'} className="service-tile__dot" />
            </div>
            <h2 className="service-detail__name">{selected.name}</h2>
            <p className="service-detail__ip">ipv4: {selected.ipv4}</p>
            <p className="service-detail__ip">ipv6: {selected.ipv6}</p>
            <hr />
            <p className="service-detail__description">{selected.description}</p>
          </div>
        </Modal>
      )}
    </section>
  )
}
