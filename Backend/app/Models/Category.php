<?php

namespace App\Models;

use App\Http\Resources\ProjectResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
    ];

    public function projects()
    {
        return $this->hasMany(Project::class)->select('id', 'title', 'description', 'finished_at', 'duration');
    }
}
