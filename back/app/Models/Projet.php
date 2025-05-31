<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'etudiant_id',
        'encadrant_id',
        'module_id',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function livrable()
    {
        return $this->hasOne(Livrable::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function encadrant() {
        return $this->belongsTo(Encadrant::class, 'encadrant_id');
    }

    public function etudiant() {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function motsCles()
    {
         return $this->belongsToMany(
            MotsCle::class,
            'projet_mot_cle',
            'projet_id',      // clé étrangère vers Projet dans la table pivot
            'mot_cle_id'      // clé étrangère vers MotsCle dans la table pivot (corrigée)
        );
    }

    public function tags()
    {
        return $this->belongsToMany(MotsCle::class, 'projet_mot_cle', 'projet_id', 'mot_cle_id');
    }

    public function certificat()
    {
        return $this->hasOne(Certificat::class);
    }
}
