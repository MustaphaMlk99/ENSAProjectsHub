<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'commentaire',
        'livrable_id'
    ];

    public function livrable()
    {
        return $this->belongsTo(Livrable::class);
    }
}
