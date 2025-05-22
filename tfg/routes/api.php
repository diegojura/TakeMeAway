<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ViajeController;
use App\Http\Controllers\ConductorController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ValoracionController;
use App\Http\Controllers\BonoController;
use App\Http\Controllers\ZonaController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\UsuarioController;

// registro y login sin prefijo
Route::post('register', [AuthController::class, 'register'])
     ->name('api.register');
Route::post('login',    [AuthController::class, 'login'])
     ->name('api.login');

// grupo protegido
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])
         ->name('api.logout');

    Route::apiResource('viajes',       ViajeController::class);
    Route::apiResource('conductores',  ConductorController::class);
    Route::apiResource('pagos',        PagoController::class);
    Route::apiResource('valoraciones', ValoracionController::class);
    Route::apiResource('bonos',        BonoController::class);
    Route::apiResource('zonas',        ZonaController::class);
    Route::apiResource('tokens',       PersonalAccessTokenController::class)
         ->only(['index','destroy']);
    Route::apiResource('sucursales',   SucursalController::class);
    Route::apiResource('usuarios',     UsuarioController::class);
});
