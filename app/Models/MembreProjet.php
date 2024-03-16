<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembreProjet extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'projet_id',
        'role_id'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}