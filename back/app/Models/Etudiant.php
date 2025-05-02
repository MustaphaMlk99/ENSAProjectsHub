<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Etudiant extends Model implements JWTSubject
{
    protected $table = 'etudiants';
    protected $hidden = ['mot_de_passe'];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }
}

