<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificat extends Model
{
    use HasFactory;

    protected $fillable = [
        'etudiant_id',
        'chemin_fichier',
        'projet_id'
    ];

    // 🔁 Relation vers l'étudiant
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

     public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    // Accès direct à l'URL du fichier
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->chemin_fichier);
    }
}
