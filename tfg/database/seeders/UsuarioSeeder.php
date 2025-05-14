<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    public function run()
    {
        Usuario::create([
            'email' => 'juan@example.com',
            'nombre' => 'Juan Pérez',
            'password' => bcrypt('123456'),
            'cantidad_viajes' => 10,
            'zona_id' => 1,  
        ]);

        Usuario::create([
            'email' => 'maria@example.com',
            'nombre' => 'María López',
            'password' => bcrypt('123456'),
            'cantidad_viajes' => 20,
            'zona_id' => 2,
        ]);

        Usuario::create([
            'email' => 'pedro@example.com',
            'nombre' => 'Pedro García',
            'password' => bcrypt('123456'),
            'cantidad_viajes' => 15,
            'zona_id' => 3,
        ]);
    }
}
