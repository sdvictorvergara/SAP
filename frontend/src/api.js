export const API = import.meta.env.VITE_API_URL || ''

// Llamada a la API
async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || `Error ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

// CRUD de servidores
export const getServers = () => request('/api/servers')
export const createServer = (data) => request('/api/servers', { method: 'POST', body: data })
export const updateServer = (id, data) => request(`/api/servers/${id}`, { method: 'PUT', body: data })
export const setServerStatus = (id, status) =>
  request(`/api/servers/${id}/status`, { method: 'PATCH', body: { status } })
export const deleteServer = (id) => request(`/api/servers/${id}`, { method: 'DELETE' })
