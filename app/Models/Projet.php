<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'budget_alloue',
        'budget_depense',
        'date_debut',
        'objectif',
        'jour_compte_rendu',
        'risques',
        'user_id',
    ];

    public function membres()
    {
        return $this->hasMany(MembreProjet::class);
    }

    public function taches()
    {
        return $this->hasMany(Tache::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
