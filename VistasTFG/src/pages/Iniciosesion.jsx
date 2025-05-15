import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Iniciosesion() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      alert('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={onSubmit} className="…">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  )
}
