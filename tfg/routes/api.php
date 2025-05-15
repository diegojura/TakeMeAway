<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConductorController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ViajeController;
use App\Http\Controllers\ValoracionController;
use App\Http\Controllers\BonoController;
use App\Http\Controllers\ZonaController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login',  [AuthController::class, 'login']);

// Ruta pública (sin auth)
Route::get('/viajes', [ViajeController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Recursos protegidos
    Route::apiResource('conductores', ConductorController::class);
    Route::apiResource('pagos', PagoController::class);
    Route::apiResource('valoraciones', ValoracionController::class);
    Route::apiResource('bonos', BonoController::class);
    Route::apiResource('zonas', ZonaController::class);
    Route::apiResource('tokens', PersonalAccessTokenController::class);
    Route::apiResource('sucursales', SucursalController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    // (ya NO vuelvas a declarar aquí `GET /viajes`)
});
