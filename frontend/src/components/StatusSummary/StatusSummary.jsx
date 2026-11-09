import StatusDot from '../StatusDot/StatusDot.jsx'
import services from '../../data/services.json'
import './StatusSummary.css'

export default function StatusSummary({ servers }) {
  const all = [...servers, ...services]
  const online = all.filter((i) => i.status === 'online').length

  return (
    <ul className="status-summary">
      <li><StatusDot online /> {online} Online</li>
      <li><StatusDot online={false} /> {all.length - online} Offline</li>
    </ul>
  )
}
