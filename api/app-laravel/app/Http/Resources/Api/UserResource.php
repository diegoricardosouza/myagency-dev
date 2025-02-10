<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'corporate_name' => $this->corporate_name,
            'fantasy_name' => $this->fantasy_name,
            'cnpj' => $this->cnpj,
            'responsible' => $this->responsible,
            'level' => $this->level,
            'cpf' => $this->cpf,
            'zipcode' => $this->zipcode,
            'address' => $this->address,
            'city' => $this->city,
            'neighborhood' => $this->neighborhood,
            'state' => $this->state,
            'number' => $this->number,
            'phone' => $this->phone,
            'cellphone' => $this->cellphone,
            'site' => $this->site,
            'email' => $this->email,
        ];
    }
}
