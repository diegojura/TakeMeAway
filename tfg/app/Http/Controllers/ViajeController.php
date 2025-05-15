<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Viaje;

class ViajeController extends Controller
{
    /**
     * GET /api/viajes?usuario_id=1
     */
    public function index(Request $request)
    {
        // 1) Validamos que venga el parámetro
        $request->validate([
            'usuario_id' => 'required|integer|exists:usuarios,id',
        ]);

        // 2) Consultamos los viajes de ese usuario
        $viajes = Viaje::where('usuario_id', $request->query('usuario_id'))
                       ->get();

        // 3) Devolvemos JSON
        return response()->json($viajes, 200);
    }
}
