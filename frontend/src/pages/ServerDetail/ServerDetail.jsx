import { useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Field from '../../components/Field/Field.jsx'
import { ConfirmModal } from '../../components/Modal/Modal.jsx'
import { useToast } from '../../components/Toast/Toast.jsx'
import { createServer, updateServer } from '../../api.js'
import './ServerDetail.css'

const EMPTY = {
  name: '', mac: '', ipv4: '', ipv6: '',
  os: '', cpu: '', gpu: '', ram: '', storage: '',
  systemUser: '', systemPassword: '', dbUser: '', dbPassword: '',
}

const NETWORK = [['mac', 'MAC'], ['ipv4', 'IPv4'], ['ipv6', 'IPv6']]
const SPECS = [['os', 'OS'], ['cpu', 'CPU'], ['gpu', 'GPU'], ['ram', 'RAM'], ['storage', 'Storage']]

// El key reinicia el formulario al cambiar de servidor.
export default function ServerDetail(props) {
  const { id } = useParams()
  return <ServerForm key={id} id={id} {...props} />
}

function ServerForm({ id, servers, setServers }) {
  const isNew = id === 'new'
  const navigate = useNavigate()
  const toast = useToast()
  const [params] = useSearchParams()
  const server = isNew ? EMPTY : servers.find((s) => s.id === id)

  const [editing, setEditing] = useState(isNew || params.get('edit') === '1')
  const [draft, setDraft] = useState(server) // borrador
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  if (!server) return <Navigate to="/servers" replace />

  const data = editing ? draft : server
  const handleChange = (name, value) => setDraft((d) => ({ ...d, [name]: value }))

  const handleSave = async () => {
    if (!draft.name.trim() || !draft.mac.trim()) {
      toast('El nombre y la MAC son obligatorios')
      return
    }
    try {
      if (isNew) {
        const created = await createServer(draft)
        setServers((list) => [...list, created])
        navigate(`/servers/${created.id}`, { replace: true })
        toast('Servidor añadido')
      } else {
        const updated = await updateServer(id, draft)
        setServers((list) => list.map((s) => (s.id === id ? updated : s)))
        setEditing(false)
        toast('Cambios guardados')
      }
    } catch (err) {
      toast(err.message)
    }
  }

  const handleDiscard = () => {
    if (isNew) return navigate('/servers', { replace: true })
    setDraft(server)
    setEditing(false)
    setConfirmDiscard(false)
  }

  const fields = (list) =>
    list.map(([name, label]) => (
      <Field key={name} name={name} label={label} value={data[name]} editing={editing} onChange={handleChange} />
    ))

  return (
    <main className="page">
      <div className="detail__title">
        <i className="bi bi-hdd-stack detail__icon" aria-hidden="true" />

        {editing ? (
          <input
            className="detail__name-input"
            value={draft.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Name"
            aria-label="Nombre del servidor"
          />
        ) : (
          <h1 className="detail__name">{server.name}</h1>
        )}

        <div className="detail__tools">
          {editing ? (
            <>
              <button className="icon-btn" onClick={handleSave} aria-label="Guardar cambios" title="Guardar">
                <i className="bi bi-check-lg" />
              </button>
              <button className="icon-btn" onClick={() => setConfirmDiscard(true)} aria-label="Descartar cambios" title="Descartar">
                <i className="bi bi-x-lg" />
              </button>
            </>
          ) : (
            <button className="icon-btn icon-btn--plain" onClick={() => setEditing(true)} aria-label="Editar" title="Editar">
              <i className="bi bi-pencil-square" />
            </button>
          )}
        </div>
      </div>

      <section className="detail__box">
        <h2>Network</h2>
        {fields(NETWORK)}
      </section>

      <section className="detail__box">
        <h2>{editing ? 'Specs' : 'System'}</h2>
        {fields(SPECS)}
      </section>

      {editing ? (
        <>
          <section className="detail__box">
            <h2>System Credentials</h2>
            <Field name="systemUser" label="User" value={data.systemUser} editing onChange={handleChange} />
            <Field name="systemPassword" label="Password" value={data.systemPassword} editing onChange={handleChange} secret />
          </section>
          <section className="detail__box">
            <h2>DB Credentials</h2>
            <Field name="dbUser" label="DB User" value={data.dbUser} editing onChange={handleChange} />
            <Field name="dbPassword" label="DB Passwd" value={data.dbPassword} editing onChange={handleChange} secret />
          </section>
        </>
      ) : (
        <section className="detail__box">
          <h2>Credentials</h2>
          <Field name="systemUser" label="System User" value={data.systemUser} />
          <Field name="systemPassword" label="System Password" value={data.systemPassword} secret />
          <hr />
          <Field name="dbUser" label="DB User" value={data.dbUser} />
          <Field name="dbPassword" label="DB Password" value={data.dbPassword} secret />
        </section>
      )}

      {confirmDiscard && (
        <ConfirmModal
          message="¿Seguro que quiere descartar los cambios?"
          onConfirm={handleDiscard}
          onCancel={() => setConfirmDiscard(false)}
        />
      )}
    </main>
  )
}
