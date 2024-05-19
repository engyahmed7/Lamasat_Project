<?php

namespace App\Http\Resources;

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
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'title' => json_decode($this->title),
            'description' => json_decode($this->description),
            'finished_at' => $this->finished_at,
            'duration' => $this->duration,
            'images' => ProjectPhotoResource::collection($this->projectPhotos),
            'admin_id' => $this->admin_id,
        ];
    }
}
