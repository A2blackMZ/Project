<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichierAttache extends Model
{
    use HasFactory;

    protected $fillable = [
        'chemin',
        'description',
        'utilisateur_id',
        'projet_id',
        'tache_id'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function tache()
    {
        return $this->belongsTo(Taches::class);
    }
}
