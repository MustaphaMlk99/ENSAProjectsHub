<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\Livrable;
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

    
    // public function updateProjet(Request $request)
    // {
    //     $request->validate([
    //     'id' => 'required|integer|exists:projets,id',
    //     'titre' => 'required|string|max:150',
    //     'description' => 'required|string|max:2000',
    //     'etudiant_id' => 'required|integer|exists:users,id',
    //     'encadrant_id' => 'required|integer|exists:users,id',
    //     ]);

    //     $projet = Projet::find($request->id);

    //     if (!$projet) {
    //         return response()->json(['message' => 'Projet non trouvé'], 404);
    //     }

    //     $projet->titre = $request->titre;
    //     $projet->description = $request->description;
    //     $projet->etudiant_id = $request->etudiant_id;
    //     $projet->encadrant_id = $request->encadrant_id;

    //     $projet->save();

    //     return response()->json(['message' => 'Projet mis à jour avec succès', 'projet' => $projet], 200);
    // }

    public function storeWithLivrables(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'encadrant_id' => 'required|integer',
            'module_id' => 'required|integer',
            'etudiant_id' => 'required|integer',
            'rapport' => 'nullable|file',
            'presentation' => 'nullable|file',
            'codeSource' => 'nullable|file',
        ]);

        $projet = Projet::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'encadrant_id' => $request->encadrant_id,
            'module_id' => $request->module_id,
            'etudiant_id' => $request->etudiant_id,
        ]);

        $livrable = new Livrable();
        $livrable->projet_id = $projet->id;

        if ($request->hasFile('rapport')) {
            $livrable->rapport = file_get_contents($request->file('rapport')->getRealPath());
        }

        if ($request->hasFile('presentation')) {
            $livrable->presentation = file_get_contents($request->file('presentation')->getRealPath());
        }

        if ($request->hasFile('codeSource')) {
            $livrable->code_source = file_get_contents($request->file('codeSource')->getRealPath());
        }

        $livrable->save();

        return response()->json(['message' => 'Projet et livrable enregistrés avec succès.'], 201);
    }


        public function updateWithLivrables(Request $request, $id)
    {
        $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'encadrant_id' => 'required|integer',
            'module_id' => 'required|integer',
            'etudiant_id' => 'required|integer',
            'rapport' => 'nullable|file',
            'presentation' => 'nullable|file',
            'codeSource' => 'nullable|file',
        ]);

        $projet = Projet::findOrFail($id);
        $projet->update([
            'titre' => $request->titre,
            'description' => $request->description,
            'encadrant_id' => $request->encadrant_id,
            'module_id' => $request->module_id,
            'etudiant_id' => $request->etudiant_id,
        ]);

        $livrable = Livrable::where('projet_id', $projet->id)->first();
        if (!$livrable) {
            $livrable = new Livrable();
            $livrable->projet_id = $projet->id;
        }

        if ($request->hasFile('rapport')) {
            $livrable->rapport = file_get_contents($request->file('rapport')->getRealPath());
        }

        if ($request->hasFile('presentation')) {
            $livrable->presentation = file_get_contents($request->file('presentation')->getRealPath());
        }

        if ($request->hasFile('codeSource')) {
            $livrable->code_source = file_get_contents($request->file('codeSource')->getRealPath());
        }

        $livrable->save();

        return response()->json(['message' => 'Projet et livrables mis à jour avec succès.']);
    }


    
        public function deleteProjet($id)
    {
        $projet = Projet::find($id);

        if (!$projet) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        // Supprimer les livrables associés au projet
        $livrable = Livrable::where('projet_id', $id)->first();
        if ($livrable) {
            // Suppression des fichiers si nécessaire
            if ($livrable->rapport) {
                unlink(storage_path('app/' . $livrable->rapport));
            }
            if ($livrable->presentation) {
                unlink(storage_path('app/' . $livrable->presentation));
            }
            if ($livrable->code_source) {
                unlink(storage_path('app/' . $livrable->code_source));
            }
            $livrable->delete();
        }

        // Supprimer le projet
        $projet->delete();

        return response()->json(['message' => 'Projet et livrables supprimés avec succès'], 200);
    }

}
