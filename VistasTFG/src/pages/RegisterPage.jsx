import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();           // aquí la función se llama "register"
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // mapeamos nombre → name para el payload:
      await register({
        name: form.nombre,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation
      });
      navigate('/home');  // o a la ruta que prefieras tras registrarte
    } catch (err) {
      console.error(err);
      setError('Error al registrarse. Por favor, comprueba los datos.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Crear cuenta</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmar contraseña"
          value={form.password_confirmation}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
