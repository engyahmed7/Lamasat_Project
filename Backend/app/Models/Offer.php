<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'phone_number', //int
        'unit_type',
        'unit_area', //int
        'location',
        'budget', //int
        'attachment', // image
    ];
}
