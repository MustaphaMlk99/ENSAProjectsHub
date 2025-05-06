<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = ['projet_id', 'etudiant_id'];

    public function projet() {
        return $this->belongsTo(Projet::class);
    }

    public function etudiant() {
        return $this->belongsTo(Etudiant::class);
    }
}
