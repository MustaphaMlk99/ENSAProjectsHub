namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Models\Encadrant;
use App\Models\Administrateur;
use App\Models\Projet;
use App\Models\Like;
use App\Models\Evaluation;

class StatistiquesController extends Controller
{
    // Récupère les statistiques générales
    public function getStats()
    {
        // Count the number of students, teachers, and admins
        $etudiants = Etudiant::count();
        $encadrants = Encadrant::count();
        $administrateurs = Administrateur::count();
        
        // Count the total number of projects
        $projets = Projet::count();
        
        // Count the total number of likes
        $likes = Like::count();

        // Calculate the average evaluation score for all projects
        $avgScore = Evaluation::avg('note');
        
        // Return the statistics as a JSON response
        return response()->json([
            'etudiants' => $etudiants,
            'encadrants' => $encadrants,
            'administrateurs' => $administrateurs,
            'projets' => $projets,
            'likes' => $likes,
            'avgScore' => $avgScore
        ]);
    }
    
    // Statistiques sur les projets par module
    public function getProjectsByModule()
    {
        $modulesStats = Projet::select('module_id', \DB::raw('count(*) as total'))
                              ->groupBy('module_id')
                              ->get();

        return response()->json($modulesStats);
    }
    
    // Statistiques sur les évaluations par projet
    public function getEvaluationsByProject()
    {
        $evaluationStats = Evaluation::select('livrable_id', \DB::raw('avg(note) as avg_note'))
                                     ->groupBy('livrable_id')
                                     ->get();

        return response()->json($evaluationStats);
    }

    // Statistiques des projets par encadrant
    public function getProjectsByEncadrant()
    {
        $encadrantStats = Projet::select('encadrant_id', \DB::raw('count(*) as total'))
                                ->groupBy('encadrant_id')
                                ->get();

        return response()->json($encadrantStats);
    }
}
