<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehiculo;

class VehiculoSeeder extends Seeder
{
    public function run()
    {
        Vehiculo::create([
            'matricula' => 'ABC1234',
            'marca' => 'Toyota',
            'modelo' => 'Corolla',
        ]);

        Vehiculo::create([
            'matricula' => 'XYZ5678',
            'marca' => 'Honda',
            'modelo' => 'Civic',
        ]);
    }
}
