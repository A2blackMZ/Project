<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Projet;

class UtilisateurController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index($projectId)
    {
        $project = Projet::findOrFail($projectId);
        $users = $project->users;
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
        public function store(Request $request,$projectId)
    {
        /*if (!auth()->user()->isAdmin()) {
        return response()->json(['message' => 'Accès non autorisé.'], 403);
    }*/
        // Valider les données du formulaire
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
        ]);

        // Créer un nouvel utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        $project = Projet::findOrFail($projectId);
        $project->users()->attach($user);

                return response()->json(['user' => $user], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($userId)
    {
        $user = User::findOrFail($userId);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $userId)
    {
        /*if (!auth()->user()->isAdmin()) {
        return response()->json(['message' => 'Accès non autorisé.'], 403);
    }*/
        $user = User::findOrFail($userId);
        $user->update($request->all());
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($userId)
    {
        /*if (!auth()->user()->isAdmin()) {
        return response()->json(['message' => 'Accès non autorisé.'], 403);
    }*/
        $user = User::findOrFail($userId);
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }

    /**
     * Block and unblock a user
     */
    public function block($userId)
    {
        /*if (!auth()->user()->isAdmin()) {
        return response()->json(['message' => 'Accès non autorisé.'], 403);
    }*/
        $user = User::findOrFail($userId);
        $user->blocked = true;
        $user->save();
        return response()->json(['message' => 'Utilisateur bloqué avec succès.']);
    }

    public function unblock($userId)
    {
        /*if (!auth()->user()->isAdmin()) {
        return response()->json(['message' => 'Accès non autorisé.'], 403);
    }*/
        $user = User::findOrFail($userId);
        $user->blocked = false;
        $user->save();
        return response()->json(['message' => 'Utilisateur débloqué avec succès.']);
    }
}
