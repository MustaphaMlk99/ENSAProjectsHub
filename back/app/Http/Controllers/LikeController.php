<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Like;
use App\Models\Projet;

class LikeController extends Controller
{
        public function toggleLike(Request $request)
    {
        try {
            $request->validate([
                'etudiant_id' => 'required|integer',
                'projet_id' => 'required|integer',
            ]);

            $existingLike = Like::where('etudiant_id', $request->etudiant_id)
                                ->where('projet_id', $request->projet_id)
                                ->first();

            if ($existingLike) {
                $existingLike->delete();
                return response()->json(['message' => 'Like retiré.']);
            } else {
                Like::create([
                    'etudiant_id' => $request->etudiant_id,
                    'projet_id' => $request->projet_id
                ]);
                return response()->json(['message' => 'Projet aimé avec succès.']);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur serveur',
                'message' => $e->getMessage()
            ], 500);
        }
    }


        public function countLikes($projet_id)
        {
            $count = Like::where('projet_id', $projet_id)->count();
            return response()->json(['likes' => $count]);
        }

        public function isLiked($etudiant_id, $projet_id)
        {
            $isLiked = Like::where('etudiant_id', $etudiant_id)
                        ->where('projet_id', $projet_id)
                        ->exists();
            return response()->json(['liked' => $isLiked]);
        }

        public function countLikesReceivedByEtudiant($etudiant_id)
    {
        // Récupérer les IDs des projets créés par cet étudiant
        $projetsIds = Projet::where('etudiant_id', $etudiant_id)->pluck('id');

        // Compter les likes pour tous ces projets
        $count = Like::whereIn('projet_id', $projetsIds)->count();

        return response()->json(['likes_received' => $count]);
    }


    public function mostLikedProjetByEtudiant($etudiant_id)
    {
        $projet = DB::table('likes')
            ->select('projets.id', 'projets.titre', DB::raw('COUNT(likes.id) as like_count'))
            ->join('projets', 'likes.projet_id', '=', 'projets.id')
            ->where('projets.etudiant_id', $etudiant_id)
            ->groupBy('projets.id', 'projets.titre')
            ->orderByDesc('like_count')
            ->first();

        if ($projet) {
            return response()->json([
                'projet_id' => $projet->id,
                'titre' => $projet->titre,
                'likes' => $projet->like_count
            ]);
        } else {
            return response()->json([
                'message' => 'Aucun projet ou aucun like.',
                'likes' => 0
            ]);
        }
    }

}

