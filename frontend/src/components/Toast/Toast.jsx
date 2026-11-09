import { createContext, useContext, useRef, useState } from 'react'
import './Toast.css'

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

// Modal de alerta con duracion de 3segundos
export function ToastProvider({ children }) {
  const [text, setText] = useState('')
  const timer = useRef()

  const toast = (message) => {
    clearTimeout(timer.current)
    setText(message)
    timer.current = setTimeout(() => setText(''), 3000)
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {text && <div className="toast" role="status"><i className="bi bi-check-circle" aria-hidden="true" /> {text}</div>}
    </ToastContext.Provider>
  )
}
