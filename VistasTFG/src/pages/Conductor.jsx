import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Conductores() {
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    api.get('/conductores')
      .then(res => setConductores(res.data))
      .catch(err => console.error('Error al cargar conductores:', err));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-6">Nuestros Conductores</h1>

      {conductores.length === 0 ? (
        <p className="text-gray-500">Cargando conductores...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {conductores.map((c, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-gray-300 rounded-md mb-4" />
              <h2 className="text-lg font-semibold">{c.nombre}</h2>
              <h3 className="text-gray-600">{c.apellidos}</h3>

              <p className="text-sm text-gray-500 mt-1">
                <strong>{c.usuario?.email ?? 'Sin email'}</strong>
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Viajes realizados: <strong>{c.viajes_count}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}