<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriqueModification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'element_id',
        'utilisateur_id',
        'date_modification'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function compteRendu()
    {
        return $this->belongsTo(CompteRendu::class, 'element_id');
    }
}