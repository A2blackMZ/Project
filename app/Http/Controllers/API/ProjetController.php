<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Projet;
use App\Http\Resources\ProjetResource;
use App\Models\Taches;
use Illuminate\Support\Facades\Auth;

class ProjetController extends Controller
{
    public function index()
    {
        return response()->json(Projet::all(), 200);
    }

    public function store(Request $request)
    {
        $projet = Projet::create($request->all());

        // Création du nom du dossier
        $dossierNom = $projet->nom . '_' . $projet->id;

        // Chemin du dossier
        $cheminDossier = storage_path('app/projets/' . $dossierNom);

        // Création du dossier
        if (!file_exists($cheminDossier)) {
            mkdir($cheminDossier, 0777, true);
        }

        $user = Auth::user();

        // Vous pouvez enregistrer le chemin du dossier dans la base de données si nécessaire
        $projet->update(['FolderPath' => $cheminDossier]);
        return response()->json($user);


        return new ProjetResource($projet);
    }

    public function show($id)
    {
        return response()->json(Projet::findOrFail($id), 200);
    }

    public function update(Request $request, $id)
    {
        $projet = Projet::findOrFail($id);
        $projet->update($request->all());
        return new ProjetResource($projet);
    }

    public function destroy($id)
    {
        $projet = Projet::findOrFail($id);
        if ($projet->delete()) {
            return response()->json(
                ['message' => 'Le projet a été supprimé avec succès'],
                204
            );
        };
    }

    public function getTachesByProjectId($projectId)
    {
        // Récupérez les tâches associées au projet par son ID
        $taches = Taches::where('projet_id', $projectId)->get();

        return response()->json($taches);
    }

    public function getProjectsByUserId($userId)
    {
        // Utilisez la méthode where pour filtrer les projets par ID utilisateur
        $projets = Projet::where('user_id', $userId)->get();

        return response()->json($projets, 200);
    }
}
