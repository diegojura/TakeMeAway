<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Registra un usuario y le emite un token.
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|string|email|max:255|unique:usuarios,email',
            'password'              => ['required','confirmed', Password::defaults()],
        ]);

        $user = Usuario::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('take-me-away-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Autentica y devuelve token.
     */
    public function login(Request $request)
    {
        $creds = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt($creds)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        /** @var Usuario $user */
        $user  = Auth::user();
        $token = $user->createToken('take-me-away-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    /**
     * Devuelve el usuario autenticado.
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Cierra sesión (revoca tokens).
     */
    public function logout(Request $request)
    {
        /** @var Usuario $user */
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada'], 200);
    }
}
