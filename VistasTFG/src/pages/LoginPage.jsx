import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        minHeight: '100vh', // Ocupa toda la altura de la ventana
        width: '100vw',      // Ocupa todo el ancho
        backgroundImage: "url('/liberty-city-mapa.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'grayscale(100%) brightness(0.5)', // Imagen más oscura para que no resalte
      }}
    >
      {/* Overlay negro para oscurecer aún más sin perder la imagen */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      {/* Contenido centrado y con fondo blanco semitransparente */}
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 border border-black rounded-xl p-8 shadow-md">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">Iniciar sesión</h1>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-3 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
