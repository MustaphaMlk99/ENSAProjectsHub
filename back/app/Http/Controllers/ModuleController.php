<?php

namespace App\Http\Controllers;

use App\Models\Module;

class ModuleController extends Controller
{
    // Récupérer tous les modules
    public function getModules()
    {
        return response()->json(Module::all());
    }
}
