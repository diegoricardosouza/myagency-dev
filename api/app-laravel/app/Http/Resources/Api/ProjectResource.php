<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'project_name' => $this->project_name,
            'type' => $this->type,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'number_pages' => $this->number_pages,
            'technical_information' => $this->technical_information,
            'observations' => $this->observations,
            'value_project' => $this->value_project,
            'payment_method' => $this->payment_method,
            'installment' => $this->installment,
            'other' => $this->other,
            'entry_payment' => $this->entry_payment,
            'proof' => url("storage/$this->proof"),
            'plan_id' => $this->plan_id,
            'plan_name' => $this->plan_name,
            'signed_contract' => $this->signed_contract,
            'outsource' => $this->outsource,
            'closing_date' => $this->closing_date,
            'calendar_days' => $this->calendar_days,
            'temporary_link' => $this->temporary_link,
            'finished' => $this->finished,
            'finished_date' => $this->finished_date,
            'pages' => $this->pages,
            'checklists' => $this->checklists,
            'user' => new UserResource($this->user),
            'jobs' => $this->jobs
        ];
    }
}
