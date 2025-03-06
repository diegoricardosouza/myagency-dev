<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
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
            'referencia' => 'DEV'.$this->created_at->format('Y'). $this->ref,
            'site' => $this->site,
            'page' => $this->page,
            'format' => $this->format,
            'other_formats' => $this->other_formats,
            'phrase' => $this->phrase,
            'content' => $this->content,
            'obs' => $this->obs,
            'type' => $this->type,
            'status' => $this->status,
            'created' => $this->created_at,
            'user' => new UserResource($this->user),
            'files' => FileResource::collection($this->files),
            'comments' => CommentResource::collection($this->comments),
            'project' => new ProjectResource($this->project),
            'updated_at' => $this->updated_at
        ];
    }
}
