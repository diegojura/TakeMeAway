// src/pages/Viajes.jsx

import React, { useState, useEffect } from 'react';

export default function HistorialViajes({ usuarioId = 1 }) {
  const [viajes, setViajes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchViajes() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/viajes?usuario_id=${usuarioId}`,
          {
            headers: { 'Accept': 'application/json' },
            // credentials: 'include', // sólo si usas cookies de sesión
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || `Error ${res.status}`);
        }
        setViajes(await res.json());
      } catch (e) {
        setError(e.message);
      }
    }
    fetchViajes();
  }, [usuarioId]);

  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!viajes.length) return <p className="p-4">No hay viajes para este usuario.</p>;

  return (
    <table className="min-w-full bg-white shadow-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4">ID</th>
          <th className="py-2 px-4">Usuario</th>
          <th className="py-2 px-4">Conductor</th>
          <th className="py-2 px-4">Km</th>
          <th className="py-2 px-4">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {viajes.map(v => (
          <tr key={v.id} className="border-t">
            <td className="py-2 px-4">{v.id}</td>
            <td className="py-2 px-4">{v.usuario_id}</td>
            <td className="py-2 px-4">{v.conductor_id}</td>
            <td className="py-2 px-4">{v.kilometros}</td>
            <td className="py-2 px-4">{new Date(v.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
