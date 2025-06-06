<?php
namespace App\Http\Controllers;

use App\Models\Encadrant;
use App\Models\Etudiant;
use App\Models\Projet;
use App\Models\Like;
use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiquesController extends Controller
{
    public function getStats()
    {
        $etudiants = Etudiant::count();
        $encadrants = Encadrant::count();
        $projets = Projet::count();
        $likes = Like::count();
        $avgScore = Evaluation::avg('note');
        
        return response()->json([
            'etudiants' => $etudiants,
            'encadrants' => $encadrants,
            'projets' => $projets,
            'likes' => $likes,
            'avgScore' => $avgScore,
        ]);
    }
    
    public function getProjectsByModule()
    {
        $projectsByModule = DB::table('projets')
            ->join('modules', 'modules.id', '=', 'projets.module_id')
            ->select('modules.nom as nom_module', DB::raw('COUNT(projets.id) as total'))
            ->groupBy('modules.nom')
            ->get();
    
        return response()->json($projectsByModule);
    }
    

    public function getSubmissionRates() {
        $submissionRates = DB::table('projets')
            ->select(
                DB::raw('DATE(created_at) as date'), 
                DB::raw('COUNT(*) as total'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        return response()->json($submissionRates);
    }
    

    public function getEvaluationDistribution() {
        $evaluationDistribution = DB::table('evaluations')
            ->select('note', DB::raw('COUNT(*) as total'))
            ->groupBy('note')
            ->get();

        return response()->json($evaluationDistribution);
    }

    public function getLikesVsEvaluations() {
        $likesVsEvaluations = DB::table('likes')
            ->select(
                'likes.projet_id',
                DB::raw('COUNT(likes.id) as total_likes'),
                'evaluations.note'
            )
            ->join('livrables', 'livrables.projet_id', '=', 'likes.projet_id')
            ->join('evaluations', 'evaluations.livrable_id', '=', 'livrables.id')
            ->groupBy('likes.projet_id', 'evaluations.note')
            ->get();
    
        return response()->json($likesVsEvaluations);
    }
    

    public function getEncadrantWorkload() {
        $encadrantWorkload = DB::table('projets')
            ->select('encadrants.id', 'encadrants.nom', 'encadrants.prenom', DB::raw('COUNT(projets.id) as total_projects'))
            ->join('encadrants', 'encadrants.id', '=', 'projets.encadrant_id')
            ->groupBy('encadrants.id', 'encadrants.nom', 'encadrants.prenom')
            ->get();
    
        return response()->json($encadrantWorkload);
    }
    
    

 

    public function getModulePopularityByLikes() {
        $modulePopularity = DB::table('likes')
            ->join('projets', 'likes.projet_id', '=', 'projets.id')
            ->join('modules', 'modules.id', '=', 'projets.module_id')
            ->select('modules.nom', DB::raw('COUNT(likes.id) as total_likes'))
            ->groupBy('modules.nom')
            ->get();

        return response()->json($modulePopularity);
    }

    public function getTopRatedProjects() {
        $topRatedProjects = DB::table('projets')
            ->select(
                'projets.titre',
                'evaluations.note',
                DB::raw('COUNT(likes.id) as likes')
            )
            ->join('livrables', 'livrables.projet_id', '=', 'projets.id')
            ->join('evaluations', 'evaluations.livrable_id', '=', 'livrables.id')
            ->leftJoin('likes', 'likes.projet_id', '=', 'projets.id') // Utilise leftJoin pour ne pas exclure les projets sans like
            ->groupBy('projets.titre', 'evaluations.note')
            ->orderByDesc('evaluations.note')
            ->take(10)
            ->get();
    
        return response()->json($topRatedProjects);
    }
    

    public function getAvgTimeToFirstSubmission() {
        $avgTime = DB::table('projets')
            ->select(DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, date_soumission)) as avg_time_hours'))
            ->first();

        return response()->json($avgTime);
    }
}
