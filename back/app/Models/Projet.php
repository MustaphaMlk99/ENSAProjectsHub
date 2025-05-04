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

}
