<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TacheResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'description' => $this->description,
            'etat' => $this->etat,
            'date_echeance' => $this->date_echeance,
            'projetId' => $this->projet_id,
            // 'projets' => ProjetResource::collection($this->projets),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}