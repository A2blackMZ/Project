<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    protected $fillable = [
        'reference',
        'date_supervision',
        'date_creation',
        'nom_chef_projet',
        'statut',
    ];

    // Relation avec les projets liés à la séance
    public function projets()
    {
        return $this->belongsToMany(Projet::class, 'seance_projet', 'seance_id', 'projet_id');
    }

    /* Relation avec les comptes rendus par projets sélectionnés
    public function comptesRendus()
    {
        return $this->hasMany(CompteRendu::class);
    }*/
    public function comptesRendus()
    {
        return $this->belongsToMany(CompteRendu::class, 'compte_rendus_seance', 'seance_id', 'compte_rendu_id');
    }



    public function GeneratedReports()
    {
        return $this->belongsToMany(GeneratedReport::class);
    }


}
