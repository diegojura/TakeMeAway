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

// 1) Auth público
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

// 2) Rutas públicas
Route::get('viajes', [ViajeController::class, 'index']);

// 3) Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user',   [AuthController::class, 'user']);
    Route::post('logout',[AuthController::class, 'logout']);

    Route::apiResource('viajes',       ViajeController::class)->only(['show','store','update','destroy']);
    Route::apiResource('conductores',  ConductorController::class);
    Route::apiResource('pagos',        PagoController::class);
    Route::apiResource('valoraciones', ValoracionController::class);
    Route::apiResource('bonos',        BonoController::class);
    Route::apiResource('zonas',        ZonaController::class);
    Route::apiResource('tokens',       PersonalAccessTokenController::class);
    Route::apiResource('sucursales',   SucursalController::class);
    Route::apiResource('usuarios',     UsuarioController::class);
});
