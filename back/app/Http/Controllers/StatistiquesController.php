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
    // General statistics (e.g., number of students, admins, projects, likes, etc.)
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
    
    // Get projects per module (for bar chart)
    public function getProjectsByModule() {
        $projectsByModule = DB::table('projets')
            ->select('modules.nom_module', DB::raw('COUNT(projets.id) as total'))
            ->join('projet_module', 'projet_module.projet_id', '=', 'projets.id')
            ->join('modules', 'modules.id', '=', 'projet_module.module_id')
            ->groupBy('modules.nom_module')
            ->get();

        return response()->json($projectsByModule);
    }

    public function getSubmissionRates() {
        $submissionRates = DB::table('projets')
            ->select(DB::raw('DATE(date_soumission) as date'), DB::raw('COUNT(*) as total'))
            ->groupBy(DB::raw('DATE(date_soumission)'))
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
            ->select('likes.projet_id', DB::raw('COUNT(likes.id) as total_likes'), 'evaluations.note')
            ->join('evaluations', 'evaluations.projet_id', '=', 'likes.projet_id')
            ->groupBy('likes.projet_id', 'evaluations.note')
            ->get();

        return response()->json($likesVsEvaluations);
    }

    public function getEncadrantWorkload() {
        $encadrantWorkload = DB::table('projets')
            ->select('encadrants.nom', 'encadrants.prenom', DB::raw('COUNT(projets.id) as total_projects'))
            ->join('encadrants', 'encadrants.id', '=', 'projets.encadrant_id')
            ->groupBy('encadrants.nom', 'encadrants.prenom')
            ->get();

        return response()->json($encadrantWorkload);
    }

    public function getStudentEngagement() {
        $engagedStudents = DB::table('projets')
            ->select(DB::raw('COUNT(DISTINCT etudiant_id) as engaged_students'))
            ->get();

        $evaluatedProjects = DB::table('evaluations')
            ->select(DB::raw('COUNT(DISTINCT projet_id) as evaluated_projects'))
            ->get();

        return response()->json([
            'engaged_students' => $engagedStudents,
            'evaluated_projects' => $evaluatedProjects,
        ]);
    }

    public function getMonthlyUserRegistrations() {
        $monthlyRegistrations = DB::table('users')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as total'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        return response()->json($monthlyRegistrations);
    }

    public function getModulePopularityByLikes() {
        $modulePopularity = DB::table('likes')
            ->select('modules.nom_module', DB::raw('COUNT(likes.id) as total_likes'))
            ->join('projet_module', 'projet_module.projet_id', '=', 'likes.projet_id')
            ->join('modules', 'modules.id', '=', 'projet_module.module_id')
            ->groupBy('modules.nom_module')
            ->get();

        return response()->json($modulePopularity);
    }

    public function getTopRatedProjects() {
        $topRatedProjects = DB::table('projets')
            ->select('projets.titre', 'evaluations.note')
            ->join('evaluations', 'evaluations.projet_id', '=', 'projets.id')
            ->orderByDesc('evaluations.note')
            ->take(10)
            ->get();

        return response()->json($topRatedProjects);
    }

    public function getAvgTimeToFirstSubmission() {
        $avgTime = DB::table('projets')
            ->select(DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, date_soumission)) as avg_time_hours'))
            ->get();

        return response()->json($avgTime);
    }
}
