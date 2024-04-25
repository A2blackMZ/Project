<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class SeanceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'date_supervision' => isset($this->date_supervision) ? $this->date_supervision : null,
            'date_creation' => $this->date_creation,
            'nom_chef_projet' => $this->nom_chef_projet,
            'statut' => $this->statut,
            'projets' => ProjetResource::collection($this->whenLoaded('projets')), // Inclure les projets liés
            'compte_rendus' => CompteRenduResource::collection($this->whenLoaded('compteRendus')), // Inclure les comptes rendus liés
            'user_id' => $this->user_id,
            // Autres attributs de la séance que vous souhaitez inclure
        ];
    }
}
