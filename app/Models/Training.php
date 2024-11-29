<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    public function user(){
      return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'training_date',
        'activity_type',
        'pace',
        'distance',
        'duration',
        'notes'
    ];
}
