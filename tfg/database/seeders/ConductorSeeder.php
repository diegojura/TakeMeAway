<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conductor;

class ConductorSeeder extends Seeder
{
    public function run()
    {
        Conductor::create([
            'nombre' => 'Carlos Pérez',
            'valoracion' => 4.5,
            'zona_id' => 1,
            'años_experiencia' => 5,
            'vehiculo_id' => 1,
            'sucursal_codigo' => 002,
        ]);

        Conductor::create([
            'nombre' => 'Ana Ruiz',
            'valoracion' => 4.8,
            'zona_id' => 2,  
            'años_experiencia' => 3,
            'vehiculo_id' => 2,
            'sucursal_codigo' => 001,
        ]);
    }
}
