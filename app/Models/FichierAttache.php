<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichierAttache extends Model
{
    use HasFactory;

    protected $fillable = ['chemin', 'projet_id'];

    /**
     * Relation avec le modèle Projet
     */
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
