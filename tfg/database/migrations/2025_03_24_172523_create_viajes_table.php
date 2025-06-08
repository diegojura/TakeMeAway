<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Viaje;
use Illuminate\Support\Facades\Auth;

class ViajeController extends Controller
{
    /**
     * GET /api/viajes
     * Devuelve la lista de viajes del usuario autenticado.
     */
    public function index()
    {
        $viajes = Viaje::with('conductor.usuario')
                       ->where('usuario_id', Auth::id())
                       ->get();

        return response()->json($viajes, 200);
    }

    /**
     * POST /api/viajes
     * Guarda un nuevo viaje con los kilómetros realizados.
     *
     * Body JSON:
     * {
     *   "conductor_id": 123,
     *   "kilometros": 15
     * }
     */
    public function store(Request $request)
    {
        $request->validate([
            'conductor_id' => 'required|integer|exists:conductores,id',
    -       'kilometros'   => 'required|integer|min:0',
    +       'kilometros'   => 'required|numeric|min:0',
        ]);

        $viaje = Viaje::create([
            'usuario_id'   => Auth::id(),
            'conductor_id' => $request->conductor_id,
            'kilometros'   => $request->kilometros,
        ]);

        return response()->json($viaje, 201);
    }

}


