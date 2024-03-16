<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TacheResource;
use App\Http\Resources\MembreResource;

class ProjetResource extends JsonResource
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
            'budget_alloue' => $this->budget_alloue,
            'budget_depense' => $this->budget_depense,
            'date_debut' => $this->date_debut,
            'date_fin_prevue' => $this->date_fin_prevue,
            'objectif' => $this->objectif,
            'risques' => $this->risques,
            'taches' => TacheResource::collection($this->whenLoaded('taches')),
            'membres' => MembreResource::collection($this->whenLoaded('membres')),
            'date_creation' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
