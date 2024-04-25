<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompteRenduResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'evenement' => $this->evenement,
            'difficultes' => $this->difficultes,
            'commentaires' => $this->commentaires,
            'date' => $this->date,
            'projet_id' => $this->projet_id,
            'approche_solution' => $this->approche_solution ?? null, // Utilisez ?? pour gérer les valeurs nulles
            'action_retenu' => $this->action_retenu ?? null
            // 'utilisateurId' => $this->utilisateur_id,
        ];
    }
}
