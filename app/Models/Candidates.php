<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidates extends Model
{
    use HasFactory;

    public function regs()
    {
        return $this->hasMany('App\Models\Registrations','id','candidate_id');
    }
}
