<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserResquest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterUser;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Constraint\Exception;

class UserController extends Controller
{
    public function register(RegisterUser $request)
    {
        $user = new User();

        try {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password, [
                'rounds' => 12,
            ]);
            $user->save();

            return response()->json([
                'status_code' => 200,
                'status_message' => 'Utilisateur enregistré',
                'User' => $user
            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function login(Request $request)
    {
        $utilisateurDonne = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'max:30']
        ]);
        $utilisateur =  User::where('email', $utilisateurDonne['email'])->first();
        if (!$utilisateur) {
            return Response(['message' => "Aucun utilisateur trouvé avec l'email entrée"], 401);
        }
        if (!Hash::check($utilisateurDonne['password'], $utilisateur->password)) {
            return Response(['message' => "Aucun utilisateur trouvé avec le mot de password entrée"], 401);
        }
        $token = $utilisateur->createToken("CLE_SECRETE")->plainTextToken;

        return response([
            "utilisateur" => $utilisateur,
            "token" => $token
        ], 200);
    }
}
