<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Model
{
    use HasFactory;

    use Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'telephone',
        'role_id'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function projets()
    {
        return $this->hasMany(Projet::class);
    }

    public function membresProjets()
    {
        return $this->hasMany(MembreProjet::class);
    }
}