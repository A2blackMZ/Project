<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProjetController;
use App\Http\Controllers\API\TacheController;
use App\Http\Controllers\API\CompteRenduController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\RapportController;
use Illuminate\Http\Request;

Route::get('/seances', [SeanceController::class, 'index']);
Route::post('/seances/ajout', [SeanceController::class, 'store']);
Route::put('/seances/{id}/validate', [SeanceController::class, 'validateSeance']);
Route::get('/seances/{seanceId}/projets', [SeanceController::class, 'getProjetsForSeance']);


// routes pour CRUD Projets
Route::post('/projets', [ProjetController::class, 'store']);
Route::get('/projets/{id}', [ProjetController::class, 'show']);
Route::put('/projets/{id}', [ProjetController::class, 'update']);
Route::delete('/projets/{id}', [ProjetController::class, 'destroy']);

// routes pour CRUD Taches

Route::get('/taches', [TacheController::class, 'index']);
Route::post('/taches', [TacheController::class, 'store']);
Route::get('/taches/{id}', [TacheController::class, 'show']);
Route::put('/taches/{id}', [TacheController::class, 'update']);
Route::delete('/taches/{id}', [TacheController::class, 'destroy']);

Route::get('/reports', [CompteRenduController::class, 'index']);
Route::post('/reports', [CompteRenduController::class, 'store']);
Route::get('/reports/{id}', [CompteRenduController::class, 'show']);
Route::put('/reports/{id}', [CompteRenduController::class, 'update']);
Route::delete('/reports/{id}', [CompteRenduController::class, 'destroy']);

Route::delete('/comptes-rendus/{id}', [CompteRenduController::class, 'destroy']);


// routes pour CRUD Utilisateurs

Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::post('/utilisateurs', [UtilisateurController::class, 'store']);
Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']);
Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateurs/{id}', [UtilisateurController::class, 'destroy']);

//Génération de rapport
Route::post('seances/{id}/generate-report', [SeanceController::class, 'generateReport']);

//GetBY
Route::get('projets/{projectId}/taches', [ProjetController::class, 'getTachesByProjectId']);

Route::get('projets/{projetId}/comptes-rendus', [CompteRenduController::class, 'indexByProjet']);

Route::get('/projets/{projetId}/dernier-compte-rendu', [CompteRenduController::class, 'dernierCompteRendu']);

// Dans routes/api.php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::get('/projets', [ProjetController::class, 'index']);
Route::get('/projets/user/{userId}', [ProjetController::class, 'getProjectsByUserId']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user_', [AuthController::class, 'user']);
    Route::post('/logout_', [AuthController::class, 'logout']);
});

Route::middleware('auth:api')->get('/user-info', [AuthController::class, 'getUserInfo']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get(
        '/user',
        function (Request $request) {
            return $request->user();
        }
    );
});













/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
/*
As avoir :
Fonctions non établies :
Gestion des utilisateurs (créer, voir, supprimer ou bloquer)
Gestion des séances de supervision (sélection de compte rendu avant redirection sur la page avec les divers champs commentaires)
Génération de rapport de séance de supervision
Gestion de l'allocation d'espace pour les fichiers attachés
Modification de l'état des tâches existantes
*/
