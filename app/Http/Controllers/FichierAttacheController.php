<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\FichierAttache;
use Illuminate\Support\Facades\DB;

class FichierAttacheController extends Controller
{
    /**
     * Importer un fichier pour un projet donné.
     */
    public function importerFichier(Request $request, $projetId)
{
    if ($request->hasFile('file')) {

        $file = $request->file('file');
        $chemin = $file->store('fichiers_projet', 'public');
        $url = Storage::url($chemin);

        $fichierAttache = new FichierAttache();
        $fichierAttache->chemin = $url; 
        $fichierAttache->projet_id = $projetId;
        $fichierAttache->save();

        return response()->json(['message' => 'Fichier importé avec succès', 'lien' => $url], 200);
    }

    return response()->json(['message' => 'Aucun fichier n\'a été téléchargé'], 400);
}



    public function recupererFichiers($projetId)
    {
        $fichiers = FichierAttache::where('projet_id', $projetId)->get();
        return response()->json($fichiers);
    }

    public function destroy($fileId)
    {
        $file = FichierAttache::findOrFail($fileId);
        $file->delete();
        return response()->json(['message' => 'Fichier supprimé avec succès.']);
    }

}
