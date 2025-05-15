<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // Nombre real de la tabla
    protected $table = 'usuarios';

    /** Campos asignables masivamente */
    protected $fillable = [
        'email',
        'nombre',
        'password',
        'role',
        'cantidad_viajes',
        'zona_id',
    ];

    /** Campos ocultos en JSON */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /** Castings de atributos */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relaciones
    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }

    public function perfilConductor()
    {
        return $this->hasOne(Conductor::class, 'usuario_id');
    }
}
