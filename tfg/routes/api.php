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
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\UsuarioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí defines los endpoints de tu API. Ya vienen protegidos por el
| middleware 'api' (o por 'auth:sanctum' si lo añades).
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Endpoints CRUD para cada recurso
Route::apiResource('conductores', ConductorController::class);
Route::apiResource('pagos', PagoController::class);
Route::apiResource('viajes', ViajeController::class);
Route::apiResource('valoraciones', ValoracionController::class);
Route::apiResource('bonos', BonoController::class);
Route::apiResource('zonas', ZonaController::class);
Route::apiResource('tokens', PersonalAccessTokenController::class);
Route::apiResource('sucursales', SucursalController::class);
Route::apiResource('vehiculos', VehiculoController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::get('/viajes', [ViajeController::class, 'index']);
