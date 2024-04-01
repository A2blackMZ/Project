<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratedReport extends Model
{
    use HasFactory;

    protected $fillable = ['seance_id', 'file_path'];

    /**
     * Relation avec le modèle Projet
     */
    public function seance()
    {
        return $this->belongsTo(Seance::class);
    }
}
