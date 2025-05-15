// src/pages/Viajes.jsx
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function HistorialViajes() {
  const [viajes, setViajes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se asume que guardas el token en localStorage tras el login
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('No has iniciado sesión');
      return;
    }

    fetch(`http://127.0.0.1:8000/api/viajes?usuario_id=1`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => setViajes(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (viajes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No hay viajes registrados para este usuario.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-100 font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Historial de Viajes
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-md text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Conductor</th>
              <th className="py-3 px-4">Km</th>
              <th className="py-3 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map(viaje => (
              <tr key={viaje.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4">{viaje.id}</td>
                <td className="py-2 px-4">{viaje.usuario.nombre}</td>
                <td className="py-2 px-4">{viaje.conductor.nombre}</td>
                <td className="py-2 px-4">{viaje.kilometros}</td>
                <td className="py-2 px-4">
                  {format(new Date(viaje.created_at), 'd/M/yyyy, HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
