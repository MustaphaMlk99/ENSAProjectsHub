<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Etudiant extends Authenticatable implements JWTSubject
{
    protected $table = 'etudiants';

    // Champs que l'on peut remplir via des formulaires ou via un mass assignment
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'filiere',
        'annee',
        'mot_de_passe',
    ];

    // Masquer le mot de passe lors de la sérialisation
    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    // Indique à Laravel que la table a des colonnes created_at et updated_at
    public $timestamps = true;

    // Spécifie les noms des colonnes de timestamps si différents des valeurs par défaut
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    // Implémentation des méthodes de JWTSubject
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    // Exemple de relation : un étudiant peut avoir plusieurs likes
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
