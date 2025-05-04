<?php

namespace App\Http\Controllers;

use App\Models\Livrable;
use Illuminate\Http\Request;

class LivrableController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'projet_id' => 'required|exists:projets,id',
            'rapport' => 'nullable|file',
            'presentation' => 'nullable|file',
            'code_source' => 'nullable|file',
        ]);

        $livrable = new Livrable();
        $livrable->projet_id = $request->projet_id;

        if ($request->hasFile('rapport')) {
            $livrable->rapport = file_get_contents($request->file('rapport')->getRealPath());
            $livrable->rapport_nom = $request->file('rapport')->getClientOriginalName();
        }

        if ($request->hasFile('presentation')) {
            $livrable->presentation = file_get_contents($request->file('presentation')->getRealPath());
            $livrable->presentation_nom = $request->file('presentation')->getClientOriginalName();
        }

        if ($request->hasFile('code_source')) {
            $livrable->code_source = file_get_contents($request->file('code_source')->getRealPath());
            $livrable->code_source_nom = $request->file('code_source')->getClientOriginalName();
        }

        $livrable->save();

        return response()->json(['message' => 'Livrables enregistrés avec succès.'], 201);
    }

    // Optionnel : méthode pour récupérer un fichier
    public function download($id, $type)
    {
        $livrable = Livrable::findOrFail($id);

        $types = ['rapport', 'presentation', 'code_source'];
        if (!in_array($type, $types) || !$livrable->$type) {
            return response()->json(['error' => 'Fichier non trouvé'], 404);
        }

        $nom = $livrable->{$type . '_nom'};
        $contenu = $livrable->$type;

        return response($contenu, 200)
            ->header('Content-Type', 'application/octet-stream')
            ->header('Content-Disposition', 'attachment; filename="' . $nom . '"');
    }
}
