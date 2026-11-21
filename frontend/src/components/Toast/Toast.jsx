import { createContext, useContext, useRef, useState } from 'react'
import './Toast.css'

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toastData, setToastData] = useState(null)
  const timer = useRef()

  const toast = (message, type = 'ok') => {
    clearTimeout(timer.current)
    setToastData({ message, type })
    timer.current = setTimeout(() => setToastData(null), 3000)
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toastData && (
        <div className={`toast toast--${toastData.type}`} role={toastData.type === 'error' ? 'alert' : 'status'}>
          <i className={`bi ${toastData.type === 'error' ? 'bi-exclamation-circle' : 'bi-check-circle'}`} aria-hidden="true" /> {toastData.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}
