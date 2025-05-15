import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function IniciarSesion() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    login(form).catch(() => setError('Error al iniciar sesión'));
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Iniciar sesión</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={submit}>
        <input
          type="email" name="email" placeholder="Email"
          value={form.email} onChange={handle}
          className="w-full p-2 border mb-2"
        />
        <input
          type="password" name="password" placeholder="Contraseña"
          value={form.password} onChange={handle}
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Entrar
        </button>
      </form>
    </div>
  );
}
