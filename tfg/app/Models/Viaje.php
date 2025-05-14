<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    protected $fillable = [
        'usuario_id',
        'conductor_id',
        'kilometros',
    ];

    // Ocultamos los IDs foráneos y timestamps de la salida JSON:
    protected $hidden = [
        'usuario_id',
        'conductor_id',
        'created_at',
        'updated_at',
    ];

    // Añadimos un campo virtual "duracion"
    protected $appends = ['duracion'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function conductor()
    {
        return $this->belongsTo(Conductor::class);
    }

    // Calcula duración ahí mismo (p.ej. 60 km/h media)
    public function getDuracionAttribute(): string
    {
        $velocidad = 60; // km/h
        $horas = intdiv($this->kilometros, $velocidad);
        $minutos = (int)round((($this->kilometros / $velocidad) - $horas) * 60);
        return "{$horas}h {$minutos}min";
    }
}
