<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conductor extends Model
{
    use HasFactory;
    protected $table = 'conductores';  

    protected $fillable = ['nombre', 'valoracion', 'zona_id', 'años_experiencia', 'vehiculo_id', 'sucursal_id'];

    // Relación con Vehiculo
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }

    // Relación con Sucursal
    public function sucursal()
    {
        return $this->belongsTo(Sucursal::class);
    }

    // Relación con Zona
    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }

    // Relación de 1 a muchos con viajes
    public function viajes()
    {
        return $this->hasMany(Viaje::class);
    }
}

