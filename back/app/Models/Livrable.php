<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livrable extends Model
{
    use HasFactory;

    protected $fillable = [
        'rapport', 'presentation', 'code_source', 'projet_id',
        'rapport_type', 'presentation_type', 'code_source_type'
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
