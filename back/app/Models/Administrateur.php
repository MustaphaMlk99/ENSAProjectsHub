<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Administrateur extends Model implements JWTSubject
{
     use HasFactory;

    protected $table = 'administrateurs';

    protected $fillable = ['nom', 'prenom', 'email', 'mot_de_passe'];

    protected $hidden = ['mot_de_passe'];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }
}
