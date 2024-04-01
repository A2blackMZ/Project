<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Seance;

class CompteRendu extends Model
{
    use HasFactory;

    protected $fillable = [
        'evenement',
        'difficultes',
        'commentaires',
        'date',
        'approche_solution',
        'action_retenu',
        'projet_id',
        'used',
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function seances()
    {
        return $this->belongsToMany(Seance::class, 'compte_rendus_seance', 'compte_rendus_id', 'seance_id');
    }


    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
