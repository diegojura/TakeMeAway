import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Perfil() {
  const { user } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Perfil de {user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      {/* …más datos… */}
    </div>
  );
}
