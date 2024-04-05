<?php

use App\Http\Controllers\SeanceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
   return 'Je m\'appelle Shadrac';
    // return view('welcome');
});














Route::get('generate_pdf/{seanceId}', [SeanceController::class, 'generatePDF']);

Route::post('seances/{id}/generate-report', [SeanceController::class, 'generateReport']);
