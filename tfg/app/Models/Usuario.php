<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = ['email', 'nombre', 'password', 'cantidad_viajes', 'zona_id'];

    // Relación de 1 a muchos con viajes
    public function viajes()
    {
        return $this->hasMany(Viaje::class);
    }

    // Relación de 1 a muchos con valoraciones
    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class);
    }

    // Relación con Zona
    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }
}
