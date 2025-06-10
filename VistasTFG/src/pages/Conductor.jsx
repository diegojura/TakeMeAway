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
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Nuestros Conductores</h1>

        {conductores.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Cargando conductores...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {conductores.map((c, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mb-4">
                  {c.nombre?.charAt(0) ?? 'C'}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{c.nombre}</h2>
                <h3 className="text-gray-600">{c.apellidos}</h3>

                <p className="text-sm text-gray-500 mt-2">
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
    </div>
  );
}