<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompteRendu;
use App\Models\Seance;
use App\Http\Resources\CompteRenduResource;

class CompteRenduController extends Controller
{
    public function index()
    {
        return response()->json(CompteRendu::all(), 200);
    }

    public function indexByProjet($projetId)
    {
        $comptesRendus = CompteRendu::where('projet_id', $projetId)->get();

        return response()->json($comptesRendus);
    }

    public function store(Request $request)
    {
        $report = CompteRendu::create($request->all());
        return new CompteRenduResource($report);
    }

    public function show($id)
    {
        $report = CompteRendu::findOrFail($id);
        return new CompteRenduResource($report);
    }

    public function update(Request $request, $id)
    {
        $report = CompteRendu::findOrFail($id);
        $report->update($request->all());
        return new CompteRenduResource($report);
    }

    public function destroy($id)
    {
        $report = CompteRendu::findOrFail($id);
        if ($report->delete()) {
            return response()->json(
                ['message' => 'Le compte rendu a été supprimé avec succès'],
                204
            );
        };
    }

    public function dernierCompteRendu($projetId)
    {
        // Recherchez le dernier compte rendu pour le projet spécifié (par exemple, en triant par date de création décroissante)
        $dernierCompteRendu = CompteRendu::where('projet_id', $projetId)
            ->latest('created_at')
            ->first();

        if (!$dernierCompteRendu) {
            return response()->json(['message' => 'Aucun compte rendu trouvé pour ce projet'], 404);
        }

        return response()->json($dernierCompteRendu);
    }

    public function generatePDFData($projetId)
{
    // Recherche le dernier compte rendu pour le projet spécifié (par exemple, en triant par date de création décroissante)
    $dernierCompteRendu = CompteRendu::where('projet_id', $projetId)
        ->latest('created_at')
        ->first();

    if (!$dernierCompteRendu) {
        return response()->json(['message' => 'Aucun compte rendu trouvé pour ce projet'], 404);
    }

    // Formater les données pour le rapport PDF
$data = [
    'id' => $dernierCompteRendu->id,
    'projet_id' => $dernierCompteRendu->projet_id,
    'evenement' => $dernierCompteRendu->evenement,
    'difficultes' => $dernierCompteRendu->difficultes,
    'commentaires' => $dernierCompteRendu->commentaires,
    'date' => $dernierCompteRendu->date,
    'approche_solution' => $dernierCompteRendu->approche_solution,
    'action_retenu' => $dernierCompteRendu->action_retenu,
    // Ajoutez d'autres attributs du compte rendu que vous souhaitez inclure dans le PDF
];


    return response()->json($data);
}

}
