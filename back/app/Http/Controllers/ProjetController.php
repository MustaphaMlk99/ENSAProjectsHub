<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\Livrable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class ProjetController extends Controller
{
    // Récupérer tous les projets sans jointure avec le module
    public function getProjets()
    {
        // Récupère tous les projets avec leurs livrables associés
        $projets = Projet::with('livrable')->get();
    
        // Ajouter les URLs des fichiers pour chaque projet
        foreach ($projets as $projet) {
            if ($projet->livrable) {
                // Utilisation de url() pour générer une URL absolue
                $projet->livrable->rapport_url = $projet->livrable->rapport
                    ? url('storage/livrables/rapports/' . basename($projet->livrable->rapport))  // Utilisation de url() avec un chemin relatif
                    : null;
    
                $projet->livrable->presentation_url = $projet->livrable->presentation
                    ? url('storage/livrables/presentations/' . basename($projet->livrable->presentation))  // Utilisation de url() avec un chemin relatif
                    : null;
    
                $projet->livrable->codeSource_url = $projet->livrable->code_source
                    ? url('storage/livrables/codeSources/' . basename($projet->livrable->code_source))  // Utilisation de url() avec un chemin relatif
                    : null;
            }
        }

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
    // Récupérer le projet avec ses livrables
    $projet = Projet::with('livrable')->find($id);

    if (!$projet) {
        return response()->json(['message' => 'Projet non trouvé'], 404);
    }

    // Générer les URLs de téléchargement si les fichiers existent
    if ($projet->livrable) {
        // Vérifie et génère l'URL correctement
        $projet->livrable->rapport_url = $projet->livrable->rapport
            ? url('storage/livrables/rapports/' . basename($projet->livrable->rapport))
            : null;

        $projet->livrable->presentation_url = $projet->livrable->presentation
            ? url('storage/livrables/presentations/' . basename($projet->livrable->presentation))
            : null;

        $projet->livrable->codeSource_url = $projet->livrable->code_source
            ? url('storage/livrables/codeSources/' . basename($projet->livrable->code_source))
            : null;
    }

    return response()->json($projet);
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
            $livrable->rapport = $request->file('rapport')->store('livrables/rapports', 'public');
        }
        
        if ($request->hasFile('presentation')) {
            $livrable->presentation = $request->file('presentation')->store('livrables/presentations', 'public');
        }
        
        if ($request->hasFile('codeSource')) {
            $livrable->code_source = $request->file('codeSource')->store('livrables/codeSources', 'public');
        }
        
        $livrable->save();

        return response()->json(['message' => 'Projet et livrable enregistrés avec succès.'], 200);
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

    public function getProjectCount()
    {
        $count = \App\Models\Projet::count();
        return response()->json(['total' => $count]);
    }

    public function getProjetsSortedByLikes($direction = 'desc')
    {
        $direction = strtolower($direction) === 'asc' ? 'asc' : 'desc';

        $projets = Projet::withCount('likes')
            ->with(['etudiant', 'encadrant']) // optional: include relations
            ->orderBy('likes_count', $direction)
            ->get();

        return response()->json($projets);
    }

    public function sortedByLikes($direction)
    {
        $direction = in_array($direction, ['asc', 'desc']) ? $direction : 'desc';

        $projets = Projet::withCount('likes')
            ->orderBy('likes_count', $direction)
            ->get();

        return response()->json($projets);
    }

    public function getProjetsByYear($year)
{
    $projets = Projet::with(['etudiant'])
        ->whereHas('etudiant', function ($query) use ($year) {
            $query->where('annee', $year);
        })
        ->withCount('likes')
        ->get();

    return response()->json($projets);
}


}
