<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seance;
use App\Models\Projet;
use App\Models\GeneratedReport;
use App\Models\CompteRendu;
use App\Http\Resources\SeanceResource;
use Illuminate\Support\Carbon;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\Storage;

//use Barryvdh\DomPDF\Facade as PDF;
use Barryvdh\DomPDF\Facade\Pdf;

class SeanceController extends Controller
{
    public function index()
    {
        return response()->json(Seance::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            // Vous pouvez ajuster les règles de validation selon vos besoins
        ]);

        $data = [];

        // Vérifiez si 'date_supervision' est fourni dans la requête
        if ($request->has('date_supervision')) {
            $data['date_supervision'] = $request->input('date_supervision');
        }

        $data['nom_chef_projet'] = $request->input('nom_chef_projet');

        // Définissez la date de création comme la date actuelle sans heure
        $data['date_creation'] = now()->toDateString();

        // Générez la référence en utilisant "CRS_" suivi de la date de supervision
        if (isset($data['date_supervision'])) {
            $data['reference'] = 'CRS_' . str_replace('-', '/', $data['date_supervision']);
        } else {
            $data['reference'] = 'CRS_' . now()->toDateString();
        }

        // Définissez le statut par défaut comme "non_valide"
        $data['statut'] = 'non_valide';

        if ($request->has('statut') && in_array($request->input('statut'), ['non_valide', 'valide'])) {
            // Si le statut est spécifié dans la requête et est valide, utilisez-le
            $data['statut'] = $request->input('statut');
        }

        // Créez une nouvelle séance en utilisant les données préparées
        $seance = Seance::create($data);

        // Récupérez les données des projets depuis la requête (ajustez selon vos besoins)
        $projetsData = $request->input('projets', []);

        // Créez les projets associés à la séance
        foreach ($projetsData as $projetData) {
            // Vérifiez si le projet existe déjà dans la base de données
            $existingProjet = Projet::where('nom', $projetData['nom'])->first();

            if ($existingProjet) {
                // Utilisez le projet existant plutôt que d'en créer un nouveau
                $projet = $existingProjet;
            } else {
                // Créez un nouveau projet
                $projet = new Projet($projetData);
                $projet->save();
            }

            // Associez le projet à la séance
            $seance->projets()->attach($projet->id);
        }

        // Récupérez les données des comptes rendus depuis la requête (ajustez selon vos besoins)
        $comptesRendusData = $request->input('comptes_rendus', []);

        // Créez les comptes rendus associés à la séance
        foreach ($comptesRendusData as $compteRenduData) {
            $compteRendu = new CompteRendu($compteRenduData);
            $seance->comptesRendus()->save($compteRendu);
        }

        // Utilisez la ressource SéanceResource pour transformer la séance en réponse JSON
        return new SeanceResource($seance);
    }

    public function validateSeance($id)
    {
        $seance = Seance::findOrFail($id);

        // Assurez-vous que l'utilisateur connecté a le droit de valider la séance (vous pouvez ajouter une logique d'autorisation ici).

        $seance->update(['statut' => 'valide']);

        return response()->json(['message' => 'Séance validée avec succès']);
    }

    public function getProjetsForSeance($seanceId)
    {
        // Recherchez la séance par son identifiant
        $seance = Seance::find($seanceId);

        if (!$seance) {
            return response()->json(['message' => 'Séance non trouvée'], 404);
        }

        // Récupérez les projets participants à cette séance
        $projets = $seance->projets;
        // return response()->json(Taches::all(), 200);
        return response()->json($projets);
    }

    public function generateReport($id)
    {
        // Récupérer la séance de supervision par son ID
        $seance = Seance::findOrFail($id);

        // Construire les données nécessaires pour le rapport à partir de la séance
        $data = [
            'seance' => $seance,
            // Ajoutez d'autres données nécessaires pour le rapport
        ];

        // Créer une nouvelle instance Dompdf
        $pdf = new Dompdf();

        // Option pour permettre le chargement des images externes (le cas échéant)
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);
        $pdf->setOptions($options);

        // Générer le rapport en utilisant une vue HTML
        $html = view('report.seance')->with($data)->render();
        $pdf->loadHtml($html);

        // Rendre le PDF
        $pdf->render();

        // Renvoyer le PDF au frontend
        return $pdf->stream('rapport_seance.pdf');
    }


/*
public function generatePdf($seanceId) {
    $seance = Seance::findOrFail($seanceId);

    // Fetch all projects for the given session
    $projectIds = $seance->projets()->pluck('projet_id');

    // Retrieve project information
    $projets = Projet::whereIn('id', $projectIds)->get();

    // Retrieve the reports for each project where 'used' field is false
    $compteRendus = CompteRendu::whereIn('projet_id', $projectIds)
                                ->where('used', false)
                                ->get();

    // Set the 'used' field to true for the retrieved reports
    foreach ($compteRendus as $compteRendu) {
        $compteRendu->used = true;
        $compteRendu->save();
    }

    // Load the view and pass the data to generate the PDF
    $pdf = PDF::loadView('report.seanceReport', [
        'seance' => $seance,
        'compteRendus' => $compteRendus,
        'projets' => $projets
    ]);

    // Génère le nom de fichier unique
    $filename = 'seance-report-' . time() . '.pdf';

    // Sauvegarde le fichier PDF généré sur le serveur
    $filePath = storage_path('app/reports' . $filename);
    $pdf->save($filePath);

    // Crée une entrée dans la table generated_reports avec le chemin du fichier
    GeneratedReport::create([
        'seance_id' => $seance->id,
        'file_path' => $filePath
    ]);

    // Retourne le chemin absolu du fichier PDF généré
    return $pdf->download($filename);
}*/


public function generatePdf($seanceId) {
    $seance = Seance::findOrFail($seanceId);

    // Fetch all projects for the given session
    $projectIds = $seance->projets()->pluck('projet_id');

    // Retrieve project information
    $projets = Projet::whereIn('id', $projectIds)->get();

    // Retrieve the reports for each project where 'used' field is false
    $compteRendus = CompteRendu::whereIn('projet_id', $projectIds)
                                ->where('used', false)
                                ->get();

    // Set the 'used' field to true for the retrieved reports
    foreach ($compteRendus as $compteRendu) {
        $compteRendu->used = true;
        $compteRendu->save();
    }

    // Load the view and pass the data to generate the PDF
    $pdf = PDF::loadView('report.seanceReport', [
        'seance' => $seance,
        'compteRendus' => $compteRendus,
        'projets' => $projets
    ]);

    // Génère le nom de fichier unique
    $filename = 'seance-report-' . time() . '.pdf';

    // Utilisez Storage pour sauvegarder le fichier PDF généré sur le serveur
    $filePath = 'reports/' . $filename; // Chemin dans le système de fichiers
    Storage::disk('public')->put($filePath, $pdf->output());

    // Obtenez l'URL publique du fichier
    $fileUrl = Storage::url($filePath);
    // Crée une entrée dans la table generated_reports avec l'URL du fichier
    GeneratedReport::create([
        'seance_id' => $seance->id,
        'file_path' => $fileUrl // Enregistrez l'URL ici
    ]);

    // Retourne le fichier PDF généré pour téléchargement
    return $pdf->download($filename);
}

public function getSeanceReports($seanceId) {
    // Récupère les rapports générés pour la séance donnée
    $rapports = GeneratedReport::where('seance_id', $seanceId)->get();

    // Retourne les rapports
    return response()->json(['rapports' => $rapports]);
}




}
