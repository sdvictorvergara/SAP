import './StatusDot.css'

export default function StatusDot({ online, className = '' }) {
  return (
    <span
      className={`status-dot ${online ? 'status-dot--on' : 'status-dot--off'} ${className}`}
      role="img"
      aria-label={online ? 'Online' : 'Offline'}
    />
  )
}
