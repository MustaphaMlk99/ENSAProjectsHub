<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    // Récupérer tous les projets sans jointure avec le module
    public function getProjets()
    {
        $projets = Projet::all(); // Récupère seulement les projets sans inclure les modules
        return response()->json($projets);
    }

    // Ajouter un nouveau projet
    public function ajouterProjet(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:150',
            'description' => 'required|string|max:2000',
            'etudiant_id' => 'required|integer',
            'encadrant_id' => 'required|integer',
            'module_id' => 'required|exists:modules,id', // Validation de la clé étrangère
        ]);

        $projet = Projet::create($validated);
        return response()->json([
            'message' => 'Projet ajouté avec succès',
            'projet' => $projet
        ], 201);
    }

    public function getProjetById($id)
    {
        // Recherche le projet avec l'ID fourni
        $projet = Projet::find($id);

        if ($projet) {
            return response()->json($projet);  // Si le projet existe, renvoie les données du projet
        }

        return response()->json(['message' => 'Projet non trouvé'], 404);  // Si le projet n'existe pas, renvoie une erreur
    }

    
    public function updateProjet(Request $request)
    {
        $request->validate([
        'id' => 'required|integer|exists:projets,id',
        'titre' => 'required|string|max:150',
        'description' => 'required|string|max:2000',
        'etudiant_id' => 'required|integer|exists:users,id',
        'encadrant_id' => 'required|integer|exists:users,id',
        ]);

        $projet = Projet::find($request->id);

        if (!$projet) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        $projet->titre = $request->titre;
        $projet->description = $request->description;
        $projet->etudiant_id = $request->etudiant_id;
        $projet->encadrant_id = $request->encadrant_id;

        $projet->save();

        return response()->json(['message' => 'Projet mis à jour avec succès', 'projet' => $projet], 200);
    }
}
