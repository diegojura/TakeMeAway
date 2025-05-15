<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Viaje;
use App\Models\Usuario;
use App\Models\Conductor;

class ViajeSeeder extends Seeder
{
    public function run()
    {
        // Aseguramos que existe al menos un usuario
        $usuario = Usuario::first() ?: Usuario::factory()->create();

        // Aseguramos que existe al menos un conductor
        // (ConductorSeeder ya lo creó, pero por si acaso:)
        $conductor = Conductor::first();
        if (! $conductor) {
            // Si no existe ninguno, creamos uno mínimo
            $conductor = Conductor::factory()->create([
                'usuario_id' => $usuario->id,
            ]);
        }

        // Ahora sí, creamos uno o varios viajes usando esos IDs
        Viaje::updateOrCreate(
            [
                'usuario_id'   => $usuario->id,
                'conductor_id' => $conductor->id,
            ],
            [
                'kilometros'   => 12.5,
            ]
        );

        // Ejemplo de viaje adicional:
        Viaje::create([
            'usuario_id'   => $usuario->id,
            'conductor_id' => $conductor->id,
            'kilometros'   => 7.8,
        ]);
    }
}
