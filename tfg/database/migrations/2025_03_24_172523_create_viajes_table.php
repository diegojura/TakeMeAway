<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('viajes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('usuario_id')->constrained('usuarios'); 
        $table->foreignId('conductor_id')->constrained('conductores');
        $table->integer('kilometros');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('viajes');
}

};
