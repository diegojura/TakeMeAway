<?php

namespace App\Http\Controllers;

use App\Models\Viaje;
use Illuminate\Http\Request;

class ViajeController extends Controller
{
    /**
     * GET /api/viajes?usuario_id=1
     */
    public function index(Request $request)
    {
        $usuarioId = $request->query('usuario_id');

        $viajes = Viaje::with([
                // Traemos sólo id y nombre de cada relación
                'usuario:id,nombre',
                'conductor:id,nombre',
            ])
            // Si nos pasan usuario_id, filter
            ->when($usuarioId, fn($q) => $q->where('usuario_id', $usuarioId))
            ->get();

        return response()->json($viajes);
    }
}
