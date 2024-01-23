<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffLabRights extends Model
{
    use HasFactory;

    protected $fillable = [
        'permission_id',
        'permission_value',
        'user_id',
    ];
}
