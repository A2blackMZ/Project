<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProjetResource;
use App\Http\Resources\TacheResource;
use App\Models\Taches;

class TacheController extends Controller
{
    public function index()
    {
        return response()->json(Taches::all(), 200);
    }

    public function store(Request $request)
    {
        $tache = Taches::create($request->all());
        return new TacheResource($tache);
    }

    public function show($id)
    {
        $tache = Taches::findOrFail($id);
        return new TacheResource($tache);
    }

    public function update(Request $request, $id)
    {
        $tache = Taches::findOrFail($id);
        $tache->update($request->all());
        return new TacheResource($tache);
    }

    public function destroy($id)
    {
        $tache = Taches::findOrFail($id);
        $tache->delete();
        return response()->json(null, 204);
    }
}