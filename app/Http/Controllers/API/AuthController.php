<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validez les données du formulaire d'inscription
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Créez un nouvel utilisateur
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        // Enregistrez l'utilisateur dans la base de données
        $user->save();

        // Générez un jeton d'accès pour l'utilisateur nouvellement inscrit
        $token = $user->createToken('MyAppToken')->accessToken;

        // Réponse avec le jeton d'accès et les informations de l'utilisateur
        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'access_token' => $token,
        ], 201); // Code de réponse 201 pour la création réussie
    }


    public function login(Request $request)
    {
        // Validez les données de connexion
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Tentez de connecter l'utilisateur
        if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            // Authentification réussie, générez un jeton d'accès pour l'utilisateur
            $user = Auth::user();
            $token = $user->createToken('MyAppToken')->accessToken;

            // Réponse avec le jeton d'accès et les informations de l'utilisateur
            return response()->json([
                'message' => 'Authentification réussie',
                'user' => $user,
                'access_token' => $token,
            ], 200); // Code de réponse 200 pour la réussite de l'authentification
        } else {
            // Échec de l'authentification
            return response()->json([
                'message' => 'Échec de l\'authentification',
            ], 401); // Code de réponse 401 pour l'échec de l'authentification
        }
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function getUser()
    {
        $user = Auth::user();

        return response()->json(['user' => $user]);
    }

    public function getUserInfo(Request $request)
    {
        $user = $request->user(); // Récupérez l'utilisateur à partir du jeton d'accès
        $userInfo = [
            'id' => $user->id,
            'name' => $user->name,
        ];

        return response()->json($userInfo);
    }
}
