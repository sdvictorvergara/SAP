import './Field.css'

export default function Field({ label, name, value, editing, onChange, secret = false }) {
  const shown = secret ? '••••••••••' : value || '—'

  return (
    <div className="field">
      <label htmlFor={`field-${name}`} className="field__label">{label}:</label>
      {editing ? (
        <input
          id={`field-${name}`}
          className="field__input"
          type={secret ? 'password' : 'text'}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          autoComplete="off"
        />
      ) : (
        <span className="field__value">{shown}</span>
      )}
    </div>
  )
}
