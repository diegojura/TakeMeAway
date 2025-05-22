<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Models\Zona;
use App\Models\Conductor;

class ConductorSeeder extends Seeder
{
    public function run()
    {
        // Aseguramos al menos una zona
        $zona = Zona::first() ?: Zona::factory()->create();

        // Lista de conductores a crear
        $drivers = [
            [
                'name'       => 'Juan Pérez',
                'email'      => 'juan.perez@gmail.com',
                'apellidos'  => 'Pérez',
                'lat_inicio' => 37.888800,
                'lng_inicio' => -4.778320,
            ],
            [
                'name'       => 'María López',
                'email'      => 'maria.lopez@gmail.com',
                'apellidos'  => 'López',
                'lat_inicio' => 37.885000,
                'lng_inicio' => -4.780500,
            ],
            [
                'name'       => 'Carlos Gómez',
                'email'      => 'comoandamiosbb@gmail.com',
                'apellidos'  => 'Gómez',
                'lat_inicio' => 37.887500,
                'lng_inicio' => -4.776200,
            ],
            // Añade más si quieres…
        ];

        foreach ($drivers as $d) {
            // 1) Creamos o actualizamos el usuario asociado
            $user = Usuario::updateOrCreate(
                ['email' => $d['email']],
                [
                    'name'     => $d['name'],
                    'password' => Hash::make('secret123'),
                    'zona_id'  => $zona->id,
                ]
            );

            // 2) Creamos o actualizamos el conductor
            Conductor::updateOrCreate(
                ['usuario_id' => $user->id],
                [
                    'email'      => $d['email'],
                    'nombre'     => $d['name'],
                    'apellidos'  => $d['apellidos'],
                    'zona_id'    => $zona->id,
                    'valoracion' => 0.00,
                    'lat_inicio' => $d['lat_inicio'],
                    'lng_inicio' => $d['lng_inicio'],
                ]
            );
        }
    }
}
