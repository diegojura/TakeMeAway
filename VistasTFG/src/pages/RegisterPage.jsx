import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Registro() {
  const { registro } = useAuth();
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    registro(form).catch(() => setError('Error al registrarse'));
  };

  return (
    <div
      className="relative flex items-center justify-center px-4"
      style={{
        minHeight: '100vh',       // que ocupe toda la ventana sin scroll
        backgroundImage: "url('/mapa.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'grayscale(100%) brightness(0.7)', // imagen tenue y en b/n
      }}
    >
      {/* Overlay negro para bajar brillo aún más */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>

      {/* Contenido centrado y sobre el overlay */}
      <div className="relative w-full max-w-md bg-white bg-opacity-90 border border-black rounded-xl p-8 shadow-md z-10">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">Registro</h1>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-black mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handle}
              className="w-full px-3 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handle}
              className="w-full px-3 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handle}
              className="w-full px-3 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-200"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
