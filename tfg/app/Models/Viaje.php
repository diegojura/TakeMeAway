<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    protected $table = 'viajes';

protected $fillable = ['usuario_id','conductor_id','kilometros'];
public function usuario()   { return $this->belongsTo(Usuario::class); }
public function conductor() { return $this->belongsTo(Conductor::class); }


}
