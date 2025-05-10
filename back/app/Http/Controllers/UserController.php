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

    // Récupère les etudiants par id 
    public function getEtudiantById($id)
    {
        $etudiant = Etudiant::findOrFail($id);
        return response()->json($etudiant);
    }

    // Récupère les encadrant by id 
    public function getEncadrantById($id)
    {
        $encadrant = Encadrant::findOrFail($id);
        return response()->json($encadrant);
    }











    // Créer un nouvel administrateur
    public function createAdmin(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:administrateurs,email',
            'mot_de_passe' => 'required|string|min:6',
        ]);

        $validated['mot_de_passe'] = bcrypt($validated['mot_de_passe']);
        $admin = Administrateur::create($validated);

        return response()->json($admin, 201);
    }

    // Mettre à jour un administrateur
    public function updateAdmin(Request $request, $id)
    {
        $admin = Administrateur::findOrFail($id);
        $admin->update($request->all());

        return response()->json($admin);
    }

    // Supprimer un administrateur
    public function deleteAdmin($id)
    {
        Administrateur::destroy($id);
        return response()->json(['message' => 'Administrateur supprimé']);
    }



    



    public function createEncadrant(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:encadrants,email',
            'mot_de_passe' => 'required|string|min:6',
        ]);
    
        $validated['mot_de_passe'] = bcrypt($validated['mot_de_passe']);
    
        $encadrant = Encadrant::create($validated);
    
        return response()->json($encadrant, 201);
    }

    public function updateEncadrant(Request $request, $id)
    {
        $encadrant = Encadrant::findOrFail($id);
        $encadrant->update($request->all());
        return response()->json($encadrant);
    }

    public function deleteEncadrant($id)
    {
        $encadrant = Encadrant::findOrFail($id);
        $encadrant->delete();
        return response()->json(null, 204);
    }


    



    public function createEtudiant(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:etudiants,email',
            'filiere' => 'required|string|max:100',
            'annee' => 'required|integer',
            'mot_de_passe' => 'required|string|min:6',
        ]);
    
        // Hash du mot de passe
        $validated['mot_de_passe'] = bcrypt($validated['mot_de_passe']);
    
        $etudiant = Etudiant::create($validated);
    
        return response()->json($etudiant, 201);
    }
    
    public function updateEtudiant(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
    
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:100',
            'prenom' => 'sometimes|required|string|max:100',
            'email' => 'sometimes|required|email|unique:etudiants,email,' . $id,
            'filiere' => 'sometimes|required|string|max:100',
            'annee' => 'sometimes|required|integer',
            'mot_de_passe' => 'sometimes|nullable|string|min:6',
        ]);
    
        // Si un nouveau mot de passe est fourni, on le hash
        if (!empty($validated['mot_de_passe'])) {
            $validated['mot_de_passe'] = bcrypt($validated['mot_de_passe']);
        } else {
            unset($validated['mot_de_passe']); // ne rien changer
        }
    
        $etudiant->update($validated);
    
        return response()->json($etudiant);
    }
    
    public function deleteEtudiant($id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->delete();
    
        return response()->json(null, 204);
    }

    public function getUserCounts()
    {
        $etudiants = \App\Models\Etudiant::count();
        $encadrants = \App\Models\Encadrant::count();
        $admins = \App\Models\Administrateur::count();

        return response()->json([
            'etudiants' => $etudiants,
            'encadrants' => $encadrants,
            'administrateurs' => $admins
        ]);
    }

}
