<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\StatistiquesController;

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
//Route::post('/updateprojet', [ProjetController::class, 'updateProjet']);
Route::post('/projets-avec-livrables', [ProjetController::class, 'storeWithLivrables']);
Route::post('/projets/update/{id}', [ProjetController::class, 'updateWithLivrables']);
Route::delete('/deleteProjet/{id}', [ProjetController::class, 'deleteProjet']);



// Modules
Route::get('/getModules', [ModuleController::class, 'getModules']);

// Users
Route::get('/getEncadrants', [UserController::class, 'getEncadrants']);
Route::get('/getEtudiants', [UserController::class, 'getEtudiants']);
Route::get('/getAdmins', [UserController::class, 'getAdmins']);
Route::get('/getEtudiantById/{id}', [UserController::class, 'getEtudiantById']);
Route::get('/getEncadrantById/{id}', [UserController::class, 'getEncadrantById']);


//likes
Route::post('/likes/toggle', [LikeController::class, 'toggleLike']);
Route::get('/likes/count/{projet_id}', [LikeController::class, 'countLikes']);
Route::get('/likes/check/{etudiant_id}/{projet_id}', [LikeController::class, 'isLiked']);
Route::get('/likes/received/{etudiant_id}', [LikeController::class, 'countLikesReceivedByEtudiant']);
Route::get('/likes/most-liked/{etudiant_id}', [LikeController::class, 'mostLikedProjetByEtudiant']);



//statistiques
Route::get('/stats/projects/count', [ProjetController::class, 'getProjectCount']);
Route::get('/stats/users/counts', [UserController::class, 'getUserCounts']);
Route::get('statistiques', [StatistiquesController::class, 'getStats']);
Route::get('statistiques/projets-par-module', [StatistiquesController::class, 'getProjectsByModule']);
Route::get('statistiques/evaluations-par-projet', [StatistiquesController::class, 'getEvaluationsByProject']);
Route::get('statistiques/projets-par-encadrant', [StatistiquesController::class, 'getProjectsByEncadrant']);

//gestion admins
Route::get('/admins', [UserController::class, 'getAdmins']);
Route::post('/admins', [UserController::class, 'createAdmin']);
Route::put('/admins/{id}', [UserController::class, 'updateAdmin']);
Route::delete('/admins/{id}', [UserController::class, 'deleteAdmin']);


//gestion encadrants
Route::get('/getEncadrants', [UserController::class, 'getEncadrants']);
Route::post('/encadrants', [UserController::class, 'createEncadrant']);
Route::put('/encadrants/{id}', [UserController::class, 'updateEncadrant']);
Route::delete('/encadrants/{id}', [UserController::class, 'deleteEncadrant']);


//gestion etudiants
Route::get('/getEtudiants', [UserController::class, 'getEtudiants']);
Route::post('/etudiant', [UserController::class, 'createEtudiant']);
Route::put('/etudiants/{id}', [UserController::class, 'updateEtudiant']);
Route::delete('/etudiants/{id}', [UserController::class, 'deleteEtudiant']);
