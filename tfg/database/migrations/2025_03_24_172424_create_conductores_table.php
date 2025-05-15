<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConductoresTable extends Migration
{
    public function up()
    {
        Schema::create('conductores', function (Blueprint $table) {
            $table->id();  // ID autoincremental (clave primaria)

            // Clave foránea a la tabla usuarios (usuario_id)
            // para relacionar el conductor con un usuario existente.
            $table->foreignId('usuario_id')
                  ->constrained('usuarios')   // referencia a la tabla 'usuarios', columna 'id'
                  ->cascadeOnDelete();        // elimina el conductor en cascada si se borra el usuario

            // Datos personales del conductor
            $table->string('nombre');        // Nombre del conductor
            $table->string('apellidos');     // Apellidos del conductor

            // Clave foránea a la tabla zonas (zona_id)
            // indica la zona en la que trabaja el conductor.
            $table->foreignId('zona_id')
                  ->constrained('zonas')     // referencia a la tabla 'zonas', columna 'id'
                  ->cascadeOnDelete();       // elimina el conductor en cascada si se borra la zona

            // Valoración promedio del conductor (decimal), default 0.
            // 5 dígitos en total, 2 decimales (ej: 4.50). Se inicia en 0.00.
            $table->decimal('valoracion', 5, 2)->default(0);

            // Ubicación inicial fija del conductor (latitud y longitud)
            // Almacenadas como decimal con 10 dígitos totales y 6 decimales de precisión.
            $table->decimal('lat_inicio', 10, 6);
            $table->decimal('lng_inicio', 10, 6);

            $table->timestamps();  // Campos created_at y updated_at
        });
    }

    public function down()
    {
        // Elimina la tabla conductores (reversa de la migración)
        Schema::dropIfExists('conductores');
    }
}
