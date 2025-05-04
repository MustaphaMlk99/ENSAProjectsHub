<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Models\Encadrant;
use App\Models\Administrateur;

class UserController extends Controller
{
    // Récupère tous les étudiants
    public function getEtudiants()
    {
        return response()->json(Etudiant::all());
        
    }

    // Récupère tous les encadrants
    public function getEncadrants()
    {
        return response()->json(Encadrant::all());

    }

    // Récupère tous les admins 
    public function getAdmins()
    {
        return response()->json(Administrateur::all());
    }

    // Récupère tous les admins 
    public function getEtudiantById($id)
    {
        $etudiant = Etudiant::findOrFail($id);
        return response()->json($etudiant);
    }
}
