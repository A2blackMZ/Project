<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taches extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'date_echeance',
        'etat',
        'projet_id'
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}