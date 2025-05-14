import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HistorialViajes() {
  const [viajes, setViajes]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function fetchViajes() {
      try {
        const res = await axios.get('/api/viajes', {
          params: { usuario_id: 1 },
        });

        // Laravel devuelve aquí un array directo
        if (Array.isArray(res.data)) {
          setViajes(res.data);
        } else {
          throw new Error('Formato inesperado en API');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar los viajes.');
      } finally {
        setLoading(false);
      }
    }
    fetchViajes();
  }, []);

  if (loading) {
    return <p className="p-4">Cargando viajes…</p>;
  }
  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }
  if (viajes.length === 0) {
    return <p className="p-4">No hay viajes registrados para este usuario.</p>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-100 font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Historial de Viajes
      </h1>

      {/* Tarjetas en móvil */}
      <div className="space-y-4 sm:hidden">
        {viajes.map(v => (
          <div key={v.id} className="bg-white rounded-lg shadow-md p-4">
            <p>
              <span className="font-semibold">Usuario:</span>{' '}
              {v.usuario.nombre}
            </p>
            <p>
              <span className="font-semibold">Conductor:</span>{' '}
              {v.conductor.nombre}
            </p>
            <p>
              <span className="font-semibold">Kilómetros:</span>{' '}
              {v.kilometros}
            </p>
            <p>
              <span className="font-semibold">Duración:</span>{' '}
              {v.duracion}
            </p>
          </div>
        ))}
      </div>

      {/* Tabla en desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-md text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Conductor</th>
              <th className="py-3 px-4">Kilómetros</th>
              <th className="py-3 px-4">Duración</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map(v => (
              <tr key={v.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4">{v.usuario.nombre}</td>
                <td className="py-2 px-4">{v.conductor.nombre}</td>
                <td className="py-2 px-4">{v.kilometros}</td>
                <td className="py-2 px-4">{v.duracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
