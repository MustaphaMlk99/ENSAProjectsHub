<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Models\Encadrant;
use App\Models\Administrateur;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        $admin = Administrateur::where('email', $email)->first();
        if ($admin && Hash::check($password, $admin->mot_de_passe)) {
            return $this->generateToken($admin, 'admin');
        }

        $encadrant = Encadrant::where('email', $email)->first();
        if ($encadrant && Hash::check($password, $encadrant->mot_de_passe)) {
            return $this->generateToken($encadrant, 'enseignant');
        }

        $etudiant = Etudiant::where('email', $email)->first();
        if ($etudiant && Hash::check($password, $etudiant->mot_de_passe)) {
            return $this->generateToken($etudiant, 'etudiant');
        }

        return response()->json(['error' => 'Email ou mot de passe invalide'], 401);
    }

    private function generateToken($user, $role)
    {
        $token = JWTAuth::customClaims(['role' => $role])->fromUser($user);

        return response()->json([
            'token' => $token,
            'user' => $user,
            'role' => $role
        ]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
}

