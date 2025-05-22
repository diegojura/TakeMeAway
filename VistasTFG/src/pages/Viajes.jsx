import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext.jsx';
import api from '../services/api.js';

export default function Viajes() {
  const { user } = useAuth();
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.get(`/viajes?usuario_id=${user.id}`)
      .then(r => setViajes(r.data))
      .catch(console.error);
  }, [user]);

  if (!user) {
    return <p className="p-8">Cargando viajes…</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Historial de viajes</h1>
      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Kilómetros</th>
            <th className="p-2 border">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {viajes.map(v => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.id}</td>
              <td className="p-2">{v.kilometros}</td>
              <td className="p-2">
                {format(new Date(v.created_at), 'Pp')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
