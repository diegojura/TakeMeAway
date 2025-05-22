<?php
namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Registro (ya funciona en tu caso)
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name'                  => 'required|string',
            'email'                 => 'required|string|email|unique:usuarios,email',
            'password'              => 'required|string|confirmed',
        ]);

        $user = Usuario::create([
            'name'     => $fields['name'],
            'email'    => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    // Login
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        // 1) Busca usuario
        $user = Usuario::where('email', $fields['email'])->first();

        // 2) Comprueba credenciales
        if (! $user || ! Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        // 3) Crea un nuevo token
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 200);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
