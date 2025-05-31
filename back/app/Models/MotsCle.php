<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MotsCle extends Model
{
    protected $table = 'mots_cles';

    protected $fillable = ['mot'];

    public function projets()
    {
        return $this->belongsToMany(Projet::class, 'projet_mot_cle', 'mot_cle_id', 'projet_id');
    }
}
