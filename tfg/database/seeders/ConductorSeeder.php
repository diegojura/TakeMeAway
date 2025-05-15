<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conductor;
use App\Models\Usuario;
use App\Models\Zona;

class ConductorSeeder extends Seeder
{
    public function run()
    {
        // Asegura un usuario y una zona válidos
        $usuario = Usuario::first() ?: Usuario::factory()->create();
        $zona    = Zona::first()    ?: Zona::factory()->create();

        // Inserta o actualiza un conductor de ejemplo
        Conductor::updateOrCreate(
            ['usuario_id' => $usuario->id],
            [
                'nombre'     => 'Juan',
                'apellidos'  => 'Pérez',
                'zona_id'    => $zona->id,
                'valoracion' => 0,            // media inicial
                'lat_inicio' => 37.888800,    // latitud de ejemplo
                'lng_inicio' => -4.778320,    // longitud de ejemplo
            ]
        );
    }
}
