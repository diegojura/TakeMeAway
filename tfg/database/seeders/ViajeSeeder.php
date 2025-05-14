<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Viaje;

class ViajeSeeder extends Seeder
{
    public function run()
    {
        Viaje::create([
            'usuario_id' => 1,
            'conductor_id' => 1,
            'kilometros' => 5,
        ]);

        Viaje::create([
            'usuario_id' => 2,
            'conductor_id' => 2,
            'kilometros' => 8,
        ]);
    }
}
