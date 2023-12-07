<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CentreUsers extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo('App\Models\User','user_id','id');
    }

    public function details()
    {
        return $this->belongsTo('App\Models\Centres','centre_id','id');
    }
}
