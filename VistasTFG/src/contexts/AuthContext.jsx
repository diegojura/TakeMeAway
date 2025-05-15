import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('tmw_token') || '')

  // Configura axios con baseURL y, si tienes token, el header Authorization
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : ''
    localStorage.setItem('tmw_token', token)
  }, [token])

  const login = async (email, password) => {
    const { data } = await axios.post('/login', { email, password })
    setUser(data.user)
    setToken(data.token)
    navigate('/Iniciado')  // o la ruta que quieras tras login
  }

  const logout = async () => {
    await axios.post('/logout')
    setUser(null)
    setToken('')
    navigate('/Iniciosesion')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
