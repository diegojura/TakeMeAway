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

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // usuario autenticado
    Route::get('/usuarios/me', [AuthController::class, 'me']);

    // resto de recursos
    Route::apiResource('viajes',      ViajeController::class)->only(['show','store','update','destroy']);
    Route::apiResource('conductores', ConductorController::class);
    Route::apiResource('pagos',        PagoController::class);
    Route::apiResource('valoraciones', ValoracionController::class);
    Route::apiResource('bonos',        BonoController::class);
    Route::apiResource('zonas',        ZonaController::class);
    Route::apiResource('tokens',       PersonalAccessTokenController::class);
    Route::apiResource('sucursales',   SucursalController::class);
    Route::apiResource('usuarios',     UsuarioController::class);
});
