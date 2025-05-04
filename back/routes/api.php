<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//test
Route::get('/test', function () {
    return response()->json(['message' => 'API Laravel OK']);
});


//login
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('/me', [AuthController::class, 'me']);


// Projets
Route::get('/getProjets', [ProjetController::class, 'getProjets']);
Route::post('/ajouterProjet', [ProjetController::class, 'ajouterProjet']);
Route::get('/projet/{id}', [ProjetController::class, 'getProjetById']);
Route::post('/updateprojet', [ProjetController::class, 'updateProjet']);
Route::post('/projets-avec-livrables', [ProjetController::class, 'storeWithLivrables']);


// Modules
Route::get('/getModules', [ModuleController::class, 'getModules']);

// Users
Route::get('/getEncadrants', [UserController::class, 'getEncadrants']);
Route::get('/getEtudiants', [UserController::class, 'getEtudiants']);
Route::get('/getAdmins', [UserController::class, 'getAdmins']);
Route::get('/getEtudiantById/{id}', [UserController::class, 'getEtudiantById']);
