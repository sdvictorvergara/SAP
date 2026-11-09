import './Modal.css'

export function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {title ? (
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button className="modal__close" onClick={onClose} aria-label="Cerrar">
              <i className="bi bi-x-lg" />
            </button>
          </div>
        ) : (
          <button className="modal__close modal__close--floating" onClick={onClose} aria-label="Cerrar">
            <i className="bi bi-x-lg" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Modal title="Confirmación" onClose={onCancel}>
      <p className="modal__message">{message}</p>
      <div className="modal__actions">
        <button className="btn btn--primary" onClick={onConfirm}>Confirmar</button>
        <button className="btn btn--secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </Modal>
  )
}
